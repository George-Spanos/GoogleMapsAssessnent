import { Injectable } from "@angular/core";
import { PerformanceEntry } from "@trg-assessment/domain";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class PerformanceHistoryService {
  public get history$(): Observable<PerformanceEntry[]> {
    return this._history$.asObservable();
  }

  private _history$: BehaviorSubject<PerformanceEntry[]> = new BehaviorSubject<PerformanceEntry[]>([]);

  public addEntry(entry: PerformanceEntry) {
    this._history$.next([...this._history$.getValue(), entry]);
  }

  public clear() {
    this._history$.next([]);
  }
}

