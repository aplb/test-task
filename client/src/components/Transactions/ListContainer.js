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
  transactionsList: transactionListSelector(state),
  transaction: transactionSelector(state),
  isLoading: isLoadingSelector(state),
});

export default connect(mapStateToProps, {
  fetchTransactions,
  getTransaction,
})(List);
