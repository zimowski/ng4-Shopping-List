import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ListModel} from '../../models/list.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ListService} from '../../services/list.service';
import {AlertService} from '../../../shared/services/alert.service';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss']
})
export class FormListComponent implements OnInit, OnChanges {
  @Input() type: string;
  @Input() parameters: ListModel;
  @Input() title: string;
  @Output() onSuccess: EventEmitter<number> = new EventEmitter<number>();
  @Output() onCancel: EventEmitter<void> = new EventEmitter<void>();

  public shoppingForm: FormGroup;
  public loading: boolean;

  constructor(private formBuilder: FormBuilder,
              private listService: ListService,
              private alertService: AlertService) { }

  ngOnInit() {
    if (!this.parameters) {
      this.parameters = <ListModel>{};
    }
    this.shoppingForm = this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.parameters) {
      this.parameters = changes.parameters.currentValue;
      this.shoppingForm = this.buildForm();
    }
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
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
      active_items: [
        this.parameters.active_items || 0
      ],
      is_active: [
        this.parameters.is_active || false
      ],
      items: [
        this.parameters.items || 0
      ]
    });
  }

  private resetForm(): void {
    this.parameters = <ListModel>{};
    this.shoppingForm = this.buildForm();
  }

  public submit(): void {
    if (this.type === 'update') {
      this.update(this.parameters.id);
    } else {
      this.save();
    }
  }

  private save(): void {
    this.loading = true;
    this.listService
      .create(this.shoppingForm.value)
      .subscribe(
        (response) => {
          this.loading = false;
          this.resetForm();
          this.onSuccess.emit(response.id);
        },
        () => {
          this.loading = false;
          this.alertService.negative(
            'Something wrong',
            'We were unable to save shopping list'
          );
        }
      );
  }

  private update(id: number): void {
    this.loading = true;
    this.listService
      .update(id, this.shoppingForm.value)
      .subscribe(
        (response) => {
          this.loading = false;
          this.onSuccess.emit(response.id);
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

  public cancel(): void {
    this.onCancel.emit();
  }
}
