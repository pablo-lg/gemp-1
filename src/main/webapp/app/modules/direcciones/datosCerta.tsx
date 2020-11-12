import React from 'react';
import { IRootState } from 'app/shared/reducers';
import {Descriptions} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { connect } from 'react-redux';


export const DatosCerta = (props) => {

    return (      <div>
        {props.geoX ?
          <Descriptions title="Datos de certa" bordered>
              <Descriptions.Item label="Codigo postal">{props.codigoPostal}</Descriptions.Item>
              <Descriptions.Item label="Zona competencia">{props.competencia}</Descriptions.Item>
              <Descriptions.Item label="Hub">{props.hub}</Descriptions.Item>
              <Descriptions.Item label="Tipo de Calle">{props.streetType}</Descriptions.Item>
              <Descriptions.Item label="Interseccion der">{props.intersectionRight}</Descriptions.Item>
              <Descriptions.Item label="Interseccion izq">{props.intersectionLeft}</Descriptions.Item>
              <Descriptions.Item label="Geo X">{props.geoX}</Descriptions.Item>
              <Descriptions.Item label="Geo Y">{props.geoY}</Descriptions.Item>
              <Descriptions.Item label="Barrios Especiales">{props.barriosEspeciales}</Descriptions.Item>
          </Descriptions>
          :
          null
        }
        {props.technical.physicalNetworkElements ?
            <Descriptions title="Tecnologias" bordered>
            {props.technical.physicalNetworkElements.map(net => (
              <><Descriptions.Item key={net.accessType} label="Tecnologia">{net.accessType}</Descriptions.Item>
                <Descriptions.Item key={net.accessType} label="Elemento de red">{net.physicalCharacteristic[0].name}</Descriptions.Item></>

            ))}


          </Descriptions>
          :
          null
        }
      </div>);
    
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

