import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import TransactionDetails from './TransactionDetails';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
    textTransform: 'capitalize',
  },
});

class ControlledExpansionPanels extends Component {
  render() {
    const {
      handleExpandChange,
      classes,
      transaction,
       expandedId,
       isLoading,
       transactionFullData,
    } = this.props;

    return (
      <div className={classes.root}>
        <ExpansionPanel expanded={transaction.id === expandedId} onChange={handleExpandChange}>
          <ExpansionPanelSummary expandIcon={f => f}>
            <Typography className={classes.heading}># {transaction.id}</Typography>
            <Typography className={classes.secondaryHeading}>{transaction.type}: {transaction.amount}</Typography>
          </ExpansionPanelSummary>
          <TransactionDetails isLoading={isLoading} transact={transactionFullData} />
        </ExpansionPanel>
      </div>
    );
  }
}

ControlledExpansionPanels.propTypes = {
  classes: PropTypes.object.isRequired,
  handleExpandChange: PropTypes.func.isRequired,
  expanded: PropTypes.number.isRequired,
  transaction: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  transactionFullData: PropTypes.object,
};

export default withStyles(styles)(ControlledExpansionPanels);
