import prismaClient from "../prisma";

class ListOrdersService {
    async execute(id?: string) {
        const orders = await prismaClient.order.findMany({
            select: {
                id: true,
                name: true,
                phone: true,
                address: true,
                paymentMethod: true,
                status: true,  
                orderItems: {
                    select: {
                        quantity: true,
                        product: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        });
        return orders;
    }
}

export { ListOrdersService };
