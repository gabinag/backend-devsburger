import prismaClient from "../prisma";

class ListOrdersService {
    async execute(status?: string) {
        const orders = await prismaClient.order.findMany({
            where: status ? { status } : {},
            select: {
                id: true,
                name: true,
                phone: true,
                address: true,
                paymentMethod: true,
                status: true,  
                createdAt: true,
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
