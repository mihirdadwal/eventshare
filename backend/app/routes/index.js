import eventRouter from './event_route.js';

export default (app) => {
    app.use('/event',eventRouter);
    // app.use('/target',targetRouter);
}