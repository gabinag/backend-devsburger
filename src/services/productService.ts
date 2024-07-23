import { Category } from "@prisma/client";
import prismaClient from "../prisma/index";

interface CreateProductProps {
    name: string;
    description: string;
    price: number;
    image: string;
    category: Category;
}

interface UpdateProductProps {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    category: Category;
}

interface DeleteProductProps {
    id: string;
}

export class CreateProductService {
    async execute({ name, description, price, image, category }: CreateProductProps) {
        if (!name || !description || !price || !image || !category) {
            throw new Error("Preencha todos os campos");
        }

        const product = await prismaClient.product.create({
            data: {
                name,
                description,
                price,
                image,
                category,
            },
        });

        return product;
    }
}

export class DeleteProductService {
    async execute({ id }: DeleteProductProps) {
        if (!id) {
            throw new Error("Solicitação inválida.");
        }

        const findProduct = await prismaClient.product.findFirst({
            where: { id },
        });

        if (!findProduct) {
            throw new Error("Produto não encontrado!");
        }

        await prismaClient.product.delete({
            where: { id: findProduct.id },
        });

        return { message: "Deletado com sucesso!" };
    }
}

export class UpdateProductService {
    async execute({ id, name, price, description, image, category }: UpdateProductProps) {
        if (!id) {
            throw new Error("Solicitação inválida.");
        }

        const findProduct = await prismaClient.product.findFirst({
            where: { id },
        });

        if (!findProduct) {
            throw new Error("Produto não encontrado!");
        }

        const updatedProduct = await prismaClient.product.update({
            where: { id: findProduct.id },
            data: {
                name: name || findProduct.name,
                price: price || findProduct.price,
                description: description || findProduct.description,
                image: image || findProduct.image,
                category: category || findProduct.category as Category
            },
        });

        return updatedProduct;
    }
}

export class ListProductsService {
    async execute() {
        const products = await prismaClient.product.findMany();
        return products;
    }
}
