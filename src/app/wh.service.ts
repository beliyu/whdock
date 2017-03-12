import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

@Injectable()

export class WhmService {
    private headers: Headers;
    private _url = 'http://localhost:3001/api/v1';
    constructor(private _http: Http) {
        this.headers = new Headers({ 'Content-Type': 'application/json' });
    };

    // system
    public getInfo() {
        return this._http.get(this._url + '/system/info')
            .map((res: Response) => res.json());
    };
    public getVer() {
        return this._http.get(this._url + '/system/version')
            .map((res: Response) => res.json());
    };

    // images
    public getImages() {
        return this._http.get(this._url + '/images')
            .map((res: Response) => res.json())
            .map((data) => data.images);
    };
    public delImg(Id) {
        return this._http.delete(this._url + '/images/' + Id)
            .map((res: Response) => res.json());
    };
    public pullImg(data) {
        return this._http.post(this._url + '/images/actions/pull', JSON.stringify(data),
            { headers: this.headers });
    };

    // volumes
    public getVolumes() {
        return this._http.get(this._url + '/volumes')
            .map((res: Response) => res.json())
            .map((data) => data.volumes);
    };
    public delVol(vol) {
        return this._http.delete(this._url + '/volumes/' + vol.Name)
            .map((res: Response) => res.json());
    };
    public addVol(data) {
        return this._http.post(this._url + '/volumes', JSON.stringify(data),
         { headers: this.headers });
    };

    // containers
    public getCont() {
        return this._http.get(this._url + '/containers?all=true&filters=%7B%7D')
            .map((res: Response) => res.json())
            .map((data) => data.containers);
    };
    public getContDet(Id) {
        return this._http.get(this._url + '/containers/' + Id)
            .map((res: Response) => res.json())            ;
    };
    public delCont(Id) {
        return this._http.delete(this._url + '/containers/' + Id)
            .map((res: Response) => res.json())            ;
    };
    public startCont(Id) {
        return this._http.post(this._url + '/containers/' + Id + '/actions/start',
            JSON.stringify({id : Id}), { headers: this.headers })
            .map((res: Response) => res.json())            ;
    };
    public stopCont(Id) {
        return this._http.post(this._url + '/containers/' + Id + '/actions/stop',
            JSON.stringify({id : Id}), { headers: this.headers })
            .map((res: Response) => res.json())            ;
    };
    public pauseCont(Id) {
        return this._http.post(this._url + '/containers/' + Id + '/actions/pause',
            JSON.stringify({id : Id}), { headers: this.headers })
            .map((res: Response) => res.json())            ;
    };
    public resolveCont(Id) {
        return this._http.post(this._url + '/containers/' + Id + '/actions/unpause',
            JSON.stringify({id : Id}), { headers: this.headers })
            .map((res: Response) => res.json())            ;
    };

    // networks
    public getNet() {
        return this._http.get(this._url + '/networks')
            .map((res: Response) => res.json())
            .map((data) => data.networks);
    };
    public delNet(id) {
        return this._http.delete(this._url + '/networks/' + id)
            .map((res: Response) => res.json());
    };
    public addNet(data) {
        return this._http.post(this._url + '/networks', JSON.stringify(data),
         { headers: this.headers });
    };

}
