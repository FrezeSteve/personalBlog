from flask_restful import Resource, reqparse
from flask import abort, request
from werkzeug.datastructures import FileStorage

from cloudinary.uploader import upload
from cloudinary.utils import cloudinary_url

from .models import Post
from .app import db, app
from datetime import timedelta, datetime
from uuid import uuid4
from .models import Anonymous, Token, User
import jwt

from werkzeug.security import check_password_hash
from functools import wraps

# TODO: delete view, update view


def admin_only(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']

        if not token:
            return abort(401, message="Token is missing")
        try:
            data = jwt.decode(token, app.config['SECRET_KEY'])
            # know that the current logged in user is using a token that is in the token table.
            user_obj = User.query.filter_by(public_id=data['public_id']).first()
            if user_obj.token is None and not user_obj.is_admin:
                return abort(401, message="You should login as admin")
        except Exception as e:
            return abort(401, message="Token is invalid, {}".format(e))
        return f(*args, **kwargs)

    return decorated


class PostList(Resource):
    def __init__(self):
        self.parse = reqparse.RequestParser()
        self.token = None

    def detail(self, qs):
            object = {
                'title': qs.title,
                'id': qs.public_id,
                'subtitle': qs.subtitle,
                'update': str(qs.updated),
                'content': qs.content,
                'draft': qs.draft,
                'image_url': qs.image_url
            }
            return {"article": [object]}

    def list(self, qs, articles):
        for i in qs:
            articles.append({
                'title': i.title,
                'id': i.public_id,
                'subtitle': i.subtitle,
                'update': str(i.updated),
                'draft': i.draft,
                'archive': i.archive,
                'content': i.content,
                'image_url': i.image_url
            })
        return {'list': articles[:8]}

    def get(self, path=None):
        if 'x-access-token' in request.headers:
            self.token = request.headers['x-access-token']
        if self.token is None:
            # Detail View
            if path is not None:
                qs = Post.query.filter_by(public_id=str(path)).first()
                return self.detail(qs)
            # ListView
            qs = Post.query.order_by(Post.updated.desc()).filter_by(draft=False).all()
            articles = []
            return self.list(qs, articles)
        else:
            # Detail View
            if path is not None:
                qs = Post.query.filter_by(public_id=str(path)).first()
                return self.detail(qs)
            # ListView
            qs = Post.query.order_by(Post.updated.desc()).all()
            articles = []
            return self.list(qs, articles)

    def post(self, path=None):
        if path is not None:
            qs = Post.query.filter_by(public_id=str(path)).first()
            if qs is not None:
                qs.draft = False
                qs.publish = datetime.utcnow()
                db.session.commit()
            else:
                return {"error": "article doesnt exist"}, 400
            return {"message": "successfully published"}
        self.parse.add_argument('file', type=FileStorage, location='files')
        self.parse.add_argument('title')
        self.parse.add_argument('subtitle')
        self.parse.add_argument('content')
        args = self.parse.parse_args()

        # Image
        image_file = args['file']

        # print(image_file)
        upload_result = upload(image_file, folder='Blog')
        # print('This is upload result ' + str(upload_result))

        (image_url, options) = cloudinary_url(upload_result['public_id'])
        # print('Image url = ' + str(image_url))

        # Store this info in the database (self, title, subtitle, content, image_url):
        article = Post(args['title'], args['subtitle'], args['content'], str(image_url), upload_result['public_id'])
        db.session.add(article)
        db.session.commit()
        return {'message': 'Article was successfully posted'}

    def put(self, path=None):
        if path is None: return abort(400, error="no response from the server")
        if 'x-access-token' in request.headers:
            self.token = request.headers['x-access-token']
        if self.token is None: return {"error": "login as admin"}, 401

        self.parse.add_argument('title')
        self.parse.add_argument('subtitle')
        self.parse.add_argument('content')
        self.parse.add_argument('file', type=FileStorage, location='files')

        args = self.parse.parse_args()

        article = Post.query.filter_by(public_id=str(path)).first()

        # Image
        image_file = args['file']
        if image_file is not None:
            upload_result = upload(image_file, folder='Blog')
            (image_url, options) = cloudinary_url(upload_result['public_id'])

            article.image_url = image_url
            article.image_id = upload_result['public_id']

        article.title = args['title']
        article.subtitle = args['subtitle']
        article.content = args['content']

        db.session.commit()
        return {"message": "Update was successful"}

    def delete(self, path=None):
        if path is None: return abort(400, error="no response from the server")


class AnonymousView(Resource):

    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.time_to_exp = timedelta(hours=24)

    def post(self):
        self.parser.add_argument('session', type=dict, help="session validation")
        args = self.parser.parse_args()
        session = args['session']
        if session is not None:
            session_id, session_token = session.get("session_id", None), session.get("session_token", None)
            if session_id is not None or session_token is not None:
                user_session_id = Anonymous.query.filter_by(session_id=session_id).first()
                user_session_token = Anonymous.query.filter_by(session_token=session_token).first()
                if user_session_token is not None:
                    session_id = user_session_token.session_id
                    session_token = user_session_token.session_token
                    user_session_token.last_login = datetime.utcnow()
                    db.session.add(user_session_token)
                    db.session.commit()
                    return {"session": {"session_id": session_id, "session_token": session_token}}
                elif user_session_id is not None:
                    session_id = user_session_id.session_id
                    session_token = user_session_id.session_token
                    user_session_id.last_login = datetime.utcnow()
                    db.session.add(user_session_id)
                    db.session.commit()
                    return {"session": {"session_id": session_id, "session_token": session_token}}
        time_exp = datetime.utcnow() + self.time_to_exp
        session_id = str(uuid4())
        token = jwt.encode({'session_id': session_id, 'exp': time_exp}, app.config['SECRET_KEY'])
        db.session.add(Anonymous(token.decode('UTF-8'), session_id))
        db.session.commit()
        return {"session": {"session_id": session_id, "session_token": token.decode('UTF-8')}}


class PublishArticle(Resource):
    pass

class Login(Resource):
    def __init__(self):
        self.parser = reqparse.RequestParser()
        self.time_to_exp = timedelta(hours=24)

    def post(self):
        self.parser.add_argument('login', type=dict, help="login credentials are needed")
        args = self.parser.parse_args()
        login = args['login']
        if login is not None:
            # required fields is email and password
            email = login.get("email", None)
            if email is None or len(email) <= 7:
                return abort(400, error="email is invalid or empty")
            if "@" not in email or "." not in email:
                return {"error": "enter a valid email"}, 400
            password = login.get("password", None)
            if password is None or len(password) <= 7:
                return {"error": "Invalid login credentials"}, 401
            qs = User.query.filter_by(email=email).first()
            if qs is None:
                return {'error': "Invalid login credentials"}, 401
            elif qs is not None:
                if check_password_hash(qs.password, password):
                    time_exp = datetime.utcnow() + self.time_to_exp
                    token = jwt.encode({'public_id': qs.public_id, 'exp': time_exp}, app.config['SECRET_KEY'])
                    # check whether the current user is in the token table
                    qs.last_login = datetime.utcnow()
                    db.session.add(qs)
                    user = qs.token
                    if user is None:
                        # Add the token to the token table
                        db.session.add(Token(token.decode('UTF-8'), qs.id))
                        db.session.commit()
                    else:
                        user.token = token.decode('UTF-8')
                        user.expiration = time_exp
                        db.session.commit()
                    return {'Token': token.decode("UTF-8")}
                else:
                    return {"error": "Invalid login credentials"}, 401
        else:
            return abort(401, error="Invalid login credentials")


class VerifyToken(Resource):
    def __init__(self):
        self.token = None

    def post(self):
        if 'x-access-token' in request.headers:
            self.token = request.headers['x-access-token']
        if self.token is not None:
            try:
                data = jwt.decode(self.token, app.config['SECRET_KEY'])
                # know that the current logged in user is using a token that is in the token table.
                user_obj = User.query.filter_by(public_id=data['public_id']).first()
                if user_obj.token is None and not user_obj.is_admin:
                    raise Exception("You should login as admin")
            except jwt.exceptions.DecodeError:
                return {"error": "Invalid Token"}, 401
            except jwt.exceptions.ExpiredSignatureError:
                return {"error": "Invalid Token"}, 401
            except Exception as e:
                return abort(401, error="Token is invalid, {}".format(e))
            return {'Token': self.token}
        

class Logout(Resource):
    def post(self):
        token = None
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']

        if not token:
            return abort(400, message="Only Logged in Users can logout")

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'])
            # know that the current logged in user is using a token that is in the token table.
            user_obj = User.query.filter_by(public_id=data['public_id']).first()
            if user_obj.token is None:
                return abort(401, message="Only Logged in Users can logout")
            db.session.delete(user_obj.token)
            db.session.commit()
        except Exception as e:
            return abort(400, message="Something is wrong, {}".format(e))
        return {'message': "logged out successfully"}
