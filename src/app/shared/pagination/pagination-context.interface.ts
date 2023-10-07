export interface IPaginationContext<T> {
    $implicit: T[];
    appPaginationOf: T[];
    appPaginationChunkSize: number;
    pageIndexes: number[] | null;
    activeIndex: number;
    selectIndex: (index: number) => void;
    next: () => void;
    back: () => void;
}
