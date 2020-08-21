import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './tipo-desp.reducer';
import { ITipoDesp } from 'app/shared/model/tipo-desp.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITipoDespProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const TipoDesp = (props: ITipoDespProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { tipoDespList, match, loading } = props;
  return (
    <div>
      <h2 id="tipo-desp-heading">
        Tipo Desps
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Tipo Desp
        </Link>
      </h2>
      <div className="table-responsive">
        {tipoDespList && tipoDespList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Descripcion</th>
                <th>Valor</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {tipoDespList.map((tipoDesp, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${tipoDesp.id}`} color="link" size="sm">
                      {tipoDesp.id}
                    </Button>
                  </td>
                  <td>{tipoDesp.descripcion}</td>
                  <td>{tipoDesp.valor}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${tipoDesp.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${tipoDesp.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${tipoDesp.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Tipo Desps found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ tipoDesp }: IRootState) => ({
  tipoDespList: tipoDesp.entities,
  loading: tipoDesp.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TipoDesp);
