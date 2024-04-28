// Add children prop to be able to wrap the component around other elements, e.g.: text
const Button = ({ children, ...props }) => {
  return <button {...props}>{children}</button>;
};

export default Button;
