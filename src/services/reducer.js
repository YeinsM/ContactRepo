// Redux... more efficiently state management for app
const reducer = (state, action) => {
    switch (action.type) {
      // Get state request
      case 'GET_CONTACTS_REQUEST':
        return {
          ...state,
          isLoading: true,
          error: null,
        };
      // Get success state
      case 'GET_CONTACTS_SUCCESS':
        return {
          ...state,
          isLoading: false,
          contacts: action.payload,
        };
      // Get error state
      case 'GET_CONTACTS_FAILURE':
        return {
          ...state,
          isLoading: false,
          error: action.payload,
        };
      // Post success state
      case 'ADD_CONTACT_SUCCESS':
        return {
          ...state,
          contacts: [...state.contacts, action.payload],
        };
      // Edit success state
      case 'UPDATE_CONTACT_SUCCESS':
        const updatedContatIndex = state.contacts.findIndex(contact => contact.id === action.payload.id);
        if (updatedContatIndex === -1) {
          return state;
        }
        const updatedContacts = [...state.contacts];
        updatedContacts.splice(updatedContatIndex, 1, action.payload);
        return {
          ...state,
          contacts: updatedContacts,
        };
      // Delete success state
      case 'DELETE_CONTACT_SUCCESS':
        return {
          ...state,
          contacts: state.contacts.filter(contact => contact.id !== action.payload),
        };
      default:
        return state;
    }
  };
  
  export default reducer;
  