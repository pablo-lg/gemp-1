import { Redirect, RouteComponentProps } from 'react-router-dom';
import { useHistory } from "react-router-dom";


import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  getProvincias, getLocalidades, getPartidos, getCalles, getGeographic,
  getTechnical, getCompetencia, resetPartidos, resetCalles, resetLocalidades, setDomicilio, reset
} from './mu.reducer';
import { getEntities, updateEntity, deleteEntity, createEntity, getEntityDireccion, reset as resetDireccion } from '../../entities/direccion/direccion.reducer';
import {  getEntityDireccion as getEmprendimiento, reset as resetEmprendimiento, createEntity as createEntityEmprendimiento } from '../../entities/emprendimiento/emprendimiento.reducer';



import {
  Form,
  Button,
  Select,
  InputNumber,
  notification,
  Tabs,
  Tooltip,
  Spin, 
  Input,
} from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import DatosCerta from './datosCerta';
import { ErrorMessage } from 'formik';

export interface IDireccionesProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> { }
export const Direcciones = (props) => {

  console.error("direcciones...")
  console.error(props);

  const [isLoading, setIsLoading] = useState(false);
  const [pais, setPais] = useState("ARGENTINA");
  const [provincia, setProvincia] = useState(null);
  const [form] = Form.useForm();
  const [formNuevoEmp] = Form.useForm();
  const [prevQuery, setPrevQuery] = useState('0');
  const { TabPane } = Tabs;

  const history = useHistory();

  let rangoAltura = null;

  
  const openNotification = (message = 'test', descripcition = 'test', type = 'success') => {
    notification[type]({
      message,
      descripcition,
      onClick() {
        console.error('Notification Clicked!');
      },
    });
  };
  
  useEffect(() => {
    openNotification
  }, []);

  // useEffect(() => {
  //   if (props.zonaCompetencia){ 
  //     props.getCompetencia(props.zonaCompetencia)
  //   }
  // }, [props.zonaCompetencia])
  const handleClose = () => {
    props.history.push('/emprendimiento/'+props.emprendimientoEntity.id);
  };
  useEffect(() => {
    if (props.emprendimientoUpdateSuccess) {
      handleClose();
    }
  }, [props.emprendimientoUpdateSuccess]);

  useEffect(() => {

    if (props.direccionUpdateSuccess) {

      const entity = {
        direccion: {
                    id: props.direccionEntity.id,
        },
        nombre: form.getFieldValue('nombre'),
      }

      props.createEntityEmprendimiento(entity);
    }
  }, [props.direccionUpdateSuccess])

  useEffect(() => {
    props.reset();
    props.getProvincias(pais)
    if (props.errorMessage) {
      openNotification('Error al obtener provincias de MU', props.errorMessage, 'error')
    }
  }, [pais]);

  // const fetchXY = (gx, gy) => {
  //   const fetchData = async () => {
  //     const result = await axios(
  //       'geographicAddressManagement/v1/areas?fields=name%2Ctype%2Ccharacteristics&fullText=false&limit=999&offset=0&type=regiones&type=sub-regiones&type=BARRIOS&type=ZONAS%20COMERCIALES&type=ZONAS%20OPERATIVAS&type=ZONAS%20TECNICAS%20PRINCIPALES&type=LOCALIDADES&type=partidos&type=provincias&type=HUBS&x=' + gx + '&y=' + gy,
  //     );
  //     const reg = result.data.filter(d => d.type === "REGIONES")
  //     const subReg = result.data.filter(d => d.type === "SUB-REGIONES")
  //     setRegion(reg[0].name);
  //     setSubRegion(subReg[0].name)
  //   };
  //   fetchData()
  // }

  const handleSelectProvincia = () => {
    props.getPartidos(pais, form.getFieldValue('provincia'))
    props.resetDireccion();
    props.resetEmprendimiento();
  }
  const handleSelectPartido = () => {
    props.getLocalidades(pais, form.getFieldValue('provincia'), form.getFieldValue('partido'))
  }

  const handleSelectLocalidad = (value, select) => {
    form.setFieldsValue({
      localidad: select.key.split(',')[3],
    });
  }
  const handleSearchLocalidad = (query) => {
    if (query.length > 2) {
      setPrevQuery(query);
      setIsLoading(true);
      props.getLocalidades(pais, form.getFieldValue('provincia'), form.getFieldValue('partido'), query)
      setIsLoading(false);
    }
  }

  const handleSelectCalles = (value, select) => {
    console.error('value: '+ value)
    console.error('select: '+  select.value)
    form.setFieldsValue({
      provincia: select.key.split(',')[1],
      partido: select.key.split(',')[2],
      localidad: select.key.split(',')[3],
      calle: select.value,
    });
    rangoAltura = value.numberRanges;
  }

  const handleSearchCalles = (query) => {
    if (query.length > 2) {
      setPrevQuery(query);
      setIsLoading(true);
      const auxProv = form.getFieldValue('provincia')
      props.getCalles(pais, form.getFieldValue('provincia'), form.getFieldValue('partido'), form.getFieldValue('localidad'), query)
      setIsLoading(false);
    };
  };

  const opcionesSelectName = (optSelect) => (
    optSelect ? optSelect.map(otherEntity => (
      <Select.Option value={otherEntity.name} key={otherEntity.name}>
        {otherEntity.name}
      </Select.Option>
    )
    ) : null
  );

  const opcionesSelectIdent = (optSelect) => (
    optSelect ? optSelect.map(otherEntity => (
      <Select.Option value={otherEntity.name} key={otherEntity.identification}>
        {otherEntity.name}, {otherEntity.identification.split(',')[3]} , {otherEntity.identification.split(',')[2]} , {otherEntity.identification.split(',')[1]}
      </Select.Option>
    )
    ) : null
  );

  
  const buscarDireccion =  () => {
    props.getEntityDireccion(pais, form.getFieldValue('provincia'), form.getFieldValue('partido'), 
    form.getFieldValue('localidad'), form.getFieldValue('calle'), form.getFieldValue('altura'))
  }
  
  const buscarEmprendimiento = () => {
    props.getEmprendimiento(pais, form.getFieldValue('provincia'), form.getFieldValue('partido'), 
    form.getFieldValue('localidad'), form.getFieldValue('calle'), form.getFieldValue('altura'))
  }
  
  const buscarDomicilio =  () => {
    props.resetDireccion();
    props.resetEmprendimiento();
   // buscarDireccion();
    buscarEmprendimiento();
  }
  const consultaCerta = () => {
    props.reset();
    props.getGeographic(pais, form.getFieldValue('provincia'), form.getFieldValue('partido'), 
          form.getFieldValue('localidad'), form.getFieldValue('calle'), form.getFieldValue('altura'));
    props.getTechnical(pais, form.getFieldValue('provincia'), form.getFieldValue('partido'), 
          form.getFieldValue('localidad'), form.getFieldValue('calle'), form.getFieldValue('altura'));
    buscarDomicilio();


    // props.getCompetencia(props.zonaCompetencia);
  }

 
  const statusEmprendimiento  = props.emprendimientoError ? props.emprendimientoError.response.status  : 0
  
  const statusMu  = props.errorMessage ? props.errorMessage.response.status  : 0

  const consutlarEmprendimiento = () => {
    handleClose();
  }

  const onFinish =   values => {

    const valores = props.muValores
    const dir = {
      pais:'ARGENTINA',
      ...valores,
      ...values,
      latitud: valores.geoX,
      longitud: valores.geoY,
      zonaCompetencia: valores.competencia,
    };
    const entity = {
      direccion: {
                  id: props.direccionEntity.id,
                
      },
      contacto: 'contacto'
    }
    // consultaCerta;
    // buscarDomicilio();
    // buscarEmprendimiento();

    // props.setDomicilio(pais, values.provincia, values.partido, values.localidad, values.calle, values.altura);
    console.error('Received values of form: ', values);

    props.createEntity(dir)
   
   
    // history.push('/emprendimiento')

   
    
  };



  const { provincias, localidades, partidos, calles} = props;



  return (

    <div>
      <Spin tip="Buscando en certa geo...." spinning={props.loadingGeograpchic} >
      <Spin tip="Buscando en certa tech...." spinning={props.loadingTechnical} >
      
      <Form
        id="DireccionesForm"
        form={form}
        onFinish={onFinish}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        layout="vertical" >
        <Form.Item style={{ marginBottom: 4 }}>
          <Form.Item name="provincia" label="Provincia" rules={[{ required: true }]} style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '0 4px 0 0' }} >
            <Select allowClear showSearch
                    placeholder="Provincia"
                    defaultValue={null}
                    value={provincia}
                    onClear={props.resetPartidos}
                    onSelect={handleSelectProvincia}>
              {opcionesSelectName(provincias)}
            </Select>
          </Form.Item >
          <Form.Item name="partido" label="Partido" rules={[{ required: true }]} style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '0 4px 0 0' }}>
            <Select allowClear placeholder="Partido"
                    showSearch
                    onClear={props.resetLocalidades}
                    onSelect={handleSelectPartido}>
              {opcionesSelectName(partidos)}
            </Select>
          </Form.Item>
          <Form.Item name="localidad" label="Localidad" rules={[{ required: true }]} style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '0 4px 0 0' }}>
            <Select placeholder="Localidad"
                    allowClear
                    showSearch
                    onSelect={(value, select) => handleSelectLocalidad(value, select)}>
              {opcionesSelectIdent(localidades)}
            </Select>
          </Form.Item>
        </Form.Item>
        <Form.Item style={{ marginBottom: 4 }}>
          <Form.Item name="calle" label="Calle" rules={[{ required: true }]} style={{ display: 'inline-block', width: 'calc(66% - 4px)', margin: '1px 4px 0 0' }}>
            <Select showSearch
                    loading={isLoading}
                    placeholder="Calle..."
                    onSearch={handleSearchCalles}
                    onSelect={(value, select) => handleSelectCalles(value, select)}>
              {opcionesSelectIdent(calles)}
            </Select>
          </Form.Item>
            <Tooltip title={rangoAltura}>
          <Form.Item name="altura" label="Altura" rules={[{ required: true }]} style={{ display: 'inline-block', width: 'calc(15% - 4px)', margin: '1px 4px 0 0' }}>
              <InputNumber placeholder="Altura" />
          </Form.Item>
            </Tooltip>
            <Form.Item name="buscar" label="Consultar"  style={{ display: 'inline-block', width: 'calc(18% - 4px)', margin: '1px 1px 0 0' }}>
            <Button type="primary" icon={<SearchOutlined />} onClick={() => consultaCerta()}>
             Consultar
            </Button>
          </Form.Item>
        </Form.Item>
        <Form.Item >
        {statusEmprendimiento === 404 && statusMu === 0 ?
            <Form.Item>
            <Form.Item name="nombre" label="Nombre del emprendimiento" rules={[{ required: true }]} style={{ display: 'inline-block', width: 'calc(66% - 4px)', margin: '1px 4px 0 0' }}>
              <Input placeholder="Nombre" />
            </Form.Item>         
            <Form.Item name="finish" label=" "  style={{ display: 'inline-block', width: 'calc(18% - 4px)', margin: '1px 1px 0 0' }}>


            <Button type="primary" icon={<PlusOutlined />} htmlType="submit">Crear emprendimiento</Button>
        </Form.Item>
        </Form.Item>
            : 
              null
}

      {/* <Button type="primary" icon={<SearchOutlined />} onClick={() => buscarDomicilio()}>
             buscar domicilio
            </Button> */}

            {props.emprendimientoEntity.id ?
            <div><div>Emprendimiento encontrado: {props.emprendimientoEntity.id}</div>
            <Button type="primary" icon={<SearchOutlined />} onClick={() => consutlarEmprendimiento()}>
              ver emprendimiento
            </Button>
               </div>
              : null}


        </Form.Item>
      </Form>
      </Spin >
      </Spin >
      {props.successGeographic ?
      <DatosCerta />
      : null
    }
    </div>
  );
};

const mapStateToProps = ({ mu, direccion, emprendimiento }: IRootState) => ({
  muValores: mu,
  provincias: mu.provincias,
  partidos: mu.partidos,
  localidades: mu.localidades,
  calles: mu.calles,
  loading: mu.loading,
  errorMessage: mu.errorMessage,
  successGeographic: mu.successGeographic,
  loadingGeograpchic: mu.loadingGeograpchic,
  geographic: mu.geographic,
  loadingTechnical: mu.loadingTechnical,
  technial: mu.technical,
  zonas: mu.zonas,
  geoX: mu.geoX,
  geoY: mu.geoY,
  zonaCompetencia: mu.zonaCompetencia,
  competencia: mu.competencia,
  hub: mu.hub,
  codigoPostal: mu.codigoPostal,
  barriosEspeciales: mu.barriosEspeciales,
  streetType: mu.streetType,
  intersectionLeft: mu.intersectionLeft,
  intersectionRight: mu.intersectionRight,

  direccionEntity: direccion.entity,
  direccionLoading: direccion.loading,
  direccionUpdating: direccion.updating,
  direccionUpdateSuccess: direccion.updateSuccess,
  direccionError: direccion.errorMessage,

  emprendimientoEntity: emprendimiento.entity,
  emprendimientoLoading: emprendimiento.loading,
  emprendimientoUpdating: emprendimiento.updating,
  emprendimientoUpdateSuccess: emprendimiento.updateSuccess,
  emprendimientoError: emprendimiento.errorMessage,
});

const mapDispatchToProps = {
  getProvincias,
  getPartidos,
  getLocalidades,
  getCalles,
  getGeographic,
  getTechnical,
  getCompetencia,
  resetPartidos,
  resetLocalidades,
  resetCalles,
  setDomicilio,
  getEntities, 
  updateEntity,
  deleteEntity,
  createEntity,
  getEntityDireccion,
  resetDireccion,
  getEmprendimiento,
  createEntityEmprendimiento,
  resetEmprendimiento,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
export default connect(mapStateToProps, mapDispatchToProps)(Direcciones);


