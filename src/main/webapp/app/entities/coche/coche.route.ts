import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ICoche, Coche } from 'app/shared/model/coche.model';
import { CocheService } from './coche.service';
import { CocheComponent } from './coche.component';
import { CocheDetailComponent } from './coche-detail.component';
import { CocheUpdateComponent } from './coche-update.component';
import { MiniGameComponent } from './minigame.component';

@Injectable({ providedIn: 'root' })
export class CocheResolve implements Resolve<ICoche> {
  constructor(private service: CocheService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ICoche> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((coche: HttpResponse<Coche>) => {
          if (coche.body) {
            return of(coche.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Coche());
  }
}

export const cocheRoute: Routes = [
  {
    path: '',
    component: CocheComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mycarsApp.coche.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: CocheDetailComponent,
    resolve: {
      coche: CocheResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mycarsApp.coche.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: CocheUpdateComponent,
    resolve: {
      coche: CocheResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mycarsApp.coche.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: CocheUpdateComponent,
    resolve: {
      coche: CocheResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mycarsApp.coche.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'minigame',
    component: MiniGameComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mycarsApp.coche.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
