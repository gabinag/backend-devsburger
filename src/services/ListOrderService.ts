import prismaClient from "../prisma";

class ListOrderService {
    async execute(orderId: string) {
        const order = await prismaClient.order.findUnique({
            where: {
                id: orderId
            },
            include: {
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
        return order;
    }
}

export { ListOrderService };
