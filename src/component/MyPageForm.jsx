import React from "react";
import SubSidebar from "./SubSidebar";
import SubHeader from "./SubHeader";

const MyPageForm = ( { userType, page } ) => {

    return (
      <> 
        <SubSidebar userType={userType}/>
        <SubHeader page={page}/>
      </>
    );
}
export default MyPageForm;




