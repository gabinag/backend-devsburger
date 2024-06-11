import prismaClient from "../prisma";

interface CreateProductProps {
    name: string;
    description: string;
    price: number;
    image: string;
}

class CreateProductService {
    async execute({ name, description, price, image }: CreateProductProps) {

        if(!name || !description || !price || !image ) {
            throw new Error("Preencha todos os campos")
        }

        const product = await prismaClient.product.create({
            data: {
                name,
                description,
                price,
                image
            }
        })

        return product
    }
}

export {CreateProductService}