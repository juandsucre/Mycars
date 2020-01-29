import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
// import * as moment from 'moment';

import { ICoche, Coche } from 'app/shared/model/coche.model';
import { CocheService } from './coche.service';

@Component({
  selector: 'jhi-coche-update',
  templateUrl: './coche-update.component.html'
})
export class CocheUpdateComponent implements OnInit {
  isSaving = false;
  fechaventaDp: any;
  coche: ICoche | undefined;
  propietario: undefined;
  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.maxLength(35)]],
    modelo: [null, [Validators.maxLength(35)]],
    precio: [],
    vendido: [],
    owner: [],
    fechaventa: []
  });

  constructor(protected cocheService: CocheService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ coche }) => {
      this.updateForm(coche);
      this.coche = coche;
      if (!this.propietario) {
        this.propietario = undefined;
      }
    });
  }

  updateForm(coche: ICoche): void {
    this.editForm.patchValue({
      id: coche.id,
      nombre: coche.nombre,
      modelo: coche.modelo,
      precio: coche.precio,
      vendido: coche.vendido,
      owner: coche.propietario,
      fechaventa: coche.fechaventa
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const coche = this.createFromForm();
    if (coche.id !== undefined) {
      this.subscribeToSaveResponse(this.cocheService.update(coche));
    } else {
      this.subscribeToSaveResponse(this.cocheService.create(coche));
    }
  }

  private createFromForm(): ICoche {
    const entity = {
      ...new Coche(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      modelo: this.editForm.get(['modelo'])!.value,
      precio: this.editForm.get(['precio'])!.value,
      vendido: this.editForm.get(['vendido'])!.value,
      owner: this.editForm.get(['owner'])!.value,
      fechaventa: this.editForm.get(['fechaventa'])!.value
    };
    if (!entity.vendido && (entity.fechaventa || entity.owner)) {
      entity.fechaventa = undefined;
      entity.owner = undefined;
    }
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICoche>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
    // git prueba
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
