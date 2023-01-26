import styled from "styled-components";

export const Contianer = styled.div`
  background-color: #3d3f43;
  border-radius: 10px;
  padding: 10px;

  img {
    max-width: 100%;
    display: block;
    margin-bottom: 10px;
    border-radius: 10px;
    position: relative;
  }
  button {
    display: block;
    background-color: #bf8b8b;
    border: 0;
    color: #fff;
    padding: 4px 6px;
    font-size: 15px;
    border-radius: 10px;
    margin: 0 20px;
    cursor: pointer;
    position: absolute;
    top: 205px;
    margin-left: 161px;
    z-index: 20;
    :hover{
        background-color: #7c0808;
    }
    
  }
`;

