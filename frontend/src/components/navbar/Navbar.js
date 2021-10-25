import './navbar.css';
import {Link} from 'react-router-dom';
import PersonIcon from '@material-ui/icons/Person';
import Logo from '../logo/Logo';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='container'>
        <div className='left'>
          <Logo />
          <nav>
            <ul className='menu'>
              <li>
                <Link to='/' className='link'>
                  Home
                </Link>
              </li>
              <li>
                <Link to='/favorites' className='link'>
                  Favorites
                </Link>
              </li>
              <li>
                <Link to='/friends' className='link'>
                  Friends
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className='right'>
          <nav>
            <ul className='menu'>
              <li>
                <Link to='/login' className='link'>
                  <PersonIcon className='personIcon' /> Login
                </Link>
              </li>
              <li>
                <Link to='/register' className='link'>
                  Register
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
