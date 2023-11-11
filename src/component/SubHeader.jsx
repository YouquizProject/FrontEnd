import styled from "styled-components";
const Sub = styled.div`
  height: 10vh;
  float: top;
  
  .sub-header {
    display: flex;
    justify-content: space-between;
    width: 55%;
    height: 100%;
    align-items: end;
    padding-bottom: 2vh;
    border-bottom: 2px solid #414141;
  }
  .sub-title {
    font-weight: 700;
    font-size: 1.5vw;
  }
`;

const SubHeader = ({ page }) => {
  return (
    <>
      <Sub>
        <div className="sub-header">
          <div className="sub-title">{page}</div>
        </div>
      </Sub>
    </>
  );
};

export default SubHeader;
