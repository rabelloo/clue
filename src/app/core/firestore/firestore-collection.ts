import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from 'angularfire2/firestore';
import { DocumentChangeType } from '@firebase/firestore-types';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { map } from 'rxjs/operators';

import { IDocument } from './idocument';

export abstract class FirestoreCollection<T extends IDocument> {

  protected collection: AngularFirestoreCollection<T>;

  constructor(private db: AngularFirestore,
              name: string) {
    this.collection = db.collection(name);
  }

  /**
   * Gets all documents
   * 
   * Equivalent to `AngularFirestoreCollection.valueChanges()`
   */
  get documents(): Observable<T[]> {
    return this.collection.valueChanges();
  }

  /**
   * Gets all documents' snapshots (metadata included)
   * 
   * Equivalent to `AngularFirestoreCollection.snapshotChanges()`
   */
  get snapshots(): Observable<DocumentChangeAction[]> {
    return this.collection.snapshotChanges();
  }

  /**
   * Gets all documents' states
   * 
   * Equivalent to `AngularFirestoreCollection.stateChanges()`
   */
  stateChanges(events?: DocumentChangeType[]): Observable<DocumentChangeAction[]> {
    return this.collection.stateChanges(events);
  }

  /**
   * Gets a document by id
   * 
   * Equivalent to `AngularFirestoreDocument.stateChanges()`
   */
  get(id: string): Observable<T> {
    return this.collection.doc<T>(id).valueChanges();
  }

  /**
   * Adds a document
   */
  add(document: Partial<T>): Observable<T> {
    // Double casting from and to T needs to be done as a hack because
    // TS doesn't support type inference for generics as objects yet
    // https://github.com/Microsoft/TypeScript/issues/10727
    // TODO: remove casts when it does
    return fromPromise(this.collection.add(document as T))
            .pipe(
              map(ref => ({
                ...document as {},
                id: ref.id,
              } as T)
            )
          );
  }

  /**
   * Update a document
   */
  update(document: Partial<T>): Observable<void> {
    return fromPromise(this.collection.doc(document.id).set(this.stripId(document)));
  }

  /**
   * Patch a document's fields
   */
  patch(document: Partial<T>): Observable<void> {
    return fromPromise(this.collection.doc(document.id).update(this.stripId(document)));
  }

  /**
   * Save a document (adds if no id, updates if id)
   */
  save(document: Partial<T>): Observable<T> {
    return !document.id
            ? this.add(document)
            : this.update(document)
                  .pipe(
                    map(() => document as T)
                  );
  }

  /**
   * Removes a document
   */
  delete(document: T): Observable<T> {
    return fromPromise(this.collection.doc(document.id).delete())
              .pipe(
                map(() => document)
              );
  }

  private stripId(document: Partial<T>) {
    const { id: removed, ...rest } = document as IDocument;
    return rest;
  }

}
