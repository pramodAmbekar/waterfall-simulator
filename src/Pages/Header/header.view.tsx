import React, { useEffect } from "react";
// import {connect} from "react-redux"

// import {getSingleUser} from "../../Redux/action-creators/auth"
const Header: React.FC<any> = (props: any) => {
  // useEffect(()=>{
  //     props.getSingleUser()
  // },[])
  return <div>{props.user?.data ? props.user.data.first_name : ""}</div>;
};

export default Header;
// const mapStateProps = ({
//     authReducer:{isLoading, user, error}
// }) => ({
//     isLoading,
//     user,
//     error
// })

// export default connect(mapStateProps, {getSingleUser})(Header)
