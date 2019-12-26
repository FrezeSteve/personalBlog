import React, { Component } from "react";

import ArticleComponent from "../components/article";
import { connect } from "react-redux";
// Actions
import {
  getDetailArticle,
  publishProduct
} from "../redux/actions/productAction";

class Article extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.getDetailArticle(this.props.match.params.pid);
  }
  OnPublish = (PID, event) => {
    console.log("published: ", PID);
    this.props.publishProduct(PID);
  };
  render() {
    const item = this.props.products[0] || [];
    return (
      <ArticleComponent
        item={item}
        OnPublish={this.OnPublish.bind(this, this.props.match.params.pid)}
        isAdmin={this.props.isAdmin}
      />
    );
  }
}
const mapStateToProps = state => ({
  products: state.productReducer.products,
  load: state.productReducer.loading_get,
  isAdmin: state.authReducer.token !== null
});
const mapReducerToProps = {
  getDetailArticle,
  publishProduct
};
export default connect(mapStateToProps, mapReducerToProps)(Article);
