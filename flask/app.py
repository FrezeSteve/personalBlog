from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from flask_migrate import Migrate, MigrateCommand
from flask_script import Manager

import os

from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)
api = Api(app)


base_folder = os.path.split(os.path.abspath(__file__))[0]
app.config['SECRET_KEY'] = os.environ.get("SECRET_KEY")
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get("DATABASE_URL")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

manager = Manager(app)
manager.add_command('db', MigrateCommand)

import cloudinary as Cloud
Cloud.config.update = ({
    'cloud_name':os.environ.get('CLOUDINARY_CLOUD_NAME'),
    'api_key': os.environ.get('CLOUDINARY_API_KEY'),
    'api_secret': os.environ.get('CLOUDINARY_API_SECRET')
})

from .views import PostList, AnonymousView, Login, Logout, VerifyToken

api.add_resource(PostList, '/list', '/detail/<uuid:path>/')
api.add_resource(AnonymousView, '/session')
api.add_resource(Login, '/login')
api.add_resource(VerifyToken, '/verify')
api.add_resource(Logout, '/logout')

if __name__ == '__main__':
    app.run(debug=True, threaded=True)
