import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCreditCard} from '@fortawesome/free-regular-svg-icons'
import './wallet-item.css';

const WalletItem = ({ wallet, onSumDecrease, onSumIncrease }) => {

    const { label, value} = wallet;

    const [enteredSum, setEnteredSum] = useState(undefined);
    const [isFormActive, setIsFormActive] = useState(false);

    const onSubmit = (event) => {
        event.preventDefault(); // Защита от перезагрузки страницы
    }
    
    // Форма для ввода суммы списания или зачисления
    const walletOperationForm =
        <form className="operations-form"
        onSubmit={onSubmit}>
            <input
                type="number"
                onChange={(e) => setEnteredSum(e.target.value)}
                placeholder="Введите сумму"
                value={enteredSum}>
            </input>
            <div className="btn-group">
            <button onClick={()=>onSumIncrease(enteredSum)}>Зачислить</button>
            <button onClick={()=>onSumDecrease(enteredSum*-1)}>Списать</button>
            </div>
        </form>

    return (
        <React.Fragment>
        <div className="wallet-item" 
            onClick={()=>setIsFormActive(!isFormActive)}>
            <span style={{paddingRight: '10px'}}>
                <FontAwesomeIcon icon={faCreditCard} color={'#4F4F4F'}/>
            </span>
            <span>{label}</span>
            <span>{value} ₽</span>
        </div>
        <div>
            {isFormActive && walletOperationForm}
        </div>
        </React.Fragment>
    );
}

export default WalletItem;