import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateOrderController } from "./controllers/CreateOrderController";
import { ListOrdersController } from "./controllers/ListOrdersController";
import { DeleteOrderController } from "./controllers/DeleteOrderController";
import { UpdateOrderStatusController } from "./controllers/UpdateOrderStatusController";
import { QueryParams, UpdateOrderStatusBody } from "./types";
import { ListOrderController } from "./controllers/ListOrderController";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.get("/teste", async(request: FastifyRequest, reply: FastifyReply) => {
        return { ok: true }
    });

    fastify.post("/order", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateOrderController().handle(request, reply);
    });

    fastify.get("/orders", async (request: FastifyRequest<{ Querystring: QueryParams }>, reply: FastifyReply) => {
        return new ListOrdersController().handle(request, reply);
    });

    fastify.get("/orders/:id", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListOrderController().handle(request, reply);
    });

    fastify.delete("/order", async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteOrderController().handle(request, reply)
    });

    fastify.post("/order/status", (request: FastifyRequest<{ Body: UpdateOrderStatusBody }>, reply: FastifyReply) => {
        return new UpdateOrderStatusController().handle(request, reply)
    });
}