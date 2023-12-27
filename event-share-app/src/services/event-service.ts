import Event from '../models/event';
import newEvent from '../models/newEvent';
import * as baseService from './base-service';

const eventResourcePath = '/event';

export const search = async(): Promise<Event[]> => {
    const events = baseService.search<Event>(eventResourcePath,{});
    return events;
}


export const updateEvent = async (id: string, updatedEvent: Event): Promise<Event> => {
    const updatedData = await baseService.update<Event>(eventResourcePath, id, updatedEvent);
    return updatedData;
}





// Function to delete an event
export const deleteEvent = async (id: string): Promise<void> => {
    await baseService.remove<Event>(eventResourcePath, id);
}

// Function to get events (similar to search, no change here)
export const getEvents = async (): Promise<Event[]> => {
    const events = await baseService.search<Event>(eventResourcePath, {});
    return events;
}

export const addEvent = async (newEvent: newEvent): Promise<newEvent> => {
    const createdEvent = await baseService.create<newEvent>(eventResourcePath, newEvent);
    return createdEvent;
}


