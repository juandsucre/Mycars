import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IIncidencia } from 'app/shared/model/incidencia.model';

@Component({
  selector: 'jhi-incidencia-detail',
  templateUrl: './incidencia-detail.component.html'
})
export class IncidenciaDetailComponent implements OnInit {
  incidencia: IIncidencia | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ incidencia }) => {
      this.incidencia = incidencia;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
