import { connect } from 'react-redux';
import List from './List';
import {
  fetchTransactions,
  getTransaction,
  transactionListSelector,
  transactionSelector,
  isLoadingSelector,
} from '../../ducks/transaction';

const mapStateToProps = state => ({
  transactionList: transactionListSelector(state),
  transaction: transactionSelector(state),
  isLoadingSelector: isLoadingSelector(state),
});

export default connect(mapStateToProps, {
  fetchTransactions,
  getTransaction,
})(List);
