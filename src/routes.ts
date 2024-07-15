import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateProductController } from './controllers/CreateProductController';
import { ListProductsController } from "./controllers/ListProductsController";
import { DeleteProductController } from "./controllers/DeleteProductController";
import { UpdateProductController } from './controllers/UpdateProductController';
import { CreateOrderController } from "./controllers/CreateOrderController";
import { ListOrdersController } from "./controllers/ListOrdersController";
import { DeleteOrderController } from "./controllers/DeleteOrderController";
import { UpdateOrderStatusController } from "./controllers/UpdateOrderStatusController";
import { UpdateOrderStatusBody } from "./types";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.get("/teste", async(request: FastifyRequest, reply: FastifyReply) => {
        return { ok: true }
    });

    fastify.post("/product", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateProductController().handle(request, reply)
    });

    fastify.get("/products", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListProductsController().handle(request, reply)
    });

    fastify.delete("/product", async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteProductController().handle(request, reply)
    });

    fastify.put("/product", async (request: FastifyRequest, reply: FastifyReply) => {
        return new UpdateProductController().handle(request, reply);
    });

    fastify.post("/order", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateOrderController().handle(request, reply);
    });

    fastify.get("/orders", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListOrdersController().handle(request, reply);
    });

    fastify.get("/orders/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListOrdersController().handle(request, reply);
    });

    fastify.delete("/order", async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteOrderController().handle(request, reply)
    });

    fastify.post("/order/status", (request: FastifyRequest<{ Body: UpdateOrderStatusBody }>, reply: FastifyReply) => {
        return new UpdateOrderStatusController().handle(request, reply)
    });
}