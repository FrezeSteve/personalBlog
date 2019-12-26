import React from "react";
import { connect } from "react-redux";

import Edit from "../containers/Edit";

// Action
import { authVerifyToken } from "../redux/actions/authAction";

class EditTwo extends React.Component {
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
        <Edit params={this.props.params} />
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

export default connect(mapStateToProps, mapReducerToProps)(EditTwo);
