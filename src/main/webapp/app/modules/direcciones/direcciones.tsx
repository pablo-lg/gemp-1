import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { IRootState } from 'app/shared/reducers';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  getProvincias, getLocalidades, getPartidos, getCalles, getGeographic,
  getTechnical, resetPartidos, resetCalles, resetLocalidades, setDomicilio
} from './mu.reducer';

import {
  Form,
  Button,
  Select,
  InputNumber,
  notification,
  Tabs,
  Tooltip,
  Descriptions,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import DatosCerta from './datosCerta';
import { ErrorMessage } from 'formik';

export interface IDireccionesProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> { }
export const Direcciones = (props) => {

  const [isLoading, setIsLoading] = useState(false);
  const [pais, setPais] = useState("Argentina");
  const [provincia, setProvincia] = useState(null);
  const [form] = Form.useForm();
  const [prevQuery, setPrevQuery] = useState('0');
  const { TabPane } = Tabs;

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

  useEffect(() => {
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
    form.setFieldsValue({
      provincia: select.key.split(',')[1],
      partido: select.key.split(',')[2],
      localidad: select.key.split(',')[3],
      calle: select.key.split(',')[4],
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
      <Select.Option value={otherEntity.identification} key={otherEntity.identification}>
        {otherEntity.identification.split(',')[4]} {otherEntity.identification.split(',')[3]} , {otherEntity.identification.split(',')[2]} , {otherEntity.identification.split(',')[1]}
      </Select.Option>
    )
    ) : null
  );

  const onFinish = values => {
    props.setDomicilio(pais, values.provincia, values.partido, values.localidad, values.calle, values.altura);
    console.error('Received values of form: ', values);
    
  };

  const consultaCerta = () => {
    props.getGeographic(pais, form.getFieldValue('provincia'), form.getFieldValue('partido'), 
          form.getFieldValue('localidad'), form.getFieldValue('calle'), form.getFieldValue('altura'));
    props.getTechnical(pais, form.getFieldValue('provincia'), form.getFieldValue('partido'), 
          form.getFieldValue('localidad'), form.getFieldValue('calle'), form.getFieldValue('altura'));

  }

  const { provincias, localidades, partidos, calles} = props;



  return (

    <div>
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
          <Form.Item name="altura" label="Altura" rules={[{ required: true }]} style={{ display: 'inline-block', width: 'calc(17% - 4px)', margin: '1px 4px 0 0' }}>
              <InputNumber placeholder="Altura" />
          </Form.Item>
            </Tooltip>
        </Form.Item>
        <Form.Item >
          <Button type="primary" icon={<SearchOutlined />} htmlType="submit">
            Seleccionar
            </Button>
            <Button type="primary" icon={<SearchOutlined />} onClick={() => consultaCerta()}>
             Consultar datos
            </Button>
        </Form.Item>
      </Form>
      <DatosCerta />
    </div>
  );
};

const mapStateToProps = ({ mu }: IRootState) => ({
  provincias: mu.provincias,
  partidos: mu.partidos,
  localidades: mu.localidades,
  calles: mu.calles,
  loading: mu.loading,
  errorMessage: mu.errorMessage,
  geographic: mu.geographic,
  technial: mu.technical,
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
});

const mapDispatchToProps = {
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
export default connect(mapStateToProps, mapDispatchToProps)(Direcciones);


