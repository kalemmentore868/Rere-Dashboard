"use client"
import React, { useState } from 'react';
import './style.css';

interface FormData {
  email: string;
  subject: string;
  message: string;
}

function ContactForm() {
  const initialFormData: FormData = {
    email: '',
    subject: '',
    message: ''
  };
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({});
  const [successMessage, setSuccessMessage] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setFormErrors(prevErrors => ({
      ...prevErrors,
      [name]: value ? '' : `Please enter your ${name}.`
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Form validation
    const errors: Partial<FormData> = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value) {
        errors[key as keyof FormData] = `Please enter your ${key}.`;
      }
    });
    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const response = await fetch('/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        
        if (response.ok) {
          setSuccessMessage('Message sent successfully!');
          setFormData(initialFormData);
          setTimeout(() => {
            setSuccessMessage('');
          }, 5000);
        } else {
          console.error('Failed to submit contact form');
        }
      } catch (error) {
        console.error('Error submitting contact form:', error);
      }
    }
  };

  return (
    <div className="App">
      <h1>Contact Form</h1>
      {successMessage && <div className="success-message">{successMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label><br />
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          {formErrors.email && <div className="error-message">{formErrors.email}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subject:</label><br />
          <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
          {formErrors.subject && <div className="error-message">{formErrors.subject}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label><br />
          <textarea id="message" name="message" value={formData.message} onChange={handleChange} required />
          {formErrors.message && <div className="error-message">{formErrors.message}</div>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ContactForm;