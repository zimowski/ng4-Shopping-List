import {Component, HostBinding, OnInit, ViewEncapsulation} from '@angular/core';
import {ListModel} from '../../models/list.model';
import {ListService} from '../../services/list.service';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {fadeInAnimation} from '../../animations/basic';
import {AlertService} from '../../../shared/services/alert.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [fadeInAnimation]
})
export class ListComponent implements OnInit {
  @HostBinding('@fadeInAnimation') null;
  public shoppingList: ListModel[];
  public total: number;
  public totalActive: number;
  public allTab: boolean;
  public loading: boolean;
  public showFormPanel: false;

  constructor(private listService: ListService,
              private router: Router,
              private titleService: Title,
              private alertService: AlertService) {}

  ngOnInit() {
    this.titleService.setTitle('Welcome in shopping list manager');
    this.loadAll();
  }

  private sumLists(): void {
    this.total = this.shoppingList.length;
    this.totalActive = this.shoppingList
      .filter(
        (item) => item.is_active === false
      )
      .length;
  }

  public loadAll(): void {
    this.loading = true;
    this.listService
      .getAll()
      .subscribe(
        (list) => {
          this.shoppingList = list;
          this.allTab = true;
          this.sumLists();
          this.loading = false;
        },
        () => this._failedHttpOperation()
      );
  }

  public loadActive(): void {
    this.loading = true;
    this.listService
      .getActive()
      .subscribe(
        (list) => {
          this.shoppingList = list;
          this.allTab = false;
          this.loading = false;
        },
        () => this._failedHttpOperation()
      );
  }

  public refresh(): void {
    if (this.allTab) {
      this.loadAll();
    } else {
      this.loadActive();
    }
  }

  public listCreatedSuccessfully(id: number): void {
    this.router.navigate(['/details', id]);
  }

  private _failedHttpOperation() {
    this.loading = false;
    this.alertService.negative(
      'Something wrong',
      'We were unable to load shopping list'
    );
  }
}
