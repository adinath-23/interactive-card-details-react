import styles from './Complete.module.css'
import logo from '../../images/icon-complete.svg'
const Complete = props => {
    const handleClick = () => {
        props.onCompletion(false)

    }
    return (
        <div className={styles.confirmed}>
            <img src={logo} alt="completed" />
            <h1>Thank you!</h1>
            <p>We've added your card details</p>
            <button onClick={handleClick}>Continue</button>
        </div>
    )
}

export default Complete;