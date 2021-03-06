import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

import { AngularFireDatabase } from 'angularfire2/database'; 
import { Observable } from 'rxjs/Observable';
import { AngularFireObject } from 'angularfire2/database/interfaces';

import { AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-budgets',
  templateUrl: './budgets.component.html',
  styleUrls: ['./budgets.component.scss'],
  animations: [
    
  ]
})

export class BudgetsComponent implements OnInit {
  btnText: string = "Add";
  textboxText: string = '';

  budgetsObservable: Observable<any[]>;
  budgetsRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) {
    this.budgetsRef = db.list('/budgets');

    // Use snapshotChanges so we can save the DB key
    this.budgetsObservable = this.budgetsRef.snapshotChanges().map(
      changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      });
   }

  ngOnInit() {
  }

  addItem() {
    var newBudget = { name: this.textboxText  };
    this.budgetsRef.push(newBudget);
    this.textboxText = '';
  }

  removeItem(key: string) {
    this.budgetsRef.remove(key);
  }


}
