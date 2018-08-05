import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { totalSelector } from '../ducks/transaction';

const styles = {
  root: {
    flexGrow: 1,
  },
};

function HeaderAppBar(props) {
  const { classes, total } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="title" color="inherit">
            Transactions | total: {total}
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

HeaderAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  total: totalSelector(state),
});

export default compose(
  connect(mapStateToProps),
  withStyles(styles)
)(HeaderAppBar);
