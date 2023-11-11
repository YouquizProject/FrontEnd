import "../../style/AgreementPage.scss";
import * as React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useNavigate } from "react-router-dom";

const AgreementPage = () => {
  const [checked, setChecked] = React.useState([true, false]);
  const [errorMessage, setErrorMessage] = React.useState("");
  const navigate = useNavigate();

  const handleChange1 = (event) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange3 = (event) => {
    setChecked([checked[0], event.target.checked]);
  };

  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      <FormControlLabel
        label={<Box component="div" fontSize={25} fontWeight={600}>
        [필수] 유퀴즈 이용약관
      </Box>}
        control={<Checkbox checked={checked[0]} onChange={handleChange2} color="default" />}
      />
      <FormControlLabel
        label={<Box component="div" fontSize={25} fontWeight={600}>
        [필수] 개인정보 수집 및 이용
      </Box>}
        control={<Checkbox checked={checked[1]} onChange={handleChange3} color="default" />}
      />
    </Box>
  );
  const handleNextPage = () => {
    if (checked[0] && checked[1] ) {
        navigate(`user`);
    } else {
      setErrorMessage("필수 항목에 동의해주세요.");
    }
  };
  return (
    <>
      <div className="agree-wrapper">
        <div>
        <FormControlLabel
          label={<Box component="div" fontSize={25} fontWeight={600}>
            전체 동의하기</Box>}
          control={
            <Checkbox
              checked={checked[0] && checked[1]}
              indeterminate={checked[0] !== checked[1]}
              onChange={handleChange1}
              color="default"
            />
          }
        />
        <div className="allcheck">이용약관, 개인정보 수집 및 이용에 모두 동의합니다.</div>
        {children}
      </div>
      {errorMessage && (
        <div className="error-message" style={{ color: "red" }}>
          {errorMessage}
        </div>
      )}
      <button onClick={handleNextPage}>다음</button>
      </div>
    </>
  );
};

export default AgreementPage;