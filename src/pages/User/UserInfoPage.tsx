import React, {useEffect, useState} from 'react';
import {Avatar, Button, Card, Col, Descriptions, Divider, Empty, Row, Tabs, TabsProps, Tag} from 'antd';
import type {DescriptionsProps} from 'antd';
import {useModel, useParams} from "@@/exports";
import {history} from "@umijs/max";
import {PhoneOutlined} from "@ant-design/icons";
import {useSafeState} from "ahooks";
import {getUserVoByIdUsingGet} from "@/services/apis/userController";

const items: TabsProps['items'] = [
  {
    key: 'article',
    label: '文章',
  },
  {
    key: 'application',
    label: '应用',
  },
  {
    key: 'project',
    label: '项目',
  },
];

const UserInfoPage = () => {

  const {id} = useParams();
  const [user, setUser] = useState(null);
  const {initialState, loading, refresh, setInitialState} = useModel('@@initialState');
  const {currentUser} = initialState;
  const [current, setCurrent] = useSafeState("article");

  const loadData = async () => {
    const res = await getUserVoByIdUsingGet({id: id});
    if (res?.code === 40001) {
      history.push("/404")
    }

    if (res?.code === 0) {
      setUser(res?.data);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const onChange = (key: string) => {
    setCurrent(key);
  };

  return (
    <div style={{display: "flex", justifyContent: "center", paddingTop: 0}}>
      <Row style={{width: "90%"}}>
        <Col span={7} style={{height: "fit-content", display: "flex", justifyContent: "center"}}>
          <Card style={{
            width: "75%",
            boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)",
          }}>
            <div style={{width: "100%", height: "100%"}}>
              <div style={{width: "100%", marginTop: 30, marginBottom: 10, display: "flex", justifyContent: "center"}}>
                <Avatar src={user?.avatarUrl} size={90}></Avatar>
              </div>
              {/*姓名*/}
              <div style={{
                textAlign: "center",
                width: "100%",
                fontSize: 20,
                fontWeight: 500,
                color: 'rgb(0, 0, 0, 0.88)',
                marginBottom: 4
              }}>{user?.userName}</div>
              <div style={{
                textAlign: "center",
                width: "100%",
                fontSize: 14,
                color: 'rgb(0, 0, 0, 0.88)'
              }}>{user?.userProfile}</div>
              <Divider/>
              {
                (user?.id === currentUser?.id) && (
                  <div style={{marginTop: 20, width: "100%", display: "flex", justifyContent: "center"}}>
                    <Button style={{width: "60%"}} type={"primary"} onClick={() => {
                      history.push("/user/settings")
                    }}>修改信息</Button>
                  </div>)
              }
            </div>
          </Card>
        </Col>
        <Col span={17} style={{display: "flex", justifyContent: "center"}}>
          <Card style={{
            width: "100%",
            height: "500px",
            boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)",
          }}
                tabList={items}
                activeTabKey={current}
                onTabChange={onChange}
          >
            <div style={{paddingTop: 60}}>
              <Empty description={"暂无数据"}></Empty>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  )
};

export default UserInfoPage;
