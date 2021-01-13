/**
 * Обновление массива историй операции - добавление или изменение записи операции в историю
 */
const updateOperationsHistory = (operationsHistory, item, idx) => {

    // Если новый элемент, добавляем в массив
    if (idx === -1) {
        return [
            ...operationsHistory,
            item
        ]
    }

    // Если элемент есть, обновляем существующий массив
    return [
        ...operationsHistory.slice(0, idx),
        item,
        ...operationsHistory.slice(idx + 1),
    ];

}

const updateOperationsHistoryRecord = (wallet, record = {}, quantity) => {

    // Если записи не существует - присваиваем значения,
    // если существует - все значения останутся прежними 
    const {
        id = wallet.id,
        label = wallet.label,
        sum = 0
    } = record;

    return {
        id,
        label,
        sum: sum + 1 * quantity
    }
}

const updateOrder = (state, walletId, quantity) => {
    // const walletId = action.payload; // Полученное id книги

    const { walletsList: { wallets }, historyRecords: { operationsHistory } } = state;

    // Получаем по id кошелёк из стейта
    const wallet = wallets.find((wallet) => wallet.id === walletId);

    // Ищем индекс записи, если записи нет получаем -1
    const recordIndex = operationsHistory.findIndex(({ id }) => id === walletId);

    // Получаем индекс записи в массиве историй операций
    // Если индекс -1, то record undefined 
    const record = operationsHistory[recordIndex];

    // 
    const newItem = updateOperationsHistoryRecord(wallet, record, quantity);

    return {
        ...state,
        operationsHistory: updateOperationsHistory(operationsHistory, newItem, recordIndex),
    };
}

const updateHistoryRecords = (state, action) => {

    if (state === undefined) {
        return {
            operationsHistory: [
                
            ]
        };
    }

    const createHistoryRecord = (state, action) => {

        const { walletsList: { wallets }, historyRecords: { operationsHistory } } = state;

        const { walletId, sum } = action.payload;

        const wallet = wallets.find((wallet) => wallet.id === walletId);

        const findMaxId = (previous, current) => {
            return (previous.id > current.id) ? previous.id : current.id;
        };

        const id = operationsHistory.reduce(findMaxId, 0) + 1;

        const newRecord = {
            id: id,
            label: wallet.label,
            sum: sum
        }

        return {
            operationsHistory: [
                ...operationsHistory,
                newRecord
            ]
        }

    }

    switch (action.type) {
        case 'HISTORY_RECORD_INCREASE':
            return updateOrder(state, action.payload, 1);

        case 'HISTORY_RECORD_DECREASE':
            return updateOrder(state, action.payload, -1);

        case 'WALLET_SUM_UPDATE':
            return createHistoryRecord(state, action);

        default:
            return state.historyRecords;
    }
}

export default updateHistoryRecords;