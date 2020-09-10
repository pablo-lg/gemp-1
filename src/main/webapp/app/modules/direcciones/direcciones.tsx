
import { Link, RouteComponentProps } from 'react-router-dom';

import { connect } from 'react-redux';

import { IRootState } from 'app/shared/reducers';





import React, { useState, useEffect, Fragment, useLayoutEffect } from 'react';
import axios from 'axios';
import { getProvincias, getLocalidades, getPartidos, getCalles, getGeographic } from './mu.reducer';


import {
  Row, Col,
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  AutoComplete,
  Tooltip,
  notification,
  Tabs,
  Descriptions,
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { GroupContext } from 'antd/lib/checkbox/Group';

// import { AsyncTypeahead } from 'react-bootstrap-typeahead';
// import 'react-bootstrap-typeahead/css/Typeahead.css';


export interface IDireccionesProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> { }


export const Direcciones = (props: IDireccionesProps) => {


 const [isLoading, setIsLoading] = useState(false);

  const [pais, setPais] = useState("Argentina");

  const [provincia, setProvincia] = useState(null);

  const [partido, setPartido] = useState(null);

  const [localidad, setLocalidad] = useState(null);

  const [calle, setCalle] = useState(null);

  const [altura, setAltura] = useState(null);
  const [rangosAltura, setRangosAltura] = useState(null);



  const [regionTelefonia, setRegionTelefonia] = useState(null);

  const [region, setRegion] = useState(null);
  const [subRegion, setSubRegion] = useState(null);
 
  const [form] = Form.useForm();


  const [prevQuery, setPrevQuery] = useState('0');

  const { Option } = Select;
  const { TabPane } = Tabs;


  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  }

  useEffect(() => {
   props.getProvincias(pais)
  }, [pais]);

  useEffect(() => {
    if (provincia){
    props.getPartidos(pais,provincia)
    }
  }, [provincia]);

  useEffect(() => {
    if (partido && provincia) {
    props.getLocalidades(pais,provincia, partido)
    }
  }, [partido]);

  useEffect(() => {
    if (partido && provincia && localidad) {
   // props.getCalles(pais,provincia, partido,localidad)
    }
  }, [localidad]);
 


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


  const fetchRegionTelefonia = () => {
    const fetchData = async () => {
      const result = await axios(
        'geographicAddressManagement/v1/areas?fullText=false&identification=' + pais + '%2C%20' + provincia + '&limit=999&offset=0&type=provincias',

      );

      setRegionTelefonia(result.data[0].characteristics[0].value);
      console.error(regionTelefonia)

    };
    fetchData()

  }

  const fetchXY = (gx, gy) => {
    const fetchData = async () => {
      const result = await axios(
        'geographicAddressManagement/v1/areas?fields=name%2Ctype%2Ccharacteristics&fullText=false&limit=999&offset=0&type=regiones&type=sub-regiones&type=BARRIOS&type=ZONAS%20COMERCIALES&type=ZONAS%20OPERATIVAS&type=ZONAS%20TECNICAS%20PRINCIPALES&type=LOCALIDADES&type=partidos&type=provincias&type=HUBS&x=' + gx + '&y=' + gy,

      );

      const reg = result.data.filter(d => d.type === "REGIONES")
      const subReg = result.data.filter(d => d.type === "SUB-REGIONES")

      setRegion(reg[0].name);
      setSubRegion(subReg[0].name)

    };
    fetchData()

  }

  const handleSubmit = () => {
     props.getGeographic(pais, provincia, partido, localidad, calle, altura)
    //fetchRegionTelefonia();
    // fetchXY();
  };


  
  const handleSelectLocalidad = (select) => {
    // "identification": "ARGENTINA,BUENOS AIRES,VILLARINO,PEDRO LURO",
    setPais(select.split(',')[0]);
    setProvincia(select.split(',')[1]);
    setPartido(select.split(',')[2]);
    setLocalidad(select.split(',')[3]);
  }
  const handleSearchLocalidad = (query) => {
    setLocalidad(null)
    if (query.length > 2) {
      // if (!query.includes(prevQuery)) {
        setPrevQuery(query);
        setIsLoading(true);
        props.getLocalidades(pais,provincia, partido, query)
        setIsLoading(false);
      }
    }
    
  const handleSelectCalles = select => {
    setPais(select.split(',')[0]);
    setProvincia(select.split(',')[1]);
    setPartido(select.split(',')[2]);
    setLocalidad(select.split(',')[3]);
    setCalle(select.split(',')[4]);
  }
  const handleSearchCalles = (query) => {
    // this.setState({ isLoading: true });
    if (query.length > 2) {
      // if (!query.includes(prevQuery)) {
      setPrevQuery(query);
      setIsLoading(true);
      props.getCalles(pais,provincia, partido,localidad, query)

        setRangosAltura(props.calles.map(r => r.numberRanges.evenSides.map(s => s.number + ' - ' + s.numberLast + '\n')))
        setIsLoading(false);
      };
    
  };

  const opcionesSelectName = (optSelect) => (
    optSelect ? optSelect.map(otherEntity => (
      <Select.Option value={otherEntity.name} key={otherEntity.name}>
        {otherEntity.name}
      </Select.Option>
    )
    )
      : null
  );

  const opcionesSelectIdent = (optSelect) => (
    optSelect ? optSelect.map(otherEntity => (
      <Select.Option value={otherEntity.identification} key={otherEntity.identification}>
        {otherEntity.identification.split(',')[4]} {otherEntity.identification.split(',')[3]} , {otherEntity.identification.split(',')[2]} , {otherEntity.identification.split(',')[1]}
      </Select.Option>
    )
    )
      : null
  );

  const resetValues = () => {
    setProvincia(null);
    setPartido(null);
    setLocalidad(null);
    setCalle(null);
    setAltura(null);
  }
  const { provincias, localidades, partidos, calles, geographic ,zonas, geoX,
    geoY, zonaCompetencia, hub,codigoPostal, barriosEspeciales, loading, errorMessage,
    streetType,intersectionLeft,intersectionRight } = props;

  const initialValues = {
    pais: 'Argentina',
    provincia: null,
    partido: null,
    localidad: null,
    calle: null,
    altura: null,
  }

  return (

    <div>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 16 }}
        layout="vertical"
        initialValues={initialValues}
        onValuesChange={onFormLayoutChange}
      >

        <Form.Item style={{ marginBottom: 4 }}>

          <Form.Item label="Provincia" style={{ display: 'inline-block', width: 'calc(20% - 4px)', margin: '0 4px 0 0' }} >
            <Select allowClear showSearch
              placeholder="Provincia"
              defaultValue={null}
              // value={provincia}
              onSelect={(value, event) => setProvincia(value)}>
              {opcionesSelectName(provincias)}
            </Select>
          </Form.Item >
          <Form.Item label="Partido" style={{ display: 'inline-block', width: 'calc(20% - 4px)', margin: '0 4px 0 0' }}>
            <Select allowClear placeholder="Partido"
              // value={partido}
              showSearch onSelect={(value, event) => setPartido(value)}>
              {opcionesSelectName(partidos)}

            </Select>
          </Form.Item>
          <Form.Item label="Localidad" style={{ display: 'inline-block', width: 'calc(60% - 4px)', margin: '0 4px 0 0' }}>
            <Select placeholder="Localidad"
              allowClear
             // value={localidad}
              onSearch={handleSearchLocalidad}
              showSearch
              onSelect={handleSelectLocalidad}>
              {opcionesSelectIdent(localidades)}
            </Select>
          </Form.Item>
        </Form.Item>
        <Form.Item style={{ marginBottom: 4 }}>
          <Form.Item label="Calle" style={{ display: 'inline-block', width: 'calc(66% - 4px)', margin: '1px 4px 0 0' }}>
            <Select showSearch
              // loading={isLoading}
              placeholder="Calle..."
              onSearch={handleSearchCalles}
              value={calle}
              onSelect={handleSelectCalles}>
              {opcionesSelectIdent(calles)}
            </Select>
          </Form.Item>
          <Form.Item label="Altura" style={{ display: 'inline-block', width: 'calc(17% - 4px)', margin: '1px 4px 0 0' }}>
            <Tooltip title={rangosAltura}>
              <InputNumber value={altura} placeholder="Altura" onChange={(value) => setAltura(value)} />
            </Tooltip>
          </Form.Item>
          <Form.Item>
            <Button type="primary" icon={<SearchOutlined />} onClick={(event) => handleSubmit()}>
              Geographic
        </Button>
          </Form.Item>
        </Form.Item>
      </Form>
      <div>
        {geoX ? 
      <Descriptions title="Datos de certa">
        <Descriptions.Item label="Codigo postal">{codigoPostal}</Descriptions.Item>
        <Descriptions.Item label="Zona competencia">{zonaCompetencia}</Descriptions.Item>
        <Descriptions.Item label="Hub">{hub}</Descriptions.Item>
        <Descriptions.Item label="Tipo de Calle">{streetType}</Descriptions.Item>
        <Descriptions.Item label="Interseccion der">{intersectionRight}</Descriptions.Item>
        <Descriptions.Item label="Interseccion izq">{intersectionLeft}</Descriptions.Item>
        <Descriptions.Item label="Geo X">{geoX}</Descriptions.Item>
        <Descriptions.Item label="Geo Y">{geoY}</Descriptions.Item>
        <Descriptions.Item label="Barrios Especiales">{barriosEspeciales}</Descriptions.Item>
      </Descriptions>
      :
      null
      }
      </div>


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
};
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;
export default connect(mapStateToProps, mapDispatchToProps)(Direcciones);


