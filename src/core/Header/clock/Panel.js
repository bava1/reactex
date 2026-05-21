import React from 'react';
import PropTypes from 'prop-types';
import './clock.css';


const Panel = (props) => {
    return (
        <div className="container">

        </div>
    );
};

Panel.defaultProps = {
    dateOn: true,
    toggleDate: () => {},
};

Panel.propTypes = {
    dateOn: PropTypes.bool,
    toggleDate: PropTypes.func
};

export default Panel;