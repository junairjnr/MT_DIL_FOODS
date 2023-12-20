import React, { useState } from 'react';

function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validation checks
    let formErrors = {};
    if (!name) {
      formErrors.name = 'Name is required';
    }
    if (!email) {
      formErrors.email = 'Email is required';
    }
    if (!message) {
      formErrors.message = 'Message is required';
    }
    setErrors(formErrors);

    // If there are no errors, submit the form
    if (Object.keys(formErrors).length === 0) {
      console.log('Form submitted');
    }
  }

  return (
    <div className='w-full'>

      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
          {errors.name && <p>{errors.name}</p>}
        </label>
        <br /> 
        <label>
          Email:
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
          {errors.email && <p>{errors.email}</p>}
        </label>
        <br />
        <label>
          Message:
          <textarea value={message} onChange={(event) => setMessage(event.target.value)} />
          {errors.message && <p>{errors.message}</p>}
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ContactForm;
