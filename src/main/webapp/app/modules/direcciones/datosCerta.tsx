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
              <Descriptions.Item label="Zona competencia">{props.zonaCompetencia}</Descriptions.Item>
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
    hub: mu.hub,
    codigoPostal: mu.codigoPostal,
    barriosEspeciales: mu.barriosEspeciales,
    streetType: mu.streetType,
    intersectionLeft: mu.intersectionLeft,
    intersectionRight: mu.intersectionRight,
  
  });

  export default connect(mapStateToProps)(DatosCerta);

