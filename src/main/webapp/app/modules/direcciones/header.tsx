import { PageHeader, Tag, Button, Statistic, Descriptions, Row, Menu, Dropdown } from 'antd';
import { RouteComponentProps } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { DownOutlined, UserOutlined } from '@ant-design/icons';




export const Header = (props) => {

  const titulo = props.identificador + ' - ' + props.nombre;

    const menu = (
        <Menu onClick={null}>
          <Menu.Item key="1" onClick={() => props.avanzarEmprendimiento()}>Avanzar</Menu.Item>
          <Menu.Item key="2">Pausar</Menu.Item>
          <Menu.Item key="3">Cancelar</Menu.Item>
        </Menu>
      );

    return(
        <>
            <PageHeader
                // onBack={() => window.history.back()}
                title={titulo}
                tags={<Tag color="blue">activo</Tag>}
                subTitle="prospecto"
                extra={[
                    <Button key="3" onClick={() => props.guardarEmprendimiento()}>Guardar</Button>,
                    <Dropdown key="2" overlay={menu}>
                    <Button key="21">
                      Acciones <DownOutlined />
                    </Button>
                  </Dropdown>,
                ]}
            >
     
            </PageHeader></>

    )
}

export default Header;