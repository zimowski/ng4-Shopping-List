import {Component, EventEmitter, HostBinding, Input, Output} from '@angular/core';
import {ListModel} from '../../models/list.model';
import {ListService} from '../../services/list.service';
import {fadeInAnimation} from '../../animations/basic';
import {AlertService} from '../../../shared/services/alert.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
  animations: [fadeInAnimation]
})
export class ListItemComponent {
  @Input() item: ListModel;
  @Output() removedItem: EventEmitter<void> = new EventEmitter<void>();
  @HostBinding('@fadeInAnimation') null;

  constructor(private listService: ListService,
              private alertService: AlertService) { }

  public remove(shoppingList: ListModel, event: Event): void {
    event.stopPropagation();
    this.listService
      .remove(shoppingList.id)
      .subscribe(
        () => this.removedItem.emit(),
        () => this.alertService.negative(
          'Something wrong',
          'We were unable to remove data from the server'
        )
      );
  }
}
