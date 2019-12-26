import React from "react";
import { connect } from "react-redux";
import Spinner from "react-bootstrap/Spinner";

import Card from "../components/adminCard";

// Action
import {
  getAdminArticles,
  publishProduct
} from "../redux/actions/productAction";

class Draft extends React.Component {
  constructor(props) {
    super(props);
    this.state = { shadow: true, id: "" };
  }
  componentDidMount() {
    this.props.getAdminArticles();
  }
  onMouseEnter = (id, event) => {
    this.setState({
      shadow: false,
      id: id
    });
  };
  onMouseOut = () => {
    this.setState({
      shadow: true,
      id: ""
    });
  };
  OnPublish = (PID, event) => {
    console.log("published: ", PID);
    this.props.publishProduct(PID);
  };
  render() {
    const items = this.props.drafts || [];
    const spinner = (
      <div style={{ width: "100%" }} className="text-center mt-5 pt-5 mt-sm-0">
        <div className="mt-5"></div>
        <Spinner animation="border" variant="success" size="lg" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
    return (
      <div style={{ marginTop: "80px" }}>
        <div className="container">
          <div className="row mb-2 ">
            {this.props.load
              ? spinner
              : items.map((element, index) => {
                  if (this.state.id === index + 1) {
                    return (
                      <Card
                        pid={element.id}
                        title={element.title}
                        subtitle={element.subtitle}
                        content={element.content}
                        updated={element.update}
                        image_url={element.image_url}
                        draft={element.draft}
                        key={index}
                        onMouseEnter={this.onMouseEnter}
                        onMouseOut={this.onMouseOut}
                        theState={this.state.shadow}
                        OnPublish={this.OnPublish.bind(this, element.id)}
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
                      draft={element.draft}
                      archive={element.archive}
                      key={index}
                      onMouseEnter={this.onMouseEnter}
                      onMouseOut={this.onMouseOut}
                      theState={this.props.shadow}
                      OnPublish={this.OnPublish.bind(this, element.id)}
                      id={index + 1}
                      hover={" "}
                    />
                  );
                })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  drafts: state.productReducer.drafts,
  load: state.productReducer.loading_get
});

const mapReducerToProps = {
  getAdminArticles,
  publishProduct
};

export default connect(mapStateToProps, mapReducerToProps)(Draft);
