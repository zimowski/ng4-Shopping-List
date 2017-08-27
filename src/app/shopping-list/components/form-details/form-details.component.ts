import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ItemModel} from '../../models/item.model';
import {ItemsService} from '../../services/items.service';
import {AlertService} from '../../../shared/services/alert.service';

@Component({
  selector: 'app-form-details',
  templateUrl: './form-details.component.html',
  styleUrls: ['./form-details.component.scss']
})
export class FormDetailsComponent implements OnInit, OnChanges {
  @Input() type: string;
  @Input() parameters: ItemModel;
  @Input() title: string;
  @Input() listId: number;
  @Output() onUpdate: EventEmitter<ItemModel> = new EventEmitter<ItemModel>();
  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();
  @Output() onCreate: EventEmitter<number> = new EventEmitter<number>();
  public itemForm: FormGroup;
  public loading: boolean;

  constructor(private formBuilder: FormBuilder,
              private itemService: ItemsService,
              private alertService: AlertService) { }

  ngOnInit() {
    if (!this.parameters) {
      this.parameters = <ItemModel>{};
    }
    this.itemForm = this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.parameters) {
      this.parameters = changes.parameters.currentValue;
      this.itemForm = this.buildForm();
    }
  }

  private resetForm(): void {
    this.parameters = <ItemModel>{};
    this.itemForm = this.buildForm();
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      id: [this.parameters.id || null],
      list_id: this.listId,
      name: [
        {
          value: this.parameters.name || '',
          disabled: this.loading
        }, [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(40)
        ]
      ],
      date: [
        this.parameters.date || Date.now().toString()
      ],
      is_active: [
        this.parameters.is_active || true
      ]
    });
  }

  public save(): void {
    if (this.type === 'create') {
      this.create();
    } else {
      this.update();
    }
  }

  private create(): void {
    this.loading = true;
    this.itemService
      .create(this.itemForm.value)
      .subscribe(
        (response) => {
          this.loading = false;
          this.resetForm();
          this.onCreate.emit(response.id);
        },
        () => {
          this.loading = false;
          this.alertService.negative(
            'Something wrong',
            'We were unable to save item in shopping list'
          );
        }
      );
  }

  private update(): void {
    this.loading = true;
    this.itemService
      .update(this.itemForm.value)
      .subscribe(
        () => {
          this.loading = false;
          this.onUpdate.emit(this.itemForm.value);
        },
        () => {
          this.loading = false;
          this.alertService.negative(
            'Something wrong',
            'We were unable to save item in shopping list'
          );
        }
      );
  }

  public cancel(): void {
    this.onCancel.emit();
  }
}
