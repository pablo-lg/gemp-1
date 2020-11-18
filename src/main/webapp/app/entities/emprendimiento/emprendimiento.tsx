import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './emprendimiento.reducer';
import { IEmprendimiento } from 'app/shared/model/emprendimiento.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IEmprendimientoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Emprendimiento = (props: IEmprendimientoProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { emprendimientoList, match, loading } = props;
  return (
    <div>
      <h2 id="emprendimiento-heading">
        Emprendimientos
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Emprendimiento
        </Link>
      </h2>
      <div className="table-responsive">
        {emprendimientoList && emprendimientoList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Contacto</th>
                <th>Provincia</th>
                <th>Obra</th>
                <th>Tipo Obra</th>
                <th>Tipo Emp</th>
                <th>Estado</th>
                <th>Competencia</th>
                <th>Despliegue</th>
                <th>N SE</th>
                <th>Segmento</th>
                <th>Tecnologia</th>
                <th>Ejec Cuentas</th>
                <th>Direccion</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {emprendimientoList.map((emprendimiento, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${emprendimiento.id}`} color="link" size="sm">
                      {emprendimiento.id}
                    </Button>
                  </td>
                  <td>{emprendimiento.contacto}</td>
                  <td>{emprendimiento.provincia}</td>
                  <td>{emprendimiento.obra ? <Link to={`obra/${emprendimiento.obra.id}`}>{emprendimiento.obra.descripcion}</Link> : ''}</td>
                  <td>
                    {emprendimiento.tipoObra ? (
                      <Link to={`tipo-obra/${emprendimiento.tipoObra.id}`}>{emprendimiento.tipoObra.descripcion}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {emprendimiento.tipoEmp ? (
                      <Link to={`tipo-emp/${emprendimiento.tipoEmp.id}`}>{emprendimiento.tipoEmp.descripcion}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {emprendimiento.estado ? (
                      <Link to={`estado/${emprendimiento.estado.id}`}>{emprendimiento.estado.descripcion}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {emprendimiento.competencia ? (
                      <Link to={`competencia/${emprendimiento.competencia.id}`}>{emprendimiento.competencia.descripcion}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {emprendimiento.despliegue ? (
                      <Link to={`despliegue/${emprendimiento.despliegue.id}`}>{emprendimiento.despliegue.descripcion}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>{emprendimiento.nSE ? <Link to={`nse/${emprendimiento.nSE.id}`}>{emprendimiento.nSE.descripcion}</Link> : ''}</td>
                  <td>
                    {emprendimiento.segmento ? (
                      <Link to={`segmento/${emprendimiento.segmento.id}`}>{emprendimiento.segmento.descripcion}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {emprendimiento.tecnologia ? (
                      <Link to={`tecnologia/${emprendimiento.tecnologia.id}`}>{emprendimiento.tecnologia.descripcion}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {emprendimiento.ejecCuentas ? (
                      <Link to={`ejec-cuentas/${emprendimiento.ejecCuentas.id}`}>{emprendimiento.ejecCuentas.nombre}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td>
                    {emprendimiento.direccion ? (
                      <Link to={`direccion/${emprendimiento.direccion.id}`}>{emprendimiento.direccion.calle}</Link>
                    ) : (
                      ''
                    )}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${emprendimiento.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${emprendimiento.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${emprendimiento.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Emprendimientos found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ emprendimiento }: IRootState) => ({
  emprendimientoList: emprendimiento.entities,
  loading: emprendimiento.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Emprendimiento);
