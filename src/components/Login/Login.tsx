"use client";
import React from "react";
import st from "./Login.module.scss";

import LoginForm from "./LoginForm/LoginForm";

const Login = () => {
  return (
    <div className={st.wrapper}>
      <div className={st.block}>
        <div className={st.head}>
          <div className={st.title}>Вход</div>
          <div className={st.subTitle}>Перейдите в приложение</div>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
