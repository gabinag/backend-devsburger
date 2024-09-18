import { FastifyInstance } from "fastify";
import { ProductController } from "../controllers/productController";

const productController = new ProductController();

export const registerProductRoutes = (app: FastifyInstance) => {
    app.post("/product", productController.createProduct);
    app.get("/products", productController.listProducts);
    app.delete("/product", productController.deleteProduct);
    app.put("/product", productController.updateProduct);
};
