import * as socket from 'socket.io';
import { socketPort } from '../config/server';
import routes from '../config/routes';

export default class SocketRouter {
    constructor() {
        this.io = false;
    }

    makeRoutes(client, routesArr, controller) {
        controller.setIo(this.io);

        routesArr.forEach(route => {
            let method = 'action' + route[0].toUpperCase() + route.slice(1);

            if (typeof controller[method] !== 'function') {
                console.log('method for route ' + route + ' not found. Expected method ' + method + ' to exist in controller ' + controller.constructor.name);

                return false;
            }

            client.on(route, (data, callback) => {
                controller[method](client, data, callback)
            });
        })
    }

    serve() {
        this.io = socket.listen(socketPort);

        console.log('listening on port ', socketPort);
        console.log('to change socket port, edit config/server.js');

        this.io.on('connection', (client) => {
            routes.forEach(route => {
                this.makeRoutes(client, route.routes, route.controller);
            });
        });
    }
}
