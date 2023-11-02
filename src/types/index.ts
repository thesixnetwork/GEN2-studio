 
// type Builtin = Date | Function | Uint8Array | string | number | undefined;
// export type DeepPartial<T> = T extends Builtin
//   ? T
//   : T extends Array<infer U>
//   ? Array<DeepPartial<U>>
//   : T extends ReadonlyArray<infer U>
//   ? ReadonlyArray<DeepPartial<U>>
//   : T extends Object
//   ? { [K in keyof T]?: DeepPartial<T[K]> }
//   : Partial<T>;

export type DeepPartial<T>= {
    [Key in keyof T]?: DeepPartial<T[Key]>;
}