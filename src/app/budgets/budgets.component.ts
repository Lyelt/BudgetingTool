import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { DataService } from '../data.service';

import { AngularFireDatabase } from 'angularfire2/database'; 
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.scss'],
  animations: [
   
    trigger('goals', [
      transition('* => *', [
        query(':enter', style({ opacity: 0 }), {optional: true})
      ])
    ])
    
  ]
})
export class BudgetsComponent implements OnInit {

  btnText: string = "Add";
  textboxText: string = '';

  budgetsObservable: Observable<any[]>;
 
  constructor(private _data: DataService, private db: AngularFireDatabase) { }

  ngOnInit() {
    this.budgetsObservable = this.getBudgets('/budgets');
  }

  getBudgets(path) : Observable<any[]> {
    return this.db.list(path).valueChanges();
  }

  addItem() {
    this.textboxText = '';
  }

}
