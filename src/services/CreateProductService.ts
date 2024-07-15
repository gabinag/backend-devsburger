import { Category } from "@prisma/client";
import prismaClient from "../prisma";

interface CreateProductProps {
    name: string;
    description: string;
    price: number;
    image: string;
    category: Category;
}

class CreateProductService {
    async execute({ name, description, price, image, category  }: CreateProductProps) {

        if(!name || !description || !price || !image || !category) {
            throw new Error("Preencha todos os campos")
        }

        const product = await prismaClient.product.create({
            data: {
                name,
                description,
                price,
                image,
                category,
            }
        })

        return product
    }
}

export {CreateProductService}