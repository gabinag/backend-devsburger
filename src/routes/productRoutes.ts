import { FastifyInstance } from "fastify";
import { ProductController } from "../controllers/productController";

const productController = new ProductController();

export const registerProductRoutes = (app: FastifyInstance) => {
    app.post("/product", {
        preHandler: app.multipart,  
        handler: productController.createProduct
    });
    app.get("/products", productController.listProducts);
    app.delete("/product", productController.deleteProduct);
    app.put("/product", productController.updateProduct);
};
