export type PrimType = boolean | string | number;
export type ObjType = { [key: string]: ?PlainType };
export type ArrType = Array<?PlainType>;
export type PlainType = PrimType | ObjType | ArrType;
