import {useState} from 'react';
import {Link} from 'react-router-dom';
import './login.css';
import Logo from '../../components/logo/Logo';

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
        <Logo />

        <h1>Log in</h1>
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
            <button type='submit'>Log in</button>
          </div>
        </form>
        <p className='info'>
          New to Netflix?{' '}
          <Link to='/register' className='link'>
            <b>Register now</b>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
