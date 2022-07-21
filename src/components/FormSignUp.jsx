import React from "react";
import Button from "./Button";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import { signUp } from "../redux/userAction/userActionSlice";
import * as Yup from "yup";

const FormLogin = (props) => {
  const dispatch = useDispatch();

  const isSignUp = useSelector((state) => state.userAction.isToggleSignUp);

  const accounts = useSelector((state) => state.userAction.accounts);

  const arrAccount = [];
  accounts.forEach((account) => arrAccount.push(account.account));

  const formik = useFormik({
    initialValues: {
      account: "",
      password: "",
      repassword: "",
    },
    validationSchema: Yup.object({
      account: Yup.string()
        .required("Bắt buộc!")
        .min(6, "Tối thiểu 6 kí tự!")
        .notOneOf(arrAccount, "Tài khoản đã tồn tại!"),
      password: Yup.string()
        .required("Bắt buộc!")
        .matches(
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
          "Tối thiểu 8 kí tự bao gồm 1 số và 1 chữ!"
        ),
      repassword: Yup.string()
        .required("Bắt buộc!")
        .oneOf([Yup.ref("password"), null], "Mật khẩu không trùng khớp!"),
    }),
    onSubmit: (values, { resetForm }) => {
      resetForm();
      const newUser = {
        account: values.account,
        password: values.password,
      };
      dispatch(signUp(newUser));
    },
  });
  return (
    <div className={`profile__form signup ${!isSignUp ? "changeLogin" : ""}`}>
      <h2 className="profile__form__title">Đăng kí</h2>
      <form className="profile__form__content" onSubmit={formik.handleSubmit}>
        <div className="profile__form__content__item">
          <div className="profile__form__content__item__input">
            <input
              required
              type="text"
              id="account"
              name="account"
              onChange={formik.handleChange}
              value={formik.values.account}
            />
            <label htmlFor="account">Tên tài khoản</label>
          </div>

          <div className="profile__form__content__item__error">
            {formik.errors.account && formik.touched.account
              ? formik.errors.account
              : ""}
          </div>
        </div>

        <div className="profile__form__content__item">
          <div className="profile__form__content__item__input">
            <input
              required
              id="password"
              type="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <label htmlFor="password">Mật khẩu</label>
          </div>

          <div className="profile__form__content__item__error">
            {formik.errors.password && formik.touched.password
              ? formik.errors.password
              : ""}
          </div>
        </div>

        <div className="profile__form__content__item">
          <div className="profile__form__content__item__input">
            <input
              required
              id="repassword "
              type="password"
              name="repassword"
              onChange={formik.handleChange}
              value={formik.values.repassword}
            />
            <label htmlFor="repassword ">Nhập lại mật khẩu</label>
          </div>

          <div className="profile__form__content__item__error">
            {formik.errors.repassword && formik.touched.repassword
              ? formik.errors.repassword
              : ""}
          </div>
        </div>

        <div className="profile__form__content__btn">
          <Button>Đăng kí</Button>
        </div>
      </form>
      <h3 className="profile__form__anotherlogin">Hoặc đăng kí với</h3>
      <div className="profile__form__icon">
        <i className="bx bxl-google google"></i>
        <i className="bx bxl-facebook-circle facebook"></i>
        <i className="bx bxl-linkedin-square linkedin"></i>
      </div>
    </div>
  );
};

export default FormLogin;
