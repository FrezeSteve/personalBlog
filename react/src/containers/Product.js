import React, { Component, Fragment } from "react";
import ProductComponent from "../components/product";
import { connect } from "react-redux";

// Actions
import { postProduct, getProduct } from "../redux/actions/productAction";

class Product extends Component {
  constructor(props) {
    super(props);
    this.myFormRef = React.createRef();
    this.state = {
      imageFile: null,
      title: "",
      subtitle: "",
      content: ""
    };
  }
  componentDidMount() {
    // this.props.getProduct();
  }
  filehandler = event => {
    const { name, value } = event.target;
    if (name === "image") {
      this.setState({
        imageFile: event.target.files[0]
      });
    }
    if (name === "title") {
      this.setState({
        title: value
      });
    }
    if (name === "subtitle") {
      this.setState({
        subtitle: value
      });
    }
    if (name === "content") {
      this.setState({
        content: value
      });
    }
  };
  formSubmit = event => {
    event.preventDefault();
    const fd = new FormData();
    // fd.append("file", this.state.imageFile, this.state.imageFile.name);
    fd.append("file", this.state.imageFile);
    fd.append("title", this.state.title);
    fd.append("subtitle", this.state.subtitle);
    fd.append("content", this.state.content);
    if (!this.props.loading_product) {
      this.props.postProduct(fd);
      this.setState({
        title: "",
        subtitle: "",
        content: ""
      });
      this.myFormRef.current.reset();
      return true;
    }
    return false;
  };
  render() {
    return (
      <Fragment>
        <div className="row mx-2 mt-5 pt-4"></div>
        <ProductComponent
          formSubmit={this.formSubmit}
          load={this.props.loading_product}
          filehandler={this.filehandler}
          title={this.state.title}
          subtitle={this.state.subtitle}
          content={this.state.content}
          imageFile={this.state.imageFile}
          myFormRef={this.myFormRef}
        />
      </Fragment>
    );
  }
}
const mapStateToProps = state => ({
  loading_product: state.productReducer.loading_product
});
const mapReducerToProps = { postProduct, getProduct };
export default connect(mapStateToProps, mapReducerToProps)(Product);
