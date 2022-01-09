import {configureStore} from '@reduxjs/toolkit';
import systemReducer from '../components/Redux/System/systemSlice';
import walletsReducer from '../components/Redux/Wallets/walletsSlice';

export const store = configureStore({
  reducer: {
    system: systemReducer,
    wallets: walletsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
