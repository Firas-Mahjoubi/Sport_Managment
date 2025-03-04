import { NgModule } from '@angular/core';
import { __decorate } from "tslib";
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
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';

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
    CommonModule,
    TacticsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule, // ✅ Required for mat-form-field
    MatSelectModule, // ✅ Required for mat-select
    MatToolbarModule,
    
  ]

})
export class TacticModule { }
