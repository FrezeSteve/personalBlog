import React from "react";

export default function Card(props) {
  // const d = new Date(year, month, day, hours, minutes, seconds, milliseconds);
  const updated = props.updated;
  return (
    <div
      className="col-12 col-md-5 mx-auto"
      onMouseEnter={props.onMouseEnter.bind(this, props.id)}
      onMouseLeave={props.onMouseOut}
    >
      <a
        href={`/article/${props.pid}/`}
        className="text-dark text-decoration-none rounded"
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
            <h5 className="card-title">{props.title}</h5>
            <p className="card-text">{props.subtitle}</p>
            <p className="card-text">
              <small className="text-muted">Last updated 3 mins ago</small>
            </p>
          </div>
        </div>
      </a>
    </div>
  );
}
