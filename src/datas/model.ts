export enum AppSiderMenuKeys {
    moniting = "moniting",
    auto_trade = "auto_trade",
    manual_trade = "manual_trade",
    user_settings = "user_settings",
};

export interface AppSiderMenuItem {
    title: string;
    key: AppSiderMenuKeys;
}

export type AppSiderMenuItems = Array<AppSiderMenuItem>;