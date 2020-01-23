import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IIncidencia, Incidencia } from 'app/shared/model/incidencia.model';
import { IncidenciaService } from './incidencia.service';
import { ICoche } from 'app/shared/model/coche.model';
import { CocheService } from 'app/entities/coche/coche.service';

@Component({
  selector: 'jhi-incidencia-update',
  templateUrl: './incidencia-update.component.html'
})
export class IncidenciaUpdateComponent implements OnInit {
  isSaving = false;

  coches: ICoche[] = [];

  editForm = this.fb.group({
    id: [],
    descripcion: [null, [Validators.maxLength(35)]],
    tipo: [null, [Validators.maxLength(20)]],
    incidenciacoche: [null, Validators.required]
  });

  constructor(
    protected incidenciaService: IncidenciaService,
    protected cocheService: CocheService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ incidencia }) => {
      this.updateForm(incidencia);

      this.cocheService
        .query()
        .pipe(
          map((res: HttpResponse<ICoche[]>) => {
            return res.body ? res.body : [];
          })
        )
        .subscribe((resBody: ICoche[]) => (this.coches = resBody));
    });
  }

  updateForm(incidencia: IIncidencia): void {
    this.editForm.patchValue({
      id: incidencia.id,
      descripcion: incidencia.descripcion,
      tipo: incidencia.tipo,
      incidenciacoche: incidencia.incidenciacoche
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const incidencia = this.createFromForm();
    if (incidencia.id !== undefined) {
      this.subscribeToSaveResponse(this.incidenciaService.update(incidencia));
    } else {
      this.subscribeToSaveResponse(this.incidenciaService.create(incidencia));
    }
  }

  private createFromForm(): IIncidencia {
    return {
      ...new Incidencia(),
      id: this.editForm.get(['id'])!.value,
      descripcion: this.editForm.get(['descripcion'])!.value,
      tipo: this.editForm.get(['tipo'])!.value,
      incidenciacoche: this.editForm.get(['incidenciacoche'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IIncidencia>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: ICoche): any {
    return item.id;
  }
}
