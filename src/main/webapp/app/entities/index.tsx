import React from 'react';
import { Switch } from 'react-router-dom';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import TipoEmp from './tipo-emp';
import TipoObra from './tipo-obra';
import TipoDesp from './tipo-desp';
import Segmento from './segmento';
import Despliegue from './despliegue';
import Tecnologia from './tecnologia';
import Competencia from './competencia';
import Estado from './estado';
import NSE from './nse';
import Obra from './obra';
import EjecCuentas from './ejec-cuentas';
import Direccion from './direccion';
import Emprendimiento from './emprendimiento';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}tipo-emp`} component={TipoEmp} />
      <ErrorBoundaryRoute path={`${match.url}tipo-obra`} component={TipoObra} />
      <ErrorBoundaryRoute path={`${match.url}tipo-desp`} component={TipoDesp} />
      <ErrorBoundaryRoute path={`${match.url}segmento`} component={Segmento} />
      <ErrorBoundaryRoute path={`${match.url}despliegue`} component={Despliegue} />
      <ErrorBoundaryRoute path={`${match.url}tecnologia`} component={Tecnologia} />
      <ErrorBoundaryRoute path={`${match.url}competencia`} component={Competencia} />
      <ErrorBoundaryRoute path={`${match.url}estado`} component={Estado} />
      <ErrorBoundaryRoute path={`${match.url}nse`} component={NSE} />
      <ErrorBoundaryRoute path={`${match.url}obra`} component={Obra} />
      <ErrorBoundaryRoute path={`${match.url}ejec-cuentas`} component={EjecCuentas} />
      <ErrorBoundaryRoute path={`${match.url}direccion`} component={Direccion} />
      <ErrorBoundaryRoute path={`${match.url}emprendimiento`} component={Emprendimiento} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
