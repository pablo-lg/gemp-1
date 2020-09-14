import { Layout, Menu, Breadcrumb } from 'antd';
import './sidebar.css'
import React, { useState } from 'react';

import { Navbar, Nav, NavbarToggler, NavbarBrand, Collapse } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';

import { MailOutlined, UserOutlined , SettingOutlined ,VideoCameraOutlined} from '@ant-design/icons';


export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isSwaggerEnabled: boolean;
}

const Sidebar = () => {
 const { Header, Sider, Content } = Layout;

  const [menuOpen, setMenuOpen] = useState(false);
  const { SubMenu } = Menu;
  const [collapsed, setCollapsed] = useState(false);

 const toggle = () => setCollapsed(!collapsed);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  /* jhipster-needle-add-element-to-menu - JHipster will add new menu items here */

  return (

    
    <Sider className="sidebar" trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" onClick={toggle}>
        {collapsed ? <h3>G</h3> : <h3>GEMP </h3>}
      </div>
      
      <Menu mode="inline" defaultSelectedKeys={['1']}>
      <SubMenu key="sub1" icon={<UserOutlined />} title="ABMs">
        <Menu.Item key="11" icon={<UserOutlined />}>
          <Link to="/tipo-emp">Tipo Emp</Link>
        </Menu.Item>
        <Menu.Item key="12" icon={<UserOutlined />}>
          <Link to="/segmento">Segmento</Link>
        </Menu.Item>
        <Menu.Item key="13" icon={<UserOutlined />}>
          <Link to="/tipo-desp">Despliegues</Link>
        </Menu.Item>
        <Menu.Item key="14" icon={<UserOutlined />}>
          <Link to="/tipo-obra">Obras</Link>
        </Menu.Item>
      </SubMenu>
        <Menu.Item key="21" icon={<UserOutlined />}>
          <Link to="/direcciones">Direcciones</Link>
        </Menu.Item>
        <Menu.Item key="31" icon={<UserOutlined />}>
          <Link to="/emprendimiento">Nuevo emprendimiento</Link>
        </Menu.Item>
      </Menu>
    </Sider>
 


  );
};

export default Sidebar;


