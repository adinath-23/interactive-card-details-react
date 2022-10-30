import styles from './Card.module.css'

const Back = props => {
    return (
        <div className={styles['card-back']}>
            <p>{props.data || '000'}</p>
        </div>
    )
}
export default Back;