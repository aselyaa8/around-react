import logo from '../images/logo.svg';

function Header() {
    return (
        <header className="header">
            <img src={logo} alt="Around Kazakhstan" className="logo" />
        </header>);
}

export default Header;