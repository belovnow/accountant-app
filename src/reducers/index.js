import updateHistoryRecords from './history-records';
import updateWalletsList from './wallets-list';


const reducer = (state, action) => {

    return {
        walletsList: updateWalletsList(state, action),
        historyRecords: updateHistoryRecords(state, action)
    }
}

export default reducer;