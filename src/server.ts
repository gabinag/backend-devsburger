import Fastify from 'fastify';
import cors from '@fastify/cors';
import socketio from 'fastify-socket.io';
import { routes } from './routes';

const app = Fastify({ logger: true });

app.setErrorHandler((error, request, reply) => {
    reply.code(400).send({ message: error.message });
});

// Configuração do CORS
app.register(cors, {
  origin: ["http://127.0.0.1:5174"], 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
});

// Configuração do Socket.io
app.register(socketio, {
  cors: {
    origin: ["http://127.0.0.1:5174"], 
    methods: ["GET", "POST"]
  }
});

app.register(routes);

app.ready().then(() => {
  app.io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('orderStatusUpdated', (orderId) => {
      app.io.emit('orderStatusUpdated', orderId);
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
