import okrobot from "okrobot-js";

class OkexUtils{

    static async getSpotTrade(options) {
        return await okrobot.okex_utils.getSpotTrade(options);
    }

    static async getSpotTicker(options) {
        return await okrobot.okex_utils.getSpotTicker(options);
    }

    static async getSpotCandles(options) {
        return await okrobot.okex_utils.getSpotCandles(options);
    }

    static async getWallet(account, currencyFilter) {
        return await okrobot.okex_utils.getWallet(account, currencyFilter);
    }

    static async getWalletList(account) {
        return await okrobot.okex_utils.getWalletList(account);
    }

    static setHostname(url){
        okrobot.config.hostname = url;
    }

    static setLogEnable(enable){
        okrobot.config.logEnabled = enable;
    }

}

export default OkexUtils;