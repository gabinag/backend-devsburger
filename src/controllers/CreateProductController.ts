import { FastifyRequest, FastifyReply } from "fastify";
import { CreateProductService } from '../services/CreateProductService';

class CreateProductController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { name, description, price, image } = request.body as { name: string, description: string, price: number, image: string };
        
        const productService = new CreateProductService()
        const product = await productService.execute({ name, description, price, image });

        reply.send(product)
    }
}

export { CreateProductController }