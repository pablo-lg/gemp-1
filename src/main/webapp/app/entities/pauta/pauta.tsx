import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './pauta.reducer';
import { IPauta } from 'app/shared/model/pauta.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPautaProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Pauta = (props: IPautaProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { pautaList, match, loading } = props;
  return (
    <div>
      <h2 id="pauta-heading">
        Pautas
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Pauta
        </Link>
      </h2>
      <div className="table-responsive">
        {pautaList && pautaList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Anios</th>
                <th>Tipo Pauta</th>
                <th>Master Tipo Emp</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {pautaList.map((pauta, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${pauta.id}`} color="link" size="sm">
                      {pauta.id}
                    </Button>
                  </td>
                  <td>{pauta.anios}</td>
                  <td>{pauta.tipoPauta}</td>
                  <td>
                    {pauta.masterTipoEmp ? <Link to={`master-tipo-emp/${pauta.masterTipoEmp.id}`}>{pauta.masterTipoEmp.id}</Link> : ''}
                  </td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${pauta.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${pauta.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${pauta.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Pautas found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ pauta }: IRootState) => ({
  pautaList: pauta.entities,
  loading: pauta.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Pauta);
