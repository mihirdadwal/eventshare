import express from 'express';

import * as eventController from '../controllers/event_controller.js';

const router = express.Router();

router.route('/')
    .get(eventController.find) //invoking find method
    .post(eventController.post); //invoking post method

router.route('/:id')
    .get(eventController.get)
    .put(eventController.put)
    .delete(eventController.remove);

    export default router;
    