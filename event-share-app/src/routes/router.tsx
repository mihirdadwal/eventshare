import Root from './Root';
import App from '../App';
import PageError from './Errors/PageError';
import { createBrowserRouter, redirectDocument } from 'react-router-dom';

export default createBrowserRouter([
    {
        path: '/service-worker.js',
        loader: () => redirectDocument("/service-worker.js")

    },
    {
        path: '/',
        element: <Root />,
        errorElement: <PageError />,
        children: [
            {
                element: <App />,
                index: true
            }
        ]
    }
]);