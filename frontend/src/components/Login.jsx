function Login({ name, title, buttonText, onSubmit, children }) {
  return (
    <div className='register'>
      <form className='register__form' name={name} onSubmit={onSubmit}>
        <h2 className='register__title'>{title}</h2>
        {children}
        <button className='register__button' type='submit' >{buttonText}</button>
        <p className='register__text-item'></p>
      </form>
    </div>
  )
}

export default Login;

