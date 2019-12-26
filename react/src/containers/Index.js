import React, { Component, Fragment } from "react";
// import Product from "./Product";
import HomeComponent from "../components/home";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { getProduct } from "../redux/actions/productAction";

import Spinner from "react-bootstrap/Spinner";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { shadow: true, id: "" };
  }
  onMouseEnter = (id, event) => {
    this.setState({
      shadow: false,
      id: id
    });
  };
  componentDidMount() {
    this.props.getProduct();
  }
  onMouseOut = () => {
    this.setState({
      shadow: true,
      id: ""
    });
  };
  render() {
    const items = this.props.products || [];
    const spinner = (
      <div style={{ width: "100%" }} className="text-center mt-5 pt-5 mt-sm-0">
        <div className="mt-5"></div>
        <Spinner animation="border" variant="success" size="lg" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
    return (
      <Fragment>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Blog About Believe</title>
          <style>{`body{
            background-color:#f2f2f2 !important;
            }`}</style>
          <meta
            name="description"
            content="Everyone has a belief in something."
          />
          <meta
            name="keywords"
            content="believe, beliefs, believed, belief, Persona, character, morals, moral
            health belief model, belief synonym, 	define belief, belief system, this i believe,
            i want to believe, 	i believe in a thing called love, believe in yourself"
          />
          <meta name="robots" content="index, follow" />
        </Helmet>
        {this.props.load ? (
          spinner
        ) : (
          <HomeComponent
            onMouseEnter={this.onMouseEnter}
            onMouseOut={this.onMouseOut}
            theState={this.state.shadow}
            id={this.state.id}
            items={items}
          />
        )}
        {/* <Product /> */}
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  products: state.productReducer.products,
  load: state.productReducer.loading_get
});
const mapReducerToProps = { getProduct };
export default connect(mapStateToProps, mapReducerToProps)(Home);
