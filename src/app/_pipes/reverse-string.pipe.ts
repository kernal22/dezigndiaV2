import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: "reverseString"
})
export class ReversStringPipe implements PipeTransform{
    transform(incomingStr: string) {
        let newStr = '';
        for(let i = incomingStr.length - 1; i > 0; i-- ) {
            newStr += incomingStr.charAt(i);
        }
        return newStr;
    }
}