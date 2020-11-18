import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
<<<<<<< HEAD
import { Table, Input, Button, Popconfirm, Form, InputNumber, Space, Row, Tag, Switch  } from 'antd';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities, updateEntity, deleteEntity, createEntity } from './obra.reducer';
import { ITipoObra } from 'app/shared/model/tipo-obra.model';
import { IObra } from 'app/shared/model/obra.model';
import {getEntities as getEntitiesTipoObra} from '../../entities/tipo-obra/tipo-obra.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import {EditableCell} from '../../componentes/table/editableCell'
import { PlusOutlined , PlusSquareTwoTone , PlusCircleFilled } from '@ant-design/icons';

export interface IObraProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}
import moment from 'moment';

export const Obra = (props: IObraProps) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    props.getEntities();
    props.getEntitiesTipoObra();
  }, [props.updateSuccess]);

// Busqueda global
const { Search } = Input;
const [filter, setFilter] = useState('');

const filterFn = l => (l.descripcion.toUpperCase().includes(filter.toUpperCase()));
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


const isEditing = (record: IObra) => record.id === editingId;
const handleDelete = id => {
  props.deleteEntity(id);
};

const [form] = Form.useForm();

const edit = (record) => {
  let registro = null;
  registro = {...record};
  registro.fechaFinObra = record.fechaFinObra;
  registro.tipoObra = registro.tipoObra.id;
  registro.fechaFinObra = moment(record.fechaFinObra)
  //record.tipoObra = record.tipoObra.id;
  form.setFieldsValue({ ...registro });
  setEditingId(registro.id);
};

const save = async (id: React.Key) => {
  try {
    const row = (await form.validateFields()) as IObra;
    const tObra = {id: Number(row.tipoObra)}
    row.tipoObra=tObra
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
    id:null,
    descripcion:'',
    habilitada: false,
    fechaFinObra:moment(),
    tipoObra: {id:null},
  };
  edit(nuevoData);
  setData([nuevoData, ...data])
};

// Datos de la tabla

const columns = [

  {
    title: 'descripcion',
    dataIndex: 'descripcion',
    width: '30%',
    editable: true,

  },
  {
    title: 'habilitada',
    dataIndex: 'habilitada',
    // render:(text, record) => (record.habilitada ? 
    //   <Tag color='green' >
    //     SI
    //   </Tag> 
    // : 
    //   <Tag color='volcano'>
    //     NO
    //   </Tag>
    render:(text, record) => (
      <Switch checkedChildren="SI" unCheckedChildren="NO" disabled defaultChecked={record.habilitada}/>
      ),
    width: '15%',
    editable: true,

  },
  {
    title: 'fechaFinObra',
    dataIndex: 'fechaFinObra',
    width: '25%',
    editable: true,

  },
  {
    title: 'tipoObra',
    dataIndex: 'tipoObra',
    render:(text, record) => (record.tipoObra ? 
      <div>{record.tipoObra.descripcion}</div> :
      null
  ),
    width: '25%',
    editable: true,

  },
  {
    title: 'operation',
    dataIndex: 'operation',
    render(_: any, record: IObra) {
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
    onCell: (record: IObra) => ({
      record,
      inputType: col.title === 'tipoObra' ? 'select' : col.title === 'habilitada' ? 'boolean' : col.title === 'fechaFinObra' ? 'date': 'text',
      list: props.tipoObraList,
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

const mapStateToProps = ({ tipoObra, obra }: IRootState) => ({
  entityList: obra.entities,
  loading: obra.loading,
  updating: obra.updating,
  updateSuccess: obra.updateSuccess,
  entity: obra.entity,
  
  tipoObraList: tipoObra.entities,
  loadingSeg: tipoObra.loading,


});

const mapDispatchToProps = {
  updateEntity,
  getEntities,
  deleteEntity,
  createEntity,
  getEntitiesTipoObra
=======
import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './obra.reducer';
import { IObra } from 'app/shared/model/obra.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IObraProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const Obra = (props: IObraProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { obraList, match, loading } = props;
  return (
    <div>
      <h2 id="obra-heading">
        Obras
        <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
          <FontAwesomeIcon icon="plus" />
          &nbsp; Create new Obra
        </Link>
      </h2>
      <div className="table-responsive">
        {obraList && obraList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Descripcion</th>
                <th>Habilitada</th>
                <th>Fecha Fin Obra</th>
                <th>Tipo Obra</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {obraList.map((obra, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${obra.id}`} color="link" size="sm">
                      {obra.id}
                    </Button>
                  </td>
                  <td>{obra.descripcion}</td>
                  <td>{obra.habilitada ? 'true' : 'false'}</td>
                  <td>{obra.fechaFinObra ? <TextFormat type="date" value={obra.fechaFinObra} format={APP_LOCAL_DATE_FORMAT} /> : null}</td>
                  <td>{obra.tipoObra ? <Link to={`tipo-obra/${obra.tipoObra.id}`}>{obra.tipoObra.descripcion}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${obra.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${obra.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${obra.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && <div className="alert alert-warning">No Obras found</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ obra }: IRootState) => ({
  obraList: obra.entities,
  loading: obra.loading,
});

const mapDispatchToProps = {
  getEntities,
>>>>>>> c3b58557939589934f3a33dc62831ec582cc85e0
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

<<<<<<< HEAD

=======
>>>>>>> c3b58557939589934f3a33dc62831ec582cc85e0
export default connect(mapStateToProps, mapDispatchToProps)(Obra);
