import { Layout, Menu, Breadcrumb } from 'antd';
import './topbar.css'

import React, { useState } from 'react';

import { connect } from 'react-redux';

import { Navbar, Nav, NavbarToggler, NavbarBrand, Collapse } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import LoadingBar from 'react-redux-loading-bar';

import { MailOutlined, UserOutlined, SettingOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { IRootState } from 'app/shared/reducers';


export interface IHeaderProps {
  isAuthenticated: boolean;
  isAdmin: boolean;
  ribbonEnv: string;
  isInProduction: boolean;
  isSwaggerEnabled: boolean;
  account: any;

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

      <Header className="site-layout-background" style={{ padding: 0 }}>
        <Menu mode="horizontal" defaultSelectedKeys={['2']} >
          <SubMenu key="sub1" icon={<UserOutlined className="menuTopbar" style={{ fontSize: '25px' }} />} style={{ float: 'right', fontSize: '25px' }}>
           
          {props.isAuthenticated ? 
            <Menu.Item key="5">
              <Link to="/logout">LogOut</Link>
            </Menu.Item>
            :
            <Menu.Item key="1" >
              <Link to="/login">Login</Link>
            </Menu.Item> 
          }
           
          </SubMenu>

        </Menu>
      </Header>


  );
};

const mapStateToProps = ({ authentication }: IRootState) => ({
  account: authentication.account,
});

export default connect(mapStateToProps)(Topbar);


