import { FastifyRequest, FastifyReply } from "fastify";
import { CreateOrderService } from "../services/CreateOrderService";

class CreateOrderController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, phone, address, paymentMethod, items, status } = request.body as {
      name: string;
      phone: string;
      address: string;
      paymentMethod: string;
      status: string;
      items: Array<{
        productId: string;
        quantity: number;
      }>;
    };

    const orderService = new CreateOrderService();
    const order = await orderService.execute({ name, phone, address, paymentMethod, items, status });

    reply.send(order);
  }
}

export { CreateOrderController };
