//import { BookingDateFilterRequestDto } from 'dto/Booking/BookingDateFilterRequestDto';
import StoreInstance from '../store/StoreInstance';
import { handleApiError } from '../utils/ApiUtils';

export default class BookingApi {
  public static async createBooking(booking: any) {
    try {
      const datails = await StoreInstance.api().post<any>('/bookings', booking);
      return datails.data;
    } catch (e) {
      throw handleApiError(e, 'Failed to create booking');
    }
  }

  // public static async getBookingData(BookingDate: BookingDateFilterRequestDto) {
  //   try {
  //     const datails = await StoreInstance.api().get<any[]>('/bookingFilter/filterDateBookings', BookingDate);
  //     return datails.data;
  //   } catch (e) {
  //     throw handleApiError(e, 'Failed to get all designers');
  //   }
  // }
}
