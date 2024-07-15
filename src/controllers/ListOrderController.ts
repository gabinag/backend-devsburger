import { FastifyRequest, FastifyReply } from "fastify";
import { ListOrdersService } from "../services/ListOrdersService";

class ListOrdersController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };

        try {
            const listOrdersService = new ListOrdersService();
            const order = await listOrdersService.execute(id);

            if (!order) {
                reply.code(404).send({ message: 'Pedido não encontrado' });
            } else {
                reply.send(order);
            }
        } catch (error) {
            reply.code(500).send({ error });
        }
    }
}

export { ListOrdersController };
