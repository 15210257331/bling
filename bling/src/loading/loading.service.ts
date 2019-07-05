import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { BlLoadingRef, BlLoadingConfig, defaultBlLoadingConfig } from './loading.config';


@Injectable({
    providedIn: 'root'
})
export class BlLoadingService {

    private loadingObservable = new Subject<BlLoadingRef>();

    constructor() { }

    getSpinner(name: string): Observable<BlLoadingRef> {
        return this.loadingObservable.asObservable().pipe(filter((x: BlLoadingRef) => x && x.name === name));
    }

    show(name: string = defaultBlLoadingConfig.name, blLoadingConfig?: BlLoadingConfig) {
        const showPromise = new Promise((resolve, reject) => {
            if (blLoadingConfig && Object.keys(blLoadingConfig).length) {
                blLoadingConfig['name'] = name;
                this.loadingObservable.next(new BlLoadingRef({ ...blLoadingConfig, show: true }));
                resolve(true);
            } else {
                this.loadingObservable.next(new BlLoadingRef({ name, show: true }));
                resolve(true);
            }
        });
        return showPromise;
    }

    hide(name: string = defaultBlLoadingConfig.name) {
        const hidePromise = new Promise((resolve, reject) => {
            this.loadingObservable.next(new BlLoadingRef({ name, show: false }));
            resolve(true);
        });
        return hidePromise;
    }
}
