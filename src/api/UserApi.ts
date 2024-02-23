import FilterUtils from 'utils/FilterUtils';
import axiosInstance from './CreateAxiosIntance';
import { handleApiError } from '../utils/ApiUtils';

export default class UserApi {
  public static async adminUserList(request: any) {
    try {
      const datails = await axiosInstance.get<any[]>(`/userList/adminUsers` + FilterUtils.getQueryString(request));
      return datails.data;
    } catch (e) {
      throw handleApiError(e, 'Failed to list user');
    }
  }

  static async updatePassword(userId: string, request: any) {
    try {
      const user = await axiosInstance.put<any>(`/adminUsers/${userId}`, request);
      return user.data;
    } catch (e) {
      throw handleApiError(e, 'Failed to update password');
    }
  }

  public static async userList(request: any) {
    try {
      const datails = await axiosInstance.get<any[]>(`/userList/users` + FilterUtils.getQueryString(request));
      return datails.data;
    } catch (e) {
      throw handleApiError(e, 'Failed to list user');
    }
  }
}
