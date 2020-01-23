import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MycarsSharedModule } from 'app/shared/shared.module';
import { CocheComponent } from './coche.component';
import { CocheDetailComponent } from './coche-detail.component';
import { CocheUpdateComponent } from './coche-update.component';
import { CocheDeleteDialogComponent } from './coche-delete-dialog.component';
import { cocheRoute } from './coche.route';
import { MiniGameComponent } from './minigame.component';

@NgModule({
  imports: [MycarsSharedModule, RouterModule.forChild(cocheRoute)],
  declarations: [CocheComponent, CocheDetailComponent, CocheUpdateComponent, CocheDeleteDialogComponent, MiniGameComponent],
  entryComponents: [CocheDeleteDialogComponent]
})
export class MycarsCocheModule {}
