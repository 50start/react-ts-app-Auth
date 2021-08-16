import { FormControl, List, TextField } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import styles from "./App.module.css";
import { db, auth } from "./firebase";
import AddToPhotosIcon from "@material-ui/icons/AddAPhoto";
import { TaskItem } from "./TaskItem";
import { makeStyles } from "@material-ui/styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles({
  field: {
    marginTop: 30,
    marginBottom: 20,
  },
  list: {
    margin: "auto",
    width: "40%",
  },
});

const App: React.FC = (props: any) => {
  const [tasks, setTasks] = useState([{ id: "", title: "" }]);
  const [input, setInput] = useState("");
  const classes = useStyles();

  useEffect(() => {
    //onAuthStateChanged 何らかのユーザー認証に変化があった場合(user)でユーザー情報を取得
    const unSub = auth.onAuthStateChanged((user) => {
      // !user=>userが存在しない場合 ログインページに遷移
      !user && props.history.push("login");
    });
    return () => {
      unSub();
    };
  });

  //アプリが立ち上がったときにFirebaseにアクセスして存在するデータのタスクの内容を取得したい
  //アプリが立ち上がった最初の一回だけデーターを読みにいくので第二引数は[]
  useEffect(() => {
    //見たいcollection名(tasks)を取得 onSnapshot => 変化があるたびデータベースの内容を監視、取得、更新している　引数にsnapshotを取得
    const unsub = db.collection("tasks").onSnapshot((snapshot) => {
      //setTasksに格納  オブジェクトを作り直して配列の形でsetTaskにDBから取ってきた idとtitleの値を格納　dataのフィールド名属性：titleを取得
      setTasks(
        snapshot.docs.map((doc) => ({ id: doc.id, title: doc.data().title }))
      );
    });
    return () => unsub();
  }, []);

  const newTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    //属性title: 値:input idは自動採番
    db.collection("tasks").add({ title: input });
    setInput(""); //次のインプットの備えて初期化
  };

  return (
    <div className={styles.app__root}>
      <h1>TODO APP REACT FIREBASE</h1>
      <button
        className={styles.app__logout}
        onClick={async () => {
          try {
            await auth.signOut();
            props.history.push("login");
          } catch (error) {
            alert(error.message);
          }
        }}
      >
        <ExitToAppIcon />
      </button>
      <br />
      <FormControl>
        <TextField
          className={classes.field}
          InputLabelProps={{
            shrink: true,
          }}
          label="New Task?"
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
        />
      </FormControl>{" "}
      {/**disabled={!input} => input入力がなければボタンは押せません*/}
      <button className={styles.app__icon} disabled={!input} onClick={newTask}>
        <AddToPhotosIcon />
      </button>
      <List className={classes.list}>
        {tasks.map((task) => (
          <TaskItem key={task.id} id={task.id} title={task.title} />
        ))}
      </List>
    </div>
  );
};

export default App;
