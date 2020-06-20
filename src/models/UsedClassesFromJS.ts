export interface IUsedClasses {
  imports: IImports[];
  classes: IClasses[];
}

export interface IImports {
  stylesFilename: string;
  importVariable: string;
  sourceFile: string;
}

export interface IClasses {
  usedClassName: string;
  importStyleName: string;
  sourceFile: string;
}
