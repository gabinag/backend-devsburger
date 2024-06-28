import prismaClient from "../prisma";

interface CreateOrderProps {
  name: string;
  phone: string;
  address: string;
  paymentMethod: string;
  items: Array<{
    productId: string;
    quantity: number;
  }>;
}

class CreateOrderService {
  async execute({ name, phone, address, paymentMethod, items }: CreateOrderProps) {
    if (!name || !phone || !address || !paymentMethod || items.length === 0) {
      throw new Error("Preencha todos os campos e adicione pelo menos um item ao pedido");
    }

    const order = await prismaClient.order.create({
      data: {
        name,
        phone,
        address,
        paymentMethod,
        orderItems: {
          create: items.map(item => ({
            productId: item.productId,
            quantity: item.quantity
          }))
        }
      },
    });

    return order;
  }
}

export { CreateOrderService };
