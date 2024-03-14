import moment, { DurationInputArg1, unitOfTime } from 'moment';

export type DurationUnit = unitOfTime.DurationConstructor;

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

  static formatMillisecondsToTimeConvert = (ms: moment.MomentInput) => {
    if (ms === null) {
      return '';
    }
    const formattedTime = moment(ms).format('hh:mm A');
    return formattedTime;
  };

  static joinDate(date: Date, time: Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), time.getHours(), time.getMinutes(), 0);
  }

  static convertTo24HourFormat = (time12h: moment.MomentInput) => {
    const time24h = moment(time12h, 'hh:mm:ss a').format('HH:mm');

    return time24h;
  };

  static add(date: Date, amount: DurationInputArg1, value: unitOfTime.DurationConstructor) {
    return moment(date).add(amount, value).toDate();
  }

  static subtract(date: Date, amount: DurationInputArg1, value: unitOfTime.DurationConstructor, format: string) {
    return moment(date).subtract(amount, value).format(format);
  }

  static betweenWeekDays(startDate: Date, endDate: Date, weekdays: number[]) {
    const result = [];
    const currentDate = moment(startDate);
    while (currentDate.isSameOrBefore(endDate)) {
      if (weekdays.includes(currentDate.day())) {
        result.push(currentDate.clone().format('YYYY-MM-DD'));
      }
      currentDate.add(1, 'day');
    }
    return result;
  }
}
