import { Layout, Menu, Breadcrumb } from 'antd';
import './sidebar.css'
import React, { useState } from 'react';
import { IRootState } from 'app/shared/reducers';
import { connect } from 'react-redux';
import { AUTHORITIES } from 'app/config/constants';


import { Navbar, Nav, NavbarToggler, NavbarBrand, Collapse } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';
import { hasAnyAuthority } from 'app/shared/auth/private-route';


import { MailOutlined, AimOutlined , TableOutlined ,RocketOutlined} from '@ant-design/icons';


export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isSwaggerEnabled: boolean;
}

const Sidebar = (props) => {
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
      <SubMenu key="sub1" icon={<TableOutlined />} title="ABMs">
        <Menu.Item key="11" icon={<TableOutlined />}>
          <Link to="/tipo-emp">Tipo Emp</Link>
        </Menu.Item>
        <Menu.Item key="12" icon={<TableOutlined />}>
          <Link to="/segmento">Segmento</Link>
        </Menu.Item>
        <Menu.Item key="13" icon={<TableOutlined />}>
          <Link to="/tipo-desp">Despliegues</Link>
        </Menu.Item>
        <Menu.Item key="14" icon={<TableOutlined />}>
          <Link to="/tipo-obra">Tipo-Obras</Link>
        </Menu.Item>
        {/* <Menu.Item key="15" icon={<TableOutlined />}>
          <Link to="/competencia">Competencia</Link>
        </Menu.Item> */}
        <Menu.Item key="16" icon={<TableOutlined />}>
          <Link to="/tecnologia">Tecnologia</Link>
        </Menu.Item>
        <Menu.Item key="17" icon={<TableOutlined />}>
          <Link to="/estado">Estado</Link>
        </Menu.Item>
        <Menu.Item key="18" icon={<TableOutlined />}>
          <Link to="/obra">Obra</Link>
        </Menu.Item>
        <Menu.Item key="19" icon={<TableOutlined />}>
          <Link to="/nse">Nse</Link>
        </Menu.Item>
        <Menu.Item key="20" icon={<TableOutlined />}>
          <Link to="/ejec-cuentas">Ejecutivos</Link>
        </Menu.Item>
      </SubMenu>

      {props.isAuthenticated && props.isAdmin && (
          <SubMenu key="sub2" title='Admin' icon={<TableOutlined />}>
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
        <Menu.Item key="31" icon={<RocketOutlined />}>
          <Link to="/emprendimiento">Emprendimientos</Link>
        </Menu.Item>
        <Menu.Item key="21" icon={<AimOutlined />}>
          <Link to="/direcciones">Nuevo emprendimiento</Link>
        </Menu.Item>
      </Menu>
    </Sider>
 


  );
};

const mapStateToProps = ({ authentication, applicationProfile }: IRootState) => ({
  isAuthenticated: authentication.isAuthenticated,
  isAdmin: hasAnyAuthority(authentication.account.authorities, [AUTHORITIES.ADMIN]),
 
});

export default connect(mapStateToProps)(Sidebar)


