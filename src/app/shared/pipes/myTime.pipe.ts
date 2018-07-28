import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myTime'
})
export class MyTimePipe implements PipeTransform {
  transform(data: number): string {
    const minutes = data % 60;
    const hours = (data - minutes) / 60;

    if ( data > 0 && data / 60 < 1 ) {
      return minutes + ' min';
    } else if (data > 1 && minutes === 0 ) {
      return hours + ' h';
    } else {
      return hours + ' h' + ' ' +  minutes + ' min';
    }
  }
}
