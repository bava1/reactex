import { ADD_TASK, UPDATE_TASK } from '../actions/taskActions';
/*
const initialState = {
  tasks: []
};
*/


const initialState = {
  tasks: [
      {id: 1, text: "So be sure to follow these instructions. For instance, via Google Web Fonts"},
      {id: 2, text: "So be sure to follow these instructions. For instance, via Google Web Fonts"},
      {id: 3, text: "So be sure to follow these instructions. For instance, via Google Web Fonts"},
      {id: 4, text: "So be sure to follow these instructions. For instance, via Google Web Fonts"},
  ]
};


const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state, { id: Date.now(), text: action.payload.text }]
      };
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id ? { ...task, text: action.payload.text } : task
        )
      };
    default:
      return state;
  }
};

export default tasksReducer;
/// NEWWWWWWW