import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  height: 340px;
  width: 300px;
  border: solid 1px #cccccc;
  display: flex;
  flex-direction: column;
  background: white;
  div {
    display: flex;
    flex-direction: row;
  }
  img {
    &.address {
      filter: none;
      cursor: auto;
      border: solid 1px #cccccc;
      margin-top: 5px;
      margin-bottom: 10px;
      align-self: center;
      width: 285px;
      height: 135px;
      object-fit: contain;
    }
  }
  svg {
    fill: #d32323;
    z-index: 25;
    padding-right: 5px;
    margin: 10px 10px;
    height: 18px;
    width: 25px;
  }
  h4 {
    font-family: serif;
    margin: 0.67em;
    font-size: 1em;
    align-self: center;
  }
  p {
    margin: 0.67em;
    font-size: 14px;
  }
  a {
    margin: 0.67em;
    font-size: 14px;
  }
`;

const Address = ({ address, phone, website, googleMap }) => (

  <Wrapper>
    <img
      alt=""
      className="address"
      src={googleMap}
    />
    <div>
      <svg>
        <path d="M14 7A5 5 0 0 0 4 7c0 1.97 1.15 3.658 2.806 4.472h-.17L9 16l2.363-4.528h-.17C12.85 10.658 14 8.97 14 7zM9 5a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" />
      </svg>
      <h4>{address}</h4>
    </div>
    <div>
      <svg>
        <path d="M15.862 12.526l-2.91-1.68a.442.442 0 0 0-.486.087l-1.58 1.687a.857.857 0 0 1-.52.232s-1.083.03-3.13-1.985c-2.046-2.015-2.054-3.12-2.054-3.12 0-.17.094-.41.21-.533L6.85 5.656a.49.49 0 0 0 .08-.504L5.295 2.14c-.073-.155-.228-.18-.345-.058L2.26 4.924a1.07 1.07 0 0 0-.248.53s-.34 2.927 3.75 6.955c4.093 4.025 6.96 3.59 6.96 3.59.167-.027.4-.148.516-.27l2.684-2.845c.117-.123.09-.285-.062-.36z" />
      </svg>
      <p>{phone}</p>
    </div>
    <div>
      <svg>
        <path d="M14 15H4c-.55 0-1-.45-1-1V4c0-.55.45-1 1-1h3v1H4v10h10v-3h1v3c0 .55-.45 1-1 1zm-5.12-4.465L7.463 9.12l3.83-3.827L9 3h6v6l-2.293-2.293-3.828 3.828z" />
      </svg>
      <a href={website}>{website}</a>
    </div>
  </Wrapper>

);

export default Address;