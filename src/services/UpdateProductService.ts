import prismaClient from "../prisma";

interface UpdateProductProps {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
}

class UpdateProductService {
    async execute({ id, name, price, description, image }: UpdateProductProps) {
        if(!id) {
            throw new Error("Solicitação inválida.");
        }

        const findProduct = await prismaClient.product.findFirst({
            where: {
                id: id
            }
        });

        if(!findProduct) {
            throw new Error("Produto não encontrado!");
        }

        const updatedProduct = await prismaClient.product.update({
            where: {
                id: findProduct.id
            },
            data: {
                name: name || findProduct.name,
                price: price || findProduct.price,
                description: description || findProduct.description,
                image: image || findProduct.image
            }
        });

        return updatedProduct;
    }
}

export { UpdateProductService };
