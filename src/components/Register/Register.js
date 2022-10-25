import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';
import './register.css';

const Register = () => {
  const [error, setError] = useState(null);
  const { createUser } = useContext(AuthContext);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirm = form.confirm.value;

    if (password.length < 6) {
      setError('password should be at least 6 charecter');
      return;
    }
    if (password !== confirm) {
      setError('Use the same password');
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        form.reset();
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <div className="form-container">
        <h3 className="form-title">Register</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" required />
          </div>
          <div className="form-control">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" required />
          </div>
          <div className="form-control">
            <label htmlFor="confirm">Confirm Password</label>
            <input type="password" name="confirm" required />
          </div>
          <input type="submit" value="Register" className="btn-submit" />
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link> here
        </p>
        <p className="text-error">{error}</p>
      </div>
    </div>
  );
};

export default Register;
