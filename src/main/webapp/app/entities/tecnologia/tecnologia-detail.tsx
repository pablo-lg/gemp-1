import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './tecnologia.reducer';
import { ITecnologia } from 'app/shared/model/tecnologia.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITecnologiaDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const TecnologiaDetail = (props: ITecnologiaDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { tecnologiaEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Tecnologia [<b>{tecnologiaEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="valor">Valor</span>
          </dt>
          <dd>{tecnologiaEntity.valor}</dd>
        </dl>
        <Button tag={Link} to="/tecnologia" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/tecnologia/${tecnologiaEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ tecnologia }: IRootState) => ({
  tecnologiaEntity: tecnologia.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TecnologiaDetail);
