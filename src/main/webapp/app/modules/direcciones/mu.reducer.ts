import { Competencia } from './../../entities/competencia/competencia';
import axios from 'axios';

import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

export const ACTION_TYPES = {
    FETCH_PROVINCIAS: 'mu/FETCH_PROVINCIAS',
    FETCH_PARTIDOS: 'mu/FETCH_PARTIDOS',
    FETCH_LOCALIDADES: 'mu/FETCH_LOCALIDADES',
    FETCH_CALLES: 'mu/FETCH_CALLES',
    FETCH_GEOGRAPHIC: 'mu/FETCH_GEOGRAPHIC',
    FETCH_TECHNICAL: 'mu/FETCH_TECHNICAL',
    FETCH_TECNICA: 'mu/FETCH_TECNICA',
    FETCH_COBRE: 'mu/FETCH_COBRE',
    FETCH_COMPETENCIA: 'mu/FETCH_COMPETENCIA',
    RESET_PARTIDOS: 'mu/RESET_PARTIDOS',
    RESET_LOCALIDADES: 'mu/RESET_LOCALIDADES',
    RESET_CALLES: 'mu/RESET_CALLES',
    SET_DOMICILIO: 'mu/SET_DOMICILIO',
    RESET_DOMICILIO: 'mu/RESET_DOMICILIO',
    RESET: 'mu/RESET'


  };



  const initialState = {
    loading: false,
    errorMessage: null,
    loadingGeograpchic:false,
    successGeographic:null,
    loadingTechnical:false,
    successTechnical:null,

    provincias: [] as any[],
    loadingProvincias: false,
    partidos: [] as any[],
    loadingPartidos: false,
    localidades: [] as any[],
    loadingLocalidades: false,
    calles: [] as any[],
    loadingCalles: false,
    geographic: [] as any[],
    technical: [] as any[],
    zonas: null,
    geoX: null,
    geoY: null,
    zonaCompetencia: null,
    region: null,
    subregion: null,
    competencia: null,
    hub: null,
    codigoPostal: null,
    barriosEspeciales: null,
    streetType:null,
    intersectionLeft:null,
    intersectionRight:null,
    country:null,
    stateOrProvince:null,
    city:null,
    locality:null,
    streetName:null,
    streetNr:null,


    
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
        return {
          ...state,
          errorMessage: null,
          loadingProvincias: true,
        };
      case REQUEST(ACTION_TYPES.FETCH_PARTIDOS):
        return {
          ...state,
          errorMessage: null,
          loadingPartidos: true,
        };
      case REQUEST(ACTION_TYPES.FETCH_LOCALIDADES):
        return {
          ...state,
          errorMessage: null,
          loadingLocalidades: true,
        };
      case REQUEST(ACTION_TYPES.FETCH_CALLES):
        return {
          ...state,
          errorMessage: null,
          loadingCalles: true,
        };
      case REQUEST(ACTION_TYPES.FETCH_GEOGRAPHIC):
        return {
          ...state,
          errorMessage: null,
          successGeographic:null,
          loadingGeograpchic: true,
        };
      case REQUEST(ACTION_TYPES.FETCH_COMPETENCIA):
        return {
          ...state,
          errorMessage: null,
          loading: true,
        };
      case REQUEST(ACTION_TYPES.FETCH_TECHNICAL):

        return {
          ...state,
          errorMessage: null,
          loadingTechnical: true,
        };

      case FAILURE(ACTION_TYPES.FETCH_PROVINCIAS):
        return {
          ...state,
          loadingProvincias: false,
          errorMessage: action.payload,
        };
      case FAILURE(ACTION_TYPES.FETCH_PARTIDOS):
        return {
          ...state,
          loadingPartidos: false,
          errorMessage: action.payload,
        };
      case FAILURE(ACTION_TYPES.FETCH_LOCALIDADES):
        return {
          ...state,
          loadingLocalidades: false,
          errorMessage: action.payload,
        };
      case FAILURE(ACTION_TYPES.FETCH_CALLES):
        return {
          ...state,
          loadingCalles: false,
          errorMessage: action.payload,
        };
      case FAILURE(ACTION_TYPES.FETCH_GEOGRAPHIC):
        return {
          ...state,
          loadingGeograpchic: false,
          successGeographic:false,
          errorMessage: action.payload,
        };
      case FAILURE(ACTION_TYPES.FETCH_COMPETENCIA):
        return {
          ...state,
          loading: false,
          errorMessage: action.payload,
        };
      case FAILURE(ACTION_TYPES.FETCH_TECHNICAL):

        return {
          ...state,
          loadingTechnical: false,
          successTechnical: false,
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
            loadingGeograpchic: false,
            geographic: action.payload.data,
            successGeographic:true,

            zonas: action.payload.data.zones,
            geoX: action.payload.data.geographicLocation.geometry[0].x,
            geoY: action.payload.data.geographicLocation.geometry[0].y,
            zonaCompetencia: filterOptions([...action.payload.data.zones],"Zonas Competencia"),
            region: filterOptions([...action.payload.data.zones],"Regiones"),
            subregion: filterOptions([...action.payload.data.zones],"Sub-Regiones"),
            hub: filterOptions([...action.payload.data.zones],"Hubs"),
            barriosEspeciales: filterOptions([...action.payload.data.zones],"Barrios Especiales"),
            codigoPostal: action.payload.data.postcode,
            streetType:action.payload.data.streetType,
            intersectionLeft:action.payload.data.beetweenStreet.intersectionLeft,
            intersectionRight:action.payload.data.beetweenStreet.intersectionRight,


          };
        case SUCCESS(ACTION_TYPES.FETCH_TECHNICAL):
          return {
            ...state,
            loadingTechnical: false,
            successTechnical: true,
            technical: action.payload.data,
          };
        case SUCCESS(ACTION_TYPES.FETCH_COMPETENCIA):
          return {
            ...state,
            loading: false,
            competencia: action.payload.data[0].subtype,
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
          case ACTION_TYPES.SET_DOMICILIO:
            return{
              ...state,
              country:action.pais,
              stateOrProvince:action.provincia,
              city:action.partido,
              locality:action.localidad,
              streetName:action.calle,
              streetNr:action.altura,

            } ;
          case ACTION_TYPES.RESET_DOMICILIO:
            return{
              ...state,
              country:null,
              stateOrProvince:null,
              city:null,
              locality:null,
              streetName:null,
              streetNr:null,
              competencia:null,
              successGeographic:null,

            }   
            case ACTION_TYPES.RESET:
              return {
                ...initialState,
              };

      default:
        return state;
    }
  };
  
  // Actions

  export const getProvincias = (pais='ARGENTINA') => {
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

  export const getCompetencia = (name) => {

    const requestUrl ='geographicAddressManagement/v1/areas?fullText=false&name='+name+'&offset=0&type=ZONAS%20COMPETENCIA';

    return {
      type: ACTION_TYPES.FETCH_COMPETENCIA,
      payload: axios.get(requestUrl),
    };
  };

  export const  getGeographic =  (pais, provincia, partido, localidad, calle, altura) => async dispatch => {

    const requestUrl ='geographicAddressManagement/v1/geographicAddress?city=' + partido + '&country=' + pais + '&locality=' + localidad + '&stateOrProvince=' + provincia + '&streetName=' + calle + '&streetNr=' + altura;

    const result = await dispatch({
      type: ACTION_TYPES.FETCH_GEOGRAPHIC,
      payload: axios.get(requestUrl),
    })
    console.error("dispathc geographic " + filterOptions([...result.value.data.zones],"Zonas Competencia")  );

    // filterOptions([...result.value.data],"Zonas Competencia")

   
    dispatch(getCompetencia(filterOptions([...result.value.data.zones],"Zonas Competencia")));
    console.error("dispathc competencia");

    return result;

  };

  export const getTechnical = (pais, provincia, partido, localidad, calle, altura) => {

    const requestUrl ='resourceIventoryManagment/v1/technicalFeasibility?city=' + partido + '&country=' + pais + '&locality=' + localidad + '&stateOrProvince=' + provincia + '&streetName=' + calle + '&streetNr=' + altura;

    return {
      type: ACTION_TYPES.FETCH_TECHNICAL,
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

  export const setDomicilio = (pais, provincia, partido, localidad, calle, altura) => {
    return {
      type: ACTION_TYPES.SET_DOMICILIO,
      pais, provincia, partido, localidad, calle, altura
    };
  }

    export const resetDomicilio = () => {
      return {
        type: ACTION_TYPES.RESET_DOMICILIO,
      };
      
  }

  export const reset = () => ({
    type: ACTION_TYPES.RESET,
  });
