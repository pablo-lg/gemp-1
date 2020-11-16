import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './emprendimiento.reducer';
import { IEmprendimiento } from 'app/shared/model/emprendimiento.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmprendimientoDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmprendimientoDetail = (props: IEmprendimientoDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { emprendimientoEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2>
          Emprendimiento [<b>{emprendimientoEntity.id}</b>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="contacto">Contacto</span>
          </dt>
          <dd>{emprendimientoEntity.contacto}</dd>
          <dt>
            <span id="provincia">Provincia</span>
          </dt>
          <dd>{emprendimientoEntity.provincia}</dd>
          <dt>Obra</dt>
          <dd>{emprendimientoEntity.obra ? emprendimientoEntity.obra.descripcion : ''}</dd>
          <dt>Tipo Obra</dt>
          <dd>{emprendimientoEntity.tipoObra ? emprendimientoEntity.tipoObra.descripcion : ''}</dd>
          <dt>Tipo Emp</dt>
          <dd>{emprendimientoEntity.tipoEmp ? emprendimientoEntity.tipoEmp.descripcion : ''}</dd>
          <dt>Estado</dt>
          <dd>{emprendimientoEntity.estado ? emprendimientoEntity.estado.descripcion : ''}</dd>
          <dt>Competencia</dt>
          <dd>{emprendimientoEntity.competencia ? emprendimientoEntity.competencia.descripcion : ''}</dd>
          <dt>Despliegue</dt>
          <dd>{emprendimientoEntity.despliegue ? emprendimientoEntity.despliegue.descripcion : ''}</dd>
          <dt>N SE</dt>
          <dd>{emprendimientoEntity.nSE ? emprendimientoEntity.nSE.descripcion : ''}</dd>
          <dt>Segmento</dt>
          <dd>{emprendimientoEntity.segmento ? emprendimientoEntity.segmento.descripcion : ''}</dd>
          <dt>Tecnologia</dt>
          <dd>{emprendimientoEntity.tecnologia ? emprendimientoEntity.tecnologia.descripcion : ''}</dd>
          <dt>Ejec Cuentas</dt>
          <dd>{emprendimientoEntity.ejecCuentas ? emprendimientoEntity.ejecCuentas.nombre : ''}</dd>
          <dt>Direccion</dt>
          <dd>{emprendimientoEntity.direccion ? emprendimientoEntity.direccion.calle : ''}</dd>
        </dl>
        <Button tag={Link} to="/emprendimiento" replace color="info">
          <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/emprendimiento/${emprendimientoEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ emprendimiento }: IRootState) => ({
  emprendimientoEntity: emprendimiento.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmprendimientoDetail);
