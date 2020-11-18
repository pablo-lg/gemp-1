import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
<<<<<<< HEAD
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table, Input, Button, Popconfirm, Form, InputNumber, Space, Row } from 'antd';
import { IRootState } from 'app/shared/reducers';
import { getEntities, updateEntity, deleteEntity, createEntity } from './tecnologia.reducer';
import { ITecnologia } from 'app/shared/model/tecnologia.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { PlusOutlined , PlusSquareTwoTone , PlusCircleFilled } from '@ant-design/icons';

import {EditableCell} from '../../componentes/table/editableCell'
import { Typography } from 'antd';

const { Title } = Typography;
=======
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './tecnologia.reducer';
import { ITecnologia } from 'app/shared/model/tecnologia.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
>>>>>>> c3b58557939589934f3a33dc62831ec582cc85e0

export interface ITecnologiaProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Tecnologia = (props: ITecnologiaProps) => {
<<<<<<< HEAD
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
    setData(props.entityList.filter(filterFn).map(s => s))
  }, [props.entityList, filter]);

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


  const isEditing = (record: ITecnologia) => record.id === editingId;

  const handleDelete = id => {
    props.deleteEntity(id);
    setActualizar(!actualizar);
  };

  const edit = (record: ITecnologia) => {
    form.setFieldsValue({ ...record });
    setEditingId(record.id);
  };

  const save = async (id: React.Key) => {
    try {
      const row = (await form.validateFields()) as ITecnologia;

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
          // setEditingId(null);
          setActualizar(!actualizar);
        }
       else {
        newData.push(row);
        props.updateEntity(newData[index]);
        // setEditingId(null);
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
      width: '80%',
      editable: true,
  


    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render(_: any, record: ITecnologia) {
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
      onCell: (record: ITecnologia) => ({
        record,
        inputType: col.dataIndex === 'id' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  const { entityList, match, loading } = props;
  return (
    <Form form={form} component={false}>
      <div>
      <Title level={4}>Tecnologias</Title>

      </div>
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
=======
  useEffect(() => {
    props.getEntities();
  }, []);

  const { tecnologiaList, match, loading } = props;
  return (
    <div>
      <h2 id="tecnologia-heading">
        Tecnologias
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Tecnologia
        </Link>
      </h2>
      <div className="table-responsive">
        {tecnologiaList && tecnologiaList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Descripcion</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {tecnologiaList.map((tecnologia, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${tecnologia.id}`} color="link" size="sm">
                      {tecnologia.id}
                    </Button>
                  </td>
                  <td>{tecnologia.descripcion}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${tecnologia.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${tecnologia.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${tecnologia.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Tecnologias found</div>
        )}
      </div>
    </div>
>>>>>>> c3b58557939589934f3a33dc62831ec582cc85e0
  );
};

const mapStateToProps = ({ tecnologia }: IRootState) => ({
<<<<<<< HEAD
  entityList: tecnologia.entities,
  loading: tecnologia.loading,
  updating: tecnologia.updating,
  updateSuccess: tecnologia.updateSuccess,
});

const mapDispatchToProps = {
  updateEntity,
  getEntities,
  deleteEntity,
  createEntity,
=======
  tecnologiaList: tecnologia.entities,
  loading: tecnologia.loading,
});

const mapDispatchToProps = {
  getEntities,
>>>>>>> c3b58557939589934f3a33dc62831ec582cc85e0
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Tecnologia);
