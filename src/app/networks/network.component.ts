import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { WhmService } from '../wh.service';

import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'network',
  encapsulation: ViewEncapsulation.None,
  styles: [`
main {
  padding: 1em;
  font-family: Arial, Helvetica, sans-serif;
}
`],
  templateUrl: 'network.component.html'
})
export class NetworksComponent implements OnInit {
  public WMNi = [];
  public WMNc = [];
  private addSt = true;
  private waitSt = false;
  constructor(private _whm: WhmService, private confirmationService: ConfirmationService) { }

  public ngOnInit() {
    this.whmGetAll();
  }

  private whmGetAll() {
    this._whm.getNet().subscribe((data) => {
//      console.log(data);
      this.WMNi = []; this.WMNc = [];
      let tDat = {}; let gw = ''; let ipr = ''; let sn = '';

      for (let n of data) {
        for (let g of n.IPAM.Config) {
          gw = gw + g.Gateway + '  ';
        }
        for (let r of n.IPAM.Config) {
          ipr = ipr + r.IPRange + '  ';
        }
        for (let s of n.IPAM.Config) {
          sn = sn + s.Subnet + '  ';
        }

        tDat = {
          Id: n.Id,
          name: n.Name,
          gateway: gw,
          iprange: ipr,
          subnet: sn,
          driver: n.Driver,
          scope: n.Scope
        };
        if (['none', 'host', 'bridge'].indexOf(n.Name) === -1) {
          this.WMNc.push(tDat);
        } else {
          this.WMNi.push(tDat);
        }
        gw = ''; ipr = ''; sn = '';
      }
    }, (err) => console.log(err));
  }

  private remove(netw) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete network  ' + netw.name + ' ?',
      accept: () => {
        this._whm.delNet(netw.Id)
          .subscribe((data) => this.whmGetAll(), (err) => console.log(err)
          );
      }
    }
    );
  }

  private addNetw(e) {
    let netParams = {
      name: e.name,
      IPAM: {
        Config: [
          {
            Subnet: e.subnet,
            IPRange: e.ipRange,
            Gateway: e.gateway,
          },
        ],
      },
    };
    this._whm.addNet(netParams)
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
