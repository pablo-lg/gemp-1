import { Layout, Menu, Breadcrumb } from 'antd';
import './topbar.css'

import React, { useState } from 'react';


import { Navbar, Nav, NavbarToggler, NavbarBrand, Collapse } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';

import { MailOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';


export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isSwaggerEnabled: boolean;
}

const Topbar = (props: IHeaderProps) => {
  const { Header, Content, Footer } = Layout;

  const [menuOpen, setMenuOpen] = useState(false);
  const { SubMenu } = Menu;

  const renderDevRibbon = () =>
    props.isInProduction === false ? (
      <div className="ribbon dev">
        <a href="">Development</a>
      </div>
    ) : null;

  const toggleMenu = () => setMenuOpen(!menuOpen);

  /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */

  return (

    <Layout className="layout">
      <Header className="topbar">
        <Menu mode="horizontal" defaultSelectedKeys={['2']} >
          <SubMenu key="sub1" icon={<UserOutlined className="menuTopbar" style={{ fontSize: '25px' }} />} style={{ float: 'right', fontSize: '25px' }}>
            <Menu.Item key="1" >
              <Link to="/login">Login</Link>
            </Menu.Item>
            <Menu.Item key="2">Otros</Menu.Item>
            <Menu.Item key="3">Otrosss</Menu.Item>
          </SubMenu>
          {props.isAuthenticated && props.isAdmin && (
          <SubMenu key="sub2" title='admin' className="menuTopbar" style={{ float: 'right', color: 'rgb(9, 2, 15)' }}>
            <Menu.Item key="1" >
              <Link to="/docs">API</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/health">Health</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/logs">Logs</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/metrics">Metrics</Link>
            </Menu.Item>
          </SubMenu>
            )}
        </Menu>
      </Header>
    </Layout>


  );
};

export default Topbar;


