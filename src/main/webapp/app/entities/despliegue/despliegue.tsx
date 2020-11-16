import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './despliegue.reducer';
import { IDespliegue } from 'app/shared/model/despliegue.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IDespliegueProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Despliegue = (props: IDespliegueProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { despliegueList, match, loading } = props;
  return (
    <div>
      <h2 id="despliegue-heading">
        Despliegues
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Despliegue
        </Link>
      </h2>
      <div className="table-responsive">
        {despliegueList && despliegueList.length > 0 ? (
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
              {despliegueList.map((despliegue, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${despliegue.id}`} color="link" size="sm">
                      {despliegue.id}
                    </Button>
                  </td>
                  <td>{despliegue.descripcion}</td>
                  <td>{despliegue.valor}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${despliegue.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${despliegue.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${despliegue.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Despliegues found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ despliegue }: IRootState) => ({
  despliegueList: despliegue.entities,
  loading: despliegue.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Despliegue);
