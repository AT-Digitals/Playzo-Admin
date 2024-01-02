import axiosInstance from './CreateAxiosIntance';
import { handleApiError } from '../utils/ApiUtils';

//import StoreInstance from '../store/StoreInstance';

export default class PaymentApi {
  public static async createPayment(pay: any) {
    try {
      console.log('pay', pay);
      const details = await axiosInstance.post('/payments/create/orderId', pay);
      return details.data;
    } catch (e) {
      throw handleApiError(e, 'Failed to create pay');
    }
  }

  public static async verifyPayment(pay: any) {
    try {
      console.log('pay', pay);
      const details = await axiosInstance.post('/payments/verify', pay);
      return details.data;
    } catch (e) {
      throw handleApiError(e, 'Failed to create pay');
    }
  }

  public static async refundPayment(pay: any) {
    try {
      console.log('refund', pay);
      const details = await axiosInstance.post('/payments/refund', pay);
      return details.data;
    } catch (e) {
      throw handleApiError(e, 'Failed to create pay');
    }
  }
}
