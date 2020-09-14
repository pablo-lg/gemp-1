import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table, Input, Button, Popconfirm, Form, InputNumber, Space, Row } from 'antd';
import { IRootState } from 'app/shared/reducers';
import { getEntities, updateEntity, deleteEntity, createEntity } from './segmento.reducer';
import { ISegmento } from 'app/shared/model/segmento.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { PlusOutlined , PlusSquareTwoTone , PlusCircleFilled } from '@ant-design/icons';

import {EditableCell} from '../../componentes/table/editableCell'

export interface ISegmentoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> { }


export const Segmento = (props: ISegmentoProps) => {
  const [actualizar, setActualizar] = useState(false);
  const [data, setData] = useState([]);
  useEffect(() => {
    props.getEntities();
  }, [actualizar,props.updateSuccess]);

  const { Search } = Input;

  const [filter, setFilter] = useState('');

  const filterFn = l => (l.descripcion.toUpperCase().includes(filter.toUpperCase()) || l.valor.toUpperCase().includes(filter.toUpperCase()));
  // const changeFilter = val => setFilter(val);

  const changeFilter = evt => setFilter(evt.target.value);


  useEffect(() => {
    setData(props.segmentoList.filter(filterFn).map(s => s))
  }, [props.segmentoList, filter]);

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

  const [form] = Form.useForm();


  const isEditing = (record: ISegmento) => record.id === editingId;

  const handleDelete = id => {
    props.deleteEntity(id);
    setActualizar(!actualizar);
  };

  const edit = (record: ISegmento) => {
    form.setFieldsValue({ ...record });
    setEditingId(record.id);
  };

  const save = async (id: React.Key) => {
    try {
      const row = (await form.validateFields()) as ISegmento;

      if (id == null) {
        props.createEntity(row);
        setEditingId(null);
        setActualizar(!actualizar);
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
          //setEditingId(null);
          setActualizar(!actualizar);
        }
       else {
        newData.push(row);
        props.updateEntity(newData[index]);
        //setEditingId(null);
        setActualizar(!actualizar);
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
      valor:''

    };
    edit(nuevoData);


    setData([nuevoData, ...data])


  };





  const columns = [

    {
      title: 'descripcion',
      dataIndex: 'descripcion',
      width: '40%',
      editable: true,
  


    },
    {
      title: 'valor',
      dataIndex: 'valor',
      width: '40%',
      editable: true,
  
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render(_: any, record: ISegmento) {
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
      onCell: (record: ISegmento) => ({
        record,
        inputType: col.dataIndex === 'id' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  const { segmentoList, match, loading } = props;
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
        
        dataSource={data}
        columns={mergedColumns}
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
  );
};

const mapStateToProps = ({ segmento }: IRootState) => ({
  segmentoList: segmento.entities,
  loading: segmento.loading,
  updating: segmento.updating,
  updateSuccess: segmento.updateSuccess,
});

const mapDispatchToProps = {
  updateEntity,
  getEntities,
  deleteEntity,
  createEntity,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Segmento);
