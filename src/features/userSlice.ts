import { createSlice } from '@reduxjs/toolkit'
import { initalUserState } from '../Types'; // initalUserStateはTypes.tsで設定した型

const initialState: initalUserState = { // initalUserStateはTypes.tsで設定した型
    user: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState: initialState, // 型宣言してあげている.
    reducers:{
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        }
    }
})

console.log('userSlice.tsの中でuserSliceを表示')
console.log(userSlice)

export const { login, logout } = userSlice.actions;
export default userSlice.reducer
//スライスを作ったら必ずstore.jsに追記する！