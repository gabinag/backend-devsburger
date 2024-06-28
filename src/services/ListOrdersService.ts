import prismaClient from "../prisma";

class ListOrdersService {
    async execute() {
        const orders = await prismaClient.order.findMany({
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
        return orders;
    }
}

export { ListOrdersService };

