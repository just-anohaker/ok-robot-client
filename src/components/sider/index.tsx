import React from "react";
import { Menu } from "antd";

import { AppSiderMenuItems, AppSiderMenuItem, AppSiderMenuKeys } from "../../datas/model";

import AppDatas from "../../datas";

interface IAppSiderProps {
    menuItems: AppSiderMenuItems;
    defaultMenuItem: string;
}

interface IAppSiderState {
    selectedKeys?: string[];
}

class AppSider extends React.Component<IAppSiderProps, IAppSiderState> {
    appDatas: AppDatas = AppDatas.instance()

    state: IAppSiderState = {}

    componentDidMount(): void {
        this.setState({ selectedKeys: [this.props.defaultMenuItem] });
    }

    render(): any {
        const { selectedKeys = [] } = this.state || {};
        return (
            <div style={{ textAlign: "left", margin: 10 }}>
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={selectedKeys}
                    onClick={this.onMenuItemClick}>
                    {this.props.menuItems.map(value => this.buildMenuItem(value))}
                </Menu>
            </div>
        );
    }

    private buildMenuItem = (menuItem: AppSiderMenuItem): JSX.Element => {
        return (
            <Menu.Item key={menuItem.key}>
                {menuItem.title}
            </Menu.Item>
        );
    }

    /// event handlers
    onMenuItemClick = (data: { key: string, keyPath: string[] }): void => {
        this.setState({ selectedKeys: data.keyPath });

        this.appDatas.pageRouter.changeSelectedPage(data.keyPath[0] as AppSiderMenuKeys);
    }
}

export default AppSider;