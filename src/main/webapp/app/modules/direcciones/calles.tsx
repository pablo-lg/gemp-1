import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { RouteComponentProps } from 'react-router-dom';

import {getEntities as getEntitiesEmp} from '../../entities/tipo-emp/tipo-emp.reducer';
import {getEntities as getEntitiesObra} from '../../entities/tipo-obra/tipo-obra.reducer';
import {getEntities as getEntitiesSeg} from '../../entities/segmento/segmento.reducer';
import {getEntities as getEntitiesDesp} from '../../entities/tipo-desp/tipo-desp.reducer';
import {
  getProvincias, getLocalidades, getPartidos, getCalles, getGeographic,
  getTechnical, resetPartidos, resetCalles, resetLocalidades,setDomicilio
} from './mu.reducer';

import React, { useState, useEffect } from 'react';
import {
  Form,
  Input,
  Select,
  notification,
  Tabs,
  Upload,
  Button,
  message,
  Divider,
  Drawer,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Direcciones } from './direcciones';
export interface IDireccionesProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> { }
const { TextArea } = Input;


export const Calles = (props) => {

  useEffect(() => {
    props.getEntitiesEmp();
  }, []);

  useEffect(() => {
    props.getEntitiesObra();
  }, []);
  useEffect(() => {
    props.getEntitiesSeg();
  }, []);
  useEffect(() => {
    props.getEntitiesDesp();
  }, []);
  

  const [editForm, setEditForm] = useState(true);
  const { TabPane } = Tabs;
  const [componentSize, setComponentSize] = useState('default');
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  }
  const openNotification = (msg='test', descripcition='test', type='success') => {
    notification[type]({
      msg,
      descripcition,
      onClick()  {
        console.error('Notification Clicked!');
      },
    });
  };

  useEffect(() => {
    openNotification
  },[]);

  const propsUpload = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.error(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} archivo subido con exito`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} falla en adjuntar el archivo.`);
      }
    },
  };
  const showDrawer = () => {
    setVisibleDrawer(true);

  };

  const drawerDireccion = (
    <Drawer
    title="Seleccionar domicilio"
    width={720}
    onClose={() => setVisibleDrawer(false)}
    visible={visibleDrawer}
    bodyStyle={{ paddingBottom: 80 }}
    footer={<div
      style={{
        textAlign: 'right',
      }}
    >
      <Button onClick={() => setVisibleDrawer(false)} style={{ marginRight: 8 }}>
        Cancel
      </Button>
      <Button form="DireccionesForm" key="submit" htmlType="submit">
        Submit
      </Button>
    </div>}
  >
  <Direcciones {...props}/>
  </Drawer>
  )

  const formDireccion = (



      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        layout="vertical"
        initialValues={{ size: componentSize }}
        onValuesChange={onFormLayoutChange}
      >
        <Divider orientation="left">Datos de emprendimiento</Divider>
        <Form.Item style={{ marginBottom: 4 }}>
          <Form.Item label="Tipo Emprendimiento"
            style={{ display: 'inline-block', width: 'calc(30% - 4px)', margin: '0 4px 0 0' }}>
            <Select allowClear showSearch
              loading={props.loadingEmp}
              placeholder="Tipo emprendimiento"
              defaultValue={null}>
              {props.tipoEmpList ? props.tipoEmpList.map(otherEntity => (
                <Select.Option value={otherEntity.valor} key={otherEntity.valor}>
                  {otherEntity.valor}
                </Select.Option>
              ))
                : null}
            </Select>
          </Form.Item>
          <Form.Item label="Tipo de Obra"
            style={{ display: 'inline-block', width: 'calc(30% - 4px)', margin: '0 4px 0 0' }}>
            <Select allowClear showSearch
              loading={props.loadingObra}
              placeholder="Tipo de obra"
              defaultValue={null}>
              {props.tipoObraList ? props.tipoObraList.map(otherEntity => (
                <Select.Option value={otherEntity.valor} key={otherEntity.valor}>
                  {otherEntity.valor}
                </Select.Option>
              ))
                : null}
            </Select>
          </Form.Item>
          <Form.Item label="Segmento"
            style={{ display: 'inline-block', width: 'calc(30% - 4px)', margin: '0 4px 0 0' }}>
            <Select allowClear showSearch
              loading={props.loadingSeg}
              placeholder="Segmento"
              defaultValue={null}>
              {props.segmentoList ? props.segmentoList.map(otherEntity => (
                <Select.Option value={otherEntity.valor} key={otherEntity.valor}>
                  {otherEntity.valor}
                </Select.Option>
              ))
                : null}
            </Select>
          </Form.Item>


        </Form.Item>

        <Form.Item style={{ marginBottom: 4 }}>
          <Form.Item label="Despliegue"
            style={{ display: 'inline-block', width: 'calc(30% - 4px)', margin: '0 4px 0 0' }}>
            <Select allowClear showSearch
              loading={props.loadingDesp}
              placeholder="Tipo Despliegue"
              defaultValue={null}>
              {props.topoDespList ? props.topoDespList.map(otherEntity => (
                <Select.Option value={otherEntity.valor} key={otherEntity.valor}>
                  {otherEntity.valor}
                </Select.Option>
              ))
                : null}
            </Select>
          </Form.Item>
          <Form.Item label="Comentario" style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '1px 4px 0 0' }}>
            <TextArea rows={4} placeholder="Comentario..." />
          </Form.Item>
          <Form.Item label="Adjuntar" style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '1px  4px 0 0' }}>
            <Upload {...propsUpload}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
        </Form.Item>

        <Divider orientation="left">Datos de domicilio</Divider>
        <Button onClick={() => setVisibleDrawer(true)}>Actualizar domicilio</Button>
        <Form.Item style={{ marginBottom: 4 }}>
          <Form.Item label="Provincia" style={{ display: 'inline-block', width: 'calc(20% - 4px)', margin: '0 4px 0 0' }}>
            <Input disabled={editForm} value={props.stateOrProvince} placeholder="Provincia" />
          </Form.Item>
          <Form.Item label="Partido" style={{ display: 'inline-block', width: 'calc(20% - 4px)', margin: '0 4px 0 0' }}>
            <Input disabled={editForm} value={props.city} placeholder="Partido" />
          </Form.Item>
          <Form.Item label="Localidad" style={{ display: 'inline-block', width: 'calc(60% - 4px)', margin: '0 4px 0 0' }}>
            <Input disabled={editForm} value={props.locality} placeholder="Localidad" />
          </Form.Item>
        </Form.Item>
        <Form.Item style={{ marginBottom: 4 }}>
          <Form.Item label="Calle" style={{ display: 'inline-block', width: 'calc(66% - 4px)', margin: '1px 4px 0 0' }}>
            <Input disabled={editForm} value={props.streetName} placeholder="Calle" />
          </Form.Item>
          <Form.Item label="Altura" style={{ display: 'inline-block', width: 'calc(17% - 4px)', margin: '1px 4px 0 0' }}>
            <Input disabled={editForm} value={props.streetNr} placeholder="Altura" />
          </Form.Item>
          <Form.Item label="C. P." style={{ display: 'inline-block', width: 'calc(16% - 4px)', margin: '1px  4px 0 0' }}>
            <Input disabled={editForm} value={props.codigoPostal} placeholder="C. P." />
          </Form.Item>
        </Form.Item>

        <Form.Item style={{ marginBottom: 4 }}>
          <Form.Item label="latitud" style={{ display: 'inline-block', width: 'calc(50% - 4px)', margin: '1px 4px 0 0' }}>
            <Input disabled={editForm} value={props.geoX} placeholder="latitud" />
          </Form.Item>
          <Form.Item label="longitud" style={{ display: 'inline-block', width: 'calc(50% - 4px)', margin: '1px  4px 0 0' }}>
            <Input disabled={editForm} value={props.geoY} placeholder="longitud" />
          </Form.Item>
        </Form.Item>

        <Form.Item style={{ marginBottom: 4 }}>
          <Form.Item label="region" style={{ display: 'inline-block', width: 'calc(50% - 4px)', margin: '1px 4px 0 0' }}>
            <Input disabled={editForm} value="falta definir" placeholder="region" />
          </Form.Item>
          <Form.Item label="subregion" style={{ display: 'inline-block', width: 'calc(50% - 4px)', margin: '1px  4px 0 0' }}>
            <Input disabled={editForm} value="falta definir" placeholder="subregion" />
          </Form.Item>
        </Form.Item>

        <Form.Item style={{ marginBottom: 4 }}>
          <Form.Item label="Zona competencia" style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '1px 4px 0 0' }}>
            <Input disabled={editForm} value={props.zonaCompetencia} placeholder="zona de competencia" />
          </Form.Item>
          <Form.Item label="Hubs" style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '1px  4px 0 0' }}>
            <Input disabled={editForm} value={props.hub} placeholder="hubs" />
          </Form.Item>
          <Form.Item label="Barrio especial" style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '1px  4px 0 0' }}>
            <Input disabled={editForm} value={props.barriosEspeciales} placeholder="barrio especial" />
          </Form.Item>
        </Form.Item>

        <Form.Item style={{ marginBottom: 4 }}>
          <Form.Item label="Calle izquierda" style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '1px 4px 0 0' }}>
            <Input disabled={editForm} value={props.intersectionLeft} placeholder="Calle izquierda" />
          </Form.Item>
          <Form.Item label="Calle Derecha" style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '1px  4px 0 0' }}>
            <Input disabled={editForm} value={props.intersectionRight} placeholder="Calle Derecha" />
          </Form.Item>
          <Form.Item label="Latitud" style={{ display: 'inline-block', width: 'calc(16% - 4px)', margin: '1px  4px 0 0' }}>
            <Input disabled={editForm} value={props.geoX} placeholder="Latitud" />
          </Form.Item>
          <Form.Item label="Longitud" style={{ display: 'inline-block', width: 'calc(16% - 4px)', margin: '1px  4px 0 0' }}>
            <Input disabled={editForm} value={props.geoY} placeholder="Longitud" />
          </Form.Item>
        </Form.Item>


      </Form>
    )

  return (
    <div>
      {drawerDireccion}
      <Tabs  type="card">
        <TabPane tab="Datos generales" key="1">
          {formDireccion}
        </TabPane>
        <TabPane tab="Datos comerciales" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Datos Tecnicos" key="3">
          Content of Tab Pane 3
        </TabPane>
        <TabPane tab="Proyeccion Comercial" key="4">
          Content of Tab Pane 3
        </TabPane>
        <TabPane tab="Historial" key="5">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </div>
  );
};

const mapStateToProps = ({ tipoObra, tipoEmp, segmento, mu, tipoDesp }: IRootState) => ({
  tipoObraList: tipoObra.entities,
  loadingObra: tipoObra.loading,
  errorObra: tipoObra.errorMessage,

  tipoEmpList: tipoEmp.entities,
  loadingEmp: tipoEmp.loading,
  errorEmp: tipoEmp.errorMessage,

  segmentoList: segmento.entities,
  loadingSeg: segmento.loading,
  errorSeg: segmento.errorMessage,

  topoDespList: tipoDesp.entities,
  loadingDesp: tipoDesp.loading,
  errorDesp: tipoDesp.errorMessage,

  provincias: mu.provincias,
  partidos: mu.partidos,
  localidades: mu.localidades,
  calles: mu.calles,
  loading: mu.loading,
  errorMessage: mu.errorMessage,

  technical: mu.technical,

  geographic: mu.geographic,
  zonas: mu.zonas,
  geoX: mu.geoX,
  geoY: mu.geoY,
  zonaCompetencia: mu.zonaCompetencia,
  hub: mu.hub,
  codigoPostal: mu.codigoPostal,
  barriosEspeciales: mu.barriosEspeciales,
  streetType: mu.streetType,
  intersectionLeft: mu.intersectionLeft,
  intersectionRight: mu.intersectionRight,
  country:mu.country,
  stateOrProvince:mu.stateOrProvince,
  city:mu.city,
  locality:mu.locality,
  streetName:mu.streetName,
  streetNr:mu.streetNr,
});

const mapDispatchToProps = {
  getEntitiesEmp,
  getEntitiesObra,
  getEntitiesSeg,
  getEntitiesDesp,
  getProvincias,
  getPartidos,
  getLocalidades,
  getCalles,
  getGeographic,
  getTechnical,
  resetPartidos,
  resetLocalidades,
  resetCalles,
  setDomicilio,

};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Calles);

