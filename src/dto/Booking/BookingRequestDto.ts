import { BookingType } from './BookingType';
import { PaymentType } from './PaymentType';

export interface BookingRequestDto {
  type: BookingType;
  cancelDate?: Date;
  bookingAmount: number;
  bookingType: PaymentType;
  startTime: number;
  endTime: number;
  dateOfBooking: Date;
}
