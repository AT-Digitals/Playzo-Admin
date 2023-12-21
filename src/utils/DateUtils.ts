import moment from 'moment';

export default class DateUtils {
  static formatDate(date: Date | undefined, format: string) {
    if (!date) {
      return '';
    }
    return moment(date).format(format);
  }

  static formatDateString(date: string, format: string) {
    if (!date) {
      return '';
    }
    return DateUtils.formatDate(new Date(date), format);
  }

  // static add(
  //   date: Date,
  //   amount: DurationInputArg1,
  //   value: unitOfTime.DurationConstructor
  // ) {
  //   return moment(date).add(amount, value).toDate();
  // }

  static isFutureDate(date: string | Date) {
    return moment(date).isAfter(moment());
  }

  static compareDates(day1: string | Date, day2: string | Date) {
    return moment(day1).isSame(moment(day2), 'day');
  }

  static formatMillisecondsToTime = (ms: moment.MomentInput) => {
    if (ms === null) {
      return '';
    }
    const formattedTime = moment(ms).format('hh:mm:ss a');
    return formattedTime;
  };

  static convertTo24HourFormat = (time12h: moment.MomentInput) => {
    const time24h = moment(time12h, 'hh:mm:ss a').format('HH:mm');

    return time24h;
  };
}
