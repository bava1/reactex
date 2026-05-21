import React, {Component} from 'react';
import User from './User';
import phoneBook from './users.js';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

export default class Contact extends Component {
    
    constructor () {
        super()
        this.state = {
          dispCont: phoneBook,
          searchQuery: ''
        }
    }

    handleInputChange = (event) => {
        let searchQuery = event.target.value.toLowerCase();
        let dispCont = phoneBook.filter(function(el){
            let searchVal = el.name.toLowerCase();
            return searchVal.indexOf(searchQuery) !== -1; 
        });
        
        this.setState({
            dispCont: dispCont,
            searchQuery: event.target.value
        })
        
    }

    clearSearch = () => {
        this.setState({
            dispCont: phoneBook,
            searchQuery: ''
        });
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
                        value={this.state.searchQuery}
                        onChange={this.handleInputChange}
                        InputProps={{
                            endAdornment: this.state.searchQuery ? (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="clear search"
                                        edge="end"
                                        onClick={this.clearSearch}
                                        size="small"
                                    >
                                        <ClearIcon fontSize="small" />
                                    </IconButton>
                                </InputAdornment>
                            ) : null
                        }}
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
