import okrobot from "okrobot-js";

class AutoMaker {

    static async init(options, account) {
        return await okrobot.auto_maker.init(options, account);
    }

    static async start() {
        return await okrobot.auto_maker.start();
    }

    static async stop() {
        return await okrobot.auto_maker.stop();
    }

    static async isRunning() {
        return await okrobot.auto_maker.isRunning();
    }

    static async getOptionsAndAccount() {
        return await okrobot.auto_maker.getOptionsAndAccount();
    }

    static async getOrderInfo(options, account) {
        return await okrobot.auto_maker.getOrderInfo(options, account);
    }
}

export default AutoMaker;