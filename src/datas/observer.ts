import Observable from "./observable";

interface Observer {
    update(observable: Observable): void;
}

export default Observer;