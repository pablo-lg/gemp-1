
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { IRootState } from 'app/shared/reducers';

import {getEntities as getEntitiesEmp} from '../../entities/tipo-emp/tipo-emp.reducer';
import {getEntities as getEntitiesObra}  from '../../entities/tipo-obra/tipo-obra.reducer';
import {getEntities as getEntitiesSeg}  from '../../entities/segmento/segmento.reducer';



import React, { useState, useEffect, Fragment, useLayoutEffect } from 'react';
import axios from 'axios';

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
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { GroupContext } from 'antd/lib/checkbox/Group';

// import { AsyncTypeahead } from 'react-bootstrap-typeahead';
// import 'react-bootstrap-typeahead/css/Typeahead.css';




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


  const [editForm, setEditForm] = useState(true);

  const [paises, setPaises] = useState([]);
  const [pais, setPais] = useState("Argentina");

  const [provincias, setProvincias] = useState([]);
  const [provincia, setProvincia] = useState(null);

  const [partidos, setPartidos] = useState([]);
  const [partido, setPartido] = useState(null);

  const [localidades, setLocalidades] = useState([]);
  const [localidad, setLocalidad] = useState(null);

  const [calles, setCalles] = useState([]);
  const [calle, setCalle] = useState(null);
  const [searchCalle, setSearchCalle] = useState();

  const [altura, setAltura] = useState(null);
  const [rangosAltura, setRangosAltura] = useState();

  const [geographic, setGeographic] = useState();

  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const [zonas, setZonas] = useState();
  const [zona, setZona] = useState(null);

  const [regionTelefonia, setRegionTelefonia] = useState(null);
  const [codigoPostal, setCodigoPostal] = useState(null);
  const [geoX, setGeoX] = useState(null);
  const [geoY, setGeoY] = useState(null);
  const [region, setRegion] = useState(null);
  const [subRegion, setSubRegion] = useState(null);
  const [zonaCompetencia, setZonaCompetencia] = useState(null);
  const [barriosEspeciales, setBarriosEspeciales] = useState(null);
  const [hub, setHub] = useState(null);
  const [form] = Form.useForm();


  const [prevQuery, setPrevQuery] = useState('0');

  const { Option } = Select;
  const { TabPane } = Tabs;


  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  }




const openNotification = (message='test', descripcition='test', type='success') => {
  notification[type]({
    message,
    descripcition,
    onClick()  {
      console.error('Notification Clicked!');
    },
  });
};

useEffect(() => {
  openNotification
},[]);



  

  const handleSubmit = () => {}






 

    const formDireccion = (
      <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      layout="vertical"
      initialValues={{ size: componentSize }}
      onValuesChange={onFormLayoutChange}
    >
 
        <Form.Item style={{ marginBottom: 4 }}>

<Form.Item label="Tipo Emprendimiento" style={{ display: 'inline-block', width: 'calc(30% - 4px)', margin: '0 4px 0 0' }} >
  <Select allowClear showSearch
          placeholder="Tipo emprendimiento" 
          defaultValue={null}
          // value={tipoEmp} 
          onSelect={(value, event) => setProvincia(value)}>
          {      props.tipoEmpList ? props.tipoEmpList.map(otherEntity => (
                    <Select.Option value={otherEntity.valor} key={otherEntity.valor}>
                      {otherEntity.valor}
                    </Select.Option>
                    )
                  ) 
                : null
          
          }
  </Select>
</Form.Item >
<Form.Item label="Tipo de Obra" style={{ display: 'inline-block', width: 'calc(30% - 4px)', margin: '0 4px 0 0' }} >
  <Select allowClear showSearch
          placeholder="Tipo de obra" 
          defaultValue={null}
          // value={tipoEmp} 
          onSelect={(value, event) => setProvincia(value)}>
          {      props.tipoObraList ? props.tipoObraList.map(otherEntity => (
                    <Select.Option value={otherEntity.valor} key={otherEntity.valor}>
                      {otherEntity.valor}
                    </Select.Option>
                    )
                  ) 
                : null
          
          }
  </Select>
</Form.Item >
<Form.Item label="Segmento" style={{ display: 'inline-block', width: 'calc(30% - 4px)', margin: '0 4px 0 0' }} >
  <Select allowClear showSearch
          placeholder="Segmento" 
          defaultValue={null}
          // value={tipoEmp} 
          onSelect={(value, event) => setProvincia(value)}>
          {      props.segmentoList ? props.segmentoList.map(otherEntity => (
                    <Select.Option value={otherEntity.valor} key={otherEntity.valor}>
                      {otherEntity.valor}
                    </Select.Option>
                    )
                  ) 
                : null
          
          }
  </Select>
</Form.Item >
</Form.Item>


      <Form.Item style={{ marginBottom: 4 }}>

        <Form.Item label="Provincia" style={{ display: 'inline-block', width: 'calc(20% - 4px)', margin: '0 4px 0 0' }} >
        <Input value={props.stateOrProvince} placeholder="Provincia"  />

        </Form.Item >
        <Form.Item label="Partido"  style={{ display: 'inline-block', width: 'calc(20% - 4px)', margin: '0 4px 0 0' }}>
        <Input value={props.city} placeholder="Partido"  />

        </Form.Item>
        <Form.Item label="Localidad" style={{ display: 'inline-block', width: 'calc(60% - 4px)', margin: '0 4px 0 0' }}>
        <Input value={props.locality} placeholder="Localidad"  />

        </Form.Item>
      </Form.Item>
      <Form.Item style={{ marginBottom: 4 }}>
        <Form.Item label="Calle" style={{ display: 'inline-block', width: 'calc(66% - 4px)', margin: '1px 4px 0 0' }}>
        <Input value={props.streetName} placeholder="Calle"  />
        </Form.Item>
        <Form.Item label="Altura" style={{ display: 'inline-block', width: 'calc(17% - 4px)', margin: '1px 4px 0 0' }}>
          <Input value={props.streetNr} placeholder="Altura" />
        </Form.Item>
        <Form.Item label="C. P." style={{ display: 'inline-block', width: 'calc(16% - 4px)', margin: '1px  4px 0 0' }}>
          <Input disabled={editForm} value={props.codigoPostal} placeholder="C. P." />
        </Form.Item>
      </Form.Item>
      <Form.Item style={{ marginBottom: 4 }}>

        <Form.Item label="latitud" style={{ display: 'inline-block', width: 'calc(50% - 4px)', margin: '1px 4px 0 0' }}>
          <Input disabled={editForm} value={props.geoX} placeholder="latitud"/>
        </Form.Item>
        <Form.Item label="longitud" style={{ display: 'inline-block', width: 'calc(50% - 4px)', margin: '1px  4px 0 0' }}>
          <Input disabled={editForm} value={props.geoY} placeholder="longitud" />
        </Form.Item>
      </Form.Item>

      <Form.Item style={{ marginBottom: 4 }}>
        <Form.Item label="region" style={{ display: 'inline-block', width: 'calc(50% - 4px)', margin: '1px 4px 0 0' }}>
          <Input disabled={editForm} value="falta definir" placeholder="region"  />
        </Form.Item>
        <Form.Item label="subregion" style={{ display: 'inline-block', width: 'calc(50% - 4px)', margin: '1px  4px 0 0' }}>
          <Input disabled={editForm} value="falta definir" placeholder="subregion"   />
        </Form.Item>
      </Form.Item>

      <Form.Item style={{ marginBottom: 4 }}>
        <Form.Item label="Zona competencia" style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '1px 4px 0 0' }}>
          <Input disabled={editForm} value={props.zonaCompetencia} placeholder="zona de competencia"   />
        </Form.Item>
        <Form.Item label="Hubs" style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '1px  4px 0 0' }}>
          <Input disabled={editForm} value={props.hub} placeholder="hubs"  />
        </Form.Item>
        <Form.Item label="Barrio especial" style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '1px  4px 0 0' }}>
          <Input disabled={editForm} value={props.barriosEspeciales} placeholder="barrio especial"  />
        </Form.Item>  
      </Form.Item>

    </Form>
    )

  return (

    <div>
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
const mapStateToProps = ({ tipoObra, tipoEmp, segmento, mu }: IRootState) => ({
  tipoObraList: tipoObra.entities,
  tipoEmpList: tipoEmp.entities,
  loadingEmp: tipoEmp.loading,
  loadingObra: tipoObra.loading,
  segmentoList: segmento.entities,
  loadingSeg: segmento.loading,
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

};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Calles);

