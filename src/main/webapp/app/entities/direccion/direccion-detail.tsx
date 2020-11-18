import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './direccion.reducer';
import { IDireccion } from 'app/shared/model/direccion.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDireccionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DireccionDetail = (props: IDireccionDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { direccionEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Direccion [<b>{direccionEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="pais">Pais</span>
          </dt>
          <dd>{direccionEntity.pais}</dd>
          <dt>
            <span id="provincia">Provincia</span>
          </dt>
          <dd>{direccionEntity.provincia}</dd>
          <dt>
            <span id="partido">Partido</span>
          </dt>
          <dd>{direccionEntity.partido}</dd>
          <dt>
            <span id="localidad">Localidad</span>
          </dt>
          <dd>{direccionEntity.localidad}</dd>
          <dt>
            <span id="calle">Calle</span>
          </dt>
          <dd>{direccionEntity.calle}</dd>
          <dt>
            <span id="altura">Altura</span>
          </dt>
          <dd>{direccionEntity.altura}</dd>
          <dt>
            <span id="region">Region</span>
          </dt>
          <dd>{direccionEntity.region}</dd>
          <dt>
            <span id="subregion">Subregion</span>
          </dt>
          <dd>{direccionEntity.subregion}</dd>
          <dt>
            <span id="hub">Hub</span>
          </dt>
          <dd>{direccionEntity.hub}</dd>
          <dt>
            <span id="barriosEspeciales">Barrios Especiales</span>
          </dt>
          <dd>{direccionEntity.barriosEspeciales}</dd>
          <dt>
            <span id="codigoPostal">Codigo Postal</span>
          </dt>
          <dd>{direccionEntity.codigoPostal}</dd>
          <dt>
            <span id="tipoCalle">Tipo Calle</span>
          </dt>
          <dd>{direccionEntity.tipoCalle}</dd>
        </dl>
        <Button tag={Link} to="/direccion" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/direccion/${direccionEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ direccion }: IRootState) => ({
  direccionEntity: direccion.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DireccionDetail);
