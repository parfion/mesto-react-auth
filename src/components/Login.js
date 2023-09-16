import { useState} from "react";

function Login({ onLogin }) {
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
    onLogin({ email, password })
  }
	return (
		<div className="register">
			<h2 className="register__name">Вход</h2>
				<form className="register__form" onSubmit={handleSubmit}>
					<input 
            className="register__input" 
            type="text" 
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}>
          </input>
					<input 
            className="register__input" 
            type="text" 
            placeholder="Пароль"
            value={password}
            onChange={handlePasswordChange}>
          </input>
					<button className="register__form-submit" type="text">Войти</button>
			</form>
		</div>
	)
}
  
export default Login;