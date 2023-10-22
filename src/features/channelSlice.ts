import { createSlice } from '@reduxjs/toolkit'
import { initalChannelState } from '../Types';

const initialState: initalChannelState = {
    channelId: null,
    channelName: null,
}

export const channelSlice = createSlice({
    name: 'channel',
    initialState,
    reducers:{
        setChannelInfo: (state, action) => {
            state.channelId = action.payload.channelId;
            state.channelName = action.payload.channelName;
        }
    }
})

// console.log(channelSlice)

export const { setChannelInfo } = channelSlice.actions;
export default channelSlice.reducer

//スライスを作ったら必ずstore.jsに追記する！