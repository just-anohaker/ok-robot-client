import okrobot from "okrobot-js";

class AutoMarket {

    static async init(options, account) {
        return await okrobot.auto_market.init(options, account);
    }

    static async start() {
        return await okrobot.auto_market.start();
    }

    static async stop() {
        return await okrobot.auto_market.stop();
    }

    static async isRunning() {
        return await okrobot.auto_market.isRunning();
    }

    static async getOptionsAndAccount() {
        return await okrobot.auto_market.getOptionsAndAccount();
    }

}

export default AutoMarket;