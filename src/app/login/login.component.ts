import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'login',
    template: `
<div class="alert alert-danger" role="alert" *ngIf="message">
  {{ message }}
</div>
<form class="form-inline" *ngIf="!user">
  <div class="form-group">
    <label for="username">User:</label>
    <input class="form-control" name="username" #username>
  </div>
  <div class="form-group">
    <label for="password">Password:</label>
    <input class="form-control " type="password" name="password" #password>
  </div>
  <a class="btn btn-default" (click)="login(username.value, password.value)">
    <span class="ui-button-icon-left ui-c fa fa-fw fa-sign-in"></span> login
  </a>
</form>
<div class="" *ngIf="user">
  <b>{{ user }}</b>
  <a class="btn btn-default" type="button" (click)="logout()">
    <span class="ui-button-icon-left ui-c fa fa-fw fa-sign-out"></span> Logout</a>
</div>`,
    styles: [`
input{
    width:100px !important;
    height: 26px; 
}
.btn{
    font-family: Cambria, Georgia;
    background: #ccc;
    font-weight: 600;
    margin-left: 5px;
    padding: 2px 10px;
}
b {
    color:#06c
}
`]
})
export class LoginComponent {
    public message: string;
    public user: string = '';
    @Output() public userChange = new EventEmitter();

    constructor() {
        this.message = '';
    };

    public login(username: string, password: string): void {
        this.message = '';
        if (username !== 'admin' || password !== 'admin') {
            this.message = 'Incorrect credentials.';
            setTimeout(() => {
                this.message = '';
            }, 2500);
        } else {
            this.user = username;
            this.userChange.emit({user: this.user});
        }
    };

    public logout(): void {
        this.user = '';
        this.userChange.emit({user: this.user});
    };
};
