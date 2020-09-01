import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities, updateEntity, deleteEntity, createEntity } from './tipo-desp.reducer';
import { ITipoDesp } from 'app/shared/model/tipo-desp.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { Table, Input, Button, Popconfirm, Form, InputNumber, Space, Modal } from 'antd';
import { PlusOutlined , PlusSquareTwoTone , PlusCircleFilled } from '@ant-design/icons';



export interface ITipoDespProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const TipoDesp = (props: ITipoDespProps) => {
  useEffect(() => {
    props.getEntities();
  }, [props.updateSuccess]);

  const { tipoDespList, match, loading } = props;

  // Global Search
  const { Search } = Input;
  const [filter, setFilter] = useState('');
  const filterFn = l => (l.descripcion.toUpperCase().includes(filter.toUpperCase()) || l.valor.toUpperCase().includes(filter.toUpperCase()));

  const changeFilter = evt => setFilter(evt.target.value);
  const [isNew, setIsNew] = useState(false);

  const [data, setData] = useState([]);
  const [showUpdate, setShowUpdate] = useState(false);

  const [item, setItem] = useState(null);

  const [form] = Form.useForm();


  useEffect(() => {
    setData(props.tipoDespList.filter(filterFn).map(s => s))
  }, [props.tipoDespList, filter]);

const edit = (record) =>{
  if (!record) {
    setIsNew(true);
    setItem(null);

  }else{
    setIsNew(false);
    setItem(record);
  }
  setShowUpdate(true);
}

const handleDelete = id => {
  props.deleteEntity(id);
};

const onCancel=() => { setShowUpdate(false)}
const save =  (value) => {

    if (item == null) {
       props.createEntity(value);
    } else {
       value.id = item.id ;
       props.updateEntity(value);
    }
    onCancel;

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
      title: 'accion',
      dataIndex: 'accion',
      width: '20%',
      render: (text, record) =>(
            <Space size="middle">
              <a onClick={() => edit(record)}>
                Edit
              </a>
              <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
                <a>Delete</a>
              </Popconfirm>
            </Space>
          
      ),

    },
  ];


  return (
    <div>
      <div>
      

      <Button  icon={<PlusOutlined />} onClick={() => edit(false)}  style={{ marginBottom: 16, marginRight: 8 }}/>
      
    
    <Search 
      placeholder="input search text"
      onChange={changeFilter}
      style={{ width: 200,  marginBottom: 16}}
    />
    </div>
      <div >
      <Table 
          dataSource={data}
          columns={columns}
          size='small'
          />
      </div>
      <Modal
      visible={showUpdate}
      title="Tipo de Despliegue"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            save(values);
          })
          .catch(info => {
            console.error('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={item}
      >
        <Form.Item
          name="descripcion"
          label="Descripcion"
          rules={[{ required: true, message: 'Por favor ingrese la descripcion' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="valor"
          label="Valor"
          rules={[{ required: true, message: 'Por favor ingrese el valor' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
    </div>
  );
};

const mapStateToProps = ({ tipoDesp }: IRootState) => ({
  tipoDespList: tipoDesp.entities,
  loading: tipoDesp.loading,
  updating: tipoDesp.updating,
  updateSuccess: tipoDesp.updateSuccess,
});

const mapDispatchToProps = {
  updateEntity,
  getEntities,
  deleteEntity,
  createEntity,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TipoDesp);
