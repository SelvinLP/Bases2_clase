import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { CookieService } from 'ngx-cookie-service';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss']
})
export class PrincipalComponent {
  @ViewChild(MatSidenav)
  private sidenav!: MatSidenav;
  private username:string = this.cookieService.get('username');

  constructor(private observer: BreakpointObserver, private cookieService: CookieService) { }

  get Sidenav():MatSidenav {
    return this.sidenav;
  }
  set Sidenav(side:MatSidenav) {
    this.sidenav = side;
  }
  get Username():string {
    return this.username;
  }
  set Username(user:string) {
    this.username = user;
  }
  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
          return;
        }
        this.sidenav.mode = 'side';
        this.sidenav.open();

      });
  }

}
