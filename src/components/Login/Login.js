import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/UserContext';
import './Login.css';

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();

  // login and continue from exact page without going back to homepage - step 1
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        form.reset();
        // login and continue from exact page without going back to homepage - step 2 (step-3 in UserContext)
        navigate(from, { replace: true });
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="form-container">
      <h3 className="form-title">Log in</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" required />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" required />
        </div>
        <input type="submit" value="Login" className="btn-submit" />
      </form>
      <p>
        New to ema john? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Login;
