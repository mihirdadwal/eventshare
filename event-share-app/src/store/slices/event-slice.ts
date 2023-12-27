import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import Event from '../../models/event';
import { AppState } from '../index';

export type EventState = Event[];
const initialState: EventState = [];
export const eventSlice = createSlice({
    name: 'events',
    initialState: initialState,
    reducers: {
        loadEvents: (state, action: PayloadAction<EventState>) => {
            return action.payload;
        }
    }
});
export const { loadEvents } = eventSlice.actions;
export const searchEvents = (query: string): ((state: AppState) => EventState) => {
    return (state: AppState) => state.events.filter(c => c.Event_Name.toLowerCase().startsWith(query.toLowerCase()));
    // event.Event_Name.toLowerCase().startsWith(searchTerm.toLowerCase())

}
// export const findById = (id: string | undefined): ((state: AppState) => Event | undefined) => {
//     return (state: AppState) => state.events.find(c => id && c._id === id);
// }
export const findById = (query: string): ((state: AppState) => EventState) => {
    return (state: AppState) => state.events.filter(c => c._id.toLowerCase().startsWith(query.toLowerCase()));
}
export default eventSlice.reducer;