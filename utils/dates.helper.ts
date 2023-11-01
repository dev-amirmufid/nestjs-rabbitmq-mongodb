import * as moment from 'moment';
import { HOROSCOPE, ZODIACS } from '@Constans/zodiac.constant';

export const getZodiac = (date: string): string => {
  const birthdate = moment(date, 'YYYY-MM-DD');

  const result = ZODIACS.filter((i) => {
    return birthdate.isBetween(
      moment(i.startDate, 'MM/DD/YYYY'),
      moment(i.endDate, 'MM/DD/YYYY'),
    ); //false in this case
  })[0];

  return result.name;
};

export const getHoroscope = (date: string): string => {
  const sign =
    Number(
      new Intl.DateTimeFormat('fr-TN-u-ca-persian', {
        month: 'numeric',
      }).format(new Date(date)),
    ) - 1;

  return HOROSCOPE[sign];
};

export const getAge = (date: string): number => {
  return moment().diff(moment(date), 'y');
};
