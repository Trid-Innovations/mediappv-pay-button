import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import createSagaMiddleware from "redux-saga";
import sessionReducer from "./reducers/sessionSlice";
import validateSessionReducer from "./reducers/validateSessionSlice";
import { watcherSaga } from "../saga/rootSaga";

const SagaMiddleware = createSagaMiddleware();

const getMiddlewares = () => {
  return [SagaMiddleware];
};

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).prepend(...getMiddlewares()),
  reducer: {
    session: sessionReducer,
    sessionValidity: validateSessionReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);

SagaMiddleware.run(watcherSaga);

export default store;
