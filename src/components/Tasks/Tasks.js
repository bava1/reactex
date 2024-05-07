import React, {Component} from 'react';
import './Tasks.css'
import tasksList from './taskList';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';

class Tasks extends Component {
  constructor(props) {
      super(props);
      this.state = {
        list: tasksList,
        text: ''
      }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.removeItem = this.removeItem.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    if(this.state.text) {
      this.setState(prevState => ({
        list: prevState.list.concat(this.state.text),
        text: ''
      }))
    }
  }
  
  handleChange(e) {
    this.setState({
      text: e.target.value
    })
  }
  
  removeItem(index) {
    const list = this.state.list;
    list.splice(index, 1);
    this.setState({ list });
  }

  render() {
    return (
      <div className="tasks">
        <h1>Tasks manager</h1>
        <div className="tasks-main">

          <form  onSubmit={this.handleSubmit}  className="tasks-main_form">
            <TextField
                id="outlined-basic"
                size="small"
                label="Add new task"
                value={this.state.text} 
                onChange={e => this.handleChange(e)}
                className="tasks-main_form-textinput"
            />

            <Button 
                variant="contained" 
                color="primary"
                type="submit"
                className="tasks-main_form-button">
                    Add task
            </Button>
          </form>
          <h3>My tasks</h3>
          <div className="tasks-main_tasks">
          
            {this.state.list.map((item, index) => {
              return (
                <div key={index} className="tasks-main_task">
                    <div className="tasks-main_task-text">
                        {item}
                    </div>
                    <div className="tasks-main_task-clear">
                        <ClearIcon onClick={() => this.removeItem(index)} />
                    </div>
                </div>)
            })}

          </div>
        </div>
      </div>
    )
  }
}
export default Tasks;

