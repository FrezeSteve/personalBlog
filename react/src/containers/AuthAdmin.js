import React from "react";
import { connect } from "react-redux";

import Draft from "../containers/Draft";

// Action
import { authVerifyToken } from "../redux/actions/authAction";

class AuthAdmin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.props.authVerifyToken();
  }
  render() {
    return (
      <React.Fragment>
        <Draft />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  load: state.authReducer.loading
});

const mapReducerToProps = {
  authVerifyToken
};

export default connect(mapStateToProps, mapReducerToProps)(AuthAdmin);
