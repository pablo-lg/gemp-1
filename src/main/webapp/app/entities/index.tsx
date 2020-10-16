import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TipoEmp from './tipo-emp';
import TipoObra from './tipo-obra';
import TipoDesp from './tipo-desp';
import Segmento from './segmento';
import Tecnologia from './tecnologia';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}tipo-emp`} component={TipoEmp} />
      <ErrorBoundaryRoute path={`${match.url}tipo-obra`} component={TipoObra} />
      <ErrorBoundaryRoute path={`${match.url}tipo-desp`} component={TipoDesp} />
      <ErrorBoundaryRoute path={`${match.url}segmento`} component={Segmento} />
      <ErrorBoundaryRoute path={`${match.url}tecnologia`} component={Tecnologia} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
