import { connect } from 'react-redux';
import List from './List';
import {
  fetchTransactions,
  getTransaction,
  transactionListSelector,
  transactionSelector,
  isLoadingSelector,
  lastLoadingSelector,
  getErrorSelector,
} from '../../ducks/transaction';

const mapStateToProps = state => ({
  transactionsList: transactionListSelector(state),
  transaction: transactionSelector(state),
  isLoading: isLoadingSelector(state),
  lastLoading: lastLoadingSelector(state),
  transactionFullData: transactionSelector(state),
  error: getErrorSelector(state),
});

export default connect(mapStateToProps, {
  fetchTransactions,
  getTransaction,
})(List);
