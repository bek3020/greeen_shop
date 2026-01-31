import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { AppDispatch, RootState } from "../../redux/store";

export const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useReduxDispatch = () => useDispatch<AppDispatch>();
