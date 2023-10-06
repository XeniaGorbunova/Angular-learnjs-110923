import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'currency',
    pure: true,
})
export class CurrencyPipe implements PipeTransform {
    transform(price: number | undefined, local: string): string {
        // eslint-disable-next-line no-console
        console.log('CurrencyPipe transform', local);

        return `${Number(price) || '-'} $`;
    }
}
