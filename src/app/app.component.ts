/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation, OnInit } from '@angular/core';

import { AppState } from './app.service';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.style.css'
  ],
  template: `
  <p-toolbar >
    <div class="ui-toolbar-group-left">
      <a> beliYu </a>     
    </div>
    
    <div class="ui-toolbar-group-right">
        <login (userChange)="userCh($event)"> Login </login>
    </div>
  </p-toolbar> 

    <main>
      <div class="row">
        <div class="col-sm-2">
          <img alt="Docker (container engine) logo.svg" 
            src="//upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Docker_%28container_engine%29_logo.svg/250px-Docker_%28container_engine%29_logo.svg.png"
            class="img-responsive">
          <p-menu [model]="items" ></p-menu>
        </div>
        <div class="col-sm-10">
          <router-outlet></router-outlet>
        </div>
      </div>
    </main>

    <footer>
      <span> beliYu - Docker Tool App </span>
    </footer>  `
})
export class AppComponent implements OnInit {
  public name = 'Angular 2 Webpack Starter';
  public user: string = '';
  public items = [];
  private angularclassLogo = 'assets/img/angularclass-avatar.png';

  constructor(
    public appState: AppState) {
  }

  public ngOnInit() {
    this.items = [
      {
        label: 'Menu',
        items: [
          { label: 'Dashboard', icon: 'fa-dashboard', routerLink: ['/home'] },
          { label: 'Containers', icon: 'fa-cubes', routerLink: ['/containers'] },
          { label: 'Volumes', icon: 'fa-server',  routerLink: ['/volumes'] },
          { label: 'Networks', icon: 'fa-sitemap',  routerLink: ['/networks'] },
          { label: 'Images', icon: 'fa-building-o', routerLink: ['/images']  }
        ]
      }];
  }

  public userCh(e) {
    this.user = e.user;
  };
}
