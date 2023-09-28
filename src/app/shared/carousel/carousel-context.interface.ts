export interface ICarouselContext<T> {
    $implicit: T;
    appCarouselOf: T[];
    index: number;
    next: () => void;
    back: () => void;
}
