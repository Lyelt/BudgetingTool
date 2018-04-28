import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { FormBuilder } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database'; 
import { Observable } from 'rxjs/Observable';
import { AngularFireObject } from 'angularfire2/database/interfaces';
import { AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']

})
export class HomeComponent implements OnInit {
  expenseTime: Date;
  expenseAmount: double;
  budgetName: string;
  expenseName: string;
  expenseDesc: string;

  expensesObservable: Observable<any[]>; 
  expensesRef: AngularFireList<any>; 

  constructor(private db: AngularFireDatabase) { 
    this.expensesRef = db.list('/budgets/nick-budget/expenses');

    // Use snapshotChanges so we can save the DB key
    this.expensesObservable = this.expensesRef.snapshotChanges().map(
      changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      });

    this.expenseTime = new Date();
    this.budgetName = "Nick's Budget";
  }

  ngOnInit() {
     
  }

  addNewReceipt() {
    var newReceipt = {
      amount: this.expenseAmount,
      budget: this.budgetName,
      date: this.expenseTime,
      expense: this.expenseName,
      description: this.expenseDesc
    }

    this.db.list('/spending').push(newReceipt);

    this.expenseAmount = '';
    this.expenseTime = new Date();
    this.expenseName = '';
    this.expenseDesc = '';
  }

}
