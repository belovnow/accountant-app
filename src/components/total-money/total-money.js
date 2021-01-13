import './total-money.css';

const TotalMoney = (props) => {
    return(
        <div className="total-money">
            <span>Всего средств</span>
            <span className="total-money-value">120000 ₽</span>
            {props.children}
        </div>
    );
}

export default TotalMoney;