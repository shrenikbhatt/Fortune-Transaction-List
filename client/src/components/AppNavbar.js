import React, { Component, Fragment } from "react";
import Logout from "./auth/Logout";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import { connect } from "react-redux";
import { loginPage, registerPage } from "../actions/authActions";

class AppNavbar extends Component {
  state = {
    isOpen: false
  };

  toggle = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  render() {
    const { isAuthenticated } = this.props.auth;

    const authLinks = (
      <Fragment>
        <NavItem>
          <Logout />
        </NavItem>
        <NavItem>
          <NavLink href="#">My Account</NavLink>
        </NavItem>
      </Fragment>
    );
    const notAuthLinks = (
      <Fragment>
        <NavItem>
          <NavLink href="#" onClick={this.props.loginPage}>
            Login
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="#" onClick={this.props.registerPage}>
            Register
          </NavLink>
        </NavItem>
      </Fragment>
    );
    return (
      <div>
        <Navbar color="dark" dark expand="md" className="mb-2">
          <NavbarBrand href="/" className="large">
            Fortune
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              {isAuthenticated ? authLinks : notAuthLinks}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { loginPage, registerPage }
)(AppNavbar);
