import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 100%;
  font-size: 14px;
  color: "darkgray";

  div {
    display: flex;
    justify-content: left;
    align-items: center;
    margin-bottom: 0.5rem;
  }
`;

const Icon = styled.i`
  color: ${(props) => (props.valid ? props.theme.secondary : "lightgray")};
  margin-right: 0.5rem;
`;

export function PasswordValidator({ validatesTosCheckbox }) {
  const passwordInput = document.getElementById("password");

  console.log(passwordInput);
  const passwordConfirmationInput = document.getElementById("confirm-password");
  const submitButton = document.getElementById("sign-up-submit");

  const [inputValue, setInputValue] = useState(passwordInput.value);
  const [passwordConfirmationValue, setPasswordConfirmationValue] = useState(
    passwordConfirmationInput.value
  );

  const minLength = inputValue.length >= 12;
  const specialCharRegex = /[ `!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/;
  const containsSpecialChar = specialCharRegex.test(inputValue);
  const containsNumber = /\d/.test(inputValue);
  const passwordsMatch =
    passwordConfirmationValue && inputValue === passwordConfirmationValue;

  passwordInput.addEventListener("keyup", (e) => {
    setInputValue(e.target.value);
  });

  passwordConfirmationInput.addEventListener("keyup", (e) => {
    setPasswordConfirmationValue(e.target.value);
  });

  const [tosChecked, setTosChecked] = useState(!validatesTosCheckbox);

  if (validatesTosCheckbox) {
    const tosCheckbox = document.getElementById("user_tos_accepted_at");
    tosCheckbox.addEventListener("change", () =>
      setTosChecked(tosCheckbox.checked)
    );
  }

  useEffect(() => {
    submitButton.disabled = !(
      minLength &&
      containsSpecialChar &&
      containsNumber &&
      passwordsMatch &&
      tosChecked
    );
  }, [inputValue, passwordConfirmationValue, tosChecked]);

  return (
    <>
      <Container>
        <div>
          <Icon
            valid={minLength}
            className={minLength ? "fa fa-check-circle" : "far fa-circle"}
          />
          <small>Minimum 12 characters</small>
        </div>
        <div>
          <Icon
            valid={containsSpecialChar}
            className={
              containsSpecialChar ? "fa fa-check-circle" : "far fa-circle"
            }
          />
          <small>At least 1 special character</small>
        </div>
        <div>
          <Icon
            valid={containsNumber}
            className={containsNumber ? "fa fa-check-circle" : "far fa-circle"}
          />
          <small>At least 1 number</small>
        </div>
        <div>
          <Icon
            valid={passwordsMatch}
            className={passwordsMatch ? "fa fa-check-circle" : "far fa-circle"}
          />
          <small>Passwords match</small>
        </div>
      </Container>
    </>
  );
}

PasswordValidator.propTypes = {
  // eslint-disable-next-line react/boolean-prop-naming
  validatesTosCheckbox: PropTypes.bool,
};
