// import { BookingDto } from 'dto/Booking/BookingDto';
// import { BookingRequestDto } from 'dto/Booking/BookingRequestDto';
// import StoreInstance from '../store/StoreInstance';
// import { handleApiError } from '../utils/ApiUtils';

// export default class BookingApi {
//   public static async createBooking(booking: BookingRequestDto) {
//     try {
//       const datails = await StoreInstance.api().post<BookingDto>('/bookings', booking);
//       return datails.data;
//     } catch (e) {
//       throw handleApiError(e, 'Failed to create booking');
//     }
//   }
// }
