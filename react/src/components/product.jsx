import React from "react";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

export default function ProductComponent(props) {
  const spinner = (
    <Button variant="primary" disabled>
      <Spinner
        as="span"
        animation="grow"
        size="sm"
        role="status"
        aria-hidden="true"
      />
      Adding...
    </Button>
  );
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 pb-3 mx-auto">
          <form method="post" ref={props.myFormRef} onSubmit={props.formSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                aria-describedby="title"
                placeholder="Title of Post"
                value={props.title}
                name="title"
                onChange={props.filehandler}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="subtitle">Subtitle</label>
              <input
                type="text"
                className="form-control"
                id="subtitle"
                aria-describedby="subtitle"
                placeholder="subtitle of Post"
                value={props.subtitle}
                name="subtitle"
                onChange={props.filehandler}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="content">Content</label>
              <textarea
                className="form-control"
                value={props.content}
                id="content"
                rows="3"
                name="content"
                onChange={props.filehandler}
                required
              ></textarea>
            </div>
            {/* <div className="form-group">
              <label htmlFor="content">Content</label>
              <input
                type="text"
                className="form-control"
                id="content"
                aria-describedby="content"
                placeholder="Content of Post"
                value={props.content}
                onChange={props.filehandler}
              />
            </div> */}
            <div className="form-group files color">
              <label htmlFor="image">Upload An Image </label>
              <input
                type="file"
                id="image"
                name="image"
                className="form-control"
                onChange={props.filehandler}
                required
              />
            </div>
            {props.load ? (
              spinner
            ) : (
              <button type="submit" className="btn btn-success">
                Submit
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
