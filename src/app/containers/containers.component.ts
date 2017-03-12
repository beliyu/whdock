import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { WhmService } from '../wh.service';

import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'home',
  encapsulation: ViewEncapsulation.None,
  styles: [`
main {
  padding: 1em;
  font-family: Arial, Helvetica, sans-serif;
}
.contDetails-raw {
    max-height: 400px;
    overflow: scroll;
    font-size: 11px;
}
.dl-horizontal dt {
    width: 100px;
}
.dl-horizontal dd {
    margin-left: 120px;
}
p-dialog .ui-dialog {
  overflow-y: scroll;
}
`],
  templateUrl: 'containers.component.html'
})
export class ContainersComponent implements OnInit {
  public WMC = [];
  public WMCd = [];
  public pDDisplay = false;
  constructor(private _whm: WhmService, private confirmationService: ConfirmationService) { }

  public ngOnInit() {
    this.whmGetAll();
  }

  private whmGetAll() {
    this._whm.getCont().subscribe((data) => {
      let tDat = [];
      for (let n of data) {
        tDat.push({
          Id: n.Id,
          image: n.Image,
          name: n.Names.join(','),
          status: n.Status,
          state: n.State
        });
      }
      this.WMC = tDat;
    }, (err) => console.log(err));
  }

  private conDetails(con) {
    this._whm.getContDet(con.Id).subscribe((data) => {
      this.WMCd = data;
      this.pDDisplay = this.pDDisplay === true ? false : true;
      console.log(data);
    }, (err) => console.log(err));
  }

  private conStart(con) {
    console.log('Start: ' + con.Id);
    this._whm.startCont(con.Id)
      .subscribe((data) => this.whmGetAll(), (err) => console.log(err)
      );
  };

  private conStop(con) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to stop container  ' + con.name + ' ?',
      accept: () => {
        console.log('Stop: ' + con.Id);
        this._whm.stopCont(con.Id)
          .subscribe((data) => this.whmGetAll(), (err) => console.log(err)
          );
      }
    }
    );
  };

  private conPause(con) {
    console.log('Pause: ' + con.Id);
    this._whm.pauseCont(con.Id)
      .subscribe((data) => this.whmGetAll(), (err) => console.log(err)
      );
  };

  private conResolve(con) {
    console.log('Resolve: ' + con.Id);
    this._whm.resolveCont(con.Id)
      .subscribe((data) => this.whmGetAll(), (err) => console.log(err)
      );
  };
  private conDelete(con) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to remove container  ' + con.name + ' ?',
      accept: () => {
        console.log('Remove: ' + con.Id);
        this._whm.delCont(con.Id)
          .subscribe((data) => this.whmGetAll(), (err) => console.log(err)
          );
      }
    }
    );
  };

}
