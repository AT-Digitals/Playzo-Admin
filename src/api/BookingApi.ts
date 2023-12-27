import FilterUtils from 'utils/FilterUtils';
//import StoreInstance from '../store/StoreInstance';
import { handleApiError } from '../utils/ApiUtils';
import axiosInstance from './CreateAxiosIntance';

export default class BookingApi {
  public static async createBooking(booking: any) {
    try {
      console.log('booking', booking);
      const details = await axiosInstance.post('/bookings', booking);
      //const details = await StoreInstance.api().post<any>('/bookings', booking);
      return details.data;
    } catch (e) {
      throw handleApiError(e, 'Failed to create booking');
    }
  }

  public static filterBooking = async (filter: any) => {
    try {
      console.log('filter', filter);
      const datails = await axiosInstance.get<any[]>(`/bookingFilter/filterBookings` + FilterUtils.getQueryString(filter));
      return datails.data;
    } catch (e) {
      throw handleApiError(e, 'Failed to list bookings');
    }
  };

  public static async filterDateBooking(request: any) {
    try {
      const datails = await axiosInstance.get<any[]>(
        `/bookingFilter/filterDateBookings?startDate=${request.startDate}&&endDate=${request.endDate}`
      );
      return datails.data;
    } catch (e) {
      throw handleApiError(e, 'Failed to create booking');
    }
  }
  public static async getAll() {
    try {
      const details = await axiosInstance.get<any[]>('/bookings');
      return details.data;
    } catch (e) {
      throw handleApiError(e, 'Failed to get all details');
    }
  }
}
