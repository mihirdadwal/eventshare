import { configureStore } from "@reduxjs/toolkit";
import { eventSlice } from './slices/event-slice'
import IDreducer from './slices/savedEvent-slice'

 export const store = configureStore({
    reducer: {
        [eventSlice.name]: eventSlice.reducer,
        ID: IDreducer,
    }
 });

export type AppStore = typeof store;
export type AppState = ReturnType<AppStore['getState']>;
export type AppDispatch = typeof store.dispatch;
