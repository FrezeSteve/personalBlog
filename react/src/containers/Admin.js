import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import AuthAdmin from "../containers/AuthAdmin";

// Action
import { logout, authCheckState } from "../redux/actions/authAction";

class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // this checks whether you have a token
  render() {
    if (this.props.isAuthenticated && this.props.token.length < 1) {
      console.log("Redirect");
      return <Redirect to="/login/" />;
    }
    // if you do then the next page is called that checks your token
    return (
      <React.Fragment>
        <AuthAdmin />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  products: state.productReducer.products,
  load: state.authReducer.loading,
  isAuthenticated: state.authReducer.token !== null,
  token: state.authReducer.token
});

const mapReducerToProps = {
  authCheckState,
  logout
};

export default connect(mapStateToProps, mapReducerToProps)(Admin);
