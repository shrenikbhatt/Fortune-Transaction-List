import React, { Component } from "react";
import { Container, Form, FormGroup, Label, Input, Button } from "reactstrap";
import { connect } from "react-redux";
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";

class RegisterScreen extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    confirm_password: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    this.props.clearErrors();
    e.preventDefault();

    const { name, email, password, confirm_password } = this.state;

    const newUser = {
      name,
      email,
      password,
      confirm_password
    };

    this.props.register(newUser);
  };
  render() {
    return (
      <div>
        <Container>
          <Form onSubmit={this.onSubmit}>
            <FormGroup>
              <Label>Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Full Name"
                onChange={this.onChange}
              ></Input>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="example@example.ca"
                onChange={this.onChange}
              ></Input>

              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                onChange={this.onChange}
              ></Input>
              <Label>Confirm Password</Label>
              <Input
                type="password"
                name="confirm_password"
                id="confirm_password"
                onChange={this.onChange}
              ></Input>
              <Button color="dark" style={{ marginTop: "2rem" }}>
                Submit
              </Button>
            </FormGroup>
          </Form>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  { register, clearErrors }
)(RegisterScreen);
