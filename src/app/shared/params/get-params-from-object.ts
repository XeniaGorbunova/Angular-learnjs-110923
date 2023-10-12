import {HttpParams} from '@angular/common/http';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getParamsFromObject(source: Record<string, any>): HttpParams {
    if (!source) {
        return new HttpParams();
    }

    return Object.entries(source).reduce((params, [key, value]) => {
        if (value === null || value === undefined) {
            return params;
        }

        if (Array.isArray(value)) {
            return value.reduce(
                (newParams: HttpParams, item) => newParams.append(key, item),
                params,
            );
        }

        return params.set(key, value);
    }, new HttpParams());
}
