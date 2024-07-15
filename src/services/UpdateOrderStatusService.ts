import prismaClient from "../prisma";

class UpdateOrderStatusService {
  async execute(orderId: string, status: string) {
    const order = await prismaClient.order.update({
      where: { id: orderId },
      data: { status },
    });

    return order;
  }
}

export { UpdateOrderStatusService };

