import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TacticsRoutingModule } from './tactics-routing.module';
import { TacticListComponent } from './tactic-list/tactic-list.component';
import { TacticFormComponent } from './tactic-form/tactic-form.component';
import { TacticFolderComponent } from './tactic-folder/tactic-folder.component';
import { CreateTacticDialogComponent } from './create-tactic-dialog/create-tactic-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    TacticListComponent,
    TacticFormComponent,
    TacticFolderComponent,
    CreateTacticDialogComponent
  ],
  imports: [
    CommonModule,
    TacticsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatOptionModule,
    MatFormFieldModule,
    MatSelectModule
  ]

})
export class TacticModule { }
