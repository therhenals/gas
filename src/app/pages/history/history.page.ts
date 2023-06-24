import { Component, OnInit } from '@angular/core';
import { Firestore, collectionData, collection, query, orderBy, where } from '@angular/fire/firestore';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { DrainModel } from '../../models/drain.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  firestore: Firestore;

  maxDate = moment()
    .toISOString(true);

  startDate = this.maxDate;

  endDate = this.maxDate;

  tracing$: Observable<DrainModel[]>;

  constructor(firestore: Firestore) {
    this.firestore = firestore;
  }

  ngOnInit() {
    this.filter();
  }

  filter() {
    const startDate = moment(this.startDate)
      .utc()
      .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
      .valueOf();

    const endDate = moment(this.endDate)
      .utc()
      .set({ hour: 23, minute: 59, second: 59, millisecond: 999 })
      .valueOf();

    const q: any = query(
      collection(this.firestore, 'tracing'),
      orderBy('startDate', 'desc'),
      where('startDate', '>=', startDate),
      where('startDate', '<=', endDate)
    );
    this.tracing$ = collectionData<DrainModel>(q);
  }



}
