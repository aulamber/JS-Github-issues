import styled, { css } from 'styled-components';

import { CenterXY } from '../Flex';

const btn = (light, dark) => css`
  font-size: 12px;
  padding: 5px 15px;
  white-space: nowrap;

  &:visited {
    color: white;
  }
  &:hover {
    &[disabled] {
    }
  }
  &:visited {
    color: black;
  }
  &[disabled] {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const btnDefault = css`
  ${btn('#ffffff', '#d5d5d5')};
`;

const btnPrimary = btn('#ffffff', '#d5d5d5');
const btnDanger = btn('#ffffff', '#d5d5d5');

export const FormStyle = styled(CenterXY)`
  font-family: sans-serif;

  h1 {
    text-align: center;
    color: #222;
  }

  h2 {
    text-align: center;
    color: #222;
  }

  & > div {
    text-align: center;
  }

  a {
    display: block;
    text-align: center;
    color: #222;
    margin-bottom: 10px;
  }

  p {
    max-width: 500px;
    margin: 10px auto;
    & > a {
      display: inline;
    }
  }

  form {
    .loading {
      text-align: center;
      display: block;
      position: absolute;
      background: url('https://media.giphy.com/media/130AxGoOaR6t0I/giphy.gif')
        center center;
      background-size: fill;
      font-size: 2em;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 50px 0 0 0;
      z-index: 2;
    }

    & > div {
      display: flex;
      flex-direction: column;
      line-height: 2em;
      margin: 5px;
      position: relative;
      & > label {
        align-items: left;
        color: #333;
        display: flex;
        justify-content: left;
        line-height: 40px;
      }
      & > input,
      & > select,
      & > textarea {
        flex: 1;
        padding: 3px 5px;
        font-size: 1em;
        border: 1px solid #ccc;
        border-radius: 3px;
      }
      & > input[type='checkbox'] {
        margin-top: 7px;
      }
      & > div {
        margin-left: 16px;
        & > label {
          display: block;
          & > input {
            margin-right: 3px;
          }
        }
      }
      & > span {
        line-height: 32px;
        margin-left: 10px;
        color: #800;
        font-weight: bold;
      }
      & > button.remove {
        ${btnDanger};
      }
    }
    & > .buttons {
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      margin-top: 15px;
    }

    .error {
      display: flex;
      font-weight: bold;
      color: #800;
      flex-flow: row nowrap;
      justify-content: center;
    }
    pre {
      position: relative;
      border: 1px solid #ccc;
      background: rgba(0, 0, 0, 0.1);
      box-shadow: inset 1px 1px 3px rgba(0, 0, 0, 0.2);
      padding: 20px;
    }
  }
  button {
    margin: 0 10px;
    &[type='submit'] {
      ${btnPrimary};
    }
    &[type='button'] {
      ${btnDefault};
    }
  }
`;
