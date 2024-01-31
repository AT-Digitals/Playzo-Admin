import axiosInstance from './CreateAxiosIntance';
import { handleApiError } from 'utils/ApiUtils';

export default class AmountApi {
  public static async createAmount(amount?: any) {
    try {
      const details = await axiosInstance.post('/amount', amount);
      return details.data;
    } catch (e) {
      throw handleApiError(e, 'Failed to create amount');
    }
  }

  public static async getAmountById(amountId: string) {
    try {
      const detail = await axiosInstance.get<any>(`/amount/${amountId}`);
      return detail.data;
    } catch (e) {
      throw handleApiError(e, 'Failed to get amount');
    }
  }

  public static async getAll() {
    try {
      const details = await axiosInstance.get<any[]>('/amount');
      return details.data;
    } catch (e) {
      throw handleApiError(e, 'Failed to get all details');
    }
  }

  static async updateAmount(amountId: string, request: any) {
    try {
      const amount = await axiosInstance.put<any>(`/amount/${amountId}`, request);
      return amount.data;
    } catch (e) {
      throw handleApiError(e, 'Failed to update amount');
    }
  }

  static async deleteAmount(amountId: string) {
    try {
      const amount = await axiosInstance.delete<any>(`/amount/${amountId}`);
      return amount.data;
    } catch (e) {
      throw handleApiError(e, 'Failed to update amount');
    }
  }
}
