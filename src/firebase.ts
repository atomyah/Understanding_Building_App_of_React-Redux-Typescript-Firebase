// Reduxインストール方法
// npm install @reduxjs/toolkit
// npm install react-redux
// npm install @types/react-redux


// 以下はFirebase設定コード（コンソールの「プロジェクトの概要」→「プロジェクトの設定」画面のコードをコピペ
import { initializeApp } from "firebase/app";

import { getFirestore } from 'firebase/firestore' // Firestoreの準備 'firebase/firestore/lite'ではダメ
import { GoogleAuthProvider, getAuth } from 'firebase/auth' // Fireauthの準備

const firebaseConfig = {
  apiKey: "AIzaSyArHQuKL_gG08TIqmFjjolcY6UGrZxintk",
  authDomain: "discord-clone-udemy-81f0c.firebaseapp.com",
  projectId: "discord-clone-udemy-81f0c",
  storageBucket: "discord-clone-udemy-81f0c.appspot.com",
  messagingSenderId: "853412313157",
  appId: "1:853412313157:web:a20060a798e9f8b2030b2c"
};

const app = initializeApp(firebaseConfig);

// ↓ここから追加↓
const db = getFirestore(app)  // Firestoreの準備
const auth = getAuth(app)     // Fireauthの準備
const provider = new GoogleAuthProvider();  // FireauthのGoogleAuthの準備

export { auth, provider, db }


