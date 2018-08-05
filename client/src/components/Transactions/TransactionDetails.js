import React from 'react';
import PropTypes from 'prop-types';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Loader from '../Loader';

const TransactionDetails = ({ transact, isLoading }) => {
  if (isLoading) {
    return (<Loader />);
  }

  return (<ExpansionPanelDetails>
    <Typography>
      Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
      maximus est, id dignissim quam.
    </Typography>
  </ExpansionPanelDetails>);
};

TransactionDetails.propTypes = {
  transact: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default TransactionDetails;
