import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateOrderStatusService } from "../services/UpdateOrderStatusService";

interface UpdateOrderStatusBody {
  orderId: string;
  status: string;
}

class UpdateOrderStatusController {
  async handle(request: FastifyRequest<{ Body: UpdateOrderStatusBody }>, reply: FastifyReply) {
    const { orderId, status } = request.body;

    const updateOrderStatusService = new UpdateOrderStatusService();
    const order = await updateOrderStatusService.execute(orderId, status);

    // Emitir evento via socket.io
    request.server.io.emit('orderStatusUpdated', { orderId, status });

    reply.send(order);
  }
}

export { UpdateOrderStatusController };
