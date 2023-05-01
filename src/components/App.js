import { useState, useEffect } from 'react';
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


  // componentDidMount() {
  //   const savedContacts = localStorage.getItem("contacts");
  //   if (savedContacts !== null) {
  //     this.setState({ contacts: JSON.parse(savedContacts) });
  //   }
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.contacts !== this.state.contacts) {
  //     localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
  //   }
  // }

  const addContact = newContact => {
    contacts.some(contact => contact.name.toLowerCase() === newContact.name.toLowerCase())
      ? toast('This contact is already in your Phonebook!', { icon: '👻', })
      : setContacts(prevState => [...prevState, newContact]);
  };

  const deleteContact = contactId => {
    setContacts(prevState => prevState.filter(contact => contact.id !== contactId));
  };

  // changeFilter = event => {
  //   this.setState({ filter: event.target.value });
  // };

  // getSearchContact = () => {
  //   const { filter, contacts } = this.state;
  //   const normalizedSearch = filter.toLowerCase();
  //   return contacts.filter(contact =>
  //     contact.name.toLowerCase().includes(normalizedSearch));
  // };

  return (
    <Layout>
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={addContact} />
        <h2>Contacts</h2>
        <Filter value={filter} />
        <ContactList contacts={contacts} onDeleteContact={deleteContact} />
        <GlobalStyle />
        <Toaster position="top-center" />
      </Container>
    </Layout>
  )
}

// onChange={changeFilter}
// onDeleteContact={deleteContact}