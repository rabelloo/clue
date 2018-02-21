import { AngularFirestore, AngularFirestoreCollection, DocumentChangeAction } from 'angularfire2/firestore';
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
  get states(): Observable<DocumentChangeAction[]> {
    return this.collection.stateChanges();
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
  add(document: T): Observable<T> {
    // Double casting from and to T needs to be done as a hack because
    // TS doesn't support type inference for generics as objects yet
    // https://github.com/Microsoft/TypeScript/issues/10727
    // TODO: remove casts when it does
    const doc = { ...document as {}, id: this.db.createId() } as T;

    return fromPromise(this.collection.add(doc))
            .pipe(
              map(() => doc)
            );
  }

  /**
   * Update a document
   */
  update(document: T): Observable<void> {
    return fromPromise(this.collection.doc(document.id).set(document));
  }

  /**
   * Patch a document's fields
   */
  patch(document: Partial<T>): Observable<void> {
    return fromPromise(this.collection.doc(document.id).update(document));
  }

  /**
   * Save a document (adds if no id, updates if id)
   */
  save(document: T): Observable<T> {
    return !document.id
            ? this.add(document)
            : this.update(document)
                  .pipe(
                    map(() => document)
                  );
  }

  /**
   * Removes a document
   */
  delete(document: T): Observable<boolean> {
    return fromPromise(this.collection.doc(document.id).delete())
            .pipe(
              map(() => true)
            );
  }

}
