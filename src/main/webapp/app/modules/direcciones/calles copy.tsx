import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import { RouteComponentProps } from 'react-router-dom';

import {getEntities as getEntitiesEmp} from '../../entities/tipo-emp/tipo-emp.reducer';
import {getEntities as getEntitiesObra} from '../../entities/tipo-obra/tipo-obra.reducer';
import {getEntities as getEntitiesSeg} from '../../entities/segmento/segmento.reducer';
import {getEntities as getEntitiesDesp} from '../../entities/tipo-desp/tipo-desp.reducer';
import {getEntities as getEntitiesTec} from '../../entities/tecnologia/tecnologia.reducer';
import {getEntities as getEntitiesEstado} from '../../entities/estado/estado.reducer';
import {getEntities as getEntitiesEjecCuentas} from '../../entities/ejec-cuentas/ejec-cuentas.reducer';
import {getEntities as getEntitiesCompetencia} from '../../entities/competencia/competencia.reducer';
import {getEntities as getEntitiesNse} from '../../entities/nse/nse.reducer';
import { createEntity, getEntityDireccion } from '../../entities/direccion/direccion.reducer';




import {
  getProvincias, getLocalidades, getPartidos, getCalles, getGeographic,
  getTechnical, resetPartidos, resetCalles, resetLocalidades,setDomicilio,getCompetencia
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
  DatePicker,
  Switch ,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { Direcciones } from './direcciones';
import Header from './header';

export interface IDireccionesProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> { }
const { TextArea } = Input;


export const Calles = (props) => {
  const [formEmprendimiento] = Form.useForm();

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
  useEffect(() => {
    props.getEntitiesTec();
  }, []);
  useEffect(() => {
    props.getEntitiesCompetencia();
  }, []);
  useEffect(() => {
    props.getEntitiesNse();
  }, []);
  useEffect(() => {
    props.getEntitiesEstado();
  }, []);
  useEffect(() => {
    props.getEntitiesEjecCuentas();
  }, []);
  
  

  const [editForm, setEditForm] = useState(true);
  const [negociacion, setNegociacion] = useState(false)
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

  const selectTipoObra = () => {
    <Form.Item label="Tipo de Obra" name="tipoDeObra"
    style={{ display: 'inline-block', width: 'calc(30% - 4px)', margin: '0 4px 0 0' }}>
    <Select allowClear showSearch
      loading={props.loadingObra}
      placeholder="Tipo de obra"
      defaultValue={null}>
      {props.tipoObraList ? props.tipoObraList.map(otherEntity => (
        <Select.Option value={otherEntity.descripcion} key={otherEntity.descripcion}>
          {otherEntity.descripcion}
        </Select.Option>
      ))
        : null}
    </Select>
  </Form.Item>
  }

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

  const tabTecnicos = (
    <Form
    form={formEmprendimiento}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      layout="vertical"
      initialValues={{ size: componentSize }}
      onValuesChange={onFormLayoutChange}
    >
      <Divider orientation="left">Datos Tecnicos</Divider>
      <Form.Item style={{ marginBottom: 4 }}>
        <Form.Item label="Codigo de obra" name="codObra"
          style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '0 4px 0 0' }}>
          <Input ></Input>
        </Form.Item>
        <Form.Item label="Tipo de Obra" name="tipoDeObra"
            style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '0 4px 0 0' }}>
            <Select allowClear showSearch
              loading={props.loadingObra}
              placeholder="Tipo de obra"
              value={formEmprendimiento.getFieldValue('tipoDeObra')}>
              {props.tipoObraList ? props.tipoObraList.map(otherEntity => (
                <Select.Option value={otherEntity.descripcion} key={otherEntity.descripcion}>
                  {otherEntity.descripcion}
                </Select.Option>
              ))
                : null}
            </Select>
          </Form.Item>

          <Form.Item label="Tecnologia" name="tecnologia"
            style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '0 4px 0 0' }}>
            <Select allowClear showSearch
              loading={props.loadingTec}
              placeholder="Tecnologia"
              defaultValue={null}>
              {props.tecnologiaList ? props.tecnologiaList.map(otherEntity => (
                <Select.Option value={otherEntity.descripcion} key={otherEntity.descripcion}>
                  {otherEntity.descripcion}
                </Select.Option>
              ))
                : null}
            </Select>
          </Form.Item>


      </Form.Item>

      <Form.Item style={{ marginBottom: 4 }}>
      <Form.Item label="Fecha fin de obra" name="fechaFinObra"
      style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '1px 4px 0 0' }}>
        <DatePicker placeholder="fecha"></DatePicker>
        </Form.Item>

        <Form.Item label="Hubs" name ="hubs"
        style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '1px  4px 0 0' }}>
            <Input readOnly value={props.hub} placeholder="hubs" />
          </Form.Item>

        <Form.Item label="Elementos de Red"  name="elementosDeRed"
        style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '1px 4px 0 0' }}>
          <Input ></Input>
        </Form.Item>
      </Form.Item>


    </Form>
  )

    const tabProyeccionComercial = (
    <Form
    form={formEmprendimiento}

      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      layout="vertical"
      initialValues={{ size: componentSize }}
      onValuesChange={onFormLayoutChange}
    >
      <Divider orientation="left">Datos Open</Divider>
      <Form.Item style={{ marginBottom: 4 }}>
        <Form.Item label="Clientes CATV" name="clientesCatv"
          style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '0 4px 0 0' }}>
          <Input ></Input>
        </Form.Item>

        <Form.Item label="Clientes Fibertel" name="clientesFibertel"
          style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '0 4px 0 0' }}>
          <Input ></Input>
        </Form.Item>

        <Form.Item label="Clientes Fibertel Lite" name="clientesFibertelLite"
          style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '0 4px 0 0' }}>
          <Input ></Input>
        </Form.Item>


      </Form.Item>

      <Form.Item style={{ marginBottom: 4 }}>
        <Form.Item label="Clientes Flow" name="clientesFlow"
          style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '0 4px 0 0' }}>
          <Input ></Input>
        </Form.Item>

        <Form.Item label="Clientes COMBO" name="clientesCombo"
        style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '1px 4px 0 0' }}>
        <Input ></Input>
        </Form.Item>

        <Form.Item label="Líneas Voz" name="lineasVoz"
        style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '1px 4px 0 0' }}>
          <Input ></Input>
        </Form.Item>
      </Form.Item>



      <Form.Item style={{ marginBottom: 4 }}>
        <Form.Item label="Meses de finalizado" name="mesesDeFinalizado"
          style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '0 4px 0 0' }}>
          <Input ></Input>
        </Form.Item>

        <Form.Item label="Cantidad de altas comprometidas por BC" name="altasBC"
        style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '1px 4px 0 0' }}>
        <Input ></Input>
        </Form.Item>

        <Form.Item label="Penetración respecto a Viv/Lot %" name="penetracionVivLot"
        style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '1px 4px 0 0' }}>
        <Input ></Input>
        </Form.Item>
      </Form.Item>

      <Form.Item style={{ marginBottom: 4 }}>
        <Form.Item label="Penetración respecto a la comprometida por BC %" name="penetracionBC"
          style={{ display: 'inline-block', width: 'calc(60% - 4px)', margin: '0 4px 0 0' }}>
          <Input ></Input>
        </Form.Item>

      </Form.Item>
      <Form.Item style={{ marginBottom: 4 }}>
        <Form.Item label="Demanda 1° año %" name="demanda1"
          style={{ display: 'inline-block', width: 'calc(25% - 4px)', margin: '0 4px 0 0' }}>
          <Input ></Input>
        </Form.Item>

        <Form.Item label="Demanda 2° año %" name="demanda2"
        style={{ display: 'inline-block', width: 'calc(25% - 4px)', margin: '1px 4px 0 0' }}>
        <Input ></Input>
        </Form.Item>

        <Form.Item label="Demanda 3° año %" name="demanda3"
        style={{ display: 'inline-block', width: 'calc(25% - 4px)', margin: '1px 4px 0 0' }}>
        <Input ></Input>
        </Form.Item>

        <Form.Item label="Demanda 4° año %" name="demanda4"
        style={{ display: 'inline-block', width: 'calc(25% - 4px)', margin: '1px 4px 0 0' }}>
        <Input ></Input>
        </Form.Item>
      </Form.Item>
      <Divider orientation="left">Datos comerciales</Divider>

      <Form.Item style={{ marginBottom: 4 }}>
        <Form.Item label="Lotes" name="lotes"
          style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '0 4px 0 0' }}>
          <Input ></Input>
        </Form.Item>

        <Form.Item label="Viviendas" name="viviendas"
          style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '0 4px 0 0' }}>
          <Input ></Input>
        </Form.Item>

        <Form.Item label="Comercios/profesionales" name="comProf"
          style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '0 4px 0 0' }}>
          <Input ></Input>
        </Form.Item>

      </Form.Item>
      <Form.Item style={{ marginBottom: 4 }}>
        <Form.Item label="Habitaciones" name="habitaciones"
          style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '0 4px 0 0' }}>
          <Input ></Input>
        </Form.Item>

        <Form.Item label="Manzanas"  name="manzanas"
        style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '1px 4px 0 0' }}>
        <Input ></Input>
        </Form.Item>

        <Form.Item label="Competencia" name="competencia"
        style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '1px 4px 0 0' }}>
        <Input ></Input>
        </Form.Item>
      </Form.Item>



    </Form>
  )

  const tabComerciales = (
    <Form
    form={formEmprendimiento}

      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      layout="vertical"
      initialValues={{ size: componentSize }}
      onValuesChange={onFormLayoutChange}
    >
      <Divider orientation="left">Datos comerciales</Divider>
      <Form.Item style={{ marginBottom: 4 }}>
        <Form.Item label="Lotes" name="lotes"
          style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '0 4px 0 0' }}>
          <Input ></Input>
        </Form.Item>

        <Form.Item label="Viviendas" name="viviendas"
          style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '0 4px 0 0' }}>
          <Input ></Input>
        </Form.Item>

        <Form.Item label="Comercios/profesionales" name="comProf"
          style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '0 4px 0 0' }}>
          <Input ></Input>
        </Form.Item>


      </Form.Item>

      <Form.Item style={{ marginBottom: 4 }}>
        <Form.Item label="Habitaciones" name="habitaciones"
          style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '0 4px 0 0' }}>
          <Input ></Input>
        </Form.Item>

        <Form.Item label="Manzanas"  name="manzanas"
        style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '1px 4px 0 0' }}>
        <Input ></Input>
        </Form.Item>

        <Form.Item label="Demanda" name="demanda"
        style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '1px 4px 0 0' }}>
          <Input ></Input>
        </Form.Item>
      </Form.Item>

      <Form.Item style={{ marginBottom: 4 }}>
        <Form.Item label="NSE" name="nse"
          style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '0 4px 0 0' }}>
            <Select allowClear showSearch
              loading={props.loadingNse}
              placeholder="NSE"
              defaultValue={null}>
              {props.nseList ? props.nseList.map(otherEntity => (
                <Select.Option value={otherEntity.descripcion} key={otherEntity.descripcion}>
                  {otherEntity.descripcion}
                </Select.Option>
              ))
                : null}
            </Select>
        </Form.Item>

        <Form.Item label="Zona competencia" name="zonaCompetencia"
          style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '1px 4px 0 0' }}>
            <Input readOnly value={props.competencia} placeholder="zona de competencia" />
          </Form.Item>

        <Form.Item label="Fecha de Relevamiento" name="fechaDeRelevamiento"
        style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '1px 4px 0 0' }}>
        <DatePicker placeholder="fecha"></DatePicker>
        </Form.Item>
      </Form.Item>
      <Divider orientation="left">Datos contacto</Divider>
      <Form.Item style={{ marginBottom: 4 }}>
        <Form.Item label="Contacto" name="contacto"
          style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '0 4px 0 0' }}>
          <Input ></Input>
        </Form.Item>

        <Form.Item label="Teléfono" name="telefono"
        style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '1px 4px 0 0' }}>
        <Input ></Input>
        </Form.Item>

        <Form.Item label="Año Priorización" name="anoPriorizacion"
        style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '1px 4px 0 0' }}>
        <DatePicker picker="quarter" placeholder="trimestre"></DatePicker>
        </Form.Item>
      </Form.Item>

      <Form.Item style={{ marginBottom: 4 }}>
        {/* <Form.Item label="Trimestre"
          style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '0 4px 0 0' }}>
        <DatePicker picker="quarter" placeholder="trimestre"></DatePicker>
        </Form.Item> */}

        <Form.Item label="Contrato Open" name="contratoOpen"
        style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '1px 4px 0 0' }}>
        <Input ></Input>
        </Form.Item>

        <Form.Item label="Ejecutivo de Cuentas" name="ejecutivoCuentas"
        style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '1px 4px 0 0' }}>
        <Select allowClear showSearch
              loading={props.loadingEjecCuentas}
              placeholder="Ejecutivo de cuentas"
              defaultValue={null}>
              {props.ejecCuentasList ? props.ejecCuentasList.map(otherEntity => (
                <Select.Option value={otherEntity.id} key={otherEntity.id}>
                  {otherEntity.nombre}
                </Select.Option>
              ))
                : null}
            </Select>
        </Form.Item>

        <Form.Item label="Grupo de Emprendimientos" name="grupoDeEmprendimientos"
          style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '0 4px 0 0' }}>
          <Input ></Input>
        </Form.Item>
      </Form.Item>

      <Divider orientation="left">Negociacion</Divider>


      <Form.Item style={{ marginBottom: 4 }}>


        <Form.Item label="Requiere Negociación" name="negociacion"
        style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '1px 4px 0 0' }}>
          <Switch checkedChildren="SI" unCheckedChildren="NO" onChange={() => setNegociacion(!negociacion)}/>
        </Form.Item>

      </Form.Item>

      {negociacion  ? (

      <><Form.Item style={{ marginBottom: 4 }}>
          <Form.Item label="Estado BC" name="estadoBC"
            style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '0 4px 0 0' }}>
            <Input></Input>
          </Form.Item>

          <Form.Item label="Fecha" name="fecha"
          style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '1px 4px 0 0' }}>
            <DatePicker placeholder="fecha"></DatePicker>
          </Form.Item>

          <Form.Item label="Código de Firma Digital" name="codigoDeFirma"
          style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '1px 4px 0 0' }}>
            <Input></Input>
          </Form.Item>
        </Form.Item><Form.Item style={{ marginBottom: 4 }}>

            <Form.Item label="Código de Firma Digital" style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '1px 4px 0 0' }}>
              <Input></Input>
            </Form.Item>
            <Form.Item label="Estado" name="estado"
              style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '0 4px 0 0' }}>
              <Select allowClear showSearch
                loading={props.loadingEstado}
                placeholder="Estado"
                defaultValue={null}>
                {props.estadoList ? props.estadoList.map(otherEntity => (
                  <Select.Option value={otherEntity.descripcion} key={otherEntity.descripcion}>
                    {otherEntity.descripcion}
                  </Select.Option>
                ))
                  : null}
              </Select>
            </Form.Item>

            <Form.Item label="Fecha Firma" name="fechaFirma"
            style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '1px 4px 0 0' }}>
              <DatePicker placeholder="fecha"></DatePicker>
            </Form.Item>


          </Form.Item>

          <Form.Item style={{ marginBottom: 4 }}>

            <Form.Item label="Anexar Archivo Business Case" name="anexarBC"
            style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '1px 4px 0 0' }}>
              <Input></Input>
            </Form.Item>
            <Form.Item label="Observaciones" name="observaciones"
            style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '1px 4px 0 0' }}>
              <Input></Input>
            </Form.Item>

          </Form.Item></>
      ) : null }
      


    </Form>
  )


  const tabGeneral = (
      <Form
      form={formEmprendimiento}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        layout="vertical"
        initialValues={{ size: componentSize }}
        onValuesChange={onFormLayoutChange}
      >
        <Divider orientation="left">Datos de emprendimiento</Divider>
        <Form.Item style={{ marginBottom: 4 }}>
          <Form.Item label="Tipo Emprendimiento" name="tipoEmprendimiento"
            style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '0 4px 0 0' }}>
            <Select allowClear showSearch
              loading={props.loadingEmp}
              placeholder="Tipo emprendimiento"
              defaultValue={null}>
              {props.tipoEmpList ? props.tipoEmpList.map(otherEntity => (
                <Select.Option value={otherEntity.descripcion} key={otherEntity.descripcion}>
                  {otherEntity.descripcion}
                </Select.Option>
              ))
                : null}
            </Select>
          </Form.Item>
          <Form.Item label="Tipo de Obra" name="tipoDeObra"
            style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '0 4px 0 0' }}>
            <Select allowClear showSearch
              loading={props.loadingObra}
              placeholder="Tipo de obra"
              defaultValue={null}>
              {props.tipoObraList ? props.tipoObraList.map(otherEntity => (
                <Select.Option value={otherEntity.descripcion} key={otherEntity.descripcion}>
                  {otherEntity.descripcion}
                </Select.Option>
              ))
                : null}
            </Select>
          </Form.Item>
          <Form.Item label="Segmento" name="segmento"
            style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '0 4px 0 0' }}>
            <Select allowClear showSearch
              loading={props.loadingSeg}
              placeholder="Segmento"
              defaultValue={null}>
              {props.segmentoList ? props.segmentoList.map(otherEntity => (
                <Select.Option value={otherEntity.descripcion} key={otherEntity.descripcion}>
                  {otherEntity.descripcion}
                </Select.Option>
              ))
                : null}
            </Select>
          </Form.Item>


        </Form.Item>

        <Form.Item style={{ marginBottom: 4 }}>
          <Form.Item label="Despliegue" name="tipoDespliegue"
            style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '0 4px 0 0' }}>
            <Select allowClear showSearch
              loading={props.loadingDesp}
              placeholder="Tipo Despliegue"
              defaultValue={null}>
              {props.topoDespList ? props.topoDespList.map(otherEntity => (
                <Select.Option value={otherEntity.descripcion} key={otherEntity.descripcion}>
                  {otherEntity.descripcion}
                </Select.Option>
              ))
                : null}
            </Select>
          </Form.Item>
          <Form.Item label="Comentario" name="comentario"
           style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '1px 4px 0 0' }}>
            <TextArea rows={4} placeholder="Comentario..." />
          </Form.Item>
          <Form.Item label="Adjuntar" name="adjuntar"
          style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '1px  4px 0 0' }}>
            <Upload {...propsUpload}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
        </Form.Item>

        <Divider orientation="left">Datos de domicilio</Divider>
        <Button onClick={() => setVisibleDrawer(true)}>Actualizar domicilio</Button>
        <Form.Item style={{ marginBottom: 4 }}>
          <Form.Item label="Provincia" name="provincia"
          style={{ display: 'inline-block', width: 'calc(20% - 4px)', margin: '0 4px 0 0' }}>
            <Input readOnly value={props.stateOrProvince} placeholder="Provincia" />
          </Form.Item>
          <Form.Item label="Partido" name="partido"
          style={{ display: 'inline-block', width: 'calc(20% - 4px)', margin: '0 4px 0 0' }}>
            <Input readOnly value={props.city} placeholder="Partido" />
          </Form.Item>
          <Form.Item label="Localidad" name="localidad"
          style={{ display: 'inline-block', width: 'calc(60% - 4px)', margin: '0 4px 0 0' }}>
            <Input readOnly value={props.locality} placeholder="Localidad" />
          </Form.Item>
        </Form.Item>
        <Form.Item style={{ marginBottom: 4 }}>
          <Form.Item label="Calle" name="calle"
          style={{ display: 'inline-block', width: 'calc(66% - 4px)', margin: '1px 4px 0 0' }}>
            <Input readOnly value={props.streetName} placeholder="Calle" />
          </Form.Item>
          <Form.Item label="Altura" name="altura"
          style={{ display: 'inline-block', width: 'calc(17% - 4px)', margin: '1px 4px 0 0' }}>
            <Input readOnly value={props.streetNr} placeholder="Altura" />
          </Form.Item>
          <Form.Item label="C. P." name="cp"
          style={{ display: 'inline-block', width: 'calc(17% - 4px)', margin: '1px  4px 0 0' }}>
            <Input readOnly value={props.codigoPostal} placeholder="C. P." />
          </Form.Item>
        </Form.Item>


        <Form.Item style={{ marginBottom: 4 }}>
          <Form.Item label="region" name="region"
          style={{ display: 'inline-block', width: 'calc(50% - 4px)', margin: '1px 4px 0 0' }}>
            <Input readOnly value={props.region} placeholder="region" />
          </Form.Item>
          <Form.Item label="subregion" name="subregion"
          style={{ display: 'inline-block', width: 'calc(50% - 4px)', margin: '1px  4px 0 0' }}>
            <Input readOnly value={props.subregion} placeholder="subregion" />
          </Form.Item>
        </Form.Item>

        <Form.Item style={{ marginBottom: 4 }}>
          <Form.Item label="Zona competencia" name="zonaCompetencia"
          style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '1px 4px 0 0' }}>
            <Input readOnly value={props.competencia} placeholder="zona de competencia" />
          </Form.Item>
          <Form.Item label="Hubs" name="hubs"
          style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '1px  4px 0 0' }}>
            <Input readOnly value={props.hub} placeholder="hubs" />
          </Form.Item>
          <Form.Item label="Barrio especial" name="barrioEspecial"
          style={{ display: 'inline-block', width: 'calc(34% - 4px)', margin: '1px  4px 0 0' }}>
            <Input readOnly value={props.barriosEspeciales} placeholder="barrio especial" />
          </Form.Item>
        </Form.Item>

        <Form.Item style={{ marginBottom: 4 }}>
          <Form.Item label="Calle izquierda" name="calleIzquierda"
          style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '1px 4px 0 0' }}>
            <Input readOnly value={props.intersectionLeft} placeholder="Calle izquierda" />
          </Form.Item>
          <Form.Item label="Calle Derecha" name="calleDerecha"
          style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '1px  4px 0 0' }}>
            <Input readOnly value={props.intersectionRight} placeholder="Calle Derecha" />
          </Form.Item>
          <Form.Item label="Latitud" name="latitud"
          style={{ display: 'inline-block', width: 'calc(17% - 4px)', margin: '1px  4px 0 0' }}>
            <Input readOnly value={props.geoX} placeholder="Latitud" />
          </Form.Item>
          <Form.Item label="Longitud" name="longitud"
          style={{ display: 'inline-block', width: 'calc(17% - 4px)', margin: '1px  4px 0 0' }}>
            <Input readOnly value={props.geoY} placeholder="Longitud" />
          </Form.Item>
        </Form.Item>


      </Form>
    )

  return (
    <div>
      <Header/>
      {drawerDireccion}
      <Tabs  type="card">
        <TabPane tab="Datos generales" key="1">
          {tabGeneral}
        </TabPane>
        <TabPane tab="Datos comerciales" key="2">
          {tabComerciales}
        </TabPane>
        <TabPane tab="Datos Tecnicos" key="3">
          {tabTecnicos}
        </TabPane>
        <TabPane tab="Proyeccion Comercial" key="4">
          {tabProyeccionComercial}
        </TabPane>
        <TabPane tab="Historial" key="5">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    </div>
  );
};

const mapStateToProps = ({ tipoObra, tipoEmp, segmento, tecnologia, estado, ejecCuentas, 
                           nSE, competencia, mu, tipoDesp }: IRootState) => ({
  tipoObraList: tipoObra.entities,
  loadingObra: tipoObra.loading,
  errorObra: tipoObra.errorMessage,

  tipoEmpList: tipoEmp.entities,
  loadingEmp: tipoEmp.loading,
  errorEmp: tipoEmp.errorMessage,

  segmentoList: segmento.entities,
  loadingSeg: segmento.loading,
  errorSeg: segmento.errorMessage,

  tecnologiaList: tecnologia.entities,
  loadingTec: tecnologia.loading,
  errorTec: tecnologia.errorMessage,

  nseList: nSE.entities,
  loadingNse: nSE.loading,
  errorNse: nSE.errorMessage,

  competenciaList: competencia.entities,
  loadingCompetencia: competencia.loading,
  errorCompetencia: competencia.errorMessage,

  estadoList: estado.entities,
  loadingEstado: estado.loading,
  errorEstado: estado.errorMessage,

  ejecCuentasList: ejecCuentas.entities,
  loadingEjecCuentas: ejecCuentas.loading,
  errorejEcCuentas: ejecCuentas.errorMessage,

  topoDespList: tipoDesp.entities,
  loadingDesp: tipoDesp.loading,
  errorDesp: tipoDesp.errorMessage,

  provincias: mu.provincias,
  partidos: mu.partidos,
  localidades: mu.localidades,
  calles: mu.calles,
  loading: mu.loading,
  errorMessage: mu.errorMessage,
  loadingTechnical: mu.loadingTechnical,
  technical: mu.technical,
  successGeographic: mu.successGeographic,
  loadingGeograpchic: mu.loadingGeograpchic,
  geographic: mu.geographic,
  zonas: mu.zonas,
  geoX: mu.geoX,
  geoY: mu.geoY,
  zonaCompetencia: mu.zonaCompetencia,
  region: mu.region,
  subregion: mu.subregion,
  competencia:mu.competencia,
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
  getEntitiesTec,
  getEntitiesEstado,
  getEntitiesEjecCuentas,
  getEntitiesCompetencia,
  getEntitiesNse,
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
  getCompetencia,
  getEntityDireccion,
  createEntity,


};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Calles);

