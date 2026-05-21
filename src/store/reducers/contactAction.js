const initialState = [
    "My home playlist",
    "My out playlist"  
];

export default function contactAction(state = initialState, action) {
	if(action.type === 'ADD_CONTACT') {
        return state;
	} else if(action.type === 'DELETE_CONTACT') {
        return state;
    }
	return state;
};
