import React from 'react'
import './DriwerRight.css'
import { Link } from 'react-router-dom'
import DraftsRoundedIcon from '@mui/icons-material/DraftsRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';
import OfflineBoltRoundedIcon from '@mui/icons-material/OfflineBoltRounded';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import ChecklistIcon from '@mui/icons-material/Checklist';
import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import HomeIcon from '@mui/icons-material/Home';
import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import  MenuRoundedIcon from '@mui/icons-material/Menu';

const DriwerRight = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  return (
    <div>
      <Button onClick={toggleDrawer(true)}>
          <div>
              <MenuRoundedIcon className="draw--nav_btn" />
          </div>
      </Button>
      <Drawer classes={{ width: 250 }}  anchor="right" open={open} onClose={toggleDrawer(false)}>
        <div className="draw">
          <div className="draw-header">
            <ArrowForwardRoundedIcon
              className="draw-nav_main-close" 
              onClick={toggleDrawer(false)}
              />
          </div>
          <div className="draw-main">
            <HomeIcon /><Link to='/' onClick={toggleDrawer(false)} className="draw-nav_main-link" >Home</Link><br /><br />
            <AddToPhotosIcon /><Link to='/tasks' onClick={toggleDrawer(false)} className="draw-nav_main-link" >Tasks</Link><br /><br />
            <ViewListRoundedIcon /><Link to='/articles' onClick={toggleDrawer(false)} className="draw-nav_main-link" >Articles</Link><br /><br />
            <OfflineBoltRoundedIcon /><Link to='/about' onClick={toggleDrawer(false)} className="draw-nav_main-link" >About Us</Link><br /><br />
            <AssignmentTurnedInIcon /><Link to='/projects' onClick={toggleDrawer(false)} className="draw-nav_main-link" >Projects</Link><br /><br />
            <DraftsRoundedIcon /><Link to='/contact' onClick={toggleDrawer(false)} className="draw-nav_main-link" >Contacts</Link>
          </div>
        </div>
      </Drawer>
    </div>
  )
}

export default DriwerRight
