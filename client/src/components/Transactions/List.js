import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TransactionItem from './TransactionItem';
import Loader from '../Loader';

export default class TransactionsList extends Component {
  state = {
    expanded: null,
  };

  handleExpandChange = panelId => (event, expanded) => {
    if (expanded) {
      this.props.getTransaction(panelId);
    }
    this.setState({
      expanded: expanded ? panelId : false,
    });
  };

  componentWillMount() {
    this.props.fetchTransactions();
  }

  render() {
    const { expanded } = this.state;
    const { error, transactionFullData, lastLoading, transactionsList, isLoading } = this.props;

    if (!lastLoading && isLoading) {
      return (<Loader />);
    }

    return (
      <div>
        <div>{error}</div>
        {transactionsList.map(
          transaction =>
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              handleExpandChange={this.handleExpandChange(transaction.id)}
              expandedId={expanded}
              isLoading={lastLoading === transaction.id} // lodash.memoize
              transactionFullData={transactionFullData}
            />
        )}
      </div>
    )
  }
}

TransactionsList.propTypes = {
  transactionsList: PropTypes.arrayOf(PropTypes.object).isRequired,
  transaction: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  fetchTransactions: PropTypes.func.isRequired,
  lastLoading: PropTypes.string,
  transactionFullData: PropTypes.object,
  error: PropTypes.string,
};
