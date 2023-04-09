import React from 'react'
import PageTitle from '../../../components/PageTitle'
import { Button, Col, Form, Row, Select } from 'antd'

export default function AddEditExam() {

    const onFinish = (values) =>{
        // get exam details values
        console.log("Received values of forms:", values)
    }

  return (
    <div>
        <PageTitle title='Add exam'/>

        <Form layout='vertical' onFinish={onFinish}>
        {/* add gap */}
            <Row gutter={[10,10]}> 
                <Col span={8}>
                    <Form.Item label="Exam Name" name = "name">
                        <input className='einput' type='text'/>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label="Exam Duration" name = "duration">
                        <input className='einput' type='number'/>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label="Subject" name = "category">
                        <Select  placeholder="Choose subject" >
                            <Select.Option value="sinhala">sinhala</Select.Option>
                            <Select.Option value="history">history</Select.Option>
                            <Select.Option value="mathematics">mathematics</Select.Option>
                            <Select.Option value="science">science</Select.Option>
                            <Select.Option value="english">english</Select.Option>
                            <Select.Option value="information-technology">information-technology</Select.Option>
                            <Select.Option value="music">music</Select.Option>
                            <Select.Option value="art">art</Select.Option>
                            <Select.Option value="commerce">commerce</Select.Option>
               

                        </Select>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label="Total Marks" name = "totalMarks">
                        <input className='einput' type='number'/>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label="Passing Marks" name = "passingMarks">
                        <input className='einput' type='number'/>
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item label="Grade" name = "grade">
                        <input className='einput' type='number'/>
                    </Form.Item>
                </Col>
            </Row>
            <div className="flex justify-end">
            <Button  className="primary-contained-btn flex items-center mt-2 mr-9" htmlType="submit">Save</Button>
            </div>
        </Form>


    </div>
  )
}
