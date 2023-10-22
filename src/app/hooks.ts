import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "./store"

// まあ、何書いてっるかわからんが公式ドキュメント通り.
// store.jsで型指定したdispatch(AppDispatch)とselector(RootState)を作り、ここでさらに
// それらを型指定したものを型指定してフックス(useAppDispatch, useAppSelector)を作った.
export const useAppDispatch: () => AppDispatch = useDispatch    //store.jsで作ったAppDispatch型
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector  //store.jsで作ったRootState型

// ↑ App.tsで使う。