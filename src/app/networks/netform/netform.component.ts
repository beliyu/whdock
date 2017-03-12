import { Component, Output, EventEmitter, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { MyValidators } from './my.validators';

@Component({
  selector: 'addnet-component',
  templateUrl: './netform.component.html',
  styles: [`
form {
  margin-left: 5em;
  margin-right: 5em;
  margin-bottom: 3em;
}
`],
})
export class NetformComponent implements OnInit {
  @Output() public buttSub = new EventEmitter();
  public form1: FormGroup;
  constructor(private _fb: FormBuilder) {
  };

  public ngOnInit() {
    this.form1 = this._fb.group({
      name: ['net-01', Validators.required],
      subnet: ['172.129.1.0/24', Validators.required],
      ipRange: ['172.129.1.0/24', Validators.required],
      gateway: ['172.129.1.254', Validators.required]
    });

  };

  public addNet() { this.buttSub.emit(this.form1.value); }

  public cons() { console.log(this.form1); };
}
