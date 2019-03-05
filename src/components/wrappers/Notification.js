import React from 'react'
import { connect } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar';
import green from '@material-ui/core/colors/green';
import { withStyles } from '@material-ui/core/styles';
import { resetNotification } from '../../actions/notification';

const styles = theme => ({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.dark,
  },
  message: {
    fontSize: '16px',
  },
});

class Notification extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const response = nextProps.response;
    if (response.message && !prevState.open) {
      return ({ open: true });
    }
    if (!response.message && prevState.open) {
      return ({ open: false });
    }
    return null;
  }

  handleNotificationClose = () => {
    this.props.resetNotification();
  }

  render() {
    const { response, classes } = this.props;
    const { message } = response;

    return (
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        message={
          <span id="client-snackbar" className={classes.message}>
            {message}
          </span>
        }
        open={this.state.open}
        onClose={this.handleNotificationClose}
        autoHideDuration={5000}
      />
    );
  }
}

const mapStateToProps = ({ response }) => ({ response });

const mapDispatchToProps = (dispatch) => ({
  resetNotification: () => dispatch(resetNotification())
});

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Notification));
