import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';  
import { AboutComponent } from './about/about.component'; 
import { ChecklistComponent } from './checklist/checklist.component';
import { BudgetsComponent } from './budgets/budgets.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about/:id',
    component: AboutComponent
  },
  {
    path: 'checklist',
    component: ChecklistComponent
  },
  {
    path: 'budgets',
    component: BudgetsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
