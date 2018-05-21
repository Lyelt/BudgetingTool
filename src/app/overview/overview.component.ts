import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database'; 
import { Observable } from 'rxjs/Observable';
import { AngularFireObject } from 'angularfire2/database/interfaces';
import { AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  categoryObservable: Observable<any[]>;
  categoryRef: AngularFireList<any>;

  constructor(private db: AngularFireDatabase) { 
    this.categoryRef = db.list('budgets/nick-budget/expense-categories');

    this.categoryObservable = this.categoryRef.snapshotChanges().map(
      changes => {
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      });
  }

  ngOnInit() {
  }

}
