// import { AdminRequestDto } from 'dto/user/AdminRequestDto';
import { UserDto } from 'dto/user/UserDto';
import StoreInstance from 'store/StoreInstance';
import { handleApiError } from 'utils/ApiUtils';

export default class AdminLoginApi {
  public static loginUser = async (request: any) => {
    try {
      console.log('resq', request);
      const user = await StoreInstance.api().post<UserDto>('/admins/login', request);
      return user.data;
    } catch (e) {
      throw handleApiError(e, 'Failed to login user');
    }
  };

  public static logoutUser = async () => {
    try {
      const user = await StoreInstance.api().post('/logout');
      return user.data;
    } catch (e) {
      throw handleApiError(e, 'Failed to logout user');
    }
  };
}
