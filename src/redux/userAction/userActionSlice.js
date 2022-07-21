import { createSlice } from "@reduxjs/toolkit";

const accounts =
  localStorage.getItem("accounts") !== null
    ? JSON.parse(localStorage.getItem("accounts"))
    : [];

const initialState = {
  isToggleSignUp: false,
  accounts: accounts,
};

export const userAction = createSlice({
  name: "userAction",
  initialState,
  reducers: {
    toggleSignUp: (state) => {
      state.isToggleSignUp = !state.isToggleSignUp;
    },
    signUp: (state, action) => {
      const newUser = action.payload;
      state.accounts = [
        ...state.accounts,
        {
          id: state.accounts.length + 1,
          ...newUser,
        },
      ];
      localStorage.setItem("accounts", JSON.stringify(state.accounts));
      console.log(state.accounts);
    },
  },
});
export const { toggleSignUp, signUp } = userAction.actions;
export default userAction.reducer;
