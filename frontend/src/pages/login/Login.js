import {useState, useContext} from 'react';
import {Link} from 'react-router-dom';
import './login.css';
import Logo from '../../components/logo/Logo';
import {AuthContext} from '../../authContext/AuthContext';
import {login} from '../../authContext/apiCalls';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {isFetching, dispatch} = useContext(AuthContext);

  const emailHandler = (e) => {
    const {value} = e.target;
    setEmail(value);
  };

  const passwordHandler = (e) => {
    const {value} = e.target;
    setPassword(value);
  };

  const loginHandler = (e) => {
    e.preventDefault();
    login(user, dispatch);
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
              autoComplete='username'
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
              onChange={passwordHandler}
            />
          </div>
          <div>
            <button type='submit' disabled={isFetching}>
              Log in
            </button>
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
