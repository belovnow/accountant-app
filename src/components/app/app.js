import Header from '../header';
import WalletsList from '../wallets-list';
import History from '../history';
import ChartsBlock from '../charts-block/charts-block';
import './app.css';


const App = () => {

  return (
    <div className="app"> 
      <Header />
      <WalletsList />
      <History />
      <ChartsBlock />
    </div>
  );
}

export default App;