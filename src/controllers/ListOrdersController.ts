import { FastifyRequest, FastifyReply } from "fastify";
import { ListOrdersService } from "../services/ListOrdersService";
import { QueryParams } from "../types";

class ListOrdersController {
  async handle(request: FastifyRequest<{ Querystring: QueryParams }>, reply: FastifyReply) {
    const { status } = request.query;
    const listOrdersService = new ListOrdersService();
    const orders = await listOrdersService.execute(status);
    reply.send(orders);
  }
}

export { ListOrdersController };
