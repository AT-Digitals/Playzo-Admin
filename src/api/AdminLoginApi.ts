import axiosInstance from './CreateAxiosIntance';
import { handleApiError } from 'utils/ApiUtils';

export default class AdminLoginApi {
  public static loginUser = async (request: any) => {
    try {
      const user = await axiosInstance.post<any>('admin/admins/login', request);
      return user.data;
    } catch (e) {
      throw handleApiError(e, 'Failed to login user');
    }
  };

  public static logoutUser = async () => {
    try {
      const user = await axiosInstance.post('/admins/auth/logout');
      return user.data;
    } catch (e) {
      throw handleApiError(e, 'Failed to logout user');
    }
  };
}
