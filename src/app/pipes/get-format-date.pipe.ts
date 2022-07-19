import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'getFormatDate'
})
export class GetFormatDatePipe implements PipeTransform {

  transform(date: string, onlyDate: boolean): any {
    return (onlyDate) ? moment(date).format("DD/MM/YYYY") : moment(date).format("DD/MM/YYYY HH:mm:ss");
  }
/*  getFormatDate(date: string, onlyDate: boolean) {
    return
  }*/
 //datepicker/pipe
}
