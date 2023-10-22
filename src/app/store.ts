import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/userSlice'
import channelReducer from '../features/channelSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        channel: channelReducer,
    }
});

export type AppDispatch = typeof store.dispatch;        // useDispatchの型を指定
export type RootState = ReturnType<typeof store.getState>;  // useSelectorで使うための現在の状態型を指定.

// 型指定したdispatch, つまりAppDispathを定義
// 型指定したselector, つまりRootStateを定義
// それぞれはhooks.tsで使う.




// JavaScriptなら下記のコードだけで済む.
{/* 
import { configureStore } from "@reduxjs/toolkit";
import  cartReducer from "./features/cart/CartSlice";
import modalReducer from './features/modal/ModalSlice'


export const store = configureStore({
    reducer: {
        cart: cartReducer,
        modal: modalReducer
    },
})
*/}