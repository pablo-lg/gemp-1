import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TipoDesp from './tipo-desp';
import TipoDespDetail from './tipo-desp-detail';
import TipoDespUpdate from './tipo-desp-update';
import TipoDespDeleteDialog from './tipo-desp-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TipoDespUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TipoDespUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TipoDespDetail} />
      <ErrorBoundaryRoute path={match.url} component={TipoDesp} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={TipoDespDeleteDialog} />
  </>
);

export default Routes;
