import React from "react";
import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";

export default function EditComponent(props) {
  const spinner = (
    <Button variant="warning" disabled>
      <Spinner
        as="span"
        animation="grow"
        size="sm"
        role="status"
        aria-hidden="true"
      />
      Submit...
    </Button>
  );
  return (
    <form method="post" onSubmit={props.formSubmit}>
      <div className="form-group">
        <label htmlFor="Title">Title</label>
        <input
          type="text"
          className="form-control"
          name="title"
          onChange={props.onChangeHandler}
          value={props.title}
          id="Title"
          aria-describedby="titleHelp"
        />
      </div>
      <div className="form-group">
        <label htmlFor="Subtitle">Subtitle</label>
        <textarea
          className="form-control"
          name="subtitle"
          onChange={props.onChangeHandler}
          value={props.subtitle}
          id="Subtitle"
          rows="3"
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="Content">Content</label>
        <textarea
          className="form-control"
          name="content"
          onChange={props.onChangeHandler}
          value={props.content}
          id="Content"
          rows="3"
        ></textarea>
      </div>
      <div className="form-group files color">
        <label htmlFor="image">Update the Image </label>
        <input
          type="file"
          id="image"
          name="image"
          className="form-control"
          onChange={props.filehandler}
        />
      </div>
      {props.load ? (
        spinner
      ) : (
        <button type="submit" className="btn btn-warning">
          Update
        </button>
      )}
    </form>
  );
}
