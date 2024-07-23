import { FastifyRequest, FastifyReply } from "fastify";
import { CreateProductService, DeleteProductService, UpdateProductService, ListProductsService } from "../services/productService";
import { Category } from "@prisma/client";

export class ProductController {
    async createProduct(request: FastifyRequest, reply: FastifyReply) {
        const { name, description, price, image, category } = request.body as { name: string, description: string, price: number, image: string, category: Category };
        
        const productService = new CreateProductService();
        const product = await productService.execute({ name, description, price, image, category });

        reply.send(product);
    }

    async deleteProduct(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.query as { id: string };

        const productService = new DeleteProductService();
        const product = await productService.execute({ id });

        reply.send(product);
    }

    async updateProduct(request: FastifyRequest, reply: FastifyReply) {
        const { id } = request.query as { id: string };
        const { name, price, description, image, category } = request.body as { name: string; price: number; description: string, image: string, category: Category };

        if (!id) {
            reply.status(400).send({ error: "ID do produto é obrigatório" });
            return;
        }

        const validCategories = ["HAMBURGUERES", "COMBOS", "ACOMPANHAMENTOS", "BEBIDAS"];
        if (category && !validCategories.includes(category)) {
            reply.status(400).send({ error: 'Categoria inválida' });
            return;
        }

        const productService = new UpdateProductService();
        const updatedProduct = await productService.execute({ id, name, price, description, image, category });

        reply.send(updatedProduct);
    }

    async listProducts(request: FastifyRequest, reply: FastifyReply) {
        const listProductsService = new ListProductsService();
        const products = await listProductsService.execute();

        reply.send(products);
    }
}
