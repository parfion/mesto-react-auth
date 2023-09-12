import Vector from '../images/Vector.svg';

function Header() {
	return (
		<header className="header">
			<img className="header__logo" alt="Логотип" src={Vector} />
		</header>
	)
};

export default Header;