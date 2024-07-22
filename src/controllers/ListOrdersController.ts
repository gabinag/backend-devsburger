import { FastifyRequest, FastifyReply } from "fastify";
import { ListOrdersService } from "../services/ListOrdersService";

interface QueryParams {
  status?: string;
}

class ListOrdersController {
  async handle(request: FastifyRequest<{ Querystring: QueryParams }>, reply: FastifyReply) {
    const { status } = request.query;
    const listOrdersService = new ListOrdersService();
    const orders = await listOrdersService.execute(status);
    reply.send(orders);
  }
}

export { ListOrdersController };
