import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateProductService } from '../services/UpdateProductService';

class UpdateProductController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        
        const { id } = request.query as { id: string };
        const { name, price, description, image } = request.body as { name: string; price: number; description: string, image: string };

        if (!id) {
            reply.status(400).send({ error: "ID do produto é obrigatório" });
            return;
        }

        const productService = new UpdateProductService();

        const updatedProduct = await productService.execute({ id, name, price, description, image });

        reply.send(updatedProduct);

    }
}

export { UpdateProductController };
