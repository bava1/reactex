import React from 'react';
import PropTypes from 'prop-types';
import DateTime from './DateTime';
import './clock.css';


const Display = (props) => (
    <div className="display">  
        <div className="display-date">{DateTime.toDateString(props.date)}</div> 
        <div className="display-time">{DateTime.toTimeString(props.date)}</div><br className="display-time_br" />
    </div>
);

Display.defaultProps = {
    date: new Date(),
    isDateVisible: true
};

Display.propTypes = {
    date: PropTypes.object,
    isDateVisible: PropTypes.bool
};

export default Display;