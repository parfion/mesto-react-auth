import { Link } from 'react-router-dom';
import { useState} from "react";

const Register = ({ onRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  };

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    onRegister({ email, password })
  }

  return (
    <div className="register">
      <h2 className="register__name">Регистрация</h2>
        <form className="register__form" onSubmit={handleSubmit}>
          <input 
            minLength="6"
            maxLength="70"
            className="register__input" 
            type="text" 
            placeholder="Email" 
            value={email}
            onChange={handleEmailChange}>
          </input>
          <input 
            minLength="4"
            maxLength="50"
            className="register__input" 
            type="text" 
            placeholder="Пароль" 
            value={password}
            onChange={handlePasswordChange}>
          </input>
          <button className="register__form-submit" type="text">Зарегистрироваться</button>
      </form>
      <p className="register__yet">Уже зарегистрированы? <Link to="/signin" className="register__link">Войти</Link></p>
    </div>
  )
}

export default Register;