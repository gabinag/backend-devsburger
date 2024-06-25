import prismaClient from "../prisma";

interface CreateOrderProps {
    name: string;
    phone: string;
    address: string;
    paymentMethod: string;
}

class CreateOrderService {
    async execute({ name, phone, address, paymentMethod }: CreateOrderProps) {
        if (!name || !phone || !address || !paymentMethod) {
            throw new Error("Preencha todos os campos");
        }

        const order = await prismaClient.order.create({
            data: {
                name,
                phone,
                address,
                paymentMethod
            }
        });

        return order;
    }
}

export { CreateOrderService };
