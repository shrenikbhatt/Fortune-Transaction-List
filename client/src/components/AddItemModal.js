import React, { Component } from "react";
import {
  Modal,
  Container,
  ModalHeader,
  ModalBody,
  Button,
  Form,
  FormGroup,
  Input
} from "reactstrap";
import { addTransaction } from "../actions/transactionActions";
import { connect } from "react-redux";

class AddItemModal extends Component {
  state = {
    modal: false,
    category: "",
    date: "",
    vendor: "",
    amount: null
  };

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const newTransaction = {
      category: this.state.category,
      date: this.state.date,
      vendor: this.state.vendor,
      amount: this.state.amount
    };
    // Add item via addTransaction item
    this.props.addTransaction(newTransaction);

    // Close the modal
    this.toggle();
  };

  render() {
    return (
      <div>
        <Container className="mb-3">
          <Button
            color="light"
            className="btn btn-outline-dark"
            onClick={this.toggle}
          >
            New Transaction
          </Button>
        </Container>

        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add New Transaction</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Input
                  type="text"
                  name="category"
                  id="category"
                  placeholder="Category"
                  className="mb-2"
                  onChange={this.onChange}
                />
                <Input
                  type="date"
                  name="date"
                  id="date"
                  placeholder="Date"
                  className="mb-2"
                  onChange={this.onChange}
                />
                <Input
                  type="text"
                  name="vendor"
                  id="vendor"
                  placeholder="Vendor"
                  className="mb-2"
                  onChange={this.onChange}
                />
                <Input
                  type="number"
                  name="amount"
                  id="amount"
                  placeholder="Amount"
                  className="mb-2"
                  onChange={this.onChange}
                />
                <Button color="light" className="btn btn-outline-dark" block>
                  Add Transaction
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  transaction: state.transaction
});

export default connect(
  mapStateToProps,
  { addTransaction }
)(AddItemModal);
