import {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';

import './register.css';

import Logo from '../../components/logo/Logo';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const history = useHistory();

  const emailHandler = (e) => {
    const {value} = e.target;
    setEmail(value);
  };

  const passwordHandler = (e) => {
    const {value} = e.target;
    setPassword(value);
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    const user = {email, password};
    try {
      const res = await axios.post('/auth/register', user);
      history.push('/login');
    } catch (err) {
      const {email} = err.response.data.message;
      email ? setError(email) : setError('Error');
    }
  };

  return (
    <div className='wrapper'>
      <div className='register'>
        <Logo />
        <h1>Register</h1>
        <form onSubmit={registerHandler}>
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
            <button type='submit'>Register</button>
          </div>
        </form>
        <p className='info'>
          Already registered?{' '}
          <Link to='/login' className='link'>
            <b>Log in now</b>
          </Link>
        </p>
        {error && <Alert severity='error'>{error}</Alert>}
      </div>
    </div>
  );
};

export default Register;
