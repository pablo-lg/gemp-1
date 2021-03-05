import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities, } from './emprendimiento.reducer';
import { IEmprendimiento } from 'app/shared/model/emprendimiento.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

import { Table, Input, Button, Popconfirm, Form, InputNumber, Space, Row, Tag, Switch  } from 'antd';


import {EditableCell} from '../../componentes/table/editableCell'
import { PlusOutlined  } from '@ant-design/icons';


export interface IEmprendimientoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Emprendimiento = (props: IEmprendimientoProps) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    props.getEntities();
  }, []);

// Busqueda global
const { Search } = Input;
const [filter, setFilter] = useState('');

 const filterFn = l => (l.nombre ? l.nombre.toUpperCase().includes(filter.toUpperCase()) : l);
const changeFilter = evt => setFilter(evt.target.value);

useEffect(() => {
   setData(props.entityList.filter(filterFn).map(s => s))
}, [props.entityList, filter]);



// const handleDelete = id => {
//   props.deleteEntity(id);
// };

const ver = record => {
  props.history.push('/emprendimiento/'+record.id);

}


const columns = [

  {
    title: 'id',
    dataIndex: 'id',
    width: '10%',
    editable: true,

  },
  {
    title: 'Nombre',
    dataIndex: 'nombre',
    width: '40%',
    editable: true,
    
    //  sorter: (a, b) => a.nombre.localeCompare(b.nombre),

  },
  {
    title: 'Segmento',
    dataIndex: ['segmento', 'descripcion'],
    width: '40%',
    editable: true,

  },

  {
    title: 'Acciones',
    dataIndex: 'operation',
    render(_: any, record: IEmprendimiento) {
      return (
          <Space size="middle">
            <a onClick={() => ver(record)}> 
              ver
            </a>
    
          </Space>
      )
        
    },

  },
];



  const { entityList, match, loading } = props;
  return (

    <><div>

      <Search
        placeholder="input search text"
        onChange={changeFilter}
        style={{ width: 200, marginBottom: 16 }} />
    </div>
      <Table

        bordered
        loading={props.loading}
        dataSource={data}
        columns={columns}
 /></>
  );
};

const mapStateToProps = ({ emprendimiento }: IRootState) => ({
  entityList: emprendimiento.entities,
  loading: emprendimiento.loading,
  updating: emprendimiento.updating,
  updateSuccess: emprendimiento.updateSuccess,
  entity: emprendimiento.entity,
  


});

const mapDispatchToProps = {
  getEntities,

};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;


export default connect(mapStateToProps, mapDispatchToProps)(Emprendimiento);
