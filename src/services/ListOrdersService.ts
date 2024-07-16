import prismaClient from "../prisma";

class ListOrdersService {
    async execute(id?: string) {
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

