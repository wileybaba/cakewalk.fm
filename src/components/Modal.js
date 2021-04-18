import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useHotkeys } from "../hooks/useHotkeys";
import { useOnClickOutside } from "../hooks/useOnClickOutside";

const Overlay = styled.div`
  z-index: 10;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgb(58, 72, 97, 0.7);

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  padding: 1.75rem;
  background: white;
  border: none;
  border-radius: 6px;
  flex-shrink: 0;
  position: fixed;
  z-index: 100;
  width: auto;
  height: fit-content;
  color: #2c3e50;
  box-shadow: 0px 6px 6px 0px 0, 0, 0, 0.75;

  @media (min-width: 760px) {
    width: 20rem;
    height: 35rem;
  }
`;

export function Modal({ show = true, cleanup, children }) {
  const [visible, setVisible] = useState(show);

  const modalRef = useRef(null);

  useOnClickOutside(modalRef, () => {
    setVisible(false);
    cleanup();
  });

  useHotkeys("esc", () => {
    setVisible(false);
    cleanup();
  });

  if (!visible) return <div />;

  return (
    <>
      <Overlay />
      <Container ref={modalRef}>{children}</Container>
    </>
  );
}
