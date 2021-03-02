

import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Table, Input, Button, Popconfirm, Form, InputNumber, Space, Row, Tag, Switch  } from 'antd';

import { IRootState } from 'app/shared/reducers';
import {  getEntities, updateEntity, deleteEntity, createEntity } from './ejec-cuentas.reducer';
import { IEjecCuentas } from 'app/shared/model/ejec-cuentas.model';
import {getEntities as getEntitiesSegmento} from '../../entities/segmento/segmento.reducer';
import {EditableCell} from '../../componentes/table/editableCell'
import { PlusOutlined  } from '@ant-design/icons';

export interface IEjecCuentasProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const EjecCuentas = (props: IEjecCuentasProps) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    props.getEntities();
    props.getEntitiesSegmento();
  }, [props.updateSuccess]);

// Busqueda global
const { Search } = Input;
const [filter, setFilter] = useState('');

const filterFn = l => (l.nombre.toUpperCase().includes(filter.toUpperCase())|| l.apellido.toUpperCase().includes(filter.toUpperCase()));
const changeFilter = evt => setFilter(evt.target.value);

useEffect(() => {
  setData(props.entityList.filter(filterFn).map(s => s))
}, [props.entityList, filter]);

// Editar
const [editingId, setEditingId] = useState(null);
const cancel = () => {
  setData(data.filter(item => item.id !== null))
  setEditingId(null);
};
useEffect(() => {
  if (props.updateSuccess) {
    cancel();
  }
}, [props.updateSuccess]);


const isEditing = (record: IEjecCuentas) => record.id === editingId;
const handleDelete = id => {
  props.deleteEntity(id);
};

const [form] = Form.useForm();

const edit = (record) => {
  let registro = null;
  registro = {...record};
  registro.telefono = record.telefono;
  registro.apellido = record.apellido;
  registro.celular = record.celular;
  registro.mail = record.mail;
  registro.nombre = record.nombre;
  registro.repcom1 = record.repcom1;
  registro.repcom2 = record.repcom2;
  registro.segmento = registro.segmento.id;
 
  form.setFieldsValue({ ...registro });
  setEditingId(registro.id);
};

const save = async (id: React.Key) => {
  try {
    const row = (await form.validateFields()) as IEjecCuentas;
    const segmento = {id: Number(row.segmento)}
    row.segmento=segmento
        const entity = {
          ...props.entity,
          ...row,
        };
    if (id == null) {
      props.createEntity(row);
      // setEditingId(null);
    } else {
      const newData = [...data];
      const index = newData.findIndex(item => id === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        props.updateEntity(newData[index]);
      }
     else {
      newData.push(row);
      props.updateEntity(newData[index]);
    }
  }


  } catch (errInfo) {
    console.error('Validate Failed:', errInfo);
  }
};

const handleAdd = () => {
  const nuevoData = {

    id: null,
    telefono: '',
    apellido: '',
    celular: '',
    mail: '',
    nombre: '',
    repcom1: '',
    repcom2: '',
    segmento: {id:null},
  };
  edit(nuevoData);
  setData([nuevoData, ...data])
};

// Datos de la tabla

const columns = [

  {
    title: 'nombre',
    dataIndex: 'nombre',
    width: '20%',
    editable: true,

  },
  {
    title: 'apellido',
    dataIndex: 'apellido',
    width: '20%',
    editable: true,
    
  },
  {
    title: 'mail',
    dataIndex: 'mail',
    width: '20%',
    editable: true,

  },
  {
    title: 'telefono',
    dataIndex: 'telefono',
    width: '10%',
    editable: true,

  },
  {
    title: 'celular',
    dataIndex: 'celular',
    width: '10%',
    editable: true,

  },
  {
    title: 'repcom1',
    dataIndex: 'repcom1',
    width: '5%',
    editable: true,

  },
  {
    title: 'repcom2',
    dataIndex: 'repcom2',
    width: '5%',
    editable: true,

  },


  {
    title: 'segmento',
    dataIndex: 'segmento',
    render:(text, record) => (record.segmento ? 
      <div>{record.segmento.descripcion}</div> :
      null
  ),
    width: '10%',
    editable: true,

  },
  {
    title: 'operation',
    dataIndex: 'operation',
    render(_: any, record: IEjecCuentas) {
      const editable = isEditing(record);
      return editable ? (
        <span>
          <Popconfirm title="Guardar?" onConfirm={() => save(record.id)}>
          <a style={{ marginRight: 8 }}>
            Guardar
        </a>
          </Popconfirm>
          <a href="javascript:;" onClick={cancel} style={{ marginRight: 8 }}>
              Cancelar</a>
        </span>
      ) : (
          <Space size="middle">
            <a onClick={() => edit(record)}>
              Editar
            </a>
            <Popconfirm title="Eliminar registro?" onConfirm={() => handleDelete(record.id)}>
              <a>Eliminar</a>
            </Popconfirm>
          </Space>
        );
    },

  },
];

const mergedColumns = columns.map(col => {
  if (!col.editable) {
    return col;
  }
  return {
    ...col,
    onCell: (record: IEjecCuentas) => ({
      record,
      inputType: col.title === 'segmento' ? 'select' : col.title === 'mail' ? 'mail' : 'text',
      list: props.segmentoList,
      loadingList: props.loadingSeg,
      dataIndex: col.dataIndex,
      title: col.title,
      editing: isEditing(record),
      form,
    }),
  };
});

  const { entityList, match, loading } = props;
  return (
    <Form form={form} component={false}>
    <div>

    <Button  icon={<PlusOutlined />} onClick={handleAdd}  style={{ marginBottom: 16, marginRight: 8 }}/>
    
  
  <Search 
    placeholder="input search text"
    onChange={changeFilter}
    style={{ width: 200,  marginBottom: 16}}
  />
  </div>
    <Table
      components={{
        body: {
          cell: EditableCell,
        },
      }}
      rowClassName={() => 'editable-row'}
      bordered
      loading={props.loading}
      dataSource={data}
      columns={mergedColumns}
      pagination={{
        onChange: cancel,
      }}
    />
  </Form>
  );
};

const mapStateToProps = ({ ejecCuentas, segmento }: IRootState) => ({
  

  entityList: ejecCuentas.entities,
  loading: ejecCuentas.loading,
  updating: ejecCuentas.updating,
  updateSuccess: ejecCuentas.updateSuccess,
  entity: ejecCuentas.entity,

  segmentoList: segmento.entities,
  loadingSeg: segmento.loading,
});

const mapDispatchToProps = {
  updateEntity,
  getEntities,
  deleteEntity,
  createEntity,
  getEntitiesSegmento
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(EjecCuentas);
