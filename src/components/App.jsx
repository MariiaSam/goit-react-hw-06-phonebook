import { useSelector } from 'react-redux';
import { selectContacts } from '../redux/selectors';
import { selectActiveContacts } from '../redux/selectors';


import { Section } from './Section/Section';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactsTitle } from './ContactsTitle/ContactsTitle';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';


export const App = () => {

  const contacts = useSelector(selectContacts)
  const activeContacts = useSelector(selectActiveContacts)

  return (
    <div>
      <Section title="Phonebook">
        <ContactForm/>
        <ContactsTitle title="Contacts"></ContactsTitle>
        <Filter/>
        {contacts.length > 0 && activeContacts.length === 0 && (
          <p>No one found with that name</p>
        )}
        {contacts.length === 0 && (
          <p>Please add contact by click on "Add conctact" button</p>
        )}
        {contacts.length > 0 && <ContactList />}
      </Section>
    </div>
  );
}
