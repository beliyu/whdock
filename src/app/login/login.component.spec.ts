import { NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import {
  inject,
  async,
  TestBed,
  ComponentFixture
} from '@angular/core/testing';
import { Component } from '@angular/core';

// Load the implementations that should be tested
import { LoginComponent } from './login.component';

describe(`Login Component`, () => {
  let comp: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  // async beforeEach
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      schemas: [NO_ERRORS_SCHEMA],
    });
  }));

  // synchronous beforeEach
  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    comp = fixture.componentInstance;
    fixture.detectChanges(); // trigger initial data binding
  });

  it('should render login form', () => {
    let de: DebugElement;
    let el: HTMLElement;
    de = fixture.debugElement.query(By.css('form'));
    el = de.nativeElement;
    expect(el).toBeDefined();
  });

  it('should not have user', () => {
    expect(comp.user).toEqual('');
  });

  it('login() & logout()', () => {
    comp.login('admin', 'admin');
    fixture.detectChanges();
    expect(comp.user).toEqual('admin');

    comp.logout();
    fixture.detectChanges();
    expect(comp.user).toEqual('');
  });

});
