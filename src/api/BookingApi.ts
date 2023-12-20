// import { BookingFilterRequestDto } from 'dto/Booking/BookingFilterRequestDto';

import FilterUtils from 'utils/FilterUtils';
import StoreInstance from '../store/StoreInstance';
import { handleApiError } from '../utils/ApiUtils';

export default class BookingApi {
  public static async createBooking(booking: any) {
    try {
      console.log('dsjbgvduhfb');
      const datails = await StoreInstance.api().post<any>('/bookings', booking);
      return datails.data;
    } catch (e) {
      throw handleApiError(e, 'Failed to create booking');
    }
  }

  public static filterBooking = async (filter: any) => {
    try {
      const datails = await StoreInstance.api().get<any[]>(`/bookingFilter/filterBookings` + FilterUtils.getQueryString(filter));
      return datails.data;
    } catch (e) {
      throw handleApiError(e, 'Failed to list bookings');
    }
  };

  public static async filterDateBooking(request: any) {
    try {
      const datails = await StoreInstance.api().get<any[]>(
        `/bookingFilter/filterDateBookings?startDate=${request.startDate}&&endDate=${request.endDate}`
      );
      return datails.data;
    } catch (e) {
      throw handleApiError(e, 'Failed to create booking');
    }
  }
  public static async getAll() {
    try {
      const details = await StoreInstance.api().get<any[]>('/bookings');
      return details.data;
    } catch (e) {
      throw handleApiError(e, 'Failed to get all details');
    }
  }
}
