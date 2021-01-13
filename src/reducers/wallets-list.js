const createWallet = (state, action) => {
    const { walletsList: { wallets } } = state;

    const { walletLabel, walletInitSum } = action.payload;

    const findMaxId = (previous, current) => {
        return (previous.id > current.id) ? previous.id : current.id;
    };

    const id = wallets.reduce(findMaxId, 0) + 1;

    const newWallet = {
        id: id,
        label: walletLabel,
        value: Number(walletInitSum)
    }

    return [
            ...wallets,
            newWallet
        ]
}

const updateWalletSum = (state, action) => {

    const { walletsList: { wallets } } = state;

    const walletId = action.payload.walletId;
    const sum = Number(action.payload.sum);

    const wallet = wallets.find((wallet) => wallet.id === walletId);
    const walletIndex = wallets.findIndex(({ id }) => id === walletId);

    const newWallet = {
        ...wallet,
        value: wallet.value + sum
    };

    return [
        ...wallets.slice(0, walletIndex),
        newWallet,
        ...wallets.slice(walletIndex + 1)
    ]
}

const updateWalletsList = (state, action) => {

    if (state === undefined) {
        return {
            wallets: [],
            loading: true,
            error: null,
        };
    }

    switch (action.type) {
        // Начало загрузки кошельков - показывает индикатор загрузки
        case 'FETCH_WALLETS_REQUEST':
            return {
                wallets: [],
                loading: true,
                error: null
            };

        // При успешной загрузке обновляет стейт кошельков
        case 'FETCH_WALLETS_SUCCSES':
            return {
                wallets: action.payload,
                loading: false,
                error: null
            };

        // При ошибке получает сообщение об ошибке
        case 'FETCH_WALLETS_FAILURE':
            return {
                wallets: [],
                loading: false,
                error: action.payload
            };
        //Уменьшение суммы кошелька

        case ('WALLET_SUM_UPDATE'):

            return {
                ...state,
                wallets: updateWalletSum(state, action),
            }

        case ('CREATE_WALLET'):

            return {
                ...state,
                wallets: createWallet(state,action)
            }

        default:
            return state.walletsList;
    }
}

export default updateWalletsList;