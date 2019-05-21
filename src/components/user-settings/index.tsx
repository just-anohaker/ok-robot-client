import React from "react";
import { Card } from "antd";

interface IUserSettingProps {

}

interface IUserSettingState {

}

class UserSettingPage extends React.Component<IUserSettingProps, IUserSettingState> {
    render(): any {
        return (
            <Card
                className="App-Left"
                type="inner"
                title="账户管理"
                size="small">

            </Card>
        );
    }
}

export default UserSettingPage;