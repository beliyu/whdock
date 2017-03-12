import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { WhmService } from '../wh.service';

import { ConfirmationService } from 'primeng/primeng';

@Component({
  selector: 'images',
  encapsulation: ViewEncapsulation.None,
  styles: [`
main {
  padding: 1em;
  font-family: Arial, Helvetica, sans-serif;
  display: block;
}
.mform {
  margin-bottom: 3em;
  margin-left: 5em;
  margin-right: 5em;
}
`],
  templateUrl: 'images.component.html'
})
export class ImagesComponent implements OnInit {
  public WMI = [];
  public w = {};
  private addSt = true;
  private waitSt = false;
  constructor(private _whm: WhmService, private confirmationService: ConfirmationService) { }

  public ngOnInit() {
    this.whmGetAll();
  }

  private whmGetAll() {
    this._whm.getImages().subscribe((data) => {
      let tDat = [];
      for (let n of data) {
        tDat.push({
          Id: n.Id,
          id: n.Id.substr(7, 20) + '...',
          name: n.RepoTags[0],
          size: n.Size
        });
      }
      this.WMI = tDat;
    }, (err) => console.log(err));
  }
  private pullImage(i = '') {
    let img = { name: i };
    if (i.length > 0) {
      if (i.indexOf(':') === -1) {
        i += ':latest';
      }
      this._whm.pullImg(img)
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
  private remove(imgw) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete image  ' + imgw.name + ' ?',
      accept: () => {
        console.log('Delete: ' + imgw);
        this._whm.delImg(imgw.Id)
          .subscribe((data) => this.whmGetAll(), (err) => console.log(err)
          );
      }
    }
    );
  };
}
