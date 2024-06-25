import { FastifyRequest, FastifyReply } from "fastify";
import { CreateOrderService } from "../services/CreateOrderService";

class CreateOrderController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, phone, address, paymentMethod } = request.body as {
      name: string;
      phone: string;
      address: string;
      paymentMethod: string;
    };

    const orderService = new CreateOrderService();
    const order = await orderService.execute({ name, phone, address, paymentMethod });

    reply.send(order);
  }
}

export { CreateOrderController };
