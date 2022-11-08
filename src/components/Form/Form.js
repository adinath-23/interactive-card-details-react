import { useEffect, useReducer } from "react";
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
        case 'cardNumberInput': {
            const value = formatNumber(action.value.replace(/\D/g, ''))
            return {
                ...state, cardNumber: value,
                cardNumberIsValid: value.length === 19 || null
            }
        }
        case 'expMonthInput': {
            let value = action.value.replace(/\D/g, '')
            if (parseInt(value) > 12) {
                value = ''
            }
            return {
                ...state, expMonth: value,
                expMonthIsValid: value > 0 || null
            }
        }
        case 'expYearInput': {
            let value = action.value.replace(/\D/g, '')
            return {
                ...state, expYear: value,
                expYearIsValid: (parseInt(value) > 0 && value.length === 2) || null
            }
        }
        case 'cvcInput': {
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

    const changeHandler = event => {
        dispatchFormAction({ type: `${event.target.id}Input`, value: event.target.value })
    }

    const blurHandler = (event) => {
        dispatchFormAction({ type: `validate-${event.target.id}` })
    }

    const formSubmitHandler = event => {
        event.preventDefault()
        for (let target of event.target) {
            if (target.id && !formState[`${target.id}IsValid`]) {
                return target.focus()
            }
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
                    type="text"
                    id="username"
                    maxLength="30"
                    onChange={changeHandler}
                    onBlur={blurHandler}
                    value={formState.username}
                    placeholder="e.g. Jane Appleseed"
                />
                <Error isValid={formState.usernameIsValid} />
            </div>
            <div>
                <label htmlFor="cardNumber">card number</label>
                <input
                    className={formState.cardNumberIsValid === false && styles.error}
                    type="text"
                    id="cardNumber"
                    maxLength="19"
                    onChange={changeHandler}
                    onBlur={blurHandler}
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
                        type="text"
                        id="expMonth"
                        maxLength="2"
                        onChange={changeHandler}
                        onBlur={blurHandler}
                        value={formState.expMonth}
                        placeholder="MM"
                    />
                    <input
                        className={formState.expYearIsValid === false && styles.error}
                        type="text"
                        id="expYear"
                        maxLength="2"
                        onChange={changeHandler}
                        onBlur={blurHandler}
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
                    type="text"
                    id="cvc"
                    maxLength="3"
                    onChange={changeHandler}
                    onBlur={blurHandler}
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