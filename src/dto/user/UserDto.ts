export class UserDto {
  email: string;
  name: string;
  id: string;
  bookingHistory: any[] = [];

  constructor(user: any) {
    this.email = user.email;
    this.name = user.name;
    this.id = user.id;
    // this.bookingHistory = elemT(user.bookingHistory).map((booking) => new BookingDto(booking));
  }
}
