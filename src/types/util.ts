export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

export type ObjectValues<T> = T[keyof T];
