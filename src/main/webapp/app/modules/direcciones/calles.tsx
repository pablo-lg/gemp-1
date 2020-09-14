
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

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'geographicAddressManagement/v1/areas?fatherIdentification=' + pais + '&fatherType=Paises&fullText=false&limit=999&offset=0&type=Provincias&fields=name,type,identification',
      );

      setProvincias(result.data);
      setPartidos([]);
      setPartido(null);
      setLocalidades([]);
      setLocalidad(null);
      setCalles([]);

    };
    setProvincias([]);
    fetchData();
  }, [pais]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'geographicAddressManagement/v1/areas?fatherIdentification=' + pais + '&fatherIdentification=' + provincia + '&fatherType=Provincias&fullText=false&limit=999&offset=0&type=Partidos&fields=name,type,identification',

      );

      setPartidos(result.data);
      setLocalidades([]);
      setLocalidad(null)
      setCalles([]);
      form.resetFields();
    };
    fetchData()
  }, [provincia]);
/**
  useEffect(() => {



    const fetchData = async () => {
      const result = await axios(
        'geographicAddressManagement/v1/areas?fullText=false&limit=999&offset=0&type=Paises&fields=name,type,identification',
      );

      setPaises(result.data);
      setProvincias([]);
      setPartidos([]);
      setLocalidades([]);
      setCalles([]);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'geographicAddressManagement/v1/areas?fatherIdentification=' + pais + '&fatherType=Paises&fullText=false&limit=999&offset=0&type=Provincias&fields=name,type,identification',
      );

      setProvincias(result.data);
      setPartidos([]);
      setPartido(null);
      setLocalidades([]);
      setLocalidad(null);
      setCalles([]);

    };
    setProvincias([]);
    fetchData();
  }, [pais]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'geographicAddressManagement/v1/areas?fatherIdentification=' + pais + '&fatherIdentification=' + provincia + '&fatherType=Provincias&fullText=false&limit=999&offset=0&type=Partidos&fields=name,type,identification',

      );

      setPartidos(result.data);
      setLocalidades([]);
      setLocalidad(null)
      setCalles([]);
      form.resetFields();
    };
    fetchData()
  }, [provincia]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'geographicAddressManagement/v1/areas?fatherIdentification=' + pais + '&fatherIdentification=' + provincia + '&fatherIdentification=' + partido + '&fatherType=Partidos&fullText=false&limit=999&offset=0&type=Localidades&fields=name,type,identification',

      );

      setLocalidades(result.data);
      setLocalidad(null)
      setCalles([]);
      setAltura(null);
      setBarriosEspeciales(null);
      setCodigoPostal(null);
      setGeoX(null);
      setGeoY(null);
      setHub(null);
      setZonaCompetencia(null);
    };
    fetchData()
  }, [partido]);

  useEffect(() => {
    const fetchData = async () => {
      const varCity = ((partido) ? '&city=' + partido : '');
      const varCountry = ((pais) ? '&country=' + pais : '');
      const varLocalidad = ((localidad) ? '&localidad=' + localidad : '');
      const varState = ((provincia) ? '&stateOrProvince=' + provincia : '');
      const server = 'geographicAddressManagement/v1/streets?fullText=false&offset=0'
      const result = await axios(
        server + varCity + varCountry + varLocalidad + varState

      );

      setCalles(result.data);
      setCalle(null);
      setAltura(null);
      setBarriosEspeciales(null);
      setCodigoPostal(null);
      setGeoX(null);
      setGeoY(null);
      setHub(null);
      setZonaCompetencia(null);
    };
    fetchData()
  }, [localidad]);

*/


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

    const fetchData = async () => {
      try {
      const result = await axios(
        'geographicAddressManagement/v1/geographicAddress?city=' + partido + '&country=' + pais + '&locality=' + localidad + '&stateOrProvince=' + provincia + '&streetName=' + calle + '&streetNr=' + altura,
        );


      fetchXY(result.data.geographicLocation.geometry[0].x, result.data.geographicLocation.geometry[0].y);
      setGeographic(result.data);
      setZonas(result.data.zones);
      setGeoX(result.data.geographicLocation.geometry[0].x)
      setGeoY(result.data.geographicLocation.geometry[0].y)
      const zc=result.data.zones.filter(d => d.type === "Zonas Competencia")
      setZonaCompetencia(zc[0] ? zc[0].value : null)
      setHub(result.data.zones.filter(d => d.type === "Hubs")[0].value)
      const be = result.data.zones.filter(d => d.type === "Barrios Especiales")
      setBarriosEspeciales(be[0] ? be[0].value : null)

      openNotification('Ok',result.status+"",'success')

      setCodigoPostal(result.data.postcode)
    } catch (error) {
      openNotification('error',error.message, 'error')
    }

    };
    fetchData()
    fetchRegionTelefonia();
    // fetchXY();

  };
  const handleInputChange = q => {
    setSearchCalle(q);
  };

  const handleSelect = select => {

    setPais(select.split(',')[0]);
    setProvincia(select.split(',')[1]);
    setPartido(select.split(',')[2]);
    setLocalidad(select.split(',')[3]);
    setCalle(select.split(',')[4]);


  }
const handleSelectLocalidad = (select) =>{
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
      const fetchData = async () => {
        const varCountry = ((pais) ? '&fatherIdentification=' + pais : '');
        const varState = ((provincia) ? '&fatherIdentification=' + provincia : '');
        const varCity = ((partido) ? '&fatherType=partidos&fatherIdentification=' + partido : '');
        // const varLocalidad = ((localidad) ? '&fatherType=localidades&fatherIdentification=' + localidad : '');
        const server = 'geographicAddressManagement/v1/areas?fullText=true&limit=999&offset=0&type=LOCALIDADES&name=' + query
        const result = await axios(
          server  + varCountry  + varState + varCity

        );

        // result.data es la lista con todas las localidades
        // const resultLocalidades = result.data.map(l => l.identification.split(','))
        // result.data.map(o => o.texto = o.name + ' ' + o.stateOrProvince + ' ' + o.city)
        setOptions(result.data);
        setLocalidades(result.data);

        setIsLoading(false);
      };
      fetchData()
   // }
  }
}

  const handleSearch = (query) => {
    // this.setState({ isLoading: true });
    if (query.length > 2) {
      // if (!query.includes(prevQuery)) {
        setPrevQuery(query);
        setIsLoading(true);
        const fetchData = async () => {
          const varCity = ((partido) ? '&city=' + partido : '');
          const varCountry = ((pais) ? '&country=' + pais : '');
          const varLocalidad = ((localidad) ? '&locality=' + localidad : '');
          const varState = ((provincia) ? '&stateOrProvince=' + provincia : '');
          const server = 'geographicAddressManagement/v1/streets?fullText=true&offset=0&name=' + query
          const result = await axios(
            server + varCity + varCountry + varLocalidad + varState
          );

          setCalles(result.data);
          result.data.map(o => o.texto = o.name + ' ' + o.stateOrProvince + ' ' + o.city)
          setRangosAltura(result.data.map(r => r.numberRanges.evenSides.map(s => s.number +' - '+ s.numberLast+ '\n')))
          setOptions(result.data);
          setIsLoading(false);
        };
        fetchData()
     // }
    }
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
                 {otherEntity.identification.split(',')[4]} {otherEntity.identification.split(',')[3]}  {otherEntity.identification.split(',')[2]} {otherEntity.identification.split(',')[1]}
                </Select.Option>
                    )
                  ) 
                : null   
    );

    const resetValues=() => {
      setProvincia(null);
      setPartido(null);
      setLocalidad(null);
      setCalle(null);
      setAltura(null);
    }

    const formDireccion = (
      <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 16 }}
      layout="vertical"
      initialValues={{ size: componentSize }}
      onValuesChange={onFormLayoutChange}
    >
      <Button onClick={resetValues}>clear</Button>
      <Button type="primary" icon={<SearchOutlined />} onClick={(event) => handleSubmit()}>
        Geographic
        </Button>
        <Form.Item style={{ marginBottom: 4 }}>

<Form.Item label="Tipo Emprendimiento" style={{ display: 'inline-block', width: 'calc(30% - 4px)', margin: '0 4px 0 0' }} >
  <Select allowClear showSearch
          placeholder="Tipo emprendimiento" 
          defaultValue={null}
          //value={tipoEmp} 
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
          //value={tipoEmp} 
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
          //value={tipoEmp} 
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
          <Select allowClear showSearch
                  placeholder="Provincia" 
                  defaultValue={null}
                  value={provincia} 
                  onSelect={(value, event) => setProvincia(value)}>
                  {opcionesSelectName(provincias)}
          </Select>
        </Form.Item >
        <Form.Item label="Partido"  style={{ display: 'inline-block', width: 'calc(20% - 4px)', margin: '0 4px 0 0' }}>
          <Select allowClear placeholder="Partido" 
                value={partido} 
                showSearch onSelect={(value, event) => setPartido(value)}>
          {opcionesSelectName(partidos)}

          </Select>
        </Form.Item>
        <Form.Item label="Localidad" style={{ display: 'inline-block', width: 'calc(60% - 4px)', margin: '0 4px 0 0' }}>
          <Select placeholder="Localidad" 
                  allowClear
                  value={localidad} 
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
            onSearch={handleSearch}
            value={calle}
            onSelect={handleSelect}>
            {opcionesSelectIdent(calles)}
          </Select>
        </Form.Item>
        <Form.Item label="Altura" style={{ display: 'inline-block', width: 'calc(17% - 4px)', margin: '1px 4px 0 0' }}>
          <Tooltip title={rangosAltura}>
          <InputNumber value={altura} placeholder="Altura" onChange={(value) => setAltura(value)} />
          </Tooltip>
        </Form.Item>
        <Form.Item label="C. P." style={{ display: 'inline-block', width: 'calc(16% - 4px)', margin: '1px  4px 0 0' }}>
          <InputNumber disabled={editForm} value={codigoPostal} placeholder="C. P." onChange={(e) => setCodigoPostal(e)}  />
        </Form.Item>
      </Form.Item>
      <Form.Item style={{ marginBottom: 4 }}>

        <Form.Item label="latitud" style={{ display: 'inline-block', width: 'calc(50% - 4px)', margin: '1px 4px 0 0' }}>
          <Input disabled={editForm} value={geoX} placeholder="latitud" onChange={(e) => setGeoX(e.target.value)}  />
        </Form.Item>
        <Form.Item label="longitud" style={{ display: 'inline-block', width: 'calc(50% - 4px)', margin: '1px  4px 0 0' }}>
          <Input disabled={editForm} value={geoY} placeholder="longitud" onChange={(e) => setGeoY(e.target.value)} />
        </Form.Item>
      </Form.Item>

      <Form.Item style={{ marginBottom: 4 }}>
        <Form.Item label="region" style={{ display: 'inline-block', width: 'calc(50% - 4px)', margin: '1px 4px 0 0' }}>
          <Input disabled={editForm} value={region} placeholder="region" onChange={(e) => setRegion(e.target.value)} />
        </Form.Item>
        <Form.Item label="subregion" style={{ display: 'inline-block', width: 'calc(50% - 4px)', margin: '1px  4px 0 0' }}>
          <Input disabled={editForm} value={subRegion} placeholder="subregion" onChange={(e) => setSubRegion(e.target.value)}  />
        </Form.Item>
      </Form.Item>

      <Form.Item style={{ marginBottom: 4 }}>
        <Form.Item label="Zona competencia" style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '1px 4px 0 0' }}>
          <Input disabled={editForm} value={zonaCompetencia} placeholder="zona de competencia" onChange={(e) => setZonaCompetencia(e.target.value)}  />
        </Form.Item>
        <Form.Item label="Hubs" style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '1px  4px 0 0' }}>
          <Input disabled={editForm} value={hub} placeholder="hubs" onChange={(e) => setHub(e.target.value)}  />
        </Form.Item>
        <Form.Item label="Barrio especial" style={{ display: 'inline-block', width: 'calc(33% - 4px)', margin: '1px  4px 0 0' }}>
          <Input disabled={editForm} value={barriosEspeciales} placeholder="barrio especial" onChange={(e) => setBarriosEspeciales(e.target.value)}  />
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
const mapStateToProps = ({ tipoObra, tipoEmp, segmento }: IRootState) => ({
  tipoObraList: tipoObra.entities,
  tipoEmpList: tipoEmp.entities,
  loadingEmp: tipoEmp.loading,
  loadingObra: tipoObra.loading,
  segmentoList: segmento.entities,
  loadingSeg: segmento.loading,
});

const mapDispatchToProps = {
  getEntitiesEmp,
  getEntitiesObra,
  getEntitiesSeg,

};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Calles);

