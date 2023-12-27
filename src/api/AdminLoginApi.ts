//import { UserDto } from 'dto/user/UserDto';
import { handleApiError } from 'utils/ApiUtils';
import axiosInstance from './CreateAxiosIntance';

export default class AdminLoginApi {
  public static loginUser = async (request: any) => {
    try {
      console.log('login', request);
      const user = await axiosInstance.post<any>('/admins/login', request);
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
