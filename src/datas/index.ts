import PageRouter from "./page-router";

class AppDatas {

    private static _instance?: AppDatas;

    readonly pageRouter: PageRouter;

    static instance(): AppDatas {
        if (AppDatas._instance == null) {
            AppDatas._instance = new AppDatas();
        }

        return AppDatas._instance;
    }

    private constructor() {
        this.pageRouter = new PageRouter();
    }
}

export default AppDatas;
