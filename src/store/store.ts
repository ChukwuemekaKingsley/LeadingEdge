// Copyright iSELL 💳 2022
// 17 U.S.C §§ 101-1511

//importing relevant modules + functions

import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./user/user.reducer";
import alertModalReducer from "./alert/alert.modal.reducer";
import errorMessageReducer from "./error-messages/error-message.reducer";
import basketReducer from "./basket/basket";

const presistConfig = {
  key: "main-root",
  storage,
};

const cartReducer = persistReducer(presistConfig, basketReducer);
const userReduce = persistReducer(presistConfig, userReducer);

//creating store
export const store = configureStore({
  reducer: {
    currentUser: userReduce,
    basket: cartReducer,
    alert: alertModalReducer,
    error: errorMessageReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const Persistor = persistStore(store);

export { Persistor };
// exporting types for dispatch and state
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
