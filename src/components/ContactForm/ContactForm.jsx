import { Formik } from 'formik';
import { object, string } from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { selectContacts } from '../../redux/selectors';
import { nanoid } from 'nanoid';
import { Report } from 'notiflix/build/notiflix-report-aio';

import {
  FormStyled,
  FieldStyled,
  Message,
  Label,
  Button,
} from './ContactForm.styled';
import { addContact } from '../../redux/contactsSlice';

const schema = object().shape({
  name: string()
    .trim()
    .matches(/^[a-zA-Z\s]+$/, 'Invalid name format')
    .required('This field is required'),
  number: string()
    .trim()
    .matches(
      /^[^a-zA-Z]*\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}[^a-zA-Z]*$/,
      'Invalid phone number format'
    )
    .required('This field is required'),
});

export const ContactForm = () => {
  const contacts = useSelector(selectContacts);
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      validationSchema={schema}
      onSubmit={({ name, number }, actions) => {
        if (
          contacts.find(
            ({ name: oldName }) => oldName.toLowerCase() === name.toLowerCase()
          )
        ) {
          Report.success(
            'Notiflix Success',
            `${name} is already in contacts`,
            'Okay'
          );
          actions.resetForm();
          return;
        }
        if (
          contacts.find(
            ({ number: oldNumber }) =>
              oldNumber.toLowerCase() === number.toLowerCase()
          )
        ) {
          Report.success(
            'Notiflix Success',
            `${number} is already in contacts`,
            'Okay'
          );
          actions.resetForm();
          return;
        }
        Report.success(
          'Notiflix Success',
          `${name} added to your contact list`,
          'Okay'
        );

        dispatch(addContact({ name, number, id: nanoid() }));
        actions.resetForm();
      }}
    >
      <FormStyled>
        <div>
          <Label htmlFor="name">Please, enter name</Label>

          <FieldStyled type="text" name="name" placeholder=" " />
          <Message name="name" component="div"></Message>
        </div>
        <div>
          <Label htmlFor="name">Please, enter number</Label>

          <FieldStyled type="text" name="number" placeholder=" " />
          <Message name="number" component="div"></Message>
        </div>
        <Button type="submit">Add contact</Button>
      </FormStyled>
    </Formik>
  );
};
