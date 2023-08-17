import successRegImage from "../images/success_registration.svg";
import failureRegImage from "../images/failure_registration.svg";

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    <div className={`popup popup_type_info-tooltip ${isOpen && 'popup_opened'}`}>
      <div className='popup__container popup__container_type_tooltip'>
        <button className="popup__button-close" type="button" aria-label="Закрыть форму" onClick={onClose}></button>
        <img className='popup__picture-tooltip' src={isSuccess ? successRegImage : failureRegImage}
          alt={isSuccess ? 'Успешно.' : 'Неудачно.'} />

        {isSuccess
          ? <>
            <p className='popup__title-tooltip'>Вы успешно</p>
            <p className='popup__title-tooltip'>зарегистрировались!</p>
          </>
          : <>
            <p className='popup__title-tooltip'>Что-то пошло не так!</p>
            <p className='popup__title-tooltip'>Попробуйте ещё раз.</p>
          </>
        }
      </div>
    </div>
  )
}

export default InfoTooltip;
