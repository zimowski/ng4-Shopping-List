import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ItemModel} from '../../models/item.model';
import {ItemsService} from '../../services/items.service';
import {AlertService} from '../../../shared/services/alert.service';

@Component({
  selector: 'app-details-item',
  templateUrl: './details-item.component.html',
  styleUrls: ['./details-item.component.scss']
})
export class DetailsItemComponent {
  @Input() item: ItemModel;
  @Output() onRemove: EventEmitter<string> = new EventEmitter<string>();
  @Output() onUpdate: EventEmitter<string> = new EventEmitter<string>();
  public loading: boolean;
  public editPanel: boolean;

  constructor(private itemsService: ItemsService,
              private alertService: AlertService) {}

  public remove(event: Event): void {
    event.stopPropagation();
    this.loading = true;
    const type = this.item.is_active ? 'active' : 'inactive';
    this.itemsService
      .remove(this.item.id)
      .subscribe(
        () => {
          this.loading = false;
          this.onRemove.emit(type);
        },
        () => {
          this.loading = false;
          this.alertService.negative(
            'Something wrong',
            'We were unable to remove item in shopping list'
          );
        }
      );
  }

  public update(): void {
    this.loading = true;
    const type = this.item.is_active ? 'active' : 'inactive';
    this.itemsService
      .update(this.item)
      .subscribe(
        () => {
          this.loading = false;
          this.onUpdate.emit(type);
        },
        () => {
          this.loading = false;
          this.alertService.negative(
            'Something wrong',
            'We were unable to update shopping list'
          );
        }
      );
  }

  public toggleEditPanel(event: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.editPanel = !this.editPanel;
  }

  public updatedItem(item: ItemModel): void {
    this.item = item;
    this.toggleEditPanel(null);
  }
}
