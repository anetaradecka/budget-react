import UserProfile from "./UserProfile";
import PrimaryNav from "./PrimaryNav";

const PanelLeft = () => {
  return (
    <section className="navigation-left">
      <nav id="navigation">
        <UserProfile />
        <PrimaryNav />
      </nav>
    </section>
  );
};

export default PanelLeft;
