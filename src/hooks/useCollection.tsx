// Sidebar.tsxにコーディングしていたimport～からuseEffect()までの塊をリファクタリングして
// useColloection.tsxとして分離させた.

import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  onSnapshot,
  DocumentData,
  Query,
} from "firebase/firestore";
import { db } from "../firebase";

// channelsステート変数に型指定するための型定義
interface Channels {
  id: string;
  channel: DocumentData; // Firebaseから取ってきた型名
}

//                    ↓ 引数dataにはSidebar.tsx35行目から渡された"channels"が入ってる
const useCollection = (data: string) => {
  const [documents, setDocuments] = useState<Channels[]>([]);

  useEffect(() => {
    //////// ここからFirestoreのonSnapshotでデータを取ってくるコード ///////
    const collectionRef: Query<DocumentData> = query(collection(db, data)); //← 引数dataにはSidebar.tsx35行目から渡された"channels"が入ってる

    onSnapshot(collectionRef, (querySnapshot) => {
      // Firebaseのコレクションデータをリアルタイムで取得する.onSnapshot(q,(querySnapshot) => {})
      const channelResults: Channels[] = []; // channelResultsにChannel[]の型を指定
      querySnapshot.docs.forEach((doc) =>
        // console.log(doc.id, doc.data())
        channelResults.push({
          id: doc.id,
          channel: doc.data(),
        })
      );
      setDocuments(channelResults);
    });
  }, []);
  ////// ↑ここまで↑/////

  return { documents };
};

export default useCollection;
