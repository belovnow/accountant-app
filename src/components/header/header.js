import './header.css';

const Header = () => {
  return (
    <div className="header">      
        <span className="header-logo">УЧЁТ ФИНАНСОВ</span>
        <span className="header-buttons">
          <button>История операций</button>
          <button>Показать графики</button>
          <button>Отчёт по дням</button>
        </span>
    </div>
  );
}

export default Header;