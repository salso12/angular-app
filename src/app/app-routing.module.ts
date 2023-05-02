import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TaskItemComponent } from './task-item/task-item.component';
import { TaskListComponent } from './task-list/task-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/task-list', pathMatch : 'full'},
  {
    path: "form",
    component : FormComponent
  },
  { path: 'task-list', component: TaskListComponent },
  {
    path: 'task-list/task-id/:id',
    component : TaskItemComponent
  },
  {
    path: "item",
    component : TaskItemComponent
  },
  {
    path: 'form/edit/:id',
    component : FormComponent
  },
  {
    path:"**", component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
