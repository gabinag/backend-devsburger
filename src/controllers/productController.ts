import { FastifyRequest, FastifyReply } from "fastify";
import { CreateProductService, DeleteProductService, UpdateProductService, ListProductsService } from "../services/productService";
import { Category } from "@prisma/client";
import fs from 'fs';
import path from 'path';

export class ProductController {
    async createProduct(request: FastifyRequest, reply: FastifyReply) {
        const data = await request.file(); 
        const { name, description, price, category } = request.body as { name: string, description: string, price: number, category: Category };

        if (!data) {
            return reply.status(400).send({ message: "Arquivo não encontrado no upload" });
        }

        const uploadPath = path.join(__dirname, '..', 'uploads', data.filename);
        const imagePath = `/uploads/${data.filename}`;

        await new Promise((resolve, reject) => {
            const fileStream = fs.createWriteStream(uploadPath);
            data.file.pipe(fileStream);
            fileStream.on('finish', resolve);
            fileStream.on('error', reject);
        });
        
        const productService = new CreateProductService();
        const product = await productService.execute({ name, description, price, image: imagePath, category });

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
