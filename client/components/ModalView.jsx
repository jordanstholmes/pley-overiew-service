import React from 'react';
import styled from 'styled-components';

const PictureWrapper = styled.div`
  display:flex;
  flex-direction: row;
  align-items: center;
  z-index: -100;
  a {
    &.left { order: 1 };
    &.right { order: 3 };
    cursor: pointer;
    z-index: 50;
    background: transparent;
    border: none;
    &:hover { fill: rebeccapurple}
    svg {
      flex: none;
      height: 100%;
      width: 100%;
      z-index: 500;
      position: relative;
      margin-top: 200%;
      &.left { margin-left: 30% };
      &.right { margin-right: 30% }; 
      transition: fill 0.25s;
    }
  }
`;

const CurrImage = styled.img`
  order: 2;
  z-index: 1;
  object-fit: contain;
  height: 100%;
  width: 80%;
`;

const ModalView = ({ handleBackButton, handleNextButton, picture }) => (

  <PictureWrapper className="modalOverlay">
    <a className="left" onClick={e => handleBackButton(e)}>
      <svg className="left">
        <path d="M29.414 5.992c.566 0 1.137.192 1.614.588 1.115.925 1.296 2.613.404 3.77L20.902 24l10.53 13.65c.892 1.156.71 2.844-.404 3.77-1.116.924-2.743.737-3.635-.42L15.57 25.675a2.76 2.76 0 0 1 0-3.35L27.394 6.998a2.548 2.548 0 0 1 2.02-1.008z"/>
      </svg>
    </a>
    <CurrImage className="currImage" src={picture} />
    <a className="right" onClick={e => handleNextButton(e)}>
      <svg className="right">
        <path d="M 18.586 42.008 a 2.518 2.518 0 0 1 -1.614 -0.588 c -1.115 -0.925 -1.296 -2.613 -0.404 -3.77 L 27.098 24 l -10.53 -13.65 c -0.892 -1.156 -0.71 -2.844 0.404 -3.77 c 1.116 -0.924 2.743 -0.737 3.635 0.42 L 32.43 22.325 a 2.76 2.76 0 0 1 0 3.35 L 20.606 41.002 a 2.548 2.548 0 0 1 -2.02 1.008 Z"/>
      </svg>
    </a>
  </PictureWrapper>

);

export default ModalView;
