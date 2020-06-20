export interface ISelectors {
  selector: string;
  start: IPosition;
  end: IPosition;
  sourceFile: string;
  parentType: string;
  isClassUsed: boolean;
}

export interface IPosition {
  line: number;
  column: number;
}
