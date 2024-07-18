import { FastifyRequest, FastifyReply } from "fastify";
import { ListOrdersService } from "../services/ListOrdersService";

class ListOrdersController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const { status } = request.params as { status: string };
    const listOrdersService = new ListOrdersService();
    const orders = await listOrdersService.execute(status);
    reply.send(orders);
  }
}

export { ListOrdersController };
