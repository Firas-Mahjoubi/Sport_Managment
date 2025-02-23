import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TacticListComponent } from './tactic-list/tactic-list.component';
import { TacticFormComponent } from './tactic-form/tactic-form.component';
import { TacticFolderComponent } from './tactic-folder/tactic-folder.component';

const routes: Routes = [
  { path: '', component: TacticListComponent },  // List of tactics
  { path: 'create', component: TacticFormComponent },
  { path: ':id', component: TacticFolderComponent },
  { path: 'edit/:id', component: TacticFormComponent }, 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TacticsRoutingModule { }
