import prismaClient from "../prisma/index";

interface CreateOrderProps {
  name: string;
  phone: string;
  address: string;
  paymentMethod: string;
  status: string;
  observation?: string; 
  items: Array<{
    productId: string;
    quantity: number;
  }>;
}

interface DeleteOrderProps {
  id: string;
}

export class CreateOrderService {
  async execute({ name, phone, address, paymentMethod, items, status, observation }: CreateOrderProps) {
    if (!name || !phone || !address || !paymentMethod || items.length === 0) {
      throw new Error("Preencha todos os campos e adicione pelo menos um item ao pedido");
    }

    const order = await prismaClient.order.create({
      data: {
        name,
        phone,
        address,
        paymentMethod,
        status,
        observation,
        orderItems: {
          create: items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
          })),
        },
      },
    });

    return order;
  }
}

export class DeleteOrderService {
  async execute({ id }: DeleteOrderProps) {
    if (!id) {
      throw new Error("Solicitação inválida.");
    }

    const findOrder = await prismaClient.order.findFirst({
      where: { id },
    });

    if (!findOrder) {
      throw new Error("Pedido não encontrado!");
    }

    await prismaClient.order.delete({
      where: { id: findOrder.id },
    });

    return { message: "Deletado com sucesso!" };
  }
}

export class ListOrdersService {
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
        observation: true,
        orderItems: {
          select: {
            quantity: true,
            product: {
              select: { name: true },
            },
          },
        },
      },
    });
    return orders;
  }
}

export class GetOrderService {
  async execute(orderId: string) {
    const order = await prismaClient.order.findUnique({
      where: { id: orderId },
      include: {
        orderItems: {
          select: {
            quantity: true,
            product: {
              select: { name: true },
            },
          },
        },
      },
    });
    return order;
  }
}

export class UpdateOrderStatusService {
  async execute(orderId: string, status: string) {
    const order = await prismaClient.order.update({
      where: { id: orderId },
      data: { status },
    });

    return order;
  }
}
