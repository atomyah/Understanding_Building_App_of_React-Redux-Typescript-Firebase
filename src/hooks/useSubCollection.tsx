// Chat.tsxにコーディングしていたimport～からuseEffect()までの塊をリファクタリングして
// useSubColloection.tsxとして分離させた.

import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  onSnapshot,
  DocumentData,
  Query,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { useAppSelector } from "../app/hooks";

// channelsステート変数に型指定するための型定義
interface Channels {
  id: string;
  channel: DocumentData; // Firebaseから取ってきた型名
}

interface Messages {
  timestamp: Timestamp;
  message: string;
  user: {
    // userの型指定はTypes.tsからコピー
    uid: string;
    photo: string;
    email: string;
    displayName: string;
  };
}

//           ↓ Chat.tsxではconst { subDocuments: messages } = useSubCollection("channels", "messages");
const useSubCollection = (
  CollectionName: string, // 引数
  subCollectionName: string // 引数
) => {
  const channelId = useAppSelector((state) => state.channel.channelId);
  const [subDocuments, setSubDocuments] = useState<Messages[]>([]);

  useEffect(() => {
    let collectionRef = collection(
      db,
      CollectionName, // どのチャンネルから取ってくるか．
      String(channelId), // どのチャンネルから取ってくるか．
      subCollectionName // どのサブコレクションから取ってくるか．
    );

    // さらにcollectionRefを降順にする必要あり↓
    const collectionRefOrderBy = query(
      collectionRef,
      orderBy("timestamp", "desc")
    );

    onSnapshot(collectionRefOrderBy, (snapshot) => {
      let results: Messages[] = [];
      snapshot.docs.forEach((doc) => {
        results.push({
          timestamp: doc.data().timestamp,
          message: doc.data().message,
          user: doc.data().user,
        });
      });
      setSubDocuments(results);
      // console.log(results); //存在するメッセージを[0: {message: "こんにちは",timestamp: Timestamp:{nanosecond:614000000,second:1697788377},user:{displayName: "Atom Yah",email:"@gmail.com",photo:"https://lh3.googleusercontent.com...",uid:"SUGHQU0kJQTRvzHRxn7e8UxCAPg2"}}]の形式ですべて表示．
    });
  }, [channelId]);

  return { subDocuments };
};

export default useSubCollection;
