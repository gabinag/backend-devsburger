import Fastify from 'fastify';
import cors from '@fastify/cors';
import socketio from 'fastify-socket.io';
import { registerProductRoutes } from './routes/productRoutes';
import { registerOrderRoutes } from './routes/orderRoutes';

const app = Fastify({ logger: true });

registerProductRoutes(app);
registerOrderRoutes(app);

app.setErrorHandler((error, request, reply) => {
    reply.code(400).send({ message: error.message });
});

// Configuração do CORS
app.register(cors, {
  origin: ["http://127.0.0.1:5174", "http://127.0.0.1:5173"], 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
});

// Configuração do Socket.io
app.register(socketio, {
  cors: {
    origin: ["http://127.0.0.1:5174", "http://127.0.0.1:5173"], 
    methods: ["GET", "POST"]
  }
});


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
