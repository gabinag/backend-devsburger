import Fastify from 'fastify';
import cors from '@fastify/cors';
import socketio from 'fastify-socket.io';
import { routes } from './routes';

const app = Fastify({ logger: true });

app.setErrorHandler((error, request, reply) => {
    reply.code(400).send({ message: error.message });
});

app.register(cors);
app.register(socketio, {
  cors: {
    origin: "*",
  }
});

app.register(routes);

app.ready().then(() => {
  app.io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
});

const start = async () => {
    try {
        await app.listen({ port: 3333 });
        console.log('Server listening on http://localhost:3333');
    } catch (error) {
        app.log.error(error);
        process.exit(1);
    }
};

start();
