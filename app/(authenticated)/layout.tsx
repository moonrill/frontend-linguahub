"use client";

import React from 'react';
import {HomeFilled, InfoCircleFilled, LaptopOutlined, NotificationOutlined, UserOutlined} from '@ant-design/icons';
import type {MenuProps} from 'antd';
import {Breadcrumb, Layout, Menu, theme} from 'antd';
import {useRouter} from "next/navigation";

const {Header, Content, Sider} = Layout;

const items1: MenuProps['items'] = ['1', '2', '3'].map((key) => ({
  key,
  label: `nav ${key}`,
}));

const items2: MenuProps['items'] = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,

      children: new Array(4).fill(null).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  },
);

interface AuthenticatedLayoutProps {
  children: React.ReactNode
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({children}) => {
  const router = useRouter();

  const {
    token: {colorBgContainer},
  } = theme.useToken();

  const menu: MenuProps['items'] = [
    {
      key: `/home`,
      icon: <HomeFilled/>,
      label: `Home`,
    },
    {
      key: `/about`,
      icon: <InfoCircleFilled/>,
      label: `About`,
    }
  ]

  return (
    <Layout>
      <Header className="header flex">
        <div className={"text-white"}>y</div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[]} items={items1} className={"flex-1"}/>
      </Header>
      <Layout>
        <Sider width={200} style={{background: colorBgContainer}}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{height: '100%', borderRight: 0}}
            items={menu.concat(items2)}
            onClick={({key}) => {
              router.push(key);
              // console.log(`key ${key} route not found`);
            }}
          />
        </Sider>
        <Layout style={{padding: '0 24px 24px', height: 'calc(100vh - 64px)'}}>
          <Content
            style={{
              padding: 24,
              margin: '16px 0 0 0',
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default AuthenticatedLayout;
