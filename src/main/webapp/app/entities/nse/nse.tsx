import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './nse.reducer';
import { INSE } from 'app/shared/model/nse.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface INSEProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const NSE = (props: INSEProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { nSEList, match, loading } = props;
  return (
    <div>
      <h2 id="nse-heading">
        NSES
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new NSE
        </Link>
      </h2>
      <div className="table-responsive">
        {nSEList && nSEList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Descripcion</th>
                <th>Activo</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {nSEList.map((nSE, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${nSE.id}`} color="link" size="sm">
                      {nSE.id}
                    </Button>
                  </td>
                  <td>{nSE.descripcion}</td>
                  <td>{nSE.activo ? 'true' : 'false'}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${nSE.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${nSE.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${nSE.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No NSES found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ nSE }: IRootState) => ({
  nSEList: nSE.entities,
  loading: nSE.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(NSE);
