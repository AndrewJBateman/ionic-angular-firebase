import { Injectable } from '@angular/core';
import { collectionData, deleteDoc, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, doc, updateDoc } from '@firebase/firestore';
import { docData } from 'rxfire/firestore';
import { Observable } from 'rxjs';

import Record from '../models/record';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private firestore: Firestore) {}

  getRecords(): Observable<Record[]> {
    const recordsRef = collection(this.firestore, 'records');
    return collectionData(recordsRef, { idField: 'id' }) as Observable<
      Record[]
    >;
  }

  getRecordById(id: string): Observable<Record> {
    const recordDecRef = doc(this.firestore, `records/${id}`);
    return docData(recordDecRef, { idField: 'id' }) as Observable<Record>;
  }

  addRecord(record: Record) {
    const recordsRef = collection(this.firestore, 'records');
    return addDoc(recordsRef, record);
  }

  deleteRecord(record: Record) {
    const recordDocRef = doc(this.firestore, `records/${record.id}`);
    return deleteDoc(recordDocRef);
  }

  updateRecord(record: Record) {
    const recordDocRef = doc(this.firestore, `records/${record.id}`);
    return updateDoc(recordDocRef, { title: record.title, text: record.text });
  }
}
