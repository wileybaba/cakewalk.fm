import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useHotkeys } from "../hooks/useHotkeys";
import { useOnClickOutside } from "../hooks/useOnClickOutside";
import { GoX } from "react-icons/go";
import { palette } from "../themes";

const Overlay = styled.div`
  z-index: 10;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgb(58, 72, 97, 0.7);
`;

const Container = styled.div`
  padding: 1.75rem;
  background: white;
  border: none;
  border-radius: 6px;
  z-index: 100;
  height: fit-content;
  color: #2c3e50;
  box-shadow: 0px 6px 6px 0px 0, 0, 0, 0.75;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: 796px) {
    height: 90%;
    width: 90%;
    text-align: center;
  }

  .close-x {
    position: absolute;
    top: 0px;
    right: 0px;
    margin: 0.5rem;
    font-size: 1.5em;
    transition: ease 0.5s all;
    cursor: pointer;

    &:hover {
      color: ${palette.red};
    }
  }
`;

export function Modal({ show = true, cleanup, children }) {
  const [visible, setVisible] = useState(show);

  const modalRef = useRef(null);

  const handleClose = () => {
    setVisible(false);
    cleanup();
  };

  useOnClickOutside(modalRef, () => {
    handleClose();
  });

  useHotkeys("esc", () => {
    handleClose();
  });

  if (!visible) return <div />;

  return (
    <>
      <Overlay />
      <Container ref={modalRef}>
        <GoX className="close-x" onClick={handleClose} />
        {children}
      </Container>
    </>
  );
}
