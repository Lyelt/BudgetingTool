import { Component, OnInit, Input } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-overview-category',
  templateUrl: './overview-category.component.html',
  styleUrls: ['./overview-category.component.scss']
})
export class OverviewCategoryComponent implements OnInit {
  @Input() categoryName: string;

  spendingObservable: Observable<any[]>; 
  spendingRef: AngularFireList<any>; 

  expensesObservable: Observable<any[]>;
  expensesRef: AngularFireList<any>;

  categoryTotal: number = 0;
  categorySpent: number = 0;
  categoryPercent: number;

  expenseNames: Array<string> = new Array<string>();

  constructor(private db: AngularFireDatabase) {

  }


  ngOnInit() {
    this.spendingRef = this.db.list('/spending', ref => ref.orderByChild('expense'));
    this.expensesRef = this.db.list('budgets/nick-budget/expenses', ref => ref.orderByChild('category').equalTo(this.categoryName));

    this.expensesObservable = this.expensesRef.snapshotChanges().map(
      changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      });

    this.spendingObservable = this.spendingRef.snapshotChanges().map(
      changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      });
    
    this.getTotalBudgeted();
    this.getTotalSpent();
  }

  getTotalBudgeted() {

    this.expensesRef.valueChanges().subscribe(expArr => {
      this.categoryTotal = 0;
      expArr.forEach(exp => {
        let expObj = <any>exp;
        this.expenseNames.push(expObj.name);
        this.categoryTotal += expObj.monthly;
      });
    });
}

  getTotalSpent() {
    this.spendingRef.valueChanges().subscribe(spentArr => {
      this.categorySpent = 0;
      spentArr.forEach(spent => {
        let spentObj = <any>spent;
        if (this.expenseNames.indexOf(spentObj.expense) >= 0) {
          this.categorySpent += spentObj.amount;
        }
      });
    });
}
  getSpendPercentage() {
    return this.categorySpent / this.categoryTotal * 100;
  }

  getProgressColor() {
    if (this.getSpendPercentage() >= 100 ) {
      return "warn";
    }
    else {
      return "primary";
    }
  }
  
}
