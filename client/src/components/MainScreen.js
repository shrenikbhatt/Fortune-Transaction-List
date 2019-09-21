import React, { Component, Fragment } from "react";
import TransactionHistory from "./TransactionHistory";
import AddItemModal from "./AddItemModal";
import RegisterScreen from "./auth/RegisterScreen";
import LoginScreen from "./auth/LoginScreen";
import PropTypes from "prop-types";

import { connect } from "react-redux";

class MainScreen extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired
  };
  render() {
    const { isAuthenticated, isLogin } = this.props.auth;
    const authComps = (
      <Fragment>
        <AddItemModal />
        <TransactionHistory />
      </Fragment>
    );
    const isRegisterComp = (
      <Fragment>
        <RegisterScreen />
      </Fragment>
    );
    const isLoginComp = (
      <Fragment>
        <LoginScreen />
      </Fragment>
    );
    return (
      <div key={this.props.auth}>
        {isAuthenticated ? authComps : isLogin ? isLoginComp : isRegisterComp}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  null
)(MainScreen);
