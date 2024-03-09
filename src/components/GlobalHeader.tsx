import {Avatar, Dropdown, Menu, MenuProps, message, Space} from "antd";
import {Link} from "react-router-dom";
import {HomeOutlined, UserOutlined} from "@ant-design/icons";
import React, {useState} from "react";
import {history, useModel} from "@@/exports";
import {userLogoutUsingPost} from "@/services/apis/userController";

const GlobalHeader = () => {

  const [current, setCurrent] = useState('mail');
  const {initialState, loading, refresh, setInitialState} = useModel('@@initialState');
  const {currentUser} = initialState;

  const navMenu: MenuProps['items'] = [
    {
      label: '首页',
      key: 'home',
      icon: <HomeOutlined/>,
    },
    currentUser?.userRole === 'admin' ? {
      key: 'admin',
      label: '管理员',
    } : null
  ];

  const items: MenuProps['items'] = [
    {
      key: 'info',
      label: '用户信息',
    },
    {
      key: 'logout',
      danger: true,
      label: '用户退出',
    },
  ];

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key);
    if (e.key === 'home') {
      history.push("/");
    }
    if(e.key === 'admin') {
      history.push('/admin');
    }
  };

  const handleMenuClick: MenuProps['onClick'] = async (e) => {
    if (e.key === 'logout') {
      // todo 用户退出
      const res = await userLogoutUsingPost();
      if (res?.code === 0) {
        message.success("退出成功");
        setInitialState(() => {
          return {
            ...initialState,
            currentUser: {}
          }
        })
      } else {
        message.success(`退出失败, ${res.message}`);
      }
    }

    if (e.key === 'info') {
      window.location.href = `/user/info/${currentUser?.id}`
    }
  };

  return (
    <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
      <div style={{width: "fit-content"}}>
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={navMenu}/>
      </div>
      <div>
        {!currentUser?.id && (
          <div>
            <Link to={"/user/login"}>登录</Link>
          </div>
        )}
        {currentUser?.id && (
          <div>
            <Dropdown style={{marginTop: 30}} menu={{items, onClick: handleMenuClick}} placement="bottom"
                      arrow={{pointAtCenter: true}}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>
                </Space>
              </a>
            </Dropdown>
          </div>
        )}
      </div>
    </div>
  )
};

export default GlobalHeader;
