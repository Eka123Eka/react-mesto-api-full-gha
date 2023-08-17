import { Link } from 'react-router-dom';

function Register({ name, title, buttonText, onSubmit, children }) {
  return (
    <div className='register'>
      <form className='register__form' name={name} onSubmit={onSubmit}>
        <h2 className='register__title'>{title}</h2>
        {children}
        <button className='register__button' type='submit' >{buttonText}</button>
        <p className='register__text-item'>
          Уже зарегистрированы?
          <span><Link className='register__link' to='/sign-in'> Войти</Link></span>
        </p>
      </form>
    </div>
  )
}

export default Register;

