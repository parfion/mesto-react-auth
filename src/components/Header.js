import Vector from '../images/Vector.svg';
import { Routes, Route, Link } from 'react-router-dom';

function Header({email, onExit}) {
	return (
		<header className="header">
			<img className="header__logo" alt="Логотип" src={Vector} />
      <div className="header__info">
        {email ? email : ""}
			  <Routes>
          <Route path="signup" element={<Link to="/signin" className="header__link">Войти</Link>} />
          <Route path="signin" element={<Link to="/signup" className="header__link">Регистрация</Link>} />
          <Route path="/" element={<Link to="/signin" className="header__link header__link-out" onClick={onExit}>Выйти</Link>} />
			  </Routes>
      </div>
			
		</header>
	)
};

export default Header;