import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Table, Input, Button, Popconfirm, Form, InputNumber, Space, Row } from 'antd';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities, updateEntity, deleteEntity, createEntity } from './tipo-obra.reducer';
import { ITipoObra } from 'app/shared/model/tipo-obra.model';
import {getEntities as getEntitiesSeg} from '../../entities/segmento/segmento.reducer';
import { ISegmento } from 'app/shared/model/segmento.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import {EditableCell} from '../../componentes/table/editableCell'
import { PlusOutlined , PlusSquareTwoTone , PlusCircleFilled } from '@ant-design/icons';


export interface ITipoObraProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const TipoObra = (props: ITipoObraProps) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    props.getEntities();
    props.getEntitiesSeg();
  }, [props.updateSuccess]);

// Busqueda global
const { Search } = Input;
const [filter, setFilter] = useState('');

const filterFn = l => (l.descripcion.toUpperCase().includes(filter.toUpperCase()));
const changeFilter = evt => setFilter(evt.target.value);

useEffect(() => {
  setData(props.tipoObraList.filter(filterFn).map(s => s))
}, [props.tipoObraList, filter]);

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


const isEditing = (record: ITipoObra) => record.id === editingId;
const handleDelete = id => {
  props.deleteEntity(id);
};

const [form] = Form.useForm();
const edit = (record: ITipoObra) => {
  form.setFieldsValue({ ...record });
  setEditingId(record.id);
};

const save = async (id: React.Key) => {
  try {
    const row = (await form.validateFields()) as ITipoObra;
    const seg = {id: Number(row.segmento)}
    row.segmento=seg
        const entity = {
          ...props.tipoObraEntity,
          ...row,
        };
    // row.segmento = JSON.parse(String(row.segmento))
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
    id:null,
    descripcion:'',
    segmento: null,
  };
  edit(nuevoData);
  setData([nuevoData, ...data])
};

// Datos de la tabla

const columns = [

  {
    title: 'descripcion',
    dataIndex: 'descripcion',
    width: '40%',
    editable: true,

  },
  {
    title: 'segmento',
    dataIndex: 'segmento',
    render:(text, record) => (record.segmento ? 
      <div>{record.segmento.descripcion}</div> :
      null
  ),
    width: '40%',
    editable: true,

  },
  {
    title: 'operation',
    dataIndex: 'operation',
    render(_: any, record: ITipoObra) {
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
    onCell: (record: ITipoObra) => ({
      record,
      inputType: col.title === 'segmento' ? 'select' : 'text',
      list: props.segmentoList,
      loadingList: props.loadingSeg,
      dataIndex: col.dataIndex,
      title: col.title,
      editing: isEditing(record),
      form,
    }),
  };
});

  const { tipoObraList, match, loading } = props;
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

const mapStateToProps = ({ tipoObra, segmento }: IRootState) => ({
  tipoObraList: tipoObra.entities,
  loading: tipoObra.loading,
  updating: tipoObra.updating,
  updateSuccess: tipoObra.updateSuccess,
  tipoObraEntity: tipoObra.entity,
  
  segmentoList: segmento.entities,
  loadingSeg: segmento.loading,


});

const mapDispatchToProps = {
  updateEntity,
  getEntities,
  deleteEntity,
  createEntity,
  getEntitiesSeg
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TipoObra);
