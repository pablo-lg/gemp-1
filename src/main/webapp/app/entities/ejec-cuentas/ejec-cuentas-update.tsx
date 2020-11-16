import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ISegmento } from 'app/shared/model/segmento.model';
import { getEntities as getSegmentos } from 'app/entities/segmento/segmento.reducer';
import { getEntity, updateEntity, createEntity, reset } from './ejec-cuentas.reducer';
import { IEjecCuentas } from 'app/shared/model/ejec-cuentas.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEjecCuentasUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EjecCuentasUpdate = (props: IEjecCuentasUpdateProps) => {
  const [segmentoId, setSegmentoId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { ejecCuentasEntity, segmentos, loading, updating } = props;

  const handleClose = () => {
    props.history.push('/ejec-cuentas');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getSegmentos();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...ejecCuentasEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
    }
  };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gempApp.ejecCuentas.home.createOrEditLabel">Create or edit a EjecCuentas</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : ejecCuentasEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="ejec-cuentas-id">ID</Label>
                  <AvInput id="ejec-cuentas-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="telefonoLabel" for="ejec-cuentas-telefono">
                  Telefono
                </Label>
                <AvField id="ejec-cuentas-telefono" type="text" name="telefono" />
              </AvGroup>
              <AvGroup>
                <Label id="apellidoLabel" for="ejec-cuentas-apellido">
                  Apellido
                </Label>
                <AvField id="ejec-cuentas-apellido" type="text" name="apellido" />
              </AvGroup>
              <AvGroup>
                <Label id="celularLabel" for="ejec-cuentas-celular">
                  Celular
                </Label>
                <AvField id="ejec-cuentas-celular" type="text" name="celular" />
              </AvGroup>
              <AvGroup>
                <Label id="mailLabel" for="ejec-cuentas-mail">
                  Mail
                </Label>
                <AvField id="ejec-cuentas-mail" type="text" name="mail" />
              </AvGroup>
              <AvGroup>
                <Label id="nombreLabel" for="ejec-cuentas-nombre">
                  Nombre
                </Label>
                <AvField id="ejec-cuentas-nombre" type="text" name="nombre" />
              </AvGroup>
              <AvGroup>
                <Label id="repcom1Label" for="ejec-cuentas-repcom1">
                  Repcom 1
                </Label>
                <AvField id="ejec-cuentas-repcom1" type="text" name="repcom1" />
              </AvGroup>
              <AvGroup>
                <Label id="repcom2Label" for="ejec-cuentas-repcom2">
                  Repcom 2
                </Label>
                <AvField id="ejec-cuentas-repcom2" type="text" name="repcom2" />
              </AvGroup>
              <AvGroup>
                <Label for="ejec-cuentas-segmento">Segmento</Label>
                <AvInput id="ejec-cuentas-segmento" type="select" className="form-control" name="segmento.id">
                  <option value="" key="0" />
                  {segmentos
                    ? segmentos.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.descripcion}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/ejec-cuentas" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">Back</span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Save
              </Button>
            </AvForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  segmentos: storeState.segmento.entities,
  ejecCuentasEntity: storeState.ejecCuentas.entity,
  loading: storeState.ejecCuentas.loading,
  updating: storeState.ejecCuentas.updating,
  updateSuccess: storeState.ejecCuentas.updateSuccess,
});

const mapDispatchToProps = {
  getSegmentos,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EjecCuentasUpdate);
