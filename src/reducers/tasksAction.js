const initialState = [
	"So be sure to follow these instructions. For instance, via Google Web Fonts",
	"In order to use the font Icon component you must first add the Material icons font.",
	"The one Material components work in isolation.",
	"Material-UI was designed with the Roboto font in mind. So be sure to follow these instructions. For instance, via Google Web Fonts",
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
