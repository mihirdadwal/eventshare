import { request } from 'http';
import * as eventService from '../services/event_service.js';
import {setResponse,setErrorResponse} from './response_handler.js'
import { response } from 'express';


//Method for finding an event
export const find = async (request,response) => {
    //Using Try catch for handling any type of error
    try {
        const params = {...request.query};
        const event = await eventService.search(params);
        setResponse(event,response);
    } catch (error) {
        setErrorResponse(error,response);
    }

}

//Method for Post Operation for Adding new Event
export const post = async (request,response) => {
    //Using Try catch for handling any type of error
    try {
        const newEvent = {...request.body};
        const event = await eventService.save(newEvent);
        setResponse(event,response);
    } catch(error) {
        setErrorResponse(error,response);
    }
}

//Method to fetch existing event
export const get = async (request,response) => {
    //Using Try catch for handling any type of error
    try {
        const id = request.params.id;
        const event = await eventService.findById(id);
        setResponse(event,response);
    } catch(error) {
        setErrorResponse(error,response);
    }
}

//Method to Update existing events
export const put = async (request,response) => {
    //Using Try catch for handling any type of error
    try {
        const id = request.params.id;
        const updatedEvent = {...request.body};
        const event = await eventService.update(updatedEvent,id);
        setResponse(event,response);
    } catch(error) {
        setErrorResponse(error,response);
    }
}


//Method to remove Any Event
export const remove = async (request,response) => {
    //Using Try catch for handling any type of error
    try {
        const id = request.params.id;
        const event = await eventService.remove(id);
        setResponse({},response);
    } catch(error) {
        setErrorResponse(error,response);
    }
}
