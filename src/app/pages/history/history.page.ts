import { Component, OnInit } from '@angular/core';
import { Firestore, collectionData, collection, query, orderBy } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { DrainModel } from '../../models/drain.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  tracing$: Observable<DrainModel[]>;

  constructor(firestore: Firestore) {
    const q: any = query(collection(firestore, 'tracing'), orderBy('startDate', 'desc'));
    this.tracing$ = collectionData<DrainModel>(q);
  }

  ngOnInit() {
  }

}
