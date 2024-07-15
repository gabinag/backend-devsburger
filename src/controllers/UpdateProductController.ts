import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateProductService } from '../services/UpdateProductService';
import { Category } from "@prisma/client";

const validCategories = ["HAMBURGUERES", "COMBOS", "ACOMPANHAMENTOS", "BEBIDAS"];

class UpdateProductController {
    async handle(request: FastifyRequest, reply: FastifyReply) {
        
        const { id } = request.query as { id: string };
        const { name, price, description, image, category } = request.body as { name: string; price: number; description: string, image: string, category: Category };

        if (!id) {
            reply.status(400).send({ error: "ID do produto é obrigatório" });
            return;
        }

        if (category && !validCategories.includes(category)) {
            reply.status(400).send({ error: 'Categoria inválida' });
            return;
        }

        const productService = new UpdateProductService();

        const updatedProduct = await productService.execute({ id, name, price, description, image, category });

        reply.send(updatedProduct);

    }
}

export { UpdateProductController };
