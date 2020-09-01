import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import {  Row, Col, Label } from 'reactstrap';

import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { getEntity, updateEntity, createEntity, reset } from './tipo-emp.reducer';
import { ITipoEmp } from 'app/shared/model/tipo-emp.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { Form, Input, Button, Checkbox } from 'antd';
export interface ITipoEmpUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export const TipoEmpUpdate = (props) => {
  const [isNew, setIsNew] = useState(!props.match.params || !props.match.params.id);

  const { tipoEmpEntity, loading, updating } = props;



  
  const handleClose = () => {
    props.history.push('/tipo-emp');
  };

  useEffect(() => {
    if (isNew) {
      props.reset();
    } else {
      props.getEntity(props.match.params.id);
    }
  }, []);

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const saveEntity = (values) => {
      const entity = {
        ...tipoEmpEntity,
        ...values,
      };

      if (isNew) {
        props.createEntity(entity);
      } else {
        props.updateEntity(entity);
      }
  };


  
 
  const onFinish = values => {
    saveEntity(values);
  };

  const onFinishFailed = errorInfo => {
    console.error('Failed:', errorInfo);
  }

  return (
    <div>

      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="gempApp.tipoEmp.home.createOrEditLabel">Create or edit a TipoEmp</h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <Form
            {...layout}
            name="basic"
            initialValues={isNew ? {} : tipoEmpEntity}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="descripcion"
              name="descripcion"
              rules={[{ required: true, message: 'Please input your descripcion!' }]}
            >
              <Input />
            </Form.Item>
      
            <Form.Item
              label="valor"
              name="valor"
              rules={[{ required: true, message: 'Please input your valor!' }]}
            >
              <Input />
            </Form.Item>
      
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
          )}
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (storeState: IRootState) => ({
  tipoEmpEntity: storeState.tipoEmp.entity,
  loading: storeState.tipoEmp.loading,
  updating: storeState.tipoEmp.updating,
  updateSuccess: storeState.tipoEmp.updateSuccess,
});

const mapDispatchToProps = {
  getEntity,
  updateEntity,
  createEntity,
  reset,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(TipoEmpUpdate);
