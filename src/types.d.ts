import { FastifyRequest } from 'fastify';

export interface UpdateOrderStatusBody {
    orderId: string;
    status: string;
  }

export interface QueryParams {
  status?: string;
}

declare module 'fastify' {
  interface FastifyInstance {
    multipart: () => void;
  }

  interface FastifyRequest {
    file: any; 
    files: any; 
  }
}