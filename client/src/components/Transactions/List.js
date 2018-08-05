import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TransactionItem from './TransactionItem';
import Loader from '../Loader';

export default class TransactionsList extends Component {
  state = {
    expanded: null,
  };

  handleExpandChange = panel => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });
  };

  componentWillMount() {
    this.props.fetchTransactions();
    // this.props.getTransaction('97d6a157-5f61-45f5-8543-40f9d67e7fd6');
  }
  render() {
    const { expanded } = this.state;
    const { transactionsList, isLoading } = this.props;

    if (isLoading) {
      return (<Loader />);
    }

    return transactionsList.map(
      transaction =>
        <TransactionItem
          key={transaction.id}
          transaction={transaction}
          handleExpandChange={this.handleExpandChange(transaction.id)}
          expandedId={expanded}
        />
    );
  }
}

TransactionsList.propTypes = {
  transactionsList: PropTypes.arrayOf(PropTypes.object).isRequired,
  transaction: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  fetchTransactions: PropTypes.func.isRequired,
};
