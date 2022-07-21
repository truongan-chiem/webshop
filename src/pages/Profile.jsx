import React from "react";
import Button from "../components/Button";
import logo from "../assets/images/logosignup.jpg";
import FormLogin from "../components/FormLogin";
import FormSignUp from "../components/FormSignUp";
import { useDispatch, useSelector } from "react-redux";
import { toggleSignUp } from "../redux/userAction/userActionSlice";

const Profile = (props) => {
  const dispatch = useDispatch();
  const isSignUp = useSelector((state) => state.userAction.isToggleSignUp);

  return (
    <div className="profile">
      <FormLogin />
      <FormSignUp />

      <div className="profile__right">
        <div className={`profile__right__title ${isSignUp ? "change" : ""}`}>
          Bạn chưa có tài khoản?
        </div>
        <div className={`profile__right__title ${!isSignUp ? "change" : ""}`}>
          Đăng nhập nè!
        </div>
        <div className="profile__right__image">
          <img src={logo} alt="" />
        </div>
        <div className="profile__right__btn">
          <Button onClick={() => dispatch(toggleSignUp())}>
            {isSignUp ? "Đăng nhập" : "Đăng ký"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
