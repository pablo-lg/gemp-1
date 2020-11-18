import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IObra } from 'app/shared/model/obra.model';
import { getEntities as getObras } from 'app/entities/obra/obra.reducer';
import { ITipoObra } from 'app/shared/model/tipo-obra.model';
import { getEntities as getTipoObras } from 'app/entities/tipo-obra/tipo-obra.reducer';
import { ITipoEmp } from 'app/shared/model/tipo-emp.model';
import { getEntities as getTipoEmps } from 'app/entities/tipo-emp/tipo-emp.reducer';
import { IEstado } from 'app/shared/model/estado.model';
import { getEntities as getEstados } from 'app/entities/estado/estado.reducer';
import { ICompetencia } from 'app/shared/model/competencia.model';
import { getEntities as getCompetencias } from 'app/entities/competencia/competencia.reducer';
import { IDespliegue } from 'app/shared/model/despliegue.model';
import { getEntities as getDespliegues } from 'app/entities/despliegue/despliegue.reducer';
import { INSE } from 'app/shared/model/nse.model';
import { getEntities as getNSes } from 'app/entities/nse/nse.reducer';
import { ISegmento } from 'app/shared/model/segmento.model';
import { getEntities as getSegmentos } from 'app/entities/segmento/segmento.reducer';
import { ITecnologia } from 'app/shared/model/tecnologia.model';
import { getEntities as getTecnologias } from 'app/entities/tecnologia/tecnologia.reducer';
import { IEjecCuentas } from 'app/shared/model/ejec-cuentas.model';
import { getEntities as getEjecCuentas } from 'app/entities/ejec-cuentas/ejec-cuentas.reducer';
import { IDireccion } from 'app/shared/model/direccion.model';
import { getEntities as getDireccions } from 'app/entities/direccion/direccion.reducer';
import { getEntity, updateEntity, createEntity, reset } from './emprendimiento.reducer';
import { IEmprendimiento } from 'app/shared/model/emprendimiento.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEmprendimientoUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const EmprendimientoUpdate = (props: IEmprendimientoUpdateProps) => {
  const [obraId, setObraId] = useState('0');
  const [tipoObraId, setTipoObraId] = useState('0');
  const [tipoEmpId, setTipoEmpId] = useState('0');
  const [estadoId, setEstadoId] = useState('0');
  const [competenciaId, setCompetenciaId] = useState('0');
  const [despliegueId, setDespliegueId] = useState('0');
  const [nSEId, setNSeId] = useState('0');
  const [segmentoId, setSegmentoId] = useState('0');
  const [tecnologiaId, setTecnologiaId] = useState('0');
  const [ejecCuentasId, setEjecCuentasId] = useState('0');
  const [direccionId, setDireccionId] = useState('0');
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const {
    emprendimientoEntity,
    obras,
    tipoObras,
    tipoEmps,
    estados,
    competencias,
    despliegues,
    nSES,
    segmentos,
    tecnologias,
    ejecCuentas,
    direccions,
    loading,
    updating,
  } = props;

  const handleClose = () => {
    props.history.push('/emprendimiento');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }

    props.getObras();
    props.getTipoObras();
    props.getTipoEmps();
    props.getEstados();
    props.getCompetencias();
    props.getDespliegues();
    props.getNSes();
    props.getSegmentos();
    props.getTecnologias();
    props.getEjecCuentas();
    props.getDireccions();
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const entity = {
        ...emprendimientoEntity,
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
          <h2 id="gempApp.emprendimiento.home.createOrEditLabel">Create or edit a Emprendimiento</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <AvForm model={isNew ? {} : emprendimientoEntity} onSubmit={saveEntity}>
              {!isNew ? (
                <AvGroup>
                  <Label for="emprendimiento-id">ID</Label>
                  <AvInput id="emprendimiento-id" type="text" className="form-control" name="id" required readOnly />
                </AvGroup>
              ) : null}
              <AvGroup>
                <Label id="contactoLabel" for="emprendimiento-contacto">
                  Contacto
                </Label>
                <AvField id="emprendimiento-contacto" type="text" name="contacto" />
              </AvGroup>
              <AvGroup>
                <Label id="provinciaLabel" for="emprendimiento-provincia">
                  Provincia
                </Label>
                <AvField id="emprendimiento-provincia" type="text" name="provincia" />
              </AvGroup>
              <AvGroup>
                <Label for="emprendimiento-obra">Obra</Label>
                <AvInput id="emprendimiento-obra" type="select" className="form-control" name="obra.id">
                  <option value="" key="0" />
                  {obras
                    ? obras.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.descripcion}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="emprendimiento-tipoObra">Tipo Obra</Label>
                <AvInput id="emprendimiento-tipoObra" type="select" className="form-control" name="tipoObra.id">
                  <option value="" key="0" />
                  {tipoObras
                    ? tipoObras.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.descripcion}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="emprendimiento-tipoEmp">Tipo Emp</Label>
                <AvInput id="emprendimiento-tipoEmp" type="select" className="form-control" name="tipoEmp.id">
                  <option value="" key="0" />
                  {tipoEmps
                    ? tipoEmps.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.descripcion}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="emprendimiento-estado">Estado</Label>
                <AvInput id="emprendimiento-estado" type="select" className="form-control" name="estado.id">
                  <option value="" key="0" />
                  {estados
                    ? estados.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.descripcion}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="emprendimiento-competencia">Competencia</Label>
                <AvInput id="emprendimiento-competencia" type="select" className="form-control" name="competencia.id">
                  <option value="" key="0" />
                  {competencias
                    ? competencias.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.descripcion}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="emprendimiento-despliegue">Despliegue</Label>
                <AvInput id="emprendimiento-despliegue" type="select" className="form-control" name="despliegue.id">
                  <option value="" key="0" />
                  {despliegues
                    ? despliegues.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.descripcion}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="emprendimiento-nSE">N SE</Label>
                <AvInput id="emprendimiento-nSE" type="select" className="form-control" name="nSE.id">
                  <option value="" key="0" />
                  {nSES
                    ? nSES.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.descripcion}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="emprendimiento-segmento">Segmento</Label>
                <AvInput id="emprendimiento-segmento" type="select" className="form-control" name="segmento.id">
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
              <AvGroup>
                <Label for="emprendimiento-tecnologia">Tecnologia</Label>
                <AvInput id="emprendimiento-tecnologia" type="select" className="form-control" name="tecnologia.id">
                  <option value="" key="0" />
                  {tecnologias
                    ? tecnologias.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.descripcion}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="emprendimiento-ejecCuentas">Ejec Cuentas</Label>
                <AvInput id="emprendimiento-ejecCuentas" type="select" className="form-control" name="ejecCuentas.id">
                  <option value="" key="0" />
                  {ejecCuentas
                    ? ejecCuentas.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.nombre}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <AvGroup>
                <Label for="emprendimiento-direccion">Direccion</Label>
                <AvInput id="emprendimiento-direccion" type="select" className="form-control" name="direccion.id">
                  <option value="" key="0" />
                  {direccions
                    ? direccions.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.calle}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
              <Button tag={Link} id="cancel-save" to="/emprendimiento" replace color="info">
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
  obras: storeState.obra.entities,
  tipoObras: storeState.tipoObra.entities,
  tipoEmps: storeState.tipoEmp.entities,
  estados: storeState.estado.entities,
  competencias: storeState.competencia.entities,
  despliegues: storeState.despliegue.entities,
  nSES: storeState.nSE.entities,
  segmentos: storeState.segmento.entities,
  tecnologias: storeState.tecnologia.entities,
  ejecCuentas: storeState.ejecCuentas.entities,
  direccions: storeState.direccion.entities,
  emprendimientoEntity: storeState.emprendimiento.entity,
  loading: storeState.emprendimiento.loading,
  updating: storeState.emprendimiento.updating,
  updateSuccess: storeState.emprendimiento.updateSuccess,
});

const mapDispatchToProps = {
  getObras,
  getTipoObras,
  getTipoEmps,
  getEstados,
  getCompetencias,
  getDespliegues,
  getNSes,
  getSegmentos,
  getTecnologias,
  getEjecCuentas,
  getDireccions,
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EmprendimientoUpdate);
