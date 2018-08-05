import debit from '@material-ui/core/colors/lightGreen';
import credit from '@material-ui/core/colors/red';

export const getPrimaryTransactionColor = transact => transact.type === 'debit' ?
  debit[100] : credit[100]

export const getSecondaryTransactionColor = transact => transact.type === 'debit' ?
  debit[50] : credit[50]
