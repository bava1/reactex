import React from 'react';
import { Link } from 'react-router-dom'
import './TemporaryDrawer.css';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import DraftsIcon from '@material-ui/icons/Drafts';
import OfflineBolt from '@material-ui/icons/OfflineBolt';
import ReorderIcon from '@material-ui/icons/Reorder';
import ArrowForwardIcon  from '@material-ui/icons/ArrowForward';
import AssessmentIcon  from '@material-ui/icons/Assessment';
import ViewListIcon  from '@material-ui/icons/ViewList';

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

class TemporaryDrawer extends React.Component {
  state = {
    top: false,
    left: false,
    bottom: false,
    right: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {

    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>

        <div className="draw">
          <div className="draw-header">
            <ArrowForwardIcon 
              className="draw-nav_main-close" 
              onClick={this.toggleDrawer('right', false)}
              />
          </div>
          <div className="draw-main">
            <HomeIcon /><Link 
              to='/' 
              className="draw-nav_main-link" 
              onClick={this.toggleDrawer('right', false)}>Home</Link><br /><br />
            <AssessmentIcon /><Link 
              to='/tasks' 
              className="draw-nav_main-link" 
              onClick={this.toggleDrawer('right', false)}>Tasks</Link><br /><br />
            <ViewListIcon /><Link 
              to='/articles' 
              className="draw-nav_main-link" 
              onClick={this.toggleDrawer('right', false)}>Articles</Link><br /><br />
            <OfflineBolt /><Link 
              to='/about' 
              className="draw-nav_main-link" 
              onClick={this.toggleDrawer('right', false)}>About</Link><br /><br />
            <DraftsIcon /><Link 
              to='/contact' 
              className="draw-nav_main-link" 
              onClick={this.toggleDrawer('right', false)}>Contacts</Link>
            </div>
        </div>

      </div>
    );


    return (
      <div>
        <Button 
          variant="contained" 
          color="primary" 
          className="draw-nav_button1"
          onClick={this.toggleDrawer('right', true)} >Menu</Button>

        <ReorderIcon 
          onClick={this.toggleDrawer('right', true)} 
          className="draw-nav_button2" />
        
        <Drawer styles={{width: '200px'}} anchor="right" open={this.state.right} onClose={this.toggleDrawer('right', false)}>
          <div
            tabIndex={0}
            role="button"
            onKeyDown={this.toggleDrawer('right', false)}>
            {sideList}
          </div>
        </Drawer>

      </div>
    );
  }
}

TemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TemporaryDrawer);