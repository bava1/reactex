import React, {Component} from 'react';
import User from './User';
import phoneBook from './users.js';
import TextField from '@mui/material/TextField';

export default class Contact extends Component {
    
    constructor () {
        super()
        this.state = {
          dispCont: phoneBook
        }
    }

    handleInputChange = (event) => {
        let searchQuery = event.target.value.toLowerCase();
        let dispCont = phoneBook.filter(function(el){
            let searchVal = el.name.toLowerCase();
            return searchVal.indexOf(searchQuery) !== -1; 
        });
        
        this.setState({
            dispCont: dispCont
        })
        
    }
    
    render() {
        return (
            <section className="contact">
                <h1>My Contacts</h1>
                <div className="contact-main">
    
                    <form className="contact-main_form">
                        <TextField
                        id="standard-name"
                        type="text"
                        label="Contact search"
                        className="contact-main_form-textinput"
                        onChange={this.handleInputChange}
                        />
                    </form>

                    {this.state.dispCont.map(function(el){
                    return <User 
                        key={el.id} 
                        img={el.img} 
                        name={el.name} 
                        phone={el.phone}
                        position={el.position} 
                        email={el.email} 
                        />
                    })}    
                </div>
            </section>
        )
    }

};
