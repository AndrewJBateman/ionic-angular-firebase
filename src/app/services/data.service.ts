import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import Record from '../models/record';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private recordsCollection: AngularFirestoreCollection<Record>;
  private records: Observable<Record[]>;

  constructor(private db: AngularFirestore) {
    this.recordsCollection = db.collection<Record>('records');

    this.records = this.recordsCollection.snapshotChanges().pipe(
      map((actions) =>
        actions.map((record) =>
          // loop through each database item and return with id
          ({ id: record.payload.doc.id, ...record.payload.doc.data() })
        )
      )
    );
  }

  // fetch all records as an observable Records array from the Firebase 'records' collection of documents.
  getRecords(): Observable<Record[]> {
    return this.records;
  }

  getRecordById(id: string): any {
    return this.recordsCollection.doc<Record>(id).valueChanges();
  }

  addRecord(record: Record): Promise<any> {
    return this.recordsCollection.add(record);
  }

  deleteRecord(id: string): Promise<any> {
    return this.recordsCollection.doc(id).delete();
  }

  updateRecord(record: Record, id: string) {
    return this.recordsCollection.doc(id).update(record);
  }
}
