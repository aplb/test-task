import React, { Component } from 'react';
// import PropTypes from 'prop-types';

export default class TransactionsList extends Component {
  componentWillMount() {
    this.props.fetchTransactions();
    // this.props.getTransaction('97d6a157-5f61-45f5-8543-40f9d67e7fd6');
  }
  render() {
    return (<div>List</div>);
  }
}

// TransactionsList.propTypes = {
//   transactionsList: PropTypes.arrayOf(PropTypes.object).isRequired,
//   transaction: PropTypes.object.isRequired,
//   isLoading: PropTypes.boolean.isRequired,
//   fetchTransactions: PropTypes.func.isRequired,
// }
