import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import EditTwo from "../containers/EditTwo";

// Action
import { logout } from "../redux/actions/authAction";

class EditOne extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  // this checks whether you have a token
  render() {
    if (this.props.isAuthenticated && this.props.token.length < 1) {
      console.log("Redirect");
      return <Redirect to="/" />;
    }
    // if you do then the next page is called that checks your token
    return (
      <React.Fragment>
        <EditTwo params={this.props.match.params.pid} />
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
  logout
};

export default connect(mapStateToProps, mapReducerToProps)(EditOne);
