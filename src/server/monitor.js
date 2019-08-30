import okrobot from "okrobot-js";

class Monitor {

    static async monitSpotTrade(instrument_id) {
        return await okrobot.okex_monitor.monitSpotTrade(instrument_id);
    }

    static async unmonitSpotTrade(instrument_id) {
        return await okrobot.okex_monitor.unmonitSpotTrade(instrument_id);
    }

    static async monitSpotTicker(instrument_id) {
        return await okrobot.okex_monitor.monitSpotTicker(instrument_id);
    }

    static async unmonitSpotTicker(instrument_id) {
        return await okrobot.okex_monitor.unmonitSpotTicker(instrument_id);
    }

    static async monitSpotChannel(channel, filter) {
        return await okrobot.okex_monitor.monitSpotChannel(channel, filter);
    }

    static async unmonitSpotChannel(channel, filter) {
        return await okrobot.okex_monitor.unmonitSpotChannel(channel, filter);
    }

    static async monitSpotDepth(account, instrument_id) {
        return await okrobot.okex_monitor.monitSpotDepth(account, instrument_id);
    }

    static async unmonitSpotDepth(account, instrument_id) {
        return await okrobot.okex_monitor.unmonitSpotDepth(account, instrument_id);
    }

    static async monitSpotWallet(account, currency) {
        return await okrobot.okex_monitor.monitSpotWallet(account, currency);
    }

    static async unmonitSpotWallet(account, currency) {
        return await okrobot.okex_monitor.unmonitSpotWallet(account, currency);
    }

}

export default Monitor;