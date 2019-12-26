import React from "react";
import { connect } from "react-redux";
import Spinner from "react-bootstrap/Spinner";

// Action
import { getDetailArticle, putProduct } from "../redux/actions/productAction";

import EditComponent from "../components/edit";

class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      subtitle: "",
      content: "",
      imageFile: null,
      changed: false
    };
  }
  componentDidMount() {
    this.props.getDetailArticle(this.props.params);
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.props.products !== null && !this.props.load) {
      if (this.state.title.length === 0 && !this.state.changed) {
        const item = this.props.products[0] || [];
        this.setState({
          title: item.title,
          subtitle: item.subtitle,
          content: item.content,
          changed: true
        });
      }
    }
  }
  onChangeHandler = event => {
    const { name, value } = event.target;
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
    if (name === "image") {
      this.setState({
        imageFile: event.target.files[0]
      });
    }
  };
  formSubmit = event => {
    event.preventDefault();
    const fd = new FormData();
    fd.append("title", this.state.title);
    fd.append("subtitle", this.state.subtitle);
    fd.append("content", this.state.content);
    fd.append("file", this.state.imageFile);
    if (!this.props.loading_product) {
      this.props.putProduct(fd, this.props.match.params.pid);
      // this.setState({
      //   title: "",
      //   subtitle: "",
      //   content
      // });
      return true;
    }
    return false;
  };
  render() {
    const item = this.props.products[0] || [];
    const spinner = (
      <div style={{ width: "100%" }} className="text-center">
        <Spinner animation="border" variant="success" size="lg" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
    return (
      <div style={{ marginTop: "80px" }}>
        <div className="container">
          <div className="row mb-2 ">
            <div className="col-12 col-md-5 mx-auto">
              {this.props.load ? (
                spinner
              ) : (
                <EditComponent
                  onChangeHandler={this.onChangeHandler}
                  formSubmit={this.formSubmit}
                  title={this.state.title}
                  subtitle={this.state.subtitle}
                  content={this.state.content}
                  load={this.props.load}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  products: state.productReducer.products,
  load: state.productReducer.loading_get
});

const mapReducerToProps = {
  getDetailArticle,
  putProduct
};

export default connect(mapStateToProps, mapReducerToProps)(Edit);
