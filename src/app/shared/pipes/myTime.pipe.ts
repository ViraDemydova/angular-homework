import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'myTime'
})
export class MyTimePipe implements PipeTransform {
  transform(data: number): string {
    var minutes = data % 60;
    var hours = (data - minutes) / 60;

    if (data > 0 && data / 60 < 1) {
      return minutes + ' min';
    } else {
      return hours + ' h' + ' ' +  minutes + ' min';
    }
  }
}
