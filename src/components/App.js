import { useState, useMemo } from 'react';
import { useLocalStorage } from 'hooks/useLocalStorage';
import { ContactForm } from "./ContactForm/ContactForm";
import { Filter } from "./Filter/Filter";
import { ContactList } from "./ContactList/ContactList";
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout/Layout';
import { Container } from "./Container/Container";
import toast, { Toaster } from 'react-hot-toast';

export const App = () => {
  const [contacts, setContacts] = useLocalStorage("contacts", []);
  const [filter, setFilter] = useState("");

  const addContact = newContact => {
    contacts.some(contact => contact.name.toLowerCase() === newContact.name.toLowerCase())
      ? toast('This contact is already in your Phonebook!', { icon: '👻', })
      : setContacts(prevState => [...prevState, newContact]);
  };

  const deleteContact = contactId => {
    setContacts(prevState => prevState.filter(contact => contact.id !== contactId));
  };

  const changeFilter = event => {
    setFilter(prevState => event.target.value);
    const normalizedSearch = filter.toLowerCase();
    const searchContact = [...contacts];
    return searchContact.filter(contact => contact.name.toLowerCase().includes(normalizedSearch));
  };

  const searchContact = useMemo(() => {
    const normalizedSearch = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedSearch));
  }, [contacts, filter]);

  return (
    <Layout>
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />
        <h2>Contacts</h2>
        <Filter value={filter} onChange={changeFilter} />
        <ContactList contacts={searchContact} onDeleteContact={deleteContact} />
        <GlobalStyle />
        <Toaster position="top-center" />
      </Container>
    </Layout>
  )
}