import { createSelector } from "@reduxjs/toolkit";

export const selectContacts = state => state.contacts.contacts;
export const selectFilter = state => state.filter;

export const selectActiveContacts = createSelector([selectContacts, selectFilter],
    (contacts, filter) => {
        if (!Array.isArray(contacts)) {
            console.error("contacts is not an array:", contacts);
            return [];
        }

        const normalizedFilter = filter.toLowerCase();
        return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
    });



    //Результатом цього селектора - selectActiveContacts - є новий масив, який містить тільки контакти, які відповідають умові фільтрації 