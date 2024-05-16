export interface IUpdateOrderStatus {
  _id: string;
  status: 'created' | 'processing' | 'ready' | 'delivered';
}
