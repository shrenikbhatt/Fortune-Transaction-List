import React, { Component } from "react";
import { Container, Table, Button } from "reactstrap";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import {
  getTransactions,
  deleteTransaction
} from "../actions/transactionActions";
import Moment from "react-moment";

class TransactionHistory extends Component {
  componentDidMount() {
    this.props.getTransactions();
  }

  onDeleteClick = id => {
    this.props.deleteTransaction(id);
  };

  render() {
    const { transactions } = this.props.transaction;
    return (
      <div>
        <Container>
          <Table className="text-center">
            <thead>
              <tr>
                <th>Category</th>
                <th>Date</th>
                <th>Vendor</th>
                <th>Amount ($)</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(({ _id, category, date, vendor, amount }) => (
                <tr key={_id}>
                  <td>{category}</td>
                  <td>
                    <Moment format="YYYY/MM/DD">{date}</Moment>
                  </td>
                  <td>{vendor}</td>
                  <td>{amount}</td>
                  <td>
                    <Button
                      className="btn-outline-danger"
                      color="light"
                      size="sm"
                      onClick={this.onDeleteClick.bind(this, _id)}
                    >
                      X
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

TransactionHistory.propTypes = {
  getTransactions: PropTypes.func.isRequired,
  transaction: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  transaction: state.transaction
});

export default connect(
  mapStateToProps,
  { getTransactions, deleteTransaction }
)(TransactionHistory);
