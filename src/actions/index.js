const walletsRequested = () => {
    return {
        type: 'FETCH_WALLETS_REQUEST',
    };
};

const walletsLoaded = (newWallets) => {
    return {
        type: 'FETCH_WALLETS_SUCCSES',
        payload: newWallets
    };
};

const walletsError = (error) => {
    return {
        type: 'FETCH_WALLETS_FAILURE',
        payload: error
    };
};

const fetchWallets = (dispatch) => (walletAppService) => {
    dispatch(walletsRequested());
    walletAppService.getWallets()
        .then((data) => dispatch(walletsLoaded(data)))
        .catch((err) => dispatch(walletsError(err)));
};

const walletSumUpdate = (walletId, sum) => {
    return {
        type: 'WALLET_SUM_UPDATE',
        payload: { walletId, sum }
    }
}

const historyRecordIncrease = (walletId) => {
    return {
        type: 'HISTORY_RECORD_INCREASE',
        payload: walletId
    }
}

const historyRecordDecrease = (walletId) => {
    return {
        type: 'HISTORY_RECORD_DECREASE',
        payload: walletId
    }
}

const createWallet = (walletLabel, walletInitSum) => {
    return {
        type: 'CREATE_WALLET',
        payload: { walletLabel, walletInitSum }
    }
}

const createHistoryRecord = (walletId, sum) => {
    return {
        type: 'ADD_HISTORY_RECORD',
        payload: { walletId, sum }
    }
}

export {
    fetchWallets,
    walletSumUpdate,
    historyRecordIncrease,
    historyRecordDecrease,
    createWallet,
    createHistoryRecord
};