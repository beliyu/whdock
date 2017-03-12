import {
  Component, Output, Input, EventEmitter, ChangeDetectionStrategy,
  OnInit
} from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { MyValidators } from './my.validators';

@Component({
  selector: 'small-box',
  templateUrl: './smbox.component.html',
  styles: [`
.small-box {
    border-radius: 5px;
    position: relative;
    display: block;
    margin-bottom: 20px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
}
.small-box > .inner {
    padding: 10px;
}
.small-box h3 {
    font-size: 38px;
    font-weight: bold;
    margin: 0 0 10px 10px;
    white-space: nowrap;
    padding: 0;
}
.small-box p {
    font-size: 15px;
}
.small-box .icon {
    -webkit-transition: all 0.3s linear;
    -o-transition: all 0.3s linear;
    transition: all 0.3s linear;
    position: absolute;
    top: -5px;
    right: 10px;
    z-index: 0;
    font-size: 80px;
    color: rgba(0, 0, 0, 0.15);
}
}
`],
})
export class SmboxComponent implements OnInit {
  @Input() public hed;
  @Input() public par;
  @Input() public cla = 'fa-cube';
  @Input() public col= '#fff';
  @Input() public bgcol= '#777';
  public form1: FormGroup;
  public aa = 'fa ';
  constructor(private _fb: FormBuilder) {
  };

  public ngOnInit() {
    this.aa += this.cla;
  };

}
