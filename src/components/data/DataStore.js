import { createStore } from "redux";
import { ShopReducer } from "./ShopReducer";
import { CommonReducer } from "./CommonReducer";
import { CartReducer } from "./CartReducer";
import { applyMiddleware } from "redux";
import { asyncActions } from "./AsyncMiddleware";

export const MomoCadDataStore = createStore(CommonReducer(ShopReducer, CartReducer), applyMiddleware(asyncActions)); 