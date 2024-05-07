const initialState = [
];

export default function tasksAction(state = initialState, action) {
	if(action.type === 'READ_TASK') {
		return [
			...state
			];
	} else if (action.type === 'ADD_TASK') {
		return [
			...state,
			action.payload
			];
	} else if (action.type === 'UPDATE_TASK') {
		const { index, newText } = action.payload;
		const updatedTasks = [...state];
		updatedTasks[index] = newText;
		return updatedTasks;
	}
	return state;
};
