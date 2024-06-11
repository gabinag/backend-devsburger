import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteProductService } from '../services/DeleteProductService'

class DeleteProductController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.query as { id: string };

        const productService = new DeleteProductService();

        const product = await productService.execute({ id })

        reply.send(product);

    }
}

export { DeleteProductController }