import { useState } from 'react';
import Header from './Header';
import Login from './Login';
import Register from './Register';

function AuthForm({ onSubmit, nameForm }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleChangeInput(e) {
    const { value } = e.target;
    e.target.name === 'Email'
      ? setEmail(value)
      : setPassword(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit({email, password});
  }

  return (
    nameForm === 'register'
      ? <>
        <Header to={'/signin'} textLink='Войти'></Header>
        <Register name='register' title='Регистрация' buttonText='Зарегистрироваться' onSubmit={handleSubmit}  >
          <input className='register__input' name='Email' type='email' minLength='5' maxLength='100'
            placeholder='Email' value={email || ''} required onChange={handleChangeInput} />
          <input className='register__input' name='Password' type='password' minLength='4' maxLength='100'
            placeholder='Пароль' value={password || ''} required onChange={handleChangeInput} />
        </Register>
      </>
      : <>
        <Header to={'/signup'} textLink='Регистрация'></Header>
        <Login name='login' title='Вход' buttonText='Войти' onSubmit={handleSubmit}  >
          <input className='register__input' name='Email' type='email' minLength='5' maxLength='100'
            placeholder='Email' value={email || ''} required onChange={handleChangeInput} />
          <input className='register__input' name='Password' type='password' minLength='4' maxLength='100'
            placeholder='Пароль' value={password || ''} required onChange={handleChangeInput} />
        </Login>
      </>
  )
}

export default AuthForm;
