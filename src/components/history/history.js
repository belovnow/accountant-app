import { connect } from 'react-redux';

import './history.css';

const History = ({ records }) => {

    const renderRow = (item, idx) => {

        const { label, sum } = item;

        const rowColor = (idx % 2 !== 0) ? 'rgba(0, 0, 0, 0.05)' : 'white';

        const operationType = (sum > 0);

        return (
            <li key={idx} className="history-item" style={{ backgroundColor: rowColor }}>
                {operationType && 'Зачисление'}
                {!operationType && 'Списание'}
                <span>{sum} ₽</span>
                {operationType && 'на счёт'}
                {!operationType && 'со счёта'}
                <span>{label}</span>
            </li>
        );
    }

    const emptyData = (records.length === 0) ?
        <span className="history-item">Нет операций</span> : null

    return (
        <div className="history-block">
            <span className="history-header">История операций</span>
            <ul className="history-list">
                {emptyData}
                {records.map(renderRow)}
            </ul>
        </div>
    );
}

const mapStateToProps = ({ historyRecords: { operationsHistory } }) => {
    return {
        records: operationsHistory
    }
}

// const mapDispatchToProps = (dispatch) => {
//     return null;
// }

export default connect(mapStateToProps)(History);