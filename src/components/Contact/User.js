import React, {Component} from 'react';
import './contact.css';

export default class User extends Component {
    render() {
        return (  
            <div className="contact-main_tab">
                <div className="contact-main_tab-person">
                    <img className="contact-main_tab-person_img" src={this.props.img} alt="" />
                    <div className="contact-main_tab-person_name">
                        <h3>{this.props.name}</h3> 
                        <div>position: {this.props.position}</div>
                    </div>
                </div>
                <div className="contact-main_tab-contact">
                    <div>tel: {this.props.phone}</div>
                    <div>email: {this.props.email}</div>
                </div>
            </div>
        )
    }
}