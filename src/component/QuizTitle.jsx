import React from 'react';
import styled from "styled-components";

const Questionwrapper = styled.div`
  display: flex;
  width: 79vw;
  margin-left: 9vw; 
  justify-content: space-between;
  font-family: 'Inter';

 .problem {
  width: 70%;
  font-size:1.8vw;
  font-weight:600;
  margin: 1.5vw;
  margin-left:10vw;
  }
 .progressbar-container {
  display: flex;
  flex-direction: row;
  margin: 2vw 0px 0px 0px;
  position: relative;
  z-index: 1; 
  align-items:center;
  justify-content:center;
 }
  .progressbar {
    width: 15vw;
    height: 0.1vh;
    background-color: #19A05E;
    border: 1.5px solid #19A05E;
    position: absolute;
  }
  .circle {
    width: 0.5vw;
    height: 0.5vw;
    border-radius: 50%;
    background-color: white;
    border: 0.1vw solid #19A05E;
    margin: 0vw 1vw;
    position: relative;
    z-index: 2;
  }
  .filled {
    background-color: #19A05E;
  }
`;

const Title = ({ text, currentPage }) => {
  return (
    <>
      <Questionwrapper>
        <div className='problem'>{text}</div>
        <div className="progressbar-container">
          <div className="progressbar"></div>
            {[...Array(7)].map((_, index) => (
              <div
                key={index}
                className={`circle ${index < currentPage ? 'filled' : ''}`}
              >
              </div>
            ))}
        </div>
      </Questionwrapper>
    </>
  );
}
export default Title;