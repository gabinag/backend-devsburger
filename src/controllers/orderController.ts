import { FastifyRequest, FastifyReply } from "fastify";
import { 
  CreateOrderService, 
  DeleteOrderService, 
  ListOrdersService, 
  GetOrderService, 
  UpdateOrderStatusService 
} from "../services/orderService";

interface CreateOrderRequest {
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

interface DeleteOrderRequest {
  id: string;
}

interface ListOrdersQuery {
  status?: string;
}

interface GetOrderRequest {
  id: string;
}

interface UpdateOrderStatusBody {
  orderId: string;
  status: string;
}

export class OrderController {
  async createOrder(request: FastifyRequest, reply: FastifyReply) {
    const { name, phone, address, paymentMethod, items, status, observation } = request.body as CreateOrderRequest;
    
    const orderService = new CreateOrderService();
    const order = await orderService.execute({ name, phone, address, paymentMethod, items, status, observation });

    reply.send(order);
  }

  async deleteOrder(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.query as DeleteOrderRequest;

    const orderService = new DeleteOrderService();
    const order = await orderService.execute({ id });

    reply.send(order);
  }

  async listOrders(request: FastifyRequest, reply: FastifyReply) {
    const { status } = request.query as ListOrdersQuery;
    const listOrdersService = new ListOrdersService();
    const orders = await listOrdersService.execute(status);

    reply.send(orders);
  }

  async getOrder(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as GetOrderRequest;

    try {
      const getOrderService = new GetOrderService();
      const order = await getOrderService.execute(id);

      if (!order) {
        reply.code(404).send({ message: 'Pedido não encontrado' });
      } else {
        reply.send(order);
      }
    } catch (error) {
      reply.code(500).send({ error });
    }
  }

  async updateOrderStatus(request: FastifyRequest, reply: FastifyReply) {
    const { orderId, status } = request.body as UpdateOrderStatusBody;

    const updateOrderStatusService = new UpdateOrderStatusService();
    const order = await updateOrderStatusService.execute(orderId, status);

    request.server.io.emit('orderStatusUpdated', { orderId, status });

    reply.send(order);
  }
}
