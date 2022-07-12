import { Component, OnInit } from '@angular/core';
import { collection, collectionData, Firestore, limitToLast, orderBy, query } from '@angular/fire/firestore';
import { of, Observable } from 'rxjs';
import { concatMap, tap } from 'rxjs/operators'
import { DrainModel } from '../../models/drain.model';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  lastDrain$: Observable<DrainModel>;
  firestore: Firestore;


  constructor(firestore: Firestore) {
    this.firestore = firestore;
  }

  async ngOnInit() {
    const q = query(
      collection(this.firestore, 'tracing'),
      orderBy('startDate', 'asc'),
      limitToLast(1)
    );

    const last = collectionData(q);

    this.lastDrain$ = last.pipe(
      concatMap((docs) => {
        const doc = docs[0] as DrainModel;
        return of(doc);
      })
    )
  }

  getStatus(status: number) {
    if (status == 0) {
      return {
        color: 'low',
        message: 'Bajo'
      };
    } else if (status == 1) {
      return {
        color: 'warning',
        message: 'Medio'
      };
    } else if (status == 2) {
      return {
        color: 'danger',
        message: 'Alto'
      };
    }
  }

}
