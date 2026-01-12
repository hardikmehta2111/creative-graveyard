import CgLogo from "../../assets/Fuina.png";

const Logo = () => {
  return (
    <img
      src={CgLogo}
      alt="Creative Graveyard Logo"
      className="h-9 w-auto object-contain"
      draggable="false"
    />
  );
};

export default Logo;
