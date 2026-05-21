import React, { Component } from 'react';
import './Tasks.css';
import tasksList from './TaskList';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: tasksList,
      text: '',
      editingIndex: null,
      editingText: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.startEdit = this.startEdit.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
    this.saveEdit = this.saveEdit.bind(this);
    this.handleEditChange = this.handleEditChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const newTask = this.state.text.trim();

    if (newTask) {
      this.setState((prevState) => ({
        list: [newTask, ...prevState.list],
        text: ''
      }));
    }
  }

  handleChange(e) {
    this.setState({
      text: e.target.value
    });
  }

  handleEditChange(e) {
    this.setState({
      editingText: e.target.value
    });
  }

  startEdit(index) {
    this.setState((prevState) => ({
      editingIndex: index,
      editingText: prevState.list[index]
    }));
  }

  cancelEdit() {
    this.setState({
      editingIndex: null,
      editingText: ''
    });
  }

  saveEdit() {
    const { editingIndex, editingText } = this.state;
    const normalizedText = editingText.trim();

    if (editingIndex === null || !normalizedText) {
      return;
    }

    this.setState((prevState) => ({
      list: prevState.list.map((item, index) => {
        if (index === editingIndex) {
          return normalizedText;
        }
        return item;
      }),
      editingIndex: null,
      editingText: ''
    }));
  }

  removeItem(index) {
    this.setState((prevState) => {
      const updatedList = prevState.list.filter((_, itemIndex) => itemIndex !== index);
      const { editingIndex } = prevState;

      if (editingIndex === null) {
        return { list: updatedList };
      }

      if (editingIndex === index) {
        return {
          list: updatedList,
          editingIndex: null,
          editingText: ''
        };
      }

      if (editingIndex > index) {
        return {
          list: updatedList,
          editingIndex: editingIndex - 1
        };
      }

      return { list: updatedList };
    });
  }

  renderTaskItem(item, index) {
    const isEditing = this.state.editingIndex === index;

    return (
      <div key={`${item}-${index}`} className="tasks-main_task">
        {isEditing ? (
          <TextField
            size="small"
            value={this.state.editingText}
            onChange={this.handleEditChange}
            className="tasks-main_task-editinput"
            autoFocus
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                this.saveEdit();
              }
              if (event.key === 'Escape') {
                this.cancelEdit();
              }
            }}
          />
        ) : (
          <div className="tasks-main_task-text">{item}</div>
        )}

        <div className="tasks-main_task-actions">
          {isEditing ? (
            <>
              <IconButton
                size="small"
                className="task-action task-action-save"
                onClick={this.saveEdit}
                aria-label="save task"
              >
                <CheckIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                className="task-action task-action-cancel"
                onClick={this.cancelEdit}
                aria-label="cancel edit"
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton
                size="small"
                className="task-action task-action-edit"
                onClick={() => this.startEdit(index)}
                aria-label="edit task"
              >
                <EditOutlinedIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                className="task-action task-action-delete"
                onClick={() => this.removeItem(index)}
                aria-label="delete task"
              >
                <DeleteOutlineIcon fontSize="small" />
              </IconButton>
            </>
          )}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="tasks">
        <div className="tasks-shell">
          <h1>Tasks manager</h1>
          <div className="tasks-main">
            <form onSubmit={this.handleSubmit} className="tasks-main_form">
              <TextField
                id="outlined-basic"
                size="small"
                label="Add new task"
                value={this.state.text}
                onChange={this.handleChange}
                className="tasks-main_form-textinput"
              />

              <Button
                variant="contained"
                color="primary"
                type="submit"
                className="tasks-main_form-button"
              >
                Add task
              </Button>
            </form>

            <div className="tasks-main_headline">
              <h3>My tasks</h3>
              <span className="tasks-main_counter">{this.state.list.length}</span>
            </div>

            <div className="tasks-main_tasks">
              {this.state.list.length === 0 ? (
                <div className="tasks-main_empty">No tasks yet. Add your first one.</div>
              ) : (
                this.state.list.map((item, index) => this.renderTaskItem(item, index))
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Tasks;
