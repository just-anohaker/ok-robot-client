import okrobot from "okrobot-js";

class TakeOrder{

    static async generate(options, account) {
        return await okrobot.okex_monitor.generate(options, account);
    }

    static async start(oids) {
        return await okrobot.okex_monitor.start(oids);
    }

}

export default TakeOrder;