import Observable from "../observable";
import Observer from "../observer";

import { AppSiderMenuKeys } from "../model";

class PageRouter implements Observable {
    private observers?: Observer[];
    private selectedPage?: AppSiderMenuKeys;

    constructor() {
        this.observers = [];
        this.selectedPage = AppSiderMenuKeys.user_settings;
    }

    get SelectedPage(): AppSiderMenuKeys {
        return this.selectedPage!;
    }

    changeSelectedPage(newPage: AppSiderMenuKeys, autoNotify: boolean = true) {
        this.selectedPage = newPage;
        if (autoNotify) {
            this.notifyall();
        }
    }

    /// Observable implements
    get Observers(): Observer[] {
        return this.observers!;
    }

    registerObserver(observer: Observer): boolean {
        if (this.hasObserver(observer)) {
            return true;
        }

        this.observers!.push(observer);
        return true;
    }

    unregisterObserver(observer: Observer): boolean {
        const findIdx = this.findObserverIndex(observer);
        if (findIdx === -1) {
            return true;
        }

        this.observers!.splice(findIdx, 1);
        return true;
    }

    hasObserver(observer: Observer): boolean {
        return this.findObserverIndex(observer) !== -1;
    }

    notify(...observers: Observer[]): void {
        observers.forEach(observer => {
            observer.update(this);
        })
    }

    notifyall(): void {
        this.observers!.forEach(observer => observer.update(this));
    }

    private findObserverIndex(observer: Observer): number {
        return this.observers!.findIndex(value => value === observer);
    }
}

export default PageRouter;