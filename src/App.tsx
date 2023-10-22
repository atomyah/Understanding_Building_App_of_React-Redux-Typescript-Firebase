import React, { useEffect } from "react";
import "./App.scss";
import Sidebar from "./components/Sidebar/Sidebar";
import Chat from "./components/chat/Chat";
import Login from "./components/login/Login";
import { useSelector } from "react-redux";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { auth } from "./firebase";
import { login, logout } from "./features/userSlice";
// import { ErrorBoundary } from "react-error-boundary";
// import { ErrorFallback } from "./utils/ErrorFallBack";

function App() {
  //store.jsに複数のreducerを登録したので、state.userではなくstate.user.userとなった．
  const user = useAppSelector((state) => state.user.user);
  // const user = null;

  console.log(user); // uid, displayName, email, photoが表示される

  const dispath = useAppDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((loginUser) => {
      // Firebaseのautoに用意されているonAuthStateChanged
      // → 認証状態が変化したら発火して変数loginUserの情報を取ってくる（loginUserにはGoogleアカウントのUserImple情報が入ってる).
      // console.log(loginUser); // ログインしているとUserImplというオブジェクトがコンソールに表示される
      if (loginUser) {
        dispath(
          login({
            // ↓これらの情報はFirebase.authが提供している（UserImplの中にあるのがわかる）
            // userSlice.tsのreducerの中13行目"state.user = action.payload;"にあるpayloadになる.
            // つまり下記user情報をloginアクションに渡している．
            uid: loginUser.uid,
            photo: loginUser.photoURL,
            email: loginUser.email,
            displayName: loginUser.displayName,
          })
        );
      } else {
        dispath(logout()); // dispatch(logout). useSliceより
      }
    });
  }, [dispath]); // 発火のタイミングはdispatch

  return (
    <div className="App">
      {user ? (
        <>
          {/* <ErrorBoundary FallbackComponent={ErrorFallback}> */}
          <Sidebar />
          {/* </ErrorBoundary> */}

          <Chat />
        </>
      ) : (
        <>
          <Login />
        </>
      )}
    </div>
  );
}

export default App;
