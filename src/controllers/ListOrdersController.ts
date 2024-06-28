import { FastifyRequest, FastifyReply } from "fastify";
import { ListOrdersService } from "../services/ListOrdersService";

class ListOrdersController {
  async handle(request: FastifyRequest, reply: FastifyReply) {
    const listOrdersService = new ListOrdersService();
    const orders = await listOrdersService.execute();
    reply.send(orders);
  }
}

export { ListOrdersController };
