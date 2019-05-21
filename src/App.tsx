import React from 'react';
import { Layout } from "antd";
import logo from './logo.svg';
import './App.css';

import AppSider from "./components/sider";
import MonitingPage from "./components/moniting";
import AutoTradePage from "./components/auto-trade";
import ManualTradePage from "./components/manual-trade";
import UserSettingPage from "./components/user-settings";

import { AppSiderMenuItems, AppSiderMenuKeys } from "./datas/model";
import Observable from './datas/observable';
import Observer from './datas/observer';
import AppDatas from "./datas";

const siderMenuConfig: AppSiderMenuItems = [
  { title: "监控页面", key: AppSiderMenuKeys.moniting },
  { title: "自动交易", key: AppSiderMenuKeys.auto_trade },
  { title: "手动交易", key: AppSiderMenuKeys.manual_trade },
  { title: "账户设置", key: AppSiderMenuKeys.user_settings }
];

function getContent(pageKey: AppSiderMenuKeys, ...elementProps: any[]): JSX.Element {
  if (pageKey === AppSiderMenuKeys.moniting) {
    return (<MonitingPage {...elementProps} />)
  } else if (pageKey === AppSiderMenuKeys.auto_trade) {
    return (<AutoTradePage {...elementProps} />)
  } else if (pageKey === AppSiderMenuKeys.manual_trade) {
    return (<ManualTradePage {...elementProps} />)
  } else if (pageKey === AppSiderMenuKeys.user_settings) {
    return (<UserSettingPage {...elementProps} />)
  } else {
    throw new Error(`Unsupported page(${pageKey})`);
  }
}

class App extends React.Component implements Observer {
  appDatas: AppDatas = AppDatas.instance();

  componentDidMount(): void {
    this.appDatas.pageRouter.registerObserver(this);
  }

  componentWillUnmount(): void {
    this.appDatas.pageRouter.unregisterObserver(this);
  }

  render(): any {
    console.log("app render");
    return (
      <Layout className="App">
        <Layout.Sider style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0
        }}>
          <AppSider
            menuItems={siderMenuConfig}
            defaultMenuItem={this.appDatas.pageRouter.SelectedPage} />
        </Layout.Sider>
        <Layout.Content style={{
          marginTop: 64,
          marginLeft: 200 + 10,
          marginRight: 10,
          marginBottom: 10,
        }}>
          {getContent(this.appDatas.pageRouter.SelectedPage)}
        </Layout.Content>
      </Layout>
    );
  }

  /// implement Observer
  update(observable: Observable): void {
    this.setState({});
  }
}

export default App;
