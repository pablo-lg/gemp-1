import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Storage } from 'react-jhipster';
import { IRootState } from 'app/shared/reducers';
import { getEntities as getEntitiesEmp } from '../../entities/tipo-emp/tipo-emp.reducer';
import { getEntities as getEntitiesObra } from '../../entities/tipo-obra/tipo-obra.reducer';
import { getEntities as getEntitiesSeg } from '../../entities/segmento/segmento.reducer';
import { getEntities as getEntitiesDesp } from '../../entities/tipo-desp/tipo-desp.reducer';
import { getEntities as getEntitiesTec } from '../../entities/tecnologia/tecnologia.reducer';
import { getEntities as getEntitiesEstado } from '../../entities/estado/estado.reducer';
import { getEntities as getEntitiesEjecCuentas } from '../../entities/ejec-cuentas/ejec-cuentas.reducer';
import { getEntities as getEntitiesCompetencia } from '../../entities/competencia/competencia.reducer';
import { getEntities as getEntitiesNse } from '../../entities/nse/nse.reducer';
import { getEntities as getEntitiesGrupoEmp } from '../../entities/grupo-emprendimiento/grupo-emprendimiento.reducer';

import { createEntity, getEntityDireccion } from '../../entities/direccion/direccion.reducer';
import { getEntity as getEmprendimiento, updateEntity as updateEmprendimiento, reset as resetEmprendimiento } from '../../entities/emprendimiento/emprendimiento.reducer';

import {
  getProvincias, getLocalidades, getPartidos, getCalles, getGeographic,
  getTechnical, resetPartidos, resetCalles, resetLocalidades, setDomicilio, getCompetencia
} from '../../modules/direcciones/mu.reducer';

import React, { useState, useEffect } from 'react';
import {Form,Input,Select,notification,Tabs,Upload,Button,message,Divider,Drawer,
        DatePicker,Switch,Spin,ConfigProvider,Skeleton,} from 'antd';
import { UploadOutlined, SmileOutlined, WarningTwoTone, WarningOutlined } from '@ant-design/icons';
import { Direcciones } from '../../modules/direcciones/direcciones';
import Header from '../../modules/direcciones/header';
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment';
import axios from 'axios';


export interface IEmprendimientoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> { }

export const EmprendimientoDetail = (props) => {
  useEffect(() => {
    props.getEmprendimiento(props.match.params.id);
    props.getEntitiesEmp();
    props.getEntitiesObra();
    props.getEntitiesSeg();
    props.getEntitiesDesp();
    props.getEntitiesTec();
    props.getEntitiesCompetencia();
    props.getEntitiesNse();
    props.getEntitiesGrupoEmp();
    props.getEntitiesEstado();
    props.getEntitiesEjecCuentas();

  }, []);

  let fileleList = [];

  const [filesBC, setFilesBC] = useState([]);
  const [filesDG, setFilesDG] = useState([]);
  const [loadingFilesBC, setLoadingFilesBC] = useState(false);
  const [loadingFilesDG, setLoadingFilesDG] = useState(false);
  useEffect(() => {
    setLoadingFilesBC(true);
    setLoadingFilesDG(true);
    const fetchDataBC = async () => {
      const result = await axios.get(
        'api/allFiles', { 'headers': { 'emprendimiento': props.match.params.id + "/BC" } }
      );

      fileleList = result.data.map((m) => ({
        name: m, uid: m, status: 'done', url: 'api/downloadFile/' + m,
      }));
      setFilesBC(fileleList)
      setLoadingFilesBC(false);
    };

    const fetchDataDG = async () => {
      const result = await axios.get(
        'api/allFiles', { 'headers': { 'emprendimiento': props.match.params.id + "/DG" } }
      );
      fileleList = result.data.map((m) => ({
        name: m, uid: m, status: 'done', url: 'api/downloadFile/' + m,
      }));
      setFilesDG(fileleList)
      setLoadingFilesDG(false);
    };
    console.error(fileleList)
    fetchDataBC().catch(() => { setLoadingFilesBC(false) });
    fetchDataDG().catch(() => { setLoadingFilesDG(false) });
  }, []);

  const fetchFile = async (name, carpeta) => {
    const result = await axios.get(
      'api/downloadFile/' + name, { 'headers': { 'emprendimiento': props.match.params.id + "/" + carpeta }, responseType: 'blob' }
    ).then(({ data }) => {
      const downloadUrl = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', name); //  any other extension
      document.body.appendChild(link);
      link.click();
      link.remove();
    })

  };

  const removeFile = async (name, carpeta) => {
    const result = await axios.delete(
      'api/deleteFile', { 'headers': { 'emprendimiento': props.match.params.id + "/" + carpeta }, 'params': { 'file': name } }
    ).then(({ data }) => {
    })
  };

  const [formEmprendimiento] = Form.useForm();

  useEffect(() => {
    if (props.emprendimientoEntity.direccion) {
      formEmprendimiento.setFieldsValue(
        {
          ...props.emprendimientoEntity.direccion,
          ...props.emprendimientoEntity,
          fechaDeRelevamiento: props.emprendimientoEntity.fechaDeRelevamiento ? moment(props.emprendimientoEntity.fechaDeRelevamiento) : null,
          anoPriorizacion: props.emprendimientoEntity.anoPriorizacion ? moment(props.emprendimientoEntity.anoPriorizacion) : null,
          fechaFirma: props.emprendimientoEntity.fechaFirma ? moment(props.emprendimientoEntity.fechaFirma) : null,
          fecha: props.emprendimientoEntity.fecha ? moment(props.emprendimientoEntity.fecha) : null,
          fechaFinObra: props.emprendimientoEntity.fechaFinObra ? moment(props.emprendimientoEntity.fechaFinObra) : null,
          segmento: props.emprendimientoEntity.segmento ? props.emprendimientoEntity.segmento.id : null,
          tipoEmp: props.emprendimientoEntity.tipoEmp ? props.emprendimientoEntity.tipoEmp.id : null,
          tecnologia: props.emprendimientoEntity.tecnologia ? props.emprendimientoEntity.tecnologia.id : null,
          tipoObra: props.emprendimientoEntity.tipoObra ? props.emprendimientoEntity.tipoObra.id : null,
          obra: props.emprendimientoEntity.obra ? props.emprendimientoEntity.obra.id : null,
          nse: props.emprendimientoEntity.nse ? props.emprendimientoEntity.nse.id : null,
          estado: props.emprendimientoEntity.estado ? props.emprendimientoEntity.estado.id : null,
          ejecCuentas: props.emprendimientoEntity.ejecCuentas ? props.emprendimientoEntity.ejecCuentas.id : null,
          grupoDeEmprendimientos: props.emprendimientoEntity.grupoDeEmprendimientos ? props.emprendimientoEntity.grupoDeEmprendimientos.id : null,

        })

    }
  }, [props.emprendimientoEntity.direccion]);

  const [filterSegmento, setFilterSegmento] = useState(props.emprendimientoEntity.segmento ? props.emprendimientoEntity.segmento.id : null);
  const changeFilterSegmento = (val, evt) => {
    setFilterSegmento(val);
    // borrar los valores de tipo obra y ejecutivo cuenta
    formEmprendimiento.setFieldsValue(
      {
        ejecCuentas: null,
        tipoObra: null
      })
  }

  useEffect(() => {
    setFilterSegmento(props.emprendimientoEntity.segmento ? props.emprendimientoEntity.segmento.id : null);
  }, [props.emprendimientoEntity])

  const [negociacion, setNegociacion] = useState(false)
  const { TabPane } = Tabs;
  const [componentSize, setComponentSize] = useState('default');
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  }
  const openNotification = (msg = 'test', description = 'test', type = 'success') => {
    notification.error({
      message:msg,
      description,
      onClick() {
        console.error('Notification Clicked!');
      },
    });
  };

  useEffect(() => {
    openNotification
  }, []);

  const guardarEmprendimiento = () => {
    const entity = {
      ...props.emprendimientoEntity,
      ...formEmprendimiento.getFieldsValue(),
      comentario: formEmprendimiento.getFieldValue('comentario') ? formEmprendimiento.getFieldValue('comentario') : null,
      lotes: formEmprendimiento.getFieldValue('lotes') ? formEmprendimiento.getFieldValue('lotes') : null,
      segmento: formEmprendimiento.getFieldValue('segmento') ? { id: formEmprendimiento.getFieldValue('segmento') } : null,
      despliegue: formEmprendimiento.getFieldValue('despliegue') ? { id: formEmprendimiento.getFieldValue('despliegue') } : null,
      ejecCuentas: formEmprendimiento.getFieldValue('ejecCuentas') ? { id: formEmprendimiento.getFieldValue('ejecCuentas') } : null,
      estado: formEmprendimiento.getFieldValue('estado') ? { id: formEmprendimiento.getFieldValue('estado') } : null,
      nse: formEmprendimiento.getFieldValue('nse') ? { id: formEmprendimiento.getFieldValue('nse') } : null,
      obra: formEmprendimiento.getFieldValue('obra') ? { id: formEmprendimiento.getFieldValue('obra') } : null,
      tecnologia: formEmprendimiento.getFieldValue('tecnologia') ? { id: formEmprendimiento.getFieldValue('tecnologia') } : null,
      tipoObra: formEmprendimiento.getFieldValue('tipoObra') ? { id: formEmprendimiento.getFieldValue('tipoObra') } : null,
      tipoEmp: formEmprendimiento.getFieldValue('tipoEmp') ? { id: formEmprendimiento.getFieldValue('tipoEmp') } : null,
      grupoDeEmprendimientos: formEmprendimiento.getFieldValue('grupoDeEmprendimientos') ? { id: formEmprendimiento.getFieldValue('grupoDeEmprendimientos') } : null,

    }
    const test = formEmprendimiento.getFieldsValue()
    console.error("guardar emprendimientos: " + { ...formEmprendimiento.getFieldsValue() })
    props.updateEmprendimiento(entity)
  }

  const avanzarEmprendimiento =() => {
    formEmprendimiento.validateFields().catch(errorInfo =>{
      openNotification("Error", "Faltan completar campos obligatorios: "+errorInfo.errorFields.map(e => e.name+" - "), "error")
    });
  }

  const onFinish = values => {

    const valores = props.muValores
    const dir = {
      pais: 'ARGENTINA',
      ...valores,
      ...values,
    };
    const entity = {
      direccion: {
        id: props.direccionEntity.id,
      },
      contacto: 'contacto'
    }
    console.error('Received values of form: ', values);
    props.createEntity(dir)
  };

  const handleTecRed = (value, select) => {
    props.getTechnical('ARGENTINA', formEmprendimiento.getFieldValue('provincia'), formEmprendimiento.getFieldValue('partido'),
      formEmprendimiento.getFieldValue('localidad'), formEmprendimiento.getFieldValue('calle'), formEmprendimiento.getFieldValue('altura'));

    const accessType = props.technical.physicalNetworkElements ? props.technical.physicalNetworkElements.filter((a) => a.accessType === select.key) : null
    let elemento = 'No exixten elementos de red'
    try {
      elemento = accessType[0].physicalCharacteristic.filter((a) => a.name === 'elementoRed')[0].valuefrom

      console.error(elemento)
    } catch (error) {
      console.error("Error al recuperar el elemento de red: " + error)
    }

    formEmprendimiento.setFieldsValue({
      elementosDeRed: elemento,
    });
  }
  const token = Storage.local.get('jhi-authenticationToken') || Storage.session.get('jhi-authenticationToken');
  if (token) {
    const headersAuth = `Bearer ${token}`;
  }


  const propsUploadBC = {
    name: 'file',
    dir: 'empre',
    action: 'api/uploadFile',
    headers: {
      Authorization: `Bearer ${token}`,
      emprendimiento: `${props.emprendimientoEntity.id}/BC`
    },
    defaultFileList: [...filesBC],
    onPreview: (f) => fetchFile(f.name, "BC"),
    onRemove: (f) => removeFile(f.name, "BC"),
    onChange(info) {
      if (info.file.status !== 'subiendo') {
        console.error(info.file, info.fileList);
      }
      if (info.file.status === 'terminado') {
        message.success(`${info.file.name} archivo subido con exito`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} falla en adjuntar el archivo.`);
      }
    },
  };

  const propsUploadDG = {
    name: 'file',
    dir: 'empre',
    action: 'api/uploadFile',
    headers: {
      Authorization: `Bearer ${token}`,
      emprendimiento: `${props.emprendimientoEntity.id}/DG`
    },
    defaultFileList: [...filesDG],
    onPreview: (f) => fetchFile(f.name, "DG"),
    onRemove: (f) => removeFile(f.name, "DG"),
    onChange(info) {
      if (info.file.status !== 'subiendo') {
        console.error(info.file, info.fileList);
      }
      if (info.file.status === 'terminado') {
        message.success(`${info.file.name} archivo subido con exito`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} falla en adjuntar el archivo.`);
      }
    },
  };
  const showDrawer = () => {
    setVisibleDrawer(true);

  };

  const customizeRenderEmptySegmento = () => (
    <div style={{ textAlign: 'center' }}>
      <WarningOutlined style={{ fontSize: 40 }} />
      <p>Debe seleccionar un Segmento</p>
    </div>
  );

  const customizeRenderEmpty = () => (
    <div style={{ textAlign: 'center' }}>
      <WarningOutlined twoToneColor="red" style={{ fontSize: 40 }} />
      <p>No se encontraron datos</p>
    </div>
  );
  const viewTipoObra = (
    <Form.Item label="Tipo de Obra" name="tipoObra"
      style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '0 4px 0 0' }}>
      {/* <ConfigProvider renderEmpty={customizeRenderEmptySegmento}> */}
      <Select allowClear showSearch
        loading={props.loadingObra}
        placeholder="Tipo de obra"
        optionFilterProp="children"
        filterOption={(input: any, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        {props.tipoObraList ? props.tipoObraList.filter(i => i.segmento.id === filterSegmento).map(otherEntity => (
          <Select.Option value={otherEntity.id} key={otherEntity.descripcion}>
            {otherEntity.descripcion}
          </Select.Option>
        ))
          : null}
      </Select>
      {/* </ConfigProvider> */}
    </Form.Item>
  )
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
      <Direcciones {...props} />
    </Drawer>
  )

  const rulesProspecto = [{ required: true, message: 'Dato obligatorio para avanzar de estado' }]
  // rulesProspecto = []

  const inputForm = (label, name, width = 'calc(33% - 4px)', rules=[]) => {
    const style = { display: 'inline-block', width, margin: '0 4px 0 0' }
    return (
      <Form.Item label={label} name={name} rules={rules}
        style={style}>
        <Input ></Input>
      </Form.Item>
    )
  }

  const tabTecnicos = (
    <Form
      form={formEmprendimiento}
      onFinish={onFinish}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      layout="vertical"
      initialValues={{ size: componentSize }}
      onValuesChange={onFormLayoutChange}
    >
      <Divider orientation="left">Datos Tecnicos</Divider>

      <Form.Item style={{ marginBottom: 4 }}>
        {inputForm('Codigo de obra', 'codObra')}
        {viewTipoObra}
        <Form.Item label="Tecnologia" name="tecnologia"
          style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '0 4px 0 0' }}>
          <Select allowClear showSearch
            loading={props.loadingTec}
            placeholder="Tecnologia"
            optionFilterProp="children"
            onSelect={(value, select) => handleTecRed(value, select)}
            filterOption={(input: any, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            defaultValue={null}>
            {props.tecnologiaList ? props.tecnologiaList.map(otherEntity => (
              <Select.Option value={otherEntity.id} key={otherEntity.descripcion}>
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
          <DatePicker placeholder="fecha" format={'DD/MM/YYYY'}></DatePicker>
        </Form.Item>

        <Form.Item label="Central/HUB" name="hub"
          style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '1px  4px 0 0' }}>
          <Input readOnly value={props.hub} placeholder="hub" />
        </Form.Item>
        {inputForm('Elementos de Red', 'elementosDeRed')}
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
        {inputForm('Clientes CATV', 'clientesCatv')}
        {inputForm('Clientes Fibertel', 'clientesFibertel')}
        {inputForm('Clientes Fibertel Lite', 'clientesFibertelLite')}
      </Form.Item>
      <Form.Item style={{ marginBottom: 4 }}>
        {inputForm('Clientes Flow', 'clientesFlow')}
        {inputForm('Clientes COMBO', 'clientesCombo')}
        {inputForm('Líneas Voz', 'lineasVoz')}
      </Form.Item>
      <Form.Item style={{ marginBottom: 4 }}>
        {inputForm('Meses de finalizado', 'mesesDeFinalizado')}
        {inputForm('Cantidad de altas comprometidas por BC', 'altasBC')}
        {inputForm('Penetración respecto a Viv/Lot %', 'penetracionVivLot')}
      </Form.Item>
      <Form.Item style={{ marginBottom: 4 }}>
        {inputForm('Penetración respecto a la comprometida por BC %', 'penetracionBC', 'calc(60% - 4px)')}
      </Form.Item>
      <Form.Item style={{ marginBottom: 4 }}>
        {inputForm('Demanda 1° año %', 'demanda1', 'calc(25% - 4px)')}
        {inputForm('Demanda 2° año %', 'demanda2', 'calc(25% - 4px)')}
        {inputForm('Demanda 3° año %', 'demanda3', 'calc(25% - 4px)')}
        {inputForm('Demanda 4° año %', 'demanda4', 'calc(25% - 4px)')}
      </Form.Item>

      <Divider orientation="left">Datos comerciales</Divider>

      <Form.Item style={{ marginBottom: 4 }}>
        {inputForm('Lotes', 'lotes')}
        {inputForm('Viviendas', 'viviendas')}
        {inputForm('Comercios/profesionales', 'comProf')}
      </Form.Item>
      <Form.Item style={{ marginBottom: 4 }}>
        {inputForm('Habitaciones', 'habitaciones')}
        {inputForm('Manzanas', 'manzanas')}
        {inputForm('Competencia', 'competencia')}
      </Form.Item>
    </Form>
  )

  const tabComerciales = (
    <Form
      form={formEmprendimiento}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      layout="vertical"
      initialValues={...props.emprendimientoEntity.direccion}
      onValuesChange={onFormLayoutChange}
    >
      <Divider orientation="left">Datos comerciales</Divider>

      <Form.Item style={{ marginBottom: 4 }}>
        {inputForm('Lotes', 'lotes')}
        {inputForm('Viviendas', 'viviendas')}
        {inputForm('Comercios/profesionales', 'comProf')}
      </Form.Item>

      <Form.Item style={{ marginBottom: 4 }}>
        {inputForm('Habitaciones', 'habitaciones')}
        {inputForm('Manzanas', 'manzanas')}
        {inputForm('Demanda', 'demanda')}
      </Form.Item>

      <Form.Item style={{ marginBottom: 4 }}>
        <Form.Item label="NSE" name="nse"
          style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '0 4px 0 0' }}>
          <Select allowClear showSearch
            loading={props.loadingNse}
            placeholder="NSE"
            optionFilterProp="children"
            filterOption={(input: any, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            defaultValue={null}>
            {props.nseList ? props.nseList.map(otherEntity => (
              <Select.Option value={otherEntity.id} key={otherEntity.descripcion}>
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
          <DatePicker placeholder="fecha" format={'DD/MM/YYYY'}></DatePicker>
        </Form.Item>
      </Form.Item>

      <Divider orientation="left">Datos contacto</Divider>

      <Form.Item style={{ marginBottom: 4 }}>
        {inputForm('Contacto', 'contacto')}
        {inputForm('Teléfono', 'telefono')}
        <Form.Item label="Año/Trimestre Priorización" name="anoPriorizacion"
          style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '1px 4px 0 0' }}>
          <DatePicker picker="quarter" placeholder="trimestre"></DatePicker>
        </Form.Item>
      </Form.Item>

      <Form.Item style={{ marginBottom: 4 }}>
        {inputForm('Contrato Open', 'contratoOpen')}
        <Form.Item label="Ejecutivo de Cuentas" name="ejecCuentas"
          style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '1px 4px 0 0' }}>
          <Select allowClear showSearch
            loading={props.loadingEjecCuentas}
            placeholder="Ejecutivo de cuentas"
            optionFilterProp="children"
            filterOption={(input: any, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            defaultValue={null}>
            {props.ejecCuentasList ? props.ejecCuentasList.filter(i => i.segmento.id === filterSegmento).map(otherEntity => (
              <Select.Option value={otherEntity.id} key={otherEntity.id}>
                {otherEntity.nombre ? otherEntity.nombre : null}
              </Select.Option>
            ))
              : null}
          </Select>
        </Form.Item>
        <Form.Item label="Grupo de Emprendimientos" name="grupoDeEmprendimientos"
          style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '0 4px 0 0' }}>
          <Select allowClear showSearch
            loading={props.loadingNse}
            placeholder="Grupo de emprendimiento"
            optionFilterProp="children"
            filterOption={(input: any, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            defaultValue={null}>
            {props.grupoEmprendimientoList ? props.grupoEmprendimientoList.map(otherEntity => (
              <Select.Option value={otherEntity.id} key={otherEntity.descripcion}>
                {otherEntity.descripcion}
              </Select.Option>
            ))
              : null}
          </Select>
        </Form.Item>
      </Form.Item>

      <Divider orientation="left">Negociacion</Divider>

      <Form.Item style={{ marginBottom: 4 }}>
        <Form.Item label="Requiere Negociación" name="negociacion"
          style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '1px 4px 0 0' }}>
          <Switch defaultChecked={props.emprendimientoEntity.negociacion} checkedChildren="SI" unCheckedChildren="NO" onChange={() => setNegociacion(!negociacion)} />
        </Form.Item>
      </Form.Item>

      {formEmprendimiento.getFieldValue('negociacion') ? (

        <><Form.Item style={{ marginBottom: 4 }}>
          <Form.Item label="Estado BC" name="estadoBC"
            style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '0 4px 0 0' }}>
            <Select allowClear showSearch
              placeholder="Estado BC"
              defaultValue={null}>
              <Select.Option value='Aprobado' key='Aprobado'>
                Aprobado
                    </Select.Option>
              <Select.Option value='No aprobado' key='No aprobado'>
                No aprobado
                    </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Fecha" name="fecha"
            style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '1px 4px 0 0' }}>
            <DatePicker placeholder="fecha" format={'DD/MM/YYYY'}></DatePicker>
          </Form.Item>
        </Form.Item>

        <Form.Item style={{ marginBottom: 4 }}>
            {inputForm('Código de Firma Digital', 'codFirmaDigital')}
            <Form.Item label="Estado" name="estadoFirma"
              style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '0 4px 0 0' }}>
              <Select allowClear showSearch
                placeholder="Estado"
                defaultValue={null}>
                <Select.Option value='Firmado' key='Firmado'>
                  Firmado
                    </Select.Option>
                <Select.Option value='No aprobado' key='No aprobado'>
                  No aprobado
                    </Select.Option>
                <Select.Option value='Aprobado por el CIC' key='Aprobado por el CIC'>
                  Aprobado por el CIC
                    </Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Fecha Firma" name="fechaFirma"
              style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '1px 4px 0 0' }}>
              <DatePicker placeholder="fecha" format={'DD/MM/YYYY'}></DatePicker>
            </Form.Item>
          </Form.Item>

          <Form.Item style={{ marginBottom: 4 }}>
            <Form.Item label="Observaciones" name="observaciones"
              style={{ display: 'inline-block', width: 'calc(66% - 4px)', margin: '1px 4px 0 0' }}>
              <TextArea rows={3} placeholder="Observaciones..." />
            </Form.Item>
            <Form.Item label="Anexar Archivo Business Case" name="anexarBC"
              style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '1px 4px 0 0' }}>
              <Upload {...propsUploadBC}>
                <Button icon={<UploadOutlined />}>Anexar archivo</Button>
              </Upload>
            </Form.Item>
          </Form.Item></>
      ) : null}

    </Form>
  )
  const tabGeneral = (
    <Form
      form={formEmprendimiento}
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 20 }}
      layout="vertical"
      initialValues={...props.emprendimientoEntity.direccion}
      onValuesChange={onFormLayoutChange}
    >
      <Divider orientation="left">Datos de emprendimiento</Divider>
      <Form.Item style={{ marginBottom: 4 }}>

        {inputForm('Nombre', 'nombre',null,rulesProspecto)}
        <Form.Item label="Segmento" name="segmento" rules={rulesProspecto}
          style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '0 4px 0 0' }}>
          <Select allowClear showSearch
            loading={props.loadingSeg}
            placeholder="Segmento"
            optionFilterProp="children"
            onSelect={(value, event) => changeFilterSegmento(value, event)}

            filterOption={(input: any, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          // value={props.emprendimientoEntity.segmento ? props.emprendimientoEntity.segmento.descripcion : null}>
          >
            {props.segmentoList ? props.segmentoList.map(otherEntity => (
              <Select.Option value={otherEntity.id} key={otherEntity.descripcion}>
                {otherEntity.descripcion}
              </Select.Option>
            ))
              : null}
          </Select>
        </Form.Item>

        {viewTipoObra}

      </Form.Item>
      <Form.Item style={{ marginBottom: 4 }}>
        <Form.Item label="Tipo Emprendimiento" name="tipoEmp" rules={rulesProspecto}
          style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '0 4px 0 0' }}>
          <Select allowClear showSearch
            loading={props.loadingEmp}
            placeholder="Tipo emprendimiento"
            optionFilterProp="children"
            filterOption={(input: any, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            defaultValue={null}>
            {props.tipoEmpList ? props.tipoEmpList.map(otherEntity => (
              <Select.Option value={otherEntity.id} key={otherEntity.descripcion}>
                {otherEntity.descripcion}
              </Select.Option>
            ))
              : null}
          </Select>
        </Form.Item>

        <Form.Item label="Despliegue" name="despliegue" rules={rulesProspecto}
          style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '0 4px 0 0' }}>
          <Select allowClear showSearch
            loading={props.loadingDesp}
            placeholder="Tipo Despliegue"
            optionFilterProp="children"
            filterOption={(input: any, option: any) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            defaultValue={null}>
            {props.topoDespList ? props.topoDespList.map(otherEntity => (
              <Select.Option value={otherEntity.id} key={otherEntity.descripcion}>
                {otherEntity.descripcion}
              </Select.Option>
            ))
              : null}
          </Select>
        </Form.Item>

        <Form.Item label="Adjuntar" name="adjuntar"
          style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '1px  4px 0 0' }}>
          {!loadingFilesDG ? <Upload {...propsUploadDG} >
            <Button icon={<UploadOutlined />}>Subir archivo</Button>
          </Upload>
            : null
          }
        </Form.Item>
      </Form.Item>

      <Form.Item style={{ marginBottom: 4 }}>
        <Form.Item label="Comentario" name="comentario"
          style={{ display: 'inline-block', width: 'calc(66% - 4px)', margin: '1px 4px 0 0' }}>
          <TextArea rows={3} placeholder="Comentario..." />
        </Form.Item>
      </Form.Item>

      <Divider orientation="left">Datos de domicilio</Divider>
      <Form.Item style={{ marginBottom: 4 }}>
        <Form.Item label="Provincia" name="provincia"
          style={{ display: 'inline-block', width: 'calc(20% - 4px)', margin: '0 4px 0 0' }}>
          <Input readOnly value={props.stateOrProvince} placeholder="Provincia" />
        </Form.Item>
        <Form.Item label="Partido" name="partido"
          style={{ display: 'inline-block', width: 'calc(20% - 4px)', margin: '0 4px 0 0' }}>
          <Input value={props.emprendimientoEntity.direccion ? props.emprendimientoEntity.direccion.partido : null} readOnly placeholder="Partido" />
        </Form.Item>
        <Form.Item label="Localidad" name="localidad"
          style={{ display: 'inline-block', width: 'calc(60% - 4px)', margin: '0 4px 0 0' }}>
          <Input readOnly placeholder="Localidad" />
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
        <Form.Item label="C. P." name="codigoPostal"
          style={{ display: 'inline-block', width: 'calc(17% - 4px)', margin: '1px  4px 0 0' }}>
          <Input readOnly value={props.codigoPostal} placeholder="C. P." />
        </Form.Item>
      </Form.Item>


      <Form.Item style={{ marginBottom: 4 }}>
        <Form.Item label="Region" name="region"
          style={{ display: 'inline-block', width: 'calc(50% - 4px)', margin: '1px 4px 0 0' }}>
          <Input readOnly value={props.region} placeholder="region" />
        </Form.Item>
        <Form.Item label="Subregion" name="subregion"
          style={{ display: 'inline-block', width: 'calc(50% - 4px)', margin: '1px  4px 0 0' }}>
          <Input readOnly value={props.subregion} placeholder="subregion" />
        </Form.Item>
      </Form.Item>

      <Form.Item style={{ marginBottom: 4 }}>
        <Form.Item label="Zona competencia" name="zonaCompetencia"
          style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '1px 4px 0 0' }}>
          <Input readOnly value={props.competencia} placeholder="zona de competencia" />
        </Form.Item>
        <Form.Item label="Central/HUB" name="hub"
          style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '1px  4px 0 0' }}>
          <Input readOnly value={props.hub} placeholder="hub" />
        </Form.Item>
        <Form.Item label="Barrio especial" name="barriosEspeciales"
          style={{ display: 'inline-block', width: 'calc(34% - 4px)', margin: '1px  4px 0 0' }}>
          <Input readOnly value={props.barriosEspeciales} placeholder="barrio especial" />
        </Form.Item>
      </Form.Item>

      <Form.Item style={{ marginBottom: 4 }}>
        <Form.Item label="Calle izquierda" name="intersectionLeft"
          style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '1px 4px 0 0' }}>
          <Input readOnly value={props.intersectionLeft} placeholder="Calle izquierda" />
        </Form.Item>
        <Form.Item label="Calle Derecha" name="intersectionRight"
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
      { props.emprendimientoLoading || loadingFilesBC || loadingFilesDG ? <Skeleton active />
        :
        <Spin tip="Cargando emprendimiento...." spinning={props.emprendimientoLoading || loadingFilesBC} >
          <Spin tip="Guardando emprendimiento...." spinning={props.emprendimientoUpdating} >
            <Header avanzarEmprendimiento= {avanzarEmprendimiento} guardarEmprendimiento={guardarEmprendimiento} identificador={props.emprendimientoEntity.id} nombre={props.emprendimientoEntity.nombre} />
            {drawerDireccion}
            <ConfigProvider renderEmpty={customizeRenderEmpty}>

              <Tabs type="card">
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
            </ConfigProvider>
          </Spin >
        </Spin >

      }
    </div>
  );
};

const mapStateToProps = ({ tipoObra, tipoEmp, segmento, tecnologia, estado, ejecCuentas,
  nSE, competencia, mu, tipoDesp, emprendimiento, grupoEmprendimiento }: IRootState) => ({

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

    grupoEmprendimientoList: grupoEmprendimiento.entities,
    loadingGrupoEmp: grupoEmprendimiento.loading,
    errorGrupoEmp: grupoEmprendimiento.errorMessage,

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
    competencia: mu.competencia,
    hub: mu.hub,
    codigoPostal: mu.codigoPostal,
    barriosEspeciales: mu.barriosEspeciales,
    streetType: mu.streetType,
    intersectionLeft: mu.intersectionLeft,
    intersectionRight: mu.intersectionRight,
    country: mu.country,
    stateOrProvince: mu.stateOrProvince,
    city: mu.city,
    locality: mu.locality,
    streetName: mu.streetName,
    streetNr: mu.streetNr,
    muValores: mu,

    emprendimientoEntity: emprendimiento.entity,
    emprendimientoLoading: emprendimiento.loading,
    emprendimientoUpdating: emprendimiento.updating,
    emprendimientoUpdateSuccess: emprendimiento.updateSuccess,
  });

const mapDispatchToProps = {
  getEntitiesEmp,getEntitiesObra,getEntitiesSeg,getEntitiesDesp,
  getEntitiesTec,getEntitiesEstado,getEntitiesEjecCuentas,getEntitiesCompetencia,
  getEntitiesNse,getEntitiesGrupoEmp,getProvincias,getPartidos,getLocalidades,
  getCalles,getGeographic,getTechnical,resetPartidos,resetLocalidades,resetCalles,
  setDomicilio,getCompetencia, getEntityDireccion,createEntity,getEmprendimiento,
  updateEmprendimiento,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmprendimientoDetail);
