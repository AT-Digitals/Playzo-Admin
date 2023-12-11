import { BookingType } from './BookingType';

export interface BookingFilterRequestDto {
  type?: BookingType;
  dateOfBooking: Date;
  startTime: number;
  endTime?: number;
}
