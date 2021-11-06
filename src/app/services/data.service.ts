import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private firestore: Firestore) {}

  getRecords() {
    const recordsRef = collection(this.firestore, 'records');
    console.log('recordsRef: ', recordsRef);
    return collectionData(recordsRef, {idField: 'recordsId'});
  }
}
