import logo from "../images/logo.svg";
import { Link } from 'react-router-dom';

function Header({ children, textLink, ...rest }) {

  return (
    <header className="header" {...rest}>
      <img className="header__logo" src={logo} alt="Логотип сайта Mesto Russia." />
      <div className="header__group">
        {children}
        <Link className='header__link' {...rest}>{textLink}</Link>
      </div>
    </header>
  );
}

export default Header;
