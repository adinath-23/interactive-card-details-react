import logo from '../../images/card-logo.svg';

import styles from './Card.module.css'
const Front = props => {
    return (
        <div className={styles['card-front']}>
            <img src={logo} alt="logo" />
            <p>{props.data.cardNumber || '0000 0000 0000 0000'}</p>
            <p>{props.data.username || 'Jane Appleseed'}</p>
            <p>{props.data.expMonth || '00'}/{props.data.expYear || '00'} </p>
        </div>
    )
}

export default Front;