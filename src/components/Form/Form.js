import { useEffect, useReducer, useRef } from "react";
import styles from './Form.module.css'
import Error from './Error'

const initialState = {
    username: '',
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvc: '',
    usernameIsValid: null,
    cardNumberIsValid: null,
    expMonthIsValid: null,
    expYearIsValid: null,
    cvcIsValid: null,
}

const formatNumber = (number) =>
    number.split("").reduce((previousValue, currentValue, currentIndex) => {
        if (currentIndex !== 0 && (currentIndex % 4 === 0)) {
            previousValue += " ";
        }
        return previousValue + currentValue
    }, '');



const formReducer = (state, action) => {
    switch (action.type) {
        case 'usernameInput': {
            return {
                ...state, username: action.value,
                usernameIsValid: action.value.length > 0
            }
        }
        case 'cardNumber': {
            const value = formatNumber(action.value.replace(/\D/g, ''))
            return {
                ...state, cardNumber: value,
                cardNumberIsValid: value.length === 19 || null
            }
        }
        case 'expMonth': {
            let value = action.value.replace(/\D/g, '')
            if (parseInt(value) > 12) {
                value = ''
            }
            return {
                ...state, expMonth: value,
                expMonthIsValid: value > 0 || null
            }
        }
        case 'expYear': {
            let value = action.value.replace(/\D/g, '')
            return {
                ...state, expYear: value,
                expYearIsValid: (parseInt(value) > 0 && value.length === 2) || null
            }
        }
        case 'cvc': {
            return {
                ...state, cvc: action.value.replace(/\D/g, ''),
                cvcIsValid: action.value.length === 3 || null
            }
        }
        case 'validate-username': {
            return {
                ...state, usernameIsValid: (state.username.length > 0)
            }
        }
        case 'validate-cardNumber': {
            return {
                ...state, cardNumberIsValid: (state.cardNumber.length === 19)
            }
        }
        case 'validate-expMonth': {
            return {
                ...state, expMonthIsValid: (state.expMonth > 0 && state.expMonth <= 12)
            }
        }
        case 'validate-expYear': {
            return {
                ...state, expYearIsValid: (state.expYear > 0 && state.expYear.length === 2)
            }
        }
        case 'validate-cvc': {
            return {
                ...state, cvcIsValid: (state.cvc > 0 && state.cvc.length === 3)
            }
        }
        default:
            return state;
    }
}

const Form = props => {

    const [formState, dispatchFormAction] = useReducer(formReducer, initialState)
    const usernameInputRef = useRef()
    const cardNumberInputRef = useRef()
    const expMonthInputRef = useRef()
    const expYearInputRef = useRef()
    const cvcInputRef = useRef()

    const usernameChangeHandler = () => {
        console.log('username changed')
        dispatchFormAction({ type: 'usernameInput', value: usernameInputRef.current.value })
    }

    const cardNumberChangeHandler = () => {
        console.log('cardnumber changed')
        dispatchFormAction({ type: 'cardNumber', value: cardNumberInputRef.current.value })
    }

    const expMonthChangeHandler = () => {
        dispatchFormAction({ type: 'expMonth', value: expMonthInputRef.current.value })
    }

    const expYearChangeHandler = () => {
        dispatchFormAction({ type: 'expYear', value: expYearInputRef.current.value })
    }

    const cvcChangeHandler = () => {
        dispatchFormAction({ type: 'cvc', value: cvcInputRef.current.value })
    }

    const handleBlur = (event) => {
        dispatchFormAction({ type: `validate-${event.target.id}` })
    }


    const formSubmitHandler = event => {
        event.preventDefault()
        if (!formState.usernameIsValid) {
            return usernameInputRef.current.focus()
        }
        if (!formState.cardNumberIsValid) {
            return cardNumberInputRef.current.focus()
        }
        if (!formState.expMonthIsValid) {
            return expMonthInputRef.current.focus()
        }
        if (!formState.expYearIsValid) {
            return expYearInputRef.current.focus()
        }
        if (!formState.cvcIsValid) {
            return cvcInputRef.current.focus()
        }
        props.onCompletion(true)

    }

    useEffect(
        () => {
            props.submitData(formState)
        }, [formState, props]
    );

    return (
        <form onSubmit={formSubmitHandler} className={styles.form}>
            <div>
                <label htmlFor="username">cardholder name</label>
                <input
                    className={formState.usernameIsValid === false && styles.error}
                    ref={usernameInputRef}
                    type="text"
                    id="username"
                    maxLength="30"
                    onChange={usernameChangeHandler}
                    onBlur={handleBlur}
                    value={formState.username}
                    placeholder="e.g. Jane Appleseed"
                />
                <Error isValid={formState.usernameIsValid} />
            </div>
            <div>
                <label htmlFor="cardNumber">card number</label>
                <input
                    className={formState.cardNumberIsValid === false && styles.error}
                    ref={cardNumberInputRef}
                    type="text"
                    id="cardNumber"
                    maxLength="19"
                    onChange={cardNumberChangeHandler}
                    onBlur={handleBlur}
                    value={formState.cardNumber}
                    placeholder="e.g. 1234 5678 9123 0000"
                />
                <Error isValid={formState.cardNumberIsValid} />
            </div>
            <div>
                <label htmlFor="expMonth">Expiry date</label>
                <div>
                    <input
                        className={formState.expMonthIsValid === false && styles.error}
                        ref={expMonthInputRef}
                        type="text"
                        id="expMonth"
                        maxLength="2"
                        onChange={expMonthChangeHandler}
                        onBlur={handleBlur}
                        value={formState.expMonth}
                        placeholder="MM"
                    />
                    <input
                        className={formState.expYearIsValid === false && styles.error}
                        ref={expYearInputRef}
                        type="text"
                        id="expYear"
                        maxLength="2"
                        onChange={expYearChangeHandler}
                        onBlur={handleBlur}
                        value={formState.expYear}
                        placeholder="YY"
                    />
                </div>
                <Error isValid={formState.expMonthIsValid && formState.expYearIsValid} />
            </div>
            <div>
                <label htmlFor="cvc">cvc</label>
                <input
                    className={formState.cvcIsValid === false && styles.error}
                    ref={cvcInputRef}
                    type="text"
                    id="cvc"
                    maxLength="3"
                    onChange={cvcChangeHandler}
                    onBlur={handleBlur}
                    value={formState.cvc}
                    placeholder="e.g. 123"
                />
                <Error isValid={formState.cvcIsValid} />
            </div>

            <button>Confirm</button>
        </form>
    )
}


export default Form;