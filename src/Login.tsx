import React, { useState, useEffect } from "react";
import styles from "./Login.module.css";
import { Button, FormControl, TextField, Typography } from "@material-ui/core";
import { auth } from "./firebase";

const Login: React.FC = (props: any) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    //認証が変わるたびにログイン、ログアウトが呼び出される user=>認証情報が入っている
    const unSub = auth.onAuthStateChanged((user) => {
      user && props.history.push("/"); //何らかのuserが存在している時history.push！
    });
    return () => unSub();
  }, [props.history]);

  return (
    <div className={styles.login__root}>
      <h1>{isLogin ? "Login" : "Register"}</h1>
      {/**isLoginがtrueの時は"Login"とタイトル表示*/}
      <br />
      <FormControl>
        <TextField
          InputLabelProps={{ shrink: true }}
          name="email"
          label="E-mail"
          type="email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(e.target.value);
          }}
        />
      </FormControl>
      <br />
      <FormControl>
        <TextField
          InputLabelProps={{ shrink: true }}
          name="password"
          label="Password"
          type="password"
          value={password}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(e.target.value);
          }}
        />
      </FormControl>
      <br />
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={
          isLogin
            ? async () => {
                //loginの場合
                try {
                  //例外処理を作る
                  await auth.signInWithEmailAndPassword(email, password);
                  props.history.push("/");
                } catch (error) {
                  alert(error.message);
                }
                //register(登録)の場合
              }
            : async () => {
                try {
                  await auth.createUserWithEmailAndPassword(email, password);
                  props.history.push("/"); //成功したらルートパスに遷移
                } catch (error) {
                  alert(error.message);
                }
              }
        }
      >
        {isLogin ? "login" : "register"} {/**ボタンに表示される条件式 */}
      </Button>
      <br />
      <Typography align="center">
        {/**Typography 適切なフォント種類を選び、美しく文字を配置すること*/}
        <span onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Create new account?" : "Back to login"}
        </span>
      </Typography>
    </div>
  );
};

export default Login;
