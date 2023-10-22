import React from "react";
import "./SidebarChannel.scss";
import { DocumentData } from "firebase/firestore";
import { useAppDispatch } from "../../app/hooks";
import { setChannelInfo } from "../../features/channelSlice";

type Props = {
  id: string;
  channel: DocumentData; //useCollection.tsxの17行目、interface ChannelでChannels型定義ですでに指定．
};

{
  /*
  <SidebarChannel>は、"# JavaScript"などと存在するチャンネル名表示するコンポーネント
  それぞれのチャンネル名をクリックすることで、dispatchしてchannelSlice.tsの中のリデューサー
  を発火し、channelNameやChannelId状態変数を更新する．
  */
}

// Sideba.tsの120行目<SidebarChannel channel={channel} id={channel.id} key={channel.id} />
// という風に<SidebaChannel>コンポーネントに引数渡してる．
const SidebarChannel = (props: Props) => {
  const { id, channel } = props;
  // console.log(channel)
  const dispatch = useAppDispatch();

  return (
    <div
      className="sidebarChannel"
      onClick={() =>
        // console.log(channel) // [channel {channel: channelName:"JavaScript", id:"2jQDDE384OVBNTfEJDQY"}]として表示

        dispatch(
          // ↓ channelSlice.tsの中のリデューサーのアクションsetChannelInfo({})
          setChannelInfo({
            channelId: id,
            channelName: channel.channel.channelName, // 上記コンソールログ参照
          })
        )
      }
    >
      <h4>
        <span className="sidebarChannelHash">#</span>
        {channel.channel.channelName}
      </h4>
    </div>
  );
};

export default SidebarChannel;
