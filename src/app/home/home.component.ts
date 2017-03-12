import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { WhmService } from '../wh.service';

import { Observable } from 'rxjs/Observable';
import '../../assets/css/styles.css';

import { AppState } from '../app.service';

@Component({
  selector: 'home',
  encapsulation: ViewEncapsulation.None,
  styles: [`
main {
  padding: 1em;
  font-family: Arial, Helvetica, sans-serif;
}
dl {
    margin-top: 0;
    margin-bottom: 20px;
}
.dl-horizontal dt {
    margin-bottom: 12px;
}
`],
  templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
  public WMNsi = {};
  public WMNsv = {};
  public WMNv = {};
  public WMNn = {};
  public hostIP = '';
  constructor(private _whm: WhmService) { }

  public ngOnInit() {
    this.whmGetAll();
  }

  private whmGetAll() {
    this._whm.getInfo().subscribe((data) => {
      this.WMNsi = data;
    }, (err) => console.log(err));
    this._whm.getVer().subscribe((data) => {
      this.WMNsv = data;
    }, (err) => console.log(err));
    this._whm.getVolumes().subscribe((data) => {
      this.WMNv = data.length;
    });
    this._whm.getNet().subscribe((data) => {
      this.WMNn = data.length;
    });
  }
}
