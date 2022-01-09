import { v4 as uuidv4 } from "uuid";

export class PerformanceEntry {
  public id: string;

  constructor(public pinCount: number,
              public objectSize: string,
              public dateAdded: Date,
              public timeRendering: string,
              public solutionSource: "first" | "second") {
    this.id = uuidv4();
  }
}
