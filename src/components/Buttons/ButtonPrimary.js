import styled from "styled-components";

const Button = styled.button`
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 3px;
  border-style: solid;
  border-width: 1px;

  background: var(--btn-primary);
  border-color: var(--btn-primary);
  color: #fff;

  &:hover {
    background: #fff;
    color: var(--btn-primary);
    transition: all 0.3s ease;
  }
`;

export default Button;
