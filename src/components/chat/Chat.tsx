import React, { useState, useEffect } from "react";
import "./Chat.scss";
import ChatHeader from "./ChatHeader";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import GifIcon from "@mui/icons-material/Gif";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import ChatMessage from "./ChatMessage";
import { useAppSelector } from "../../app/hooks";
import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  Timestamp,
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../firebase";
import useSubCollection from "../../hooks/useSubCollection";

{
  /*-------------↓↓↓↓↓ リファクタリングでhooks/useSubCollectiont.tsxに移動 ↓↓↓↓↓---------------*/
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
{
  /*-------------↑↑↑↑↑↑ リファクタリングでhooks/useSubCollectiont.tsxに移動 ↑↑↑↑↑↑--------------*/
}

const Chat = () => {
  // store.jsに複数のreducerを登録したのでstate.channelNameでなくstate.channel.channelNameとなった．
  // //64行目<ChatHeader>にpropsで渡す.
  const channelName = useAppSelector((state) => state.channel.channelName);
  // console.log(channelName);

  //フッターにあるchatInputのテキストボックスに入力した値を受け取るステート変数
  const [inputText, setInputText] = useState<string>("");

  // onSnapshotで取ってきたメッセージを格納するmessagesステート変数
  // ↓useSubCollection.txtにリファクタリングしたので（subDocumentsとしてmessagesデータを取ってくるので）要らなくなった行
  //const [messages, setMessages] = useState<Messages[]>([]);

  const channelId = useAppSelector((state) => state.channel.channelId);
  //console.log(channelId); //zV8Ko5yH0URMbW2POdzdとかVN4tsApTvCtE6BNZg98pとかxFVU3f6uCNgF6EiteXUHなどFirestoreのDocumentID

  const user = useAppSelector((state) => state.user.user);

  // リファクタリングuseSubCollection.tsxから取り出し↓
  const { subDocuments: messages } = useSubCollection("channels", "messages");
  {
    /*-------------↓↓↓↓↓ リファクタリングでhooks/useSubCollectiont.tsxに移動 ↓↓↓↓↓---------------*/
  }

  //// ↓↓↓↓↓onSnapshotでFirestoreのメッセージ内容をリアルタイム取得するコード↓↓↓↓↓↓ ////
  // useEffect(() => {
  //   let collectionRef = collection(
  //     db,
  //     "channels", // どのチャンネルから取ってくるか．
  //     String(channelId), // どのチャンネルから取ってくるか．
  //     "messages" // どのサブコレクションから取ってくるか．
  //   );

  //   // さらにcollectionRefを降順にする必要あり↓
  //   const collectionRefOrderBy = query(
  //     collectionRef,
  //     orderBy("timestamp", "desc")
  //   );

  //   onSnapshot(collectionRefOrderBy, (snapshot) => {
  //     let results: Messages[] = [];
  //     snapshot.docs.forEach((doc) => {
  //       results.push({
  //         timestamp: doc.data().timestamp,
  //         message: doc.data().message,
  //         user: doc.data().user,
  //       });
  //     });
  //     setMessages(results);
  //     // console.log(results); //存在するメッセージを[0: {message: "こんにちは",timestamp: Timestamp:{nanosecond:614000000,second:1697788377},user:{displayName: "Atom Yah",email:"@gmail.com",photo:"https://lh3.googleusercontent.com...",uid:"SUGHQU0kJQTRvzHRxn7e8UxCAPg2"}}]の形式ですべて表示．
  //   });
  // }, [channelId]); //サイドバーでどのチャンネル名をクリックしたか(channelIdステートが変更）、で発火させるようにする
  ///----------------- ↑↑↑↑↑ここまで↑↑↑↑↑ -------------///

  {
    /*-------------↑↑↑↑↑↑ リファクタリングでhooks/useSubCollectiont.tsxに移動 ↑↑↑↑↑↑--------------*/
  }

  ///// ------ ↓↓↓↓↓Firestoreのmessageサブコレクションに投稿するコード↓↓↓↓↓↓ ----/////
  const sendMessage = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    //console.log("sendMessage");

    //channelsコレクションの中にあるmessageサブコレクションの中にメッセージ情報を入れる.
    const collectionRef: CollectionReference<DocumentData, DocumentData> =
      collection(
        db,
        "channels",
        String(channelId), //String() channelIdをString型に変換している（キャスト）.
        "messages"
      );

    const docRef: DocumentReference<DocumentData> = await addDoc(
      collectionRef,
      {
        message: inputText,
        timestamp: serverTimestamp(), //Firebaseで用意されている関数.
        user: user,
      }
    );
    setInputText("");
    // console.log(docRef);
  };
  /////----------------- ↑↑↑↑↑ここまで↑↑↑↑↑ --------------/////

  return (
    <div className="chat">
      {/* chatHeader */}
      <ChatHeader channelName={channelName} />

      {/* chatMessage */}
      <div className="chatMessage">
        {messages.map((message, index) => (
          <ChatMessage
            key={index} // messagesは配列なので"index"がkeyとして使える
            message={message.message}
            timestamp={message.timestamp}
            user={message.user}
          />
        ))}

        {/* <ChatMessage />
        <ChatMessage />
        <ChatMessage /> */}
      </div>

      {/* chatInput */}
      <div className="chatInput">
        <AddCircleOutlineIcon />
        <form>
          <input
            type="text"
            placeholder="Udemyへメッセージを送信"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setInputText(e.target.value)
            }
            value={inputText}
          />
          <button
            type="submit"
            className="chatInputButton"
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              sendMessage(e)
            }
          >
            ボタンは使用しない（display: noneとしてボタンをCSSで消す）
          </button>
        </form>

        <div className="chatInputIcons">
          <CardGiftcardIcon />
          <GifIcon />
          <EmojiEmotionsIcon />
        </div>
      </div>
    </div>
  );
};

export default Chat;
