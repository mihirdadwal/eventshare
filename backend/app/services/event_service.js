import events from '../models/event.js';

//Function to Search Events

export const search = async (params = {}) => {
    const event = await events.find(params).exec();
    return event;
}

//Function to create a New Event
export const save = async (newEvent) => {
    const event = new events(newEvent); //Creating new event Object
    return await event.save();
}

//Function to Update event
export const update = async (updatedEvent, id) => {
    const event = await events.findByIdAndUpdate(id, updatedEvent).exec();
    return event;
}

//Function to delete event
export const remove = async (id) => {
    return await events.findByIdAndDelete(id).exec();
}