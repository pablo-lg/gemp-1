import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
// import { Button, Col, Row, Table } from 'reactstrap';
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table, Input, Button, Popconfirm, Form, InputNumber, Space, Modal } from 'antd';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './tipo-emp.reducer';
import { ITipoEmp } from 'app/shared/model/tipo-emp.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import TipoEmpUpdate from './tipo-emp-update';

export interface ITipoEmpProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export const TipoEmp = (props: ITipoEmpProps) => {
  useEffect(() => {
    props.getEntities();
  }, []);

  const { tipoEmpList, match, loading } = props;
  const [data, setData] = useState([]);
  const [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    setData(props.tipoEmpList.map(s => s))
  }, [props.tipoEmpList]);

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
      render: (text, record) => (
        <Space size="middle">
          <a><Link to={`${match.url}/${record.id}/edit`}>edit</Link></a>
          <a><Link to={`${match.url}/${record.id}/delete`}>delete</Link></a>
        </Space>
      ),

    },
  ];
  const onCancelModal = () => {
    setShowUpdate(false)
  }
  const handleAdd= () =>{
    props.history.push(`${match.url}/new`)
  }
  const tableHeader = () => {
    <h2 id="tipo-emp-heading">
    Tipo Emps
    <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
      <FontAwesomeIcon icon="plus" />
      &nbsp; Create new Tipo Emp
    </Link>
  </h2>
  }
  return (
    <div>
      <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
        Add
    </Button>
      <div >
      <Table 
          dataSource={data}
          columns={columns}
          size='small'
          title={() => tableHeader}
          />
      </div>
      <Modal
          title="Basic Modal"
          visible={showUpdate}
          onCancel={onCancelModal}
        >
       <TipoEmpUpdate/>
        </Modal>
    </div>
  );
};

const mapStateToProps = ({ tipoEmp }: IRootState) => ({
  tipoEmpList: tipoEmp.entities,
  loading: tipoEmp.loading,
});

const mapDispatchToProps = {
  getEntities,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TipoEmp);
