import { handleApiError } from '../utils/ApiUtils';
import axiosInstance from './CreateAxiosIntance';

export default class EnquiryApi {
  public static async create(enquiry: any) {
    try {
      const details = await axiosInstance.post('/enquiries', enquiry);
      return details.data;
    } catch (e) {
      throw handleApiError(e, 'Failed to create enquiry');
    }
  }
  public static async getAll() {
    try {
      const details = await axiosInstance.get<any[]>('/enquiries');
      return details.data;
    } catch (e) {
      throw handleApiError(e, 'Failed to get all details');
    }
  }
}
