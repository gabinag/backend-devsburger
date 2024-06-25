import { FastifyInstance, FastifyPluginOptions, FastifyRequest, FastifyReply } from "fastify";
import { CreateProductController } from './controllers/CreateProductController';
import { ListProductsController } from "./controllers/ListProductsController";
import { DeleteProductController } from "./controllers/DeleteProductController";
import { UpdateProductController } from './controllers/UpdateProductController';
import { CreateOrderController } from "./controllers/CreateOrderController";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {
    fastify.get("/teste", async(request: FastifyRequest, reply: FastifyReply) => {
        return { ok: true }
    })

    fastify.post("/product", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateProductController().handle(request, reply)
    })

    fastify.get("/products", async (request: FastifyRequest, reply: FastifyReply) => {
        return new ListProductsController().handle(request, reply)
    })

    fastify.delete("/product", async (request: FastifyRequest, reply: FastifyReply) => {
        return new DeleteProductController().handle(request, reply)
    })

    fastify.put("/product", async (request: FastifyRequest, reply: FastifyReply) => {
        return new UpdateProductController().handle(request, reply);
    });

    fastify.post("/orders", async (request: FastifyRequest, reply: FastifyReply) => {
        return new CreateOrderController().handle(request, reply);
    });
}