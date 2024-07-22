export interface UpdateOrderStatusBody {
    orderId: string;
    status: string;
  }

export interface QueryParams {
  status?: string;
}
  