import React, { useEffect, useState } from "react";
import "./Sidebar.scss";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"; // Materialアイコン
import AddIcon from "@mui/icons-material/Add";
import SidebarChannel from "./SidebarChannel";
import MicIcon from "@mui/icons-material/Mic";
import HeadphonesIcon from "@mui/icons-material/Headphones";
import SettingsIcon from "@mui/icons-material/Settings";
import { auth, db } from "../../firebase";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import useCollection from "../../hooks/useCollection";
import { addDoc, collection } from "firebase/firestore";

{
  /*-------------↓↓↓↓↓ リファクタリングでhooks/useCollectiont.tsxに移動 ↓↓↓↓↓---------------*/
}
// import {
//   collection,
//   query,
//   onSnapshot,
//   addDoc,
//   DocumentData,
// } from "firebase/firestore";

// interface Channel {
//   id: string;
//   channel: DocumentData; //34行目のchannel:doc.data()のchannelをマウスオーバーするとDocumentDataと表示される.
// }
{
  /*-------------↑↑↑↑↑↑ リファクタリングでhooks/useCollectiont.tsxに移動 ↑↑↑↑↑↑--------------*/
}

const Sidebar = () => {
  const user = useAppSelector((state) => state.user.user);
  //store.jsに複数のreducerを登録したので、state.userではなくstate.user.userとなった．

  const { documents: channels } = useCollection("channels");
  //↑ リファクタリングしたカスタムフックuseCollectionからreturn { documents }で返ってきたデータの分割代入での取り出し方

  {
    /*-------------↓↓↓↓↓ リファクタリングでhooks/useCollectiont.tsxに移動 ↓↓↓↓↓---------------*/
  }
  // const user = useAppSelector((state) => state.user.user); // storeにアクセスしてuser状態を持って来る.
  // const [channels, setChannels] = useState<Channel[]>([]);

  // //後で使うconst channelName = useAppSelector((state) => state.channel.channelName);

  // //////// ここからFirestoreのonSnapshotでデータを取ってくるコード ///////
  // useEffect(() => {
  //   const q = query(collection(db, "channels"));
  //   onSnapshot(q, (querySnapshot) => {
  //     const channelResults: Channel[] = [];
  //     querySnapshot.forEach((doc) => {
  //       // console.log(doc.id, doc.data()); //ドキュメントIDとチャンネル名が出力
  //       channelResults.push({
  //         id: doc.id, //channelsコレクションのドキュメントID（例：VN4tsApTvCtE6BNZg98p）
  //         channel: doc.data(),
  //       });
  //     });
  //     setChannels(channelResults);
  //   });
  // }, []);
  // ////// ↑ここまで↑/////

  {
    /*-------------↑↑↑↑↑↑ リファクタリングでhooks/useCollectiont.tsxに移動 ↑↑↑↑↑↑--------------*/
  }

  // 後で使う.→ 36行目で使用．const { documents: channels } = useCollection("channels"); //リファクタリングで作ったhooks/useCollection.tsからデータを取ってこれる.ここではchannelsコレクション
  // ↑ useCollectionフックスからreturn { documents }で返ってきたデータの分割代入での取り出し方.

  const addChannel = async () => {
    let channelName: string | null = prompt("新しいチャンネルを作成します"); // prompt()：alert()みたいなもの
    if (channelName) {
      await addDoc(collection(db, "channels"), {
        channelName: channelName,
      });
    }
  };

  // channelNameAtSidebar->長ったらしい変数名だがサイドバーのヘッドにもチャンネル名を入れたかった．
  // 101行目、<h3>{channelNameAtSidebar}</h3>
  const channelNameAtSidebar = useAppSelector(
    (state) => state.channel.channelName
  );

  return (
    <div className="sidebar">
      {/* sidebarLeft */}
      <div className="sidebarLeft">
        <div className="ServerIcon">
          {/* discordIcon.pngファイルはルートのpublicフォルダに入ってる */}
          <img src="./discordIcon.png" alt="" />
        </div>
      </div>

      {/* sidebarright */}
      <div className="sidebarRight">
        {/* sidebarTop */}
        <div className="sidebarTop">
          <h3>{channelNameAtSidebar}</h3>
          {/* ↓Materialの下向きVアイコン */}
          <ExpandMoreIcon />
        </div>

        {/* sidebarChannels */}
        <div className="sidebarChannels">
          <div className="sidebarChannelsHeader">
            <div className="sidebarHeader">
              {/* ↓Materialの下向きVアイコン */}
              <ExpandMoreIcon />
              <h4>プログラミングチャンネル</h4>
            </div>
            {/* ↓Materialの＋アイコン。そしてCSSのsidebarAddIconでは cursor: pointer;を指定 */}
            <AddIcon className="sidebarAddIcon" onClick={() => addChannel()} />
          </div>

          <div className="sidebarChannelList">
            {channels.map((channel) => (
              <SidebarChannel //<SidebarChannel>は、"# JavaScript"などと表示するコンポーネント
                channel={channel}
                id={channel.id}
                key={channel.id}
              />
            ))}
            {/* SidebarChannel.tsにpropsを渡している。SidebarChannel.ts
                        ではpropsから{id, channel}を分割代入で取り出し{channel.channel.channelName}
                        でFirestoreに入力した'React'とか'TypeScript'とかを取り出せている. />
                    <SidebarChannel />
                    <SidebarChannel /> */}
          </div>
        </div>

        <div className="sidebarFooter">
          <div className="sidebarAccount">
            {" "}
            {/*    auth.signOut()はFirebaseの機能．これによりApp.tsxの
            auth.onAuthStateChanged((loginUser)が発火しloginUser変数がNullになり
            dispatch(logout())が発火する＠App.tsx．これによりuserSlice.tsのレディーサーlogout
            が発火し、アクションステートstate.userがNullとなる． */}
            <img src={user?.photo} alt="" onClick={() => auth.signOut()} />
            <div className="accountName">
              <h4>{user?.displayName}</h4>{" "}
              {/*   user?と?を付けるのはuserがNullの可能性があるから
                また、user?と?を付けておかないと「Mull対応できない」とエラーになる */}
              <span>#{user?.uid.substring(0, 6)}</span>
            </div>
          </div>

          <div className="sidebarVoice">
            <MicIcon />
            <HeadphonesIcon />
            <SettingsIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
