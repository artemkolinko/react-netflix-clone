import {useState} from 'react';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailHandler = (e) => {
    const {value} = e.target;
    setEmail(value);
  };

  const passwordHandler = (e) => {
    const {value} = e.target;
    setPassword(value);
  };

  const loginHandler = (e) => {
    const credentials = {email, password};
    console.log(credentials);
    e.preventDefault();
  };

  return (
    <div className='wrapper'>
      <div className='login'>
        <h1>Login</h1>
        <form onSubmit={loginHandler}>
          <div>
            <label htmlFor='email'>Email</label>
            <input
              type='email'
              name='email'
              id='email'
              placeholder='Enter your email'
              required
              autoComplete='off'
              value={email}
              onChange={emailHandler}
            />
          </div>
          <div>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              id='password'
              placeholder='Enter your password'
              required
              minLength='6'
              maxLength='20'
              autoComplete='new-password'
              value={password}
              onChange={passwordHandler}
            />
          </div>
          <div>
            <button type='submit'>Login</button>
          </div>
        </form>
        <p className='info'>
          New to Netflix? <b>Register now</b>
        </p>
      </div>
    </div>
  );
};

export default Login;
