import React, { useState, useEffect } from 'react';

import { Table, Input,Select, Button, Popconfirm, Form, InputNumber, Space, Row,Checkbox, Switch, DatePicker  } from 'antd';

import moment from 'moment';

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'select' | 'text' | 'date' | 'boolean';
    list: any[],
    loadingList: boolean
    idList: any;
    record: any;
    index: number;
    children: React.ReactNode;
    form: any;
  }
 export  const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    list,
    loadingList,
    idList,
    record,
    index,
    children,
    form,
    ...restProps
  }) => {


    const opcionesSelectName = (optSelect) => (
      optSelect ? optSelect.map(otherEntity => (
        <Select.Option value={otherEntity.id}
                        key={otherEntity.id}>
          {otherEntity.descripcion}
        </Select.Option>
      )
      ) : null
    );


    const  disabledDate = (current) => {
      // Can not select days before today and today
      return current && current < moment().endOf('day');
    }

    const inputNode = () => {

      switch(inputType) { 
        case 'select': { 
          return(
            <Select allowClear placeholder={title} loading={loadingList}
            // defaultValue={idList}
              showSearch>
             {opcionesSelectName(list)}
           </Select>
        ) 
        } 
        case 'boolean': { 
          return( <Switch checkedChildren="SI" unCheckedChildren="NO" />)
        } 
        case 'date': { 
          return( <DatePicker  disabledDate={disabledDate}  />)
       } 

        default: { 
          return(<Input />) 
        } 
     } 
      
      // if (inputType === 'select'){
      //   return(
      //       <Select allowClear placeholder={title} loading={loadingList}
      //         showSearch>
      //        {opcionesSelectName(list)}
      //      </Select>
      //   )
      //  }
      //  if  (inputType === 'boolean') {
      //       return( <Switch checkedChildren="SI" unCheckedChildren="NO" />)
      //   }
      //   if  (inputType === 'date') {
      //     return( <DatePicker disabledDate={disabledDate}  />)
      // }
      //  if (inputType === 'text') {
      //     return(<Input />)
      //  }
  }
 

    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode()}
          </Form.Item>
        ) : (
            children
          )}
      </td>
    );
  };