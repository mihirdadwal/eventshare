import mongoose from "mongoose";

const Schema = mongoose.Schema;

//Defining Event Schema

const EventSchema = new Schema ({

    Event_Name: {
        type: String,
        require: true
    },
    Target_Audience: {
        type: String,
        require: true
    },
    Date: {
        type: String,
        require: true
    },
    Event_Start_Time: {
        type: String,
        require: true
    },
    Event_End_Time: {
        type: String,
        require: true
    },
    Room_Number: {
        type: String,
        require: false
    },
    Location: {
        type: String,
        require: true
    },
    Description: {
        type: String,
        require: true
    },
    Category: {
        type: String,
        require: true
    },
    Event_Link: {
        type: String,
        require: true
    },
    Organizer: {
        type: String,
        require: true
    },
    Price: {
        type: String,
        require: true
    },
    Save: {
        type: String,
        require: false,
        default: "false" // Optional: Set a default value if needed
    },

},
{
    versionKey: false //Optional Parameter for Version
})

const EventModel = mongoose.model('events', EventSchema);

export default EventModel;
