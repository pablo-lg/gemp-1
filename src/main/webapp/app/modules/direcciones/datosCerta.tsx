import React from 'react';
import { IRootState } from 'app/shared/reducers';
import {Descriptions, Table} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';


export const DatosCerta = (props) => {

  const columns = [
    {
      title: 'Tecnologia',
      dataIndex: 'accessType',
      key: 'accessType',
    },
    {
      title: 'Elementos de red',
      dataIndex: 'elementoRed',
      key: 'elementoRed',
    },

  ];

  const columnsGeo = [
    {
      title: 'Dato',
      dataIndex: 'dato',
      key: 'dato',
    },
    {
      title: 'Valor',
      dataIndex: 'valor',
      key: 'valor',
    },

  ];

  const dataSource = [
    props.technical.physicalNetworkElements ? props.technical.physicalNetworkElements.map(net => (
      {accessType : net.accessType,
        elementoRed: net.physicalCharacteristic.filter((b) => b.name==="elementoRed").map((a) => (a.name ==="elementoRed") ? a.valuefrom :null )[0]
      }

    )) : null

  ];

  const dataSourceGeo = [
    props.geoX ? 
     [              
      // {"dato": "Barrios Especiales", "valor": props.barriosEspeciales},
      {"dato" : "Codigo postal", "valor": props.codigoPostal},
      {"dato": "Geo Y", "valor": props.geoY},
      {"dato": "Geo X", "valor": props.geoX},
      {"dato": "Hub", "valor": props.hub},
      {"dato": "Interseccion der", "valor": props.intersectionRight},
      {"dato": "Interseccion izq", "valor": props.intersectionLeft},
      {"dato": "Tipo de Calle", "valor": props.streetType},
      {"dato": "Zona competencia", "valor": props.competencia},
     ]
      : null

  ];

 // dataSourceGeo[0] =  dataSourceGeo[0].sort((a, b) => a.dato.localeCompare(b.dato))
 // dataSource[0] = dataSource[0].sort((a, b) => a.accessType.localeCompare(b.accessType))
  
  console.error(dataSource[0])
  console.error(dataSourceGeo[0].sort((a, b) => a.dato.localeCompare(b.dato)))



    return (      <div>

        <Table dataSource={dataSourceGeo[0]} 
               columns={columnsGeo}  
               pagination={false} />

        <Table dataSource={dataSource[0]} 
               columns={columns} 
               pagination={false} />

      </div>)
    
}

const mapStateToProps = ({ mu }: IRootState) => ({
    loading: mu.loading,
    errorMessage: mu.errorMessage,
    geographic: mu.geographic,
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
    technical: mu.technical,

  
  });

  export default connect(mapStateToProps)(DatosCerta);

