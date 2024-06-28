import prismaClient from "../prisma";

interface DeleteOrderProps {
    id: string;
}

class DeleteOrderService {
    async execute({ id }: DeleteOrderProps) {
        if(!id) {
            throw new Error("Solicitação inválida.")
        }

        const findOrder = await prismaClient.order.findFirst({
            where: {
                id: id
            }
        })

        if(!findOrder) {
            throw new Error("Pedido não encontrado!")
        }

        await prismaClient.order.delete({
            where: {
                id: findOrder.id
            }
        })

        return { message: "Deletado com sucesso!" }
    }
}

export { DeleteOrderService }