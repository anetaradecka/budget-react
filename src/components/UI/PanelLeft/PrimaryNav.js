import "./PrimaryNav.css";

const PrimaryNav = () => {
  return (
    <ul id="primary-nav">
      <li className="nav-item">
        <span className=""></span>
        <i className="fa-solid fa-square-up-right"></i>
        <a className="" href="/">
          dashboard
        </a>
      </li>
      <li className="nav-item">
        <span className="active"></span>
        <i className="fa-solid fa-square-up-right active"></i>
        <a className="active" href="/">
          expenses
        </a>
      </li>
      <li className="nav-item">
        <span className=""></span>
        <i className=""></i>
        <a className="" href="/">
          incomes
        </a>
      </li>
    </ul>
  );
};

export default PrimaryNav;
