import { Layout, Menu, Breadcrumb } from 'antd';
import './layoutPrincipal.css'

import React, { useState } from 'react';
import Sidebar from './sidebar/sidebar';
import Topbar from './header/topbar';

import { Navbar, Nav, NavbarToggler, NavbarBrand, Collapse } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';

import { MailOutlined, UserOutlined , SettingOutlined ,VideoCameraOutlined} from '@ant-design/icons';
import { OmitProps } from 'antd/lib/transfer/ListBody';


export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isSwaggerEnabled: boolean;
}

const LayoutPrincipal = (props) => {
 const { Header, Sider, Content } = Layout;

  const [menuOpen, setMenuOpen] = useState(false);
  const { SubMenu } = Menu;
  const [collapsed, setCollapsed] = useState(false);

 const toggle = () => setCollapsed(!collapsed);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */

  return (

    <Layout>
        <Sidebar />
        <Layout className="site-layout">
        <Topbar
            isAuthenticated={props.isAuthenticated}
            isAdmin={props.isAdmin}
            ribbonEnv={'true'}
            isInProduction={true}
            isSwaggerEnabled={true}
          />
            <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
            }}
          >
            {props.content}
          </Content>
        </Layout>
    </Layout>


  );
};

export default LayoutPrincipal;


