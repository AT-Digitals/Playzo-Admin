import FilterUtils from 'utils/FilterUtils';
import axiosInstance from './CreateAxiosIntance';
import { handleApiError } from '../utils/ApiUtils';

export default class BookingApi {
  public static async createBooking(booking?: any) {
    try {
      const details = await axiosInstance.post('/bookings', booking);
      return details.data;
    } catch (e) {
      throw handleApiError(e, 'Failed to create booking');
    }
  }

  public static filter = async (filter: any) => {
    try {
      const datails = await axiosInstance.get<any[]>(`/bookingFilter/filterBookings` + FilterUtils.getQueryString(filter));
      return datails.data;
    } catch (e) {
      throw handleApiError(e, 'Failed to list bookings');
    }
  };

  public static async filterDateBooking(request: any) {
    try {
      const datails = await axiosInstance.get<any[]>(`/bookingFilter/filterDateBookings` + FilterUtils.getQueryString(request));
      return datails.data;
    } catch (e) {
      throw handleApiError(e, 'Failed to create booking');
    }
  }
  public static async getAll() {
    try {
      const details = await axiosInstance.get<any[]>(`/bookings`);
      return details.data;
    } catch (e) {
      throw handleApiError(e, 'Failed to get all details');
    }
  }

  public static async getAllPaging(value: any) {
    try {
      const details = await axiosInstance.get<any[]>(`/bookingFilter/filterPaging?page=${value.page}&&limit=${value.limit}`);
      return details.data;
    } catch (e) {
      throw handleApiError(e, 'Failed to get all details');
    }
  }
}
