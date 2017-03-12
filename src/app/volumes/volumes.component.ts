import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { WhmService } from '../wh.service';

import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'home',
  encapsulation: ViewEncapsulation.None,
  styles: [`
.mform {
  margin-bottom: 3em;
  margin-left: 5em;
  margin-right: 5em;
`],
  templateUrl: './volumes.component.html'
})
export class VolumesComponent implements OnInit {
  public WMVu = []; public WMVn = [];
  public w = {};
  private addSt = true;
  private waitSt = false;
  constructor(private _whm: WhmService, private confirmationService: ConfirmationService) { }

  public ngOnInit() {
    this.whmGetAll();
  }

  private whmGetAll() {
    this._whm.getVolumes().subscribe((data) => {
      for (let n of data) {
        n.name = n.Name.substr(0, 10) + '...';
      }
      this.WMVu = data.filter((volume) => {
        return volume.Name.match(/^[a-f0-9]{64}$/);
      });
      this.WMVn = data.filter((volume) => {
        return !volume.Name.match(/^[a-f0-9]{64}$/);
      });
    }, (err) => console.log(err));
  }
  private addDVol(i = '*') {
    let dVol = { name: i };
    if (/^[a-z0-9\-]+$/.test(i)) {
      this._whm.addVol(dVol)
        .subscribe((data) => {
          console.log(data);
          this.waitSt = false;
          this.whmGetAll();
        },
        (err) => console.log(err)
        );
      this.addSt = true;
      this.waitSt = true;
    }
  }

  private remove(vol) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete volume  ' + vol.Name + ' ?',
      accept: () => {
        console.log(vol);
        this._whm.delVol(vol)
          .subscribe((data) => this.whmGetAll(), (err) => console.log(err)
          );
      }
    }
    );
  }

}
