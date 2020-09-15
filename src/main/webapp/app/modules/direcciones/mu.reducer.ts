import axios from 'axios';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

export const ACTION_TYPES = {
    FETCH_PROVINCIAS: 'mu/FETCH_PROVINCIAS',
    FETCH_PARTIDOS: 'mu/FETCH_PARTIDOS',
    FETCH_LOCALIDADES: 'mu/FETCH_LOCALIDADES',
    FETCH_CALLES: 'mu/FETCH_CALLES',
    FETCH_GEOGRAPHIC: 'mu/FETCH_GEOGRAPHIC',
    FETCH_TECNICA: 'mu/FETCH_TECNICA',
    FETCH_COBRE: 'mu/FETCH_COBRE',
    RESET_PARTIDOS: 'mu/RESET_PARTIDOS',
    RESET_LOCALIDADES: 'mu/RESET_LOCALIDADES',
    RESET_CALLES: 'mu/RESET_CALLES',

  };

  const initialState = {
    loading: false,
    errorMessage: null,

    provincias: [] as any[],
    partidos: [] as any[],
    localidades: [] as any[],
    calles: [] as any[],
    geographic: [] as any[],
    zonas: null,
    geoX: null,
    geoY: null,
    zonaCompetencia: null,
    hub: null,
    codigoPostal: null,
    barriosEspeciales: null,
    streetType:null,
    intersectionLeft:null,
    intersectionRight:null,


    
  };

  export type MuState = Readonly<typeof initialState>;

  const filterOptions = (dato, filtro) => {
    const aux=dato.filter(d => d.type === filtro);
    return (aux[0] ? aux[0].value : null)

  }

  // Reducer

export default (state: MuState = initialState, action): MuState => {
    switch (action.type) {
      case REQUEST(ACTION_TYPES.FETCH_PROVINCIAS):
      case REQUEST(ACTION_TYPES.FETCH_PARTIDOS):
      case REQUEST(ACTION_TYPES.FETCH_LOCALIDADES):
      case REQUEST(ACTION_TYPES.FETCH_CALLES):
      case REQUEST(ACTION_TYPES.FETCH_GEOGRAPHIC):

        return {
          ...state,
          errorMessage: null,
          loading: true,
        };
      case FAILURE(ACTION_TYPES.FETCH_PROVINCIAS):
      case FAILURE(ACTION_TYPES.FETCH_PARTIDOS):
      case FAILURE(ACTION_TYPES.FETCH_LOCALIDADES):
      case FAILURE(ACTION_TYPES.FETCH_CALLES):
      case FAILURE(ACTION_TYPES.FETCH_GEOGRAPHIC):

        return {
          ...state,
          loading: false,
          errorMessage: action.payload,
        };
      case SUCCESS(ACTION_TYPES.FETCH_PROVINCIAS):
        return {
          ...state,
          loading: false,
          provincias: action.payload.data,
        };
      case SUCCESS(ACTION_TYPES.FETCH_PARTIDOS):
        return {
          ...state,
          loading: false,
          partidos: action.payload.data,
        };
      case SUCCESS(ACTION_TYPES.FETCH_LOCALIDADES):
        return {
          ...state,
          loading: false,
          localidades: action.payload.data,
        };
      case SUCCESS(ACTION_TYPES.FETCH_CALLES):
        return {
          ...state,
          loading: false,
          calles: action.payload.data,
        };
        case SUCCESS(ACTION_TYPES.FETCH_GEOGRAPHIC):
          return {
            ...state,
            loading: false,
            geographic: action.payload.data,
            zonas: action.payload.data.zones,
            geoX: action.payload.data.geographicLocation.geometry[0].x,
            geoY: action.payload.data.geographicLocation.geometry[0].y,
            zonaCompetencia: filterOptions([...action.payload.data.zones],"Zonas Competencia"),
            hub: filterOptions([...action.payload.data.zones],"Hubs"),
            barriosEspeciales: filterOptions([...action.payload.data.zones],"Barrios Especiales"),
            codigoPostal: action.payload.data.postcode,
            streetType:action.payload.data.streetType,
            intersectionLeft:action.payload.data.beetweenStreet.intersectionLeft,
            intersectionRight:action.payload.data.beetweenStreet.intersectionRight,

          };
          case ACTION_TYPES.RESET_PARTIDOS:
            return {
              ...state,
              partidos: []
            };
          case ACTION_TYPES.RESET_LOCALIDADES:
            return {
              ...state,
              localidades: []
            };
          case ACTION_TYPES.RESET_CALLES:
            return {
              ...state,
              calles: []
            };                          
      default:
        return state;
    }
  };
  

  // Actions


  
  export const getProvincias = (pais='Argentina') => {
    const requestUrl = 'geographicAddressManagement/v1/areas?fatherIdentification=' + pais + '&fatherType=Paises&fullText=false&limit=999&offset=0&type=Provincias&fields=name,type,identification';
    return {
      type: ACTION_TYPES.FETCH_PROVINCIAS,
      payload: axios.get(requestUrl),
    };
  };

  export const getPartidos = (pais, provincia) => {
    const requestUrl = 'geographicAddressManagement/v1/areas?fatherIdentification=' + pais + '&fatherIdentification=' + provincia + '&fatherType=Provincias&fullText=false&limit=999&offset=0&type=Partidos&fields=name,type,identification';
    return {
      type: ACTION_TYPES.FETCH_PARTIDOS,
      payload: axios.get(requestUrl),
    };
  };

  export const getLocalidades = (pais, provincia, partido, query=null) => {
    const varQuery = ((query) ? '&fullText=true&name=' + query : '&fullText=false');
    const varCountry = ((pais) ? '&fatherIdentification=' + pais : '');
    const varState = ((provincia) ? '&fatherIdentification=' + provincia : '');
    const varCity = ((partido) ? '&fatherType=partidos&fatherIdentification=' + partido : '');
    const server = 'geographicAddressManagement/v1/areas?limit=999&offset=0&type=LOCALIDADES'
    const requestUrl = server + varQuery + varCountry  + varState + varCity
    return {
      type: ACTION_TYPES.FETCH_LOCALIDADES,
      payload: axios.get(requestUrl),
    };
  };

  export const getCalles = (pais, provincia, partido, localidad, query=null) => {
    const varQuery = ((query) ? '&fullText=true&name=' + query : '&fullText=false');
    const varCountry = ((pais) ? '&country=' + pais : '');
    const varState = ((provincia) ? '&stateOrProvince=' + provincia : '');
    const varCity = ((partido) ? '&city=' + partido : '');
    const varLocality = ((localidad) ? '&locality=' + localidad : '');
    const server = 'geographicAddressManagement/v1/streets?offset=0'
    const requestUrl = server + varQuery + varCountry + varState + varCity + varLocality 
    return {
      type: ACTION_TYPES.FETCH_CALLES,
      payload: axios.get(requestUrl),
    };
  };

  export const getGeographic = (pais, provincia, partido, localidad, calle, altura) => {

    const requestUrl ='geographicAddressManagement/v1/geographicAddress?city=' + partido + '&country=' + pais + '&locality=' + localidad + '&stateOrProvince=' + provincia + '&streetName=' + calle + '&streetNr=' + altura;

    return {
      type: ACTION_TYPES.FETCH_GEOGRAPHIC,
      payload: axios.get(requestUrl),
    };
  };

  export const resetPartidos = () => {
    return {
      type: ACTION_TYPES.RESET_PARTIDOS,
    };

  }
  export const resetLocalidades = () => {
    return {
      type: ACTION_TYPES.RESET_LOCALIDADES,
    };

  }
  export const resetCalles = () => {
    return {
      type: ACTION_TYPES.RESET_CALLES,
    };

  }
