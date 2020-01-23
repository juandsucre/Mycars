import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IIncidencia, Incidencia } from 'app/shared/model/incidencia.model';
import { IncidenciaService } from './incidencia.service';
import { IncidenciaComponent } from './incidencia.component';
import { IncidenciaDetailComponent } from './incidencia-detail.component';
import { IncidenciaUpdateComponent } from './incidencia-update.component';

@Injectable({ providedIn: 'root' })
export class IncidenciaResolve implements Resolve<IIncidencia> {
  constructor(private service: IncidenciaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IIncidencia> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((incidencia: HttpResponse<Incidencia>) => {
          if (incidencia.body) {
            return of(incidencia.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Incidencia());
  }
}

export const incidenciaRoute: Routes = [
  {
    path: '',
    component: IncidenciaComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mycarsApp.incidencia.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: IncidenciaDetailComponent,
    resolve: {
      incidencia: IncidenciaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mycarsApp.incidencia.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: IncidenciaUpdateComponent,
    resolve: {
      incidencia: IncidenciaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mycarsApp.incidencia.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: IncidenciaUpdateComponent,
    resolve: {
      incidencia: IncidenciaResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'mycarsApp.incidencia.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
