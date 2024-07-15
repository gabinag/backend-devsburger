import { FastifyRequest, FastifyReply } from "fastify";
import { ListOrderService } from "../services/ListOrderService";

class ListOrderController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.params as { id: string };

        try {
            const listOrdersService = new ListOrderService();
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

export { ListOrderController };
