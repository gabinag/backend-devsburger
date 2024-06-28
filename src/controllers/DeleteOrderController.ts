import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteOrderService } from '../services/DeleteOrderService'

class DeleteOrderController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.query as { id: string };

        const orderService = new DeleteOrderService();

        const order = await orderService.execute({ id })

        reply.send(order);

    }
}

export { DeleteOrderController }