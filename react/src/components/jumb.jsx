import React from "react";

export default function Jumb(props) {
  return (
    <div className="jumbotron p-4 p-md-5 mb-3 text-white rounded bg-dark">
      <div className="col-md-6 px-0">
        <h1 className="display-4 font-italic">{props.title}</h1>
        <p className="lead my-3">{props.subtitle}</p>
        <p className="lead mb-0">
          <a
            href={`/article/${props.id}/`}
            className="text-white font-weight-bold"
          >
            Continue reading...
          </a>
        </p>
      </div>
    </div>
  );
}
