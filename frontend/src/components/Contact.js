import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, Form as BootstrapForm } from 'react-bootstrap';
import './Contact.css'; // Import the custom CSS file

const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <Formik
        initialValues={{ username: '', email: '', message: '' }}
        validationSchema={Yup.object({
          username: Yup.string().required('Username is required'),
          email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
          message: Yup.string().required('Message is required'),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form as={BootstrapForm} className="contact-form">
          <BootstrapForm.Group>
            <BootstrapForm.Label>Username</BootstrapForm.Label>
            <Field
              className="form-control"
              name="username"
              type="text"
              placeholder="Enter username"
            />
            <ErrorMessage name="username" component="div" className="text-danger" />
          </BootstrapForm.Group>

          <BootstrapForm.Group>
            <BootstrapForm.Label>Email Address</BootstrapForm.Label>
            <Field
              className="form-control"
              name="email"
              type="email"
              placeholder="Enter email"
            />
            <ErrorMessage name="email" component="div" className="text-danger" />
          </BootstrapForm.Group>

          <BootstrapForm.Group>
            <BootstrapForm.Label>Message</BootstrapForm.Label>
            <Field
              className="form-control"
              name="message"
              as="textarea"
              rows="4"
              placeholder="Enter your message"
            />
            <ErrorMessage name="message" component="div" className="text-danger" />
          </BootstrapForm.Group>

          <Button variant="primary" type="submit" className="contact-submit">
            Send
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default Contact;
