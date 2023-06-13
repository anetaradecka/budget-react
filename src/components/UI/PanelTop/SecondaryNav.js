import "./SecondaryNav.css";

import { burgerMenuToggle } from "./../../../utils/burgerMenu";

const SecondaryNav = () => {
  const toggleMenu = () => {
    burgerMenuToggle();
  };

  return (
    <section className="navigation-top">
      <h2>Hello, John Doe!</h2>
      <nav className="secondary-nav">
        <div className="hamburger" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        <ul id="secondary-menu">
          <li className="nav-item">
            <a href="/settings">settings</a>
          </li>
          <li className="nav-item">
            <form className="logout" action="/logout" method="POST">
              <input type="hidden" name="_csrf" value="<%= csrfToken %>" />
              <button className="btn logout" type="submit">
                logout
              </button>
            </form>
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default SecondaryNav;
