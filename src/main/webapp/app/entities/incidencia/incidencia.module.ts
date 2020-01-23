import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MycarsSharedModule } from 'app/shared/shared.module';
import { IncidenciaComponent } from './incidencia.component';
import { IncidenciaDetailComponent } from './incidencia-detail.component';
import { IncidenciaUpdateComponent } from './incidencia-update.component';
import { IncidenciaDeleteDialogComponent } from './incidencia-delete-dialog.component';
import { incidenciaRoute } from './incidencia.route';

@NgModule({
  imports: [MycarsSharedModule, RouterModule.forChild(incidenciaRoute)],
  declarations: [IncidenciaComponent, IncidenciaDetailComponent, IncidenciaUpdateComponent, IncidenciaDeleteDialogComponent],
  entryComponents: [IncidenciaDeleteDialogComponent]
})
export class MycarsIncidenciaModule {}
