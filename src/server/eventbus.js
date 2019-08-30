import okrobot from "okrobot-js";

class EventBus{
    
    static on(eventName, handler) {
        return okrobot.eventbus.on(eventName, handler);
    }

    static once(eventName, handler) {
        return okrobot.eventbus.once(eventName, handler);
    }

    static remove(eventName, handler) {
        return okrobot.eventbus.remove(eventName, handler);
    }

    static removeOnce(eventName, handler) {
        return okrobot.eventbus.removeOnce(eventName, handler);
    }

}

export default EventBus;