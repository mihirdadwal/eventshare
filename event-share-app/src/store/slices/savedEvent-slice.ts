import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState } from '../index';

export type IDstate = string[];
const initialState: IDstate = [];

export const savedEvent = createSlice({
  name: 'id',
  initialState: initialState,
  reducers: {
    addID: (state, action: PayloadAction<string>) => {
      state.push(action.payload);
    },
  },
});

export const { addID } = savedEvent.actions;


// export const selectIDs = (): ((state: AppState) => IDstate) => {
//     return (state: AppState) => state.ID;
// };
export const selectIDs = (query: string): ((state: AppState) => IDstate) => {
    return (state: AppState) => state.ID.filter(c => c.toLowerCase().startsWith(query.toLowerCase()));
    // event.Event_Name.toLowerCase().startsWith(searchTerm.toLowerCase())

}
export default savedEvent.reducer;
