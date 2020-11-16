import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './tecnologia.reducer';
import { ITecnologia } from 'app/shared/model/tecnologia.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITecnologiaProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Tecnologia = (props: ITecnologiaProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { tecnologiaList, match, loading } = props;
  return (
    <div>
      <h2 id="tecnologia-heading">
        Tecnologias
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Tecnologia
        </Link>
      </h2>
      <div className="table-responsive">
        {tecnologiaList && tecnologiaList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Descripcion</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {tecnologiaList.map((tecnologia, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${tecnologia.id}`} color="link" size="sm">
                      {tecnologia.id}
                    </Button>
                  </td>
                  <td>{tecnologia.descripcion}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${tecnologia.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${tecnologia.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${tecnologia.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Tecnologias found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ tecnologia }: IRootState) => ({
  tecnologiaList: tecnologia.entities,
  loading: tecnologia.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Tecnologia);
