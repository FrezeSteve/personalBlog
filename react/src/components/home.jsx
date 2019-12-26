import React from "react";

import Nav from "./nav";
import Jumb from "./jumb";
import Card from "./cards";
import Main from "./main";
export default function Home(props) {
  // console.log(props.items);
  const first = props.items[0] || [];

  return (
    <React.Fragment>
      <div className="container">
        {/* <Header /> */}
        {/* <Nav /> */}

        <Jumb
          id={first.id}
          title={first.title}
          subtitle={first.subtitle}
          content={first.content}
        />
        <div className="row mb-2 ">
          {props.items.slice(1, 7).map((element, index) => {
            if (props.id === index + 1) {
              return (
                <Card
                  pid={element.id}
                  title={element.title}
                  subtitle={element.subtitle}
                  content={element.content}
                  updated={element.update}
                  image_url={element.image_url}
                  key={index}
                  onMouseEnter={props.onMouseEnter}
                  onMouseOut={props.onMouseOut}
                  theState={props.theState}
                  id={index + 1}
                  hover={" shadowMe"}
                />
              );
            }
            return (
              <Card
                pid={element.id}
                title={element.title}
                subtitle={element.subtitle}
                content={element.content}
                updated={element.update}
                image_url={element.image_url}
                key={index}
                onMouseEnter={props.onMouseEnter}
                onMouseOut={props.onMouseOut}
                theState={props.theState}
                id={index + 1}
                hover={" "}
              />
            );
          })}
        </div>
      </div>
      {/* <Main /> */}
    </React.Fragment>
  );
}
