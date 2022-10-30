import styles from './Error.module.css'

const Error = props => {
    return (
        <p className={props.isValid === false ? styles.error : styles.noError}>Incomplete</p>
    )
}

export default Error;