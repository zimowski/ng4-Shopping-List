import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-total-progressbar',
  templateUrl: './total-progressbar.component.html',
  styleUrls: ['./total-progressbar.component.scss']
})
export class TotalProgressbarComponent {
  @Input() value: number;
  @Input() maximum: number;
  @Input() is_active: boolean;

  public progress(): number {
    return Math.floor((this.value  * 100) / this.maximum) / 100;
  }
}
