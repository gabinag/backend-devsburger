import { FastifyRequest, FastifyReply } from "fastify";
import { CreateProductService } from '../services/CreateProductService';
import { Category } from "@prisma/client";

class CreateProductController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        const { name, description, price, image, category } = request.body as { name: string, description: string, price: number, image: string, category: Category };
        
        const productService = new CreateProductService()
        const product = await productService.execute({ name, description, price, image, category });

        reply.send(product)
    }
}

export { CreateProductController }