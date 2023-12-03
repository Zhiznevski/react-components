import { NavLink } from 'react-router-dom';
import {
  HOME_ROUTE,
  REACT_HOOK_FORM_ROUTE,
  UNCONTROLED_FORM_ROUTE,
} from '../../constants/constants';
import './Header.css';

function Header() {
  return (
    <header>
      <nav>
        <ul className="list">
          <li>
            <NavLink to={HOME_ROUTE}>Home</NavLink>
          </li>
          <li>
            <NavLink to={UNCONTROLED_FORM_ROUTE}>Uncontrolled Form</NavLink>
          </li>
          <li>
            <NavLink to={REACT_HOOK_FORM_ROUTE}>React-hook-form</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
