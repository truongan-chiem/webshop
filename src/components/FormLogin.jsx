import React from "react";

import { Link } from "react-router-dom";
import Button from "./Button";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

const FormLogin = (props) => {
  const isSignUp = useSelector((state) => state.userAction.isToggleSignUp);

  const accounts = useSelector((state) => state.userAction.accounts);

  const arrAccounts = [];
  accounts.forEach((account) => arrAccounts.push(account.account));
  console.log(arrAccounts);
  const formik = useFormik({
    initialValues: {
      loginAccount: "",
      loginPassword: "",
    },
    validationSchema: Yup.object({
      loginAccount: Yup.string()
        .required("Bắt buộc!")
        .min(6, "Tối thiểu 6 kí tự!")
        .oneOf(arrAccounts, "Tài khoản không tồn tại !"),
      loginPassword: Yup.string()
        .required("Bắt buộc!")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
          "Tối thiểu 8 kí tự bao gồm 1 số và 1 chữ!"
        ),
    }),
    onSubmit: (values, { resetForm }) => {
      console.log(values);
      resetForm();
    },
  });

  return (
    <div className={`profile__form ${isSignUp ? "changeSignup" : ""}`}>
      <h2 className="profile__form__title">Đăng nhập</h2>
      <form className="profile__form__content" onSubmit={formik.handleSubmit}>
        <div className="profile__form__content__item">
          <div className="profile__form__content__item__input">
            <input
              required
              type="text"
              id="login-account"
              name="loginAccount"
              onChange={formik.handleChange}
              value={formik.values.loginAccount}
            />
            <label htmlFor="login-account">Tài khoản</label>
          </div>
          <div className="profile__form__content__item__error">
            {formik.errors.loginAccount && formik.touched.loginAccount
              ? formik.errors.loginAccount
              : ""}
          </div>
        </div>

        <div className="profile__form__content__item">
          <div className="profile__form__content__item__input">
            <input
              required
              id="login-password"
              type="password"
              name="loginPassword"
              onChange={formik.handleChange}
              value={formik.values.loginPassword}
            />
            <label htmlFor="login-password">Mật khẩu</label>
          </div>
          <div className="profile__form__content__item__error">
            {formik.errors.loginPassword && formik.touched.loginPassword
              ? formik.errors.loginPassword
              : ""}
          </div>
        </div>

        <div className="profile__form__content__forget">
          <Link to="/profile/forgetpass">Quên mật khẩu ?</Link>
        </div>
        <div className="profile__form__content__btn">
          <Button>Đăng nhập</Button>
        </div>
      </form>
      <h3 className="profile__form__anotherlogin">Hoặc đăng nhập với</h3>
      <div className="profile__form__icon">
        <i className="bx bxl-google google"></i>
        <i className="bx bxl-facebook-circle facebook"></i>
        <i className="bx bxl-linkedin-square linkedin"></i>
      </div>
    </div>
  );
};

export default FormLogin;
