import React from 'react';
import PropTypes from 'prop-types';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Loader from '../Loader';
// import moment from 'momentjs'

const TransactionDetails = ({ transact, isLoading, bgColor }) => {
  if (isLoading) {
    return (<Loader />);
  }
  if (!transact) {
    return null;
  }

  return (
    <ExpansionPanelDetails style={{ flexDirection: 'column', backgroundColor: bgColor }}>
      <Typography>Type: {transact.type}</Typography>
      <Typography>Amount: {transact.amount}</Typography>
      <Typography>Date: {transact.effectiveDate}</Typography>
    </ExpansionPanelDetails>
  );
};

TransactionDetails.propTypes = {
  transact: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  bgColor: PropTypes.string.isRequired,
};

export default TransactionDetails;
