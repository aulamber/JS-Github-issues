import styled, { keyframes } from 'styled-components';

import { CenterXY } from '../Flex';

export const Wrapper = styled(CenterXY)`
  background-color: #eeeeee;
  height: calc(100vh - 64px);
  position: fixed;
  top: 65px;
  width: 100%;
  z-index: 500;
`;

export const MainLoaderWrapper = styled(CenterXY)`
  height: 50px;
`;

const keyframeMainLoader = keyframes`
  0% {
    transform: translateX(40px);
  }

  50% {
    transform: translateX(-30px);
  }
  100% {
    transform: translateX(40px);
  }
`;

export const MainLoader = styled.div`
  width: 50px;
  height: 10px;
  background: #3f51b5;
  border-radius: 5px;
  animation: ${keyframeMainLoader} 1.8s ease-in-out infinite;

  &:before,
  &:after {
    position: absolute;
    display: block;
    content: '';
    animation: ${keyframeMainLoader} 1.8s ease-in-out infinite;
    height: 10px;
    border-radius: 5px;
  }

  &:before {
    top: -20px;
    left: 10px;
    width: 40px;
    background: #353e47;
  }

  &:after {
    bottom: -20px;
    width: 35px;
    background: #353e47;
  }
`;
