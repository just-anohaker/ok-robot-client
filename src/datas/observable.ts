import Observer from "./observer";

interface Observable {
    readonly Observers: Array<Observer>;

    registerObserver(observer: Observer): boolean;

    unregisterObserver(observer: Observer): boolean;

    hasObserver(observer: Observer): boolean;

    notify(...observers: Observer[]): void;

    notifyall(): void;
}

export default Observable;