import prismaClient from "../prisma";

interface UpdateProductProps {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string; 
}

class UpdateProductService {
    async execute({ id, name, price, description, image, category }: UpdateProductProps) {
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
                image: image || findProduct.image,
                category: category || findProduct.category
            }
        });

        return updatedProduct;
    }
}

export { UpdateProductService };
