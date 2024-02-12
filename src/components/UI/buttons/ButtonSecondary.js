import styled from "styled-components";

const Button = styled.button`
  cursor: pointer;
  padding: 10px 15px;
  border-radius: 3px;
  border-style: solid;
  border-width: 1px;

  background: var(--btn-secondary);
  border-color: var(--btn-secondary);
  color: #fff;
  align-self: center;

  &:hover {
    background: #5b7ff4;
    color: #fff;
    transition: all 0.3s ease;
  }
`;

export default Button;
