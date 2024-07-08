import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './Login.css';

const apiUrl = 'http://localhost:5000'; // Update this to match your Flask server port

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(6, 'Password too short').required('Required'),
});

const SignupSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  username: Yup.string().required('Required'),
  password: Yup.string().min(6, 'Password too short').required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});

const Login = () => {
  const [showSignupForm, setShowSignupForm] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(`${apiUrl}/login`, values);
      setMessage(response.data.message);
      if (response.status === 200) {
        // Successful login
        localStorage.setItem('token', response.data.token); // Store token in localStorage
        setTimeout(() => {
          navigate('/'); // Redirect to properties page
        }, 1500);
      }
    } catch (error) {
      setMessage(error.response.data.message || 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignupSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(`${apiUrl}/signup`, values);
      setMessage(response.data.message);
      if (response.status === 201) {
        // Successful signup
        setTimeout(() => {
          setShowSignupForm(false);
        }, 1500);
      }
    } catch (error) {
      setMessage(error.response.data.message || 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login">
      <div className="form">
        <span>{showSignupForm ? 'Sign Up' : 'Login'}</span>
        {message && <div className="message">{message}</div>}
        <Formik
          initialValues={{
            email: '',
            password: '',
            username: '',
            confirmPassword: '',
          }}
          validationSchema={showSignupForm ? SignupSchema : LoginSchema}
          onSubmit={showSignupForm ? handleSignupSubmit : handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field type="email" name="email" placeholder="Email" className="form-control" />
              <ErrorMessage name="email" component="div" className="text-danger" />

              {showSignupForm && (
                <>
                  <Field type="text" name="username" placeholder="Username" className="form-control" />
                  <ErrorMessage name="username" component="div" className="text-danger" />
                </>
              )}

              <Field type="password" name="password" placeholder="Password" className="form-control" />
              <ErrorMessage name="password" component="div" className="text-danger" />

              {showSignupForm && (
                <>
                  <Field type="password" name="confirmPassword" placeholder="Confirm Password" className="form-control" />
                  <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                </>
              )}

              <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                {showSignupForm ? 'Sign Up' : 'Login'}
              </button>
            </Form>
          )}
        </Formik>
        <p>
          {showSignupForm ? (
            <>
              Already have an account?{' '}
              <button onClick={() => setShowSignupForm(false)} className="btn btn-link">
                Log In
              </button>
            </>
          ) : (
            <>
              Don't have an account?{' '}
              <button onClick={() => setShowSignupForm(true)} className="btn btn-link">
                Sign Up
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;
