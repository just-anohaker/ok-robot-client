import okrobot from "okrobot-js";

class BatchOrder {

    static async generate(options, account) {
        return await okrobot.batch_order.generate(options, account);
    }

    static async cancel(options, account) {
        return await okrobot.batch_order.cancel(options, account);
    }

    static async limitOrder(options, account) {
        return await okrobot.batch_order.limitOrder(options, account);
    }

    static async marketOrder(options, account) {
        return await okrobot.batch_order.marketOrder(options, account);
    }

    static async icebergOrder(options, account) {
        return await okrobot.batch_order.icebergOrder(options, account);
    }

    static async startDepInfo(options) {
        return await okrobot.batch_order.startDepInfo(options);
    }

    static async stopDepInfo(options) {
        return await okrobot.batch_order.stopDepInfo(options);
    }

    static async getOrderData(options, account) {
        return await okrobot.batch_order.getOrderData(options, account);
    }

    static async toBatchOrder(options, account) {
        return await okrobot.batch_order.toBatchOrder(options, account);
    }

}

export default BatchOrder;