import {Component, HostBinding, OnInit} from '@angular/core';
import {ListModel} from '../../models/list.model';
import {ActivatedRoute, Router} from '@angular/router';
import {ListService} from '../../services/list.service';
import {ItemModel} from '../../models/item.model';
import {ItemsService} from '../../services/items.service';
import {Title} from '@angular/platform-browser';
import {fadeInAnimation} from '../../animations/basic';
import {AlertService} from '../../../shared/services/alert.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  animations: [fadeInAnimation]
})
export class DetailsComponent implements OnInit {
  @HostBinding('@fadeInAnimation') null;
  public listId: number;
  public shoppingList: ListModel;
  public itemsList: ItemModel[];
  public renamePanel: boolean;
  public loading: boolean;
  public formOpen: boolean;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private listService: ListService,
              private itemsService: ItemsService,
              private titleService: Title,
              private alertService: AlertService) {}

  ngOnInit() {
    this.listId = +this.activatedRoute.snapshot.params['id'];
    if (isNaN(this.listId)) {
      this.router.navigate(['/']);
    } else {
      this.shoppingList = this.activatedRoute.snapshot.data['shoppingList'];
      this.titleService.setTitle(`Details of ${this.shoppingList.name}`);
      this.getItemsList();
    }
  }

  public getItemsList(): void {
    this.loading = true;
    this.itemsService
      .get(this.listId)
      .subscribe(
        (items) => {
          this.itemsList = items;
          this.loading = false;
        },
        () => {
          this.loading = false;
          this.alertService.negative(
            'Something wrong',
            'We were unable to get items'
          );
        }
      );
  }

  public updateList(): void {
    this.shoppingList.is_active = this.itemsList
      .every(
        (item) => item.is_active === false
      );

    this.listService
      .update(this.listId, this.shoppingList)
      .subscribe(
        (response) => {
          this.refreshShoppingList();
          this.getItemsList();
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

  public removeList(): void {
    event.stopPropagation();
    this.listService
      .remove(this.listId)
      .subscribe(
        () => {
          this.router.navigate(['/']);
        },
        () => {
          this.loading = false;
          this.alertService.negative(
            'Something wrong',
            'We were unable to remove shopping list'
          );
        }
      );
  }

  public refreshShoppingList(): void {
    this.loading = true;
    this.listService
      .get(this.listId)
      .subscribe(
        (list) => {
          this.loading = false;
          this.shoppingList = list;
        },
        () => this.router.navigate(['/'])
      );
  }

  public changeCounter(type: string, increment: boolean): void {
    this.shoppingList.items = (increment)
      ? this.shoppingList.items + 1
      : this.shoppingList.items - 1;
    if (type === 'active') {
      this.shoppingList.active_items = (increment)
        ? this.shoppingList.active_items + 1
        : this.shoppingList.active_items - 1;
    }
    this.updateList();
  }

  public changeStateCounter(type: string): void {
    this.shoppingList.active_items = (type === 'active')
      ? this.shoppingList.active_items + 1
      : this.shoppingList.active_items - 1;
    this.updateList();
  }
}
