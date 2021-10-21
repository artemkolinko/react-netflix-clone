import './navbar.css';
import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='container'>
        <div className='left'>
          <img
            src='https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg'
            alt='netflix'
          />
          <span>Home</span>
          <span>Shows</span>
          <span>Favorites</span>
          <span>Friends</span>
        </div>
        <div className='right'>
          {/* <SearchIcon /> */}
          <PersonIcon />
          <span>log out</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
