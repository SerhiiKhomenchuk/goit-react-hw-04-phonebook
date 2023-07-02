import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import ContactForm from './ContactForm/ContactForm';
import Filter from './Filter/Filter';
import ContactList from './ContactList/ContactList';

const LS_KEY = 'phone_contacts';

const App = () => {
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem(LS_KEY)) || []
  );
  const [filter, setFilter] = useState('');

  // useEffect(() => {
  //   console.log('firs mount');
  //   setContacts(JSON.parse(localStorage.getItem(LS_KEY)) || []);
  // }, []);

  useEffect(() => {
    contacts && localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const isNameMatched = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (isNameMatched) {
      alert(`${name} is already in contacts `);
      return;
    }
    const contactObj = { name, number, id: nanoid() };
    setContacts(prevState => [contactObj, ...prevState]);
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
    return;
  };

  const changeFilter = evt => {
    setFilter(evt.currentTarget.value);
  };

  const dedeleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
    localStorage.setItem(LS_KEY, JSON.stringify(contacts));
  };

  const cleanFilter = () => {
    setFilter('');
  };

  const normalizedFilter = filter.toLowerCase();
  const visibleContact = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <>
      <div className="d-flex flex-column mb-3 p-5 container-sm">
        <h1>Phonebook</h1>
        <ContactForm addContact={addContact} />
        <h2>Contacts</h2>
        <Filter
          value={filter}
          onChange={changeFilter}
          cleanFilter={cleanFilter}
        />
        <ContactList
          filter={filter}
          onChange={changeFilter}
          visibleContact={visibleContact}
          deleteContact={dedeleteContact}
        />
      </div>
    </>
  );
};

export default App;
