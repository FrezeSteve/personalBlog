import React from "react";

export default function Card(props) {
  return (
    <div
      className="col-12 col-md-5 mx-auto"
      onMouseEnter={props.onMouseEnter.bind(this, props.id)}
      onMouseLeave={props.onMouseOut}
    >
      <div className={"card mb-3" + props.hover}>
        <img
          src={props.image_url} //|| require("../assets/boku.jpg")
          className="card-img-top"
          alt={props.title}
          width="250px"
          height="250px"
        />
        <div className="card-body">
          <h5 className="card-title">
            <a
              href={`/article/${props.pid}/`}
              className="text-dark text-decoration-none rounded"
            >
              {props.title}
            </a>
          </h5>
          <p className="card-text">{props.subtitle}</p>
          <p className="card-text">
            <small className="text-muted">Last updated 3 mins ago</small>
          </p>
          <a
            href={`/edit/${props.pid}/`}
            className="btn btn-warning btn-sm mr-1 my-1"
          >
            update
          </a>
          {!props.archive && (
            <button className="btn btn-danger btn-sm m-1">archive</button>
          )}
          {props.draft && (
            <button
              className="btn btn-success btn-sm m-1"
              onClick={props.OnPublish}
            >
              publish
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
