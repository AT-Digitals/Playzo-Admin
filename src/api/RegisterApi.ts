import axiosInstance from './CreateAxiosIntance';
import { handleApiError } from 'utils/ApiUtils';

export default class RegisterApi {
  public static async createAdmin(details?: any) {
    try {
      const user = await axiosInstance.post('/adminUsers', details);
      return user.data;
    } catch (e) {
      throw handleApiError(e, 'Failed to create details');
    }
  }
  public static async createUser(details?: any) {
    try {
      const user = await axiosInstance.post('/user/newUsers', details);
      return user.data;
    } catch (e) {
      throw handleApiError(e, 'Failed to create details');
    }
  }
}
