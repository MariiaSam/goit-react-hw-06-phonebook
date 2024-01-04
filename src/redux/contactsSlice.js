import { createSlice } from '@reduxjs/toolkit';

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { contacts: [] },
  reducer: {
    addContact(state, action) {
      state.contacts.push(action.payload);
    },
    deleteContact(state, action) {
      const idx = state.contacts.findIndex(
        contact => contact.id === action.payload
      );
      state.contacts.splice(idx, 1);
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
