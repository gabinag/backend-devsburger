import { FastifyInstance } from "fastify";
import { OrderController } from "../controllers/orderController";

const orderController = new OrderController();

export const registerOrderRoutes = (app: FastifyInstance) => {
  app.post("/order", orderController.createOrder);
  app.get("/orders", orderController.listOrders);
  app.delete("/order", orderController.deleteOrder);
  app.get("/orders/:id", orderController.getOrder);
  app.post("/order/status", orderController.updateOrderStatus);
};
