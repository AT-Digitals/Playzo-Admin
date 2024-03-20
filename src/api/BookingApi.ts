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

  public static async createBulkBooking(booking?: any) {
    try {
      const details = await axiosInstance.post('/bookings/bulk', booking);
      return details.data;
    } catch (e) {
      throw handleApiError(e, 'Failed to create booking');
    }
  }

  static async updateAmount(bookingId: string, request: any) {
    try {
      const amount = await axiosInstance.put<any>(`/bookingAmount/${bookingId}`, request);
      return amount.data;
    } catch (e) {
      throw handleApiError(e, 'Failed to update amount');
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

  public static async filterPage(request: any) {
    try {
      const datails = await axiosInstance.get<any[]>(`/bookingFilter/filterPage` + FilterUtils.getQueryString(request));
      return datails.data;
    } catch (e) {
      throw handleApiError(e, 'Failed to create booking');
    }
  }

  public static async filterBook(request: any) {
    try {
      const datails = await axiosInstance.get<any[]>(`/bookingFilter/filterBook` + FilterUtils.getQueryString(request));
      return datails.data;
    } catch (e) {
      throw handleApiError(e, 'Failed to create booking');
    }
  }

  public static async getBookingById(bookingId: string) {
    try {
      const detail = await axiosInstance.get<any>(`/bookings/${bookingId}`);
      return detail.data;
    } catch (e) {
      throw handleApiError(e, 'Failed to get booking');
    }
  }
  public static async BookingUpdateById(bookingId: string, request: any) {
    try {
      const detail = await axiosInstance.put<any>(`/bookings/${bookingId}`, request);
      return detail.data;
    } catch (e) {
      throw handleApiError(e, 'Failed to get booking');
    }
  }

  public static async getBookedList(booking?: any) {
    try {
      const details = await axiosInstance.post<any[]>(`/bookingFilter/booked`, booking);
      return details.data;
    } catch (e) {
      throw handleApiError(e, 'Failed to get all details');
    }
  }
}
