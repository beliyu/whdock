import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { VolumesComponent } from './volumes';
import { ImagesComponent } from './images';
import { NetworksComponent } from './networks';
import { ContainersComponent } from './containers';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';

export const ROUTES: Routes = [
  { path: '',      component: HomeComponent },
  { path: 'home',  component: HomeComponent },
  { path: 'containers',  component: ContainersComponent },
  { path: 'volumes',  component: VolumesComponent },
  { path: 'networks',  component: NetworksComponent },
  { path: 'images',  component: ImagesComponent },
  { path: '**',    component: NoContentComponent },
];
