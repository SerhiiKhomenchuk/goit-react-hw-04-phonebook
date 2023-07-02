import React, { useState } from 'react';

const ContactForm = ({ addContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = evt => {
    evt.preventDefault();

    addContact(name, number);
    reset();
  };
  const reset = () => {
    setName('');
    setNumber('');
  };

  const handleChange = evt => {
    const { name, value } = evt.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;

      default:
        break;
    }
  };

  return (
    <form
      className="border border-success-subtle p-5 rounded-1 border-2"
      onSubmit={handleSubmit}
    >
      <div className="mb-3">
        <label className="d-block">
          Name
          <div className="input-group input-group-lg">
            <input
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              className="form-control"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              value={name}
              onChange={handleChange}
            />
          </div>
        </label>
      </div>
      <div className="mb-3">
        <label className="d-block ">
          Number
          <div className="input-group input-group-lg">
            <input
              name="number"
              type="tel"
              className="form-control"
              pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
              value={number}
              onChange={handleChange}
            />
          </div>
        </label>
      </div>
      <button type="submit" className="btn btn-primary">
        Add contact
      </button>
    </form>
  );
};

export default ContactForm;
