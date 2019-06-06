import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { view as Header } from '../../components/header';
import { view as Sidebar } from '../../components/sidebar';
import { view as Overview } from '../overview';
import { view as Batch } from '../batch';
// import { view as Automatic } from '../automatic';
import { view as Manual } from '../manual';
import { view as Accounts } from '../accounts';
import styles from './home.module.css';

const HomePage = (props) => {
  const params = props.match.params.item
  const [collapsed, setCollapsed] = useState(false);
  const sidebarWidth = collapsed ? 80 : 256;
  const sidebarStyle = {
    flex: '0 0 ' + sidebarWidth + 'px',
    width: sidebarWidth + 'px'
  };

  return (
    <div className="ant-layout ant-layout-has-sider">
      <div style={sidebarStyle} className="ant-layout-sider ant-layout-sider-dark">
        <Sidebar collapsed={collapsed} params={params} />
      </div>
      <div className={`${styles['content-wrapper']} ant-layout`}>
        <div className={`${styles.header} ant-layout-header`}>
          <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        </div>
        <div className={`${styles.content} ant-layout-content`}>
          <Route path="/home/overview" component={Overview} />
          <Route path="/home/batch" component={Batch} />
          {/* <Route path="/home/automatic" component={Automatic} /> */}
          <Route path="/home/manual" component={Manual} />
          <Route path="/home/accounts" component={Accounts} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
