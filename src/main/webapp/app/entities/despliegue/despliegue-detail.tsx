import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './despliegue.reducer';
import { IDespliegue } from 'app/shared/model/despliegue.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDespliegueDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const DespliegueDetail = (props: IDespliegueDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { despliegueEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Despliegue [<b>{despliegueEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="descripcion">Descripcion</span>
          </dt>
          <dd>{despliegueEntity.descripcion}</dd>
          <dt>
            <span id="valor">Valor</span>
          </dt>
          <dd>{despliegueEntity.valor}</dd>
        </dl>
        <Button tag={Link} to="/despliegue" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/despliegue/${despliegueEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ despliegue }: IRootState) => ({
  despliegueEntity: despliegue.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(DespliegueDetail);
