import WalletItem from "../wallet-item";
import { connect } from "react-redux";
import { useContext, useEffect, useState } from 'react';
import { fetchWallets, walletSumUpdate, createWallet } from '../../actions';
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";

import './wallets-list.css';
import WalletAppServiceContext from "../wallet-app-service-context";

const WalletsList = ({ wallets, onSumDecrease, onSumIncrease, createWallet }) => {

    const [walletLabel, setWalletLabel] = useState('');
    const [walletSum, setWalletSum] = useState('');
    const [inputVisible, setInputVisible] = useState(false);


    const onSubmit = (e) => {
        e.preventDefault();
        createWallet(walletLabel, walletSum);
    }

    const createWalletForm =
        <form className="create-wallet-form"
            onSubmit={onSubmit}>
            <input
                type="text"
                placeholder="Название"
                onChange={(e) => setWalletLabel(e.target.value)}
                value={walletLabel}
            />
            <input
                type="number"
                placeholder="Начальная сумма"
                onChange={(e) => setWalletSum(e.target.value)}
                value={walletSum}
            />
            <button>Создать</button>
        </form>

    return (
        <div className="wallet-list">
            <span className="wallets-header">
                <span>Кошельки</span>
                <span
                 className="plus-icon"
                    onClick={() => setInputVisible(!inputVisible)}>+</span>
            </span>
            {inputVisible && createWalletForm}
            {
                wallets.map((wallet) => {
                    return (
                        <li key={wallet.id}>
                            <WalletItem
                                wallet={wallet}
                                onSumDecrease={(sum) => onSumDecrease(wallet.id, sum)}
                                onSumIncrease={(sum) => onSumIncrease(wallet.id, sum)} />
                        </li>
                    );
                })
            }
            <span className="info-text">Нажмите на кошелёк для совершения операции</span>
        </div>
    );
}

const WalletsListContainer = (props) => {

    const walletAppService = useContext(WalletAppServiceContext);

    const { wallets, loading, error, onSumDecrease, onSumIncrease, createWallet } = props;

    useEffect(() => {
        props.fetchWallets(walletAppService);
    }, []);

    // if (loading) {
    //     return <Spinner />
    // }

    if (error) {
        return <ErrorIndicator />
    }

    return <WalletsList wallets={wallets}
        onSumDecrease={onSumDecrease}
        onSumIncrease={onSumIncrease}
        createWallet={createWallet}
    />;
}

const mapStateToProps = (props) => {

    const { wallets, loading, error } = props.walletsList;

    return { wallets, loading, error };
};

const mapDispatchToProps = (dispatch) => {

    return {
        fetchWallets: fetchWallets(dispatch),
        onSumDecrease: (id, sum) => dispatch(walletSumUpdate(id, sum)),
        onSumIncrease: (id, sum) => dispatch(walletSumUpdate(id, sum)),
        createWallet: (name, sum) => dispatch(createWallet(name, sum)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletsListContainer);
