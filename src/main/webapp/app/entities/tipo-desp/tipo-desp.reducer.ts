import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { ITipoDesp, defaultValue } from 'app/shared/model/tipo-desp.model';

export const ACTION_TYPES = {
  FETCH_TIPODESP_LIST: 'tipoDesp/FETCH_TIPODESP_LIST',
  FETCH_TIPODESP: 'tipoDesp/FETCH_TIPODESP',
  CREATE_TIPODESP: 'tipoDesp/CREATE_TIPODESP',
  UPDATE_TIPODESP: 'tipoDesp/UPDATE_TIPODESP',
  PARTIAL_UPDATE_TIPODESP: 'tipoDesp/PARTIAL_UPDATE_TIPODESP',
  DELETE_TIPODESP: 'tipoDesp/DELETE_TIPODESP',
  RESET: 'tipoDesp/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<ITipoDesp>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type TipoDespState = Readonly<typeof initialState>;

// Reducer

export default (state: TipoDespState = initialState, action): TipoDespState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_TIPODESP_LIST):
    case REQUEST(ACTION_TYPES.FETCH_TIPODESP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_TIPODESP):
    case REQUEST(ACTION_TYPES.UPDATE_TIPODESP):
    case REQUEST(ACTION_TYPES.DELETE_TIPODESP):
    case REQUEST(ACTION_TYPES.PARTIAL_UPDATE_TIPODESP):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_TIPODESP_LIST):
    case FAILURE(ACTION_TYPES.FETCH_TIPODESP):
    case FAILURE(ACTION_TYPES.CREATE_TIPODESP):
    case FAILURE(ACTION_TYPES.UPDATE_TIPODESP):
    case FAILURE(ACTION_TYPES.PARTIAL_UPDATE_TIPODESP):
    case FAILURE(ACTION_TYPES.DELETE_TIPODESP):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_TIPODESP_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_TIPODESP):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_TIPODESP):
    case SUCCESS(ACTION_TYPES.UPDATE_TIPODESP):
    case SUCCESS(ACTION_TYPES.PARTIAL_UPDATE_TIPODESP):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_TIPODESP):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/tipo-desps';

// Actions

export const getEntities: ICrudGetAllAction<ITipoDesp> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_TIPODESP_LIST,
  payload: axios.get<ITipoDesp>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<ITipoDesp> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_TIPODESP,
    payload: axios.get<ITipoDesp>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<ITipoDesp> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_TIPODESP,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<ITipoDesp> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_TIPODESP,
    payload: axios.put(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const partialUpdate: ICrudPutAction<ITipoDesp> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.PARTIAL_UPDATE_TIPODESP,
    payload: axios.patch(`${apiUrl}/${entity.id}`, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<ITipoDesp> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_TIPODESP,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
