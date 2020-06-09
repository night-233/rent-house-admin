
import React from 'react'
import { withRouter, useParams } from 'react-router-dom';
import { Form, Select, Input, Row, Col, InputNumber, Tag, Upload, Button } from 'antd';
import { UploadOutlined, InboxOutlined } from '@ant-design/icons';

const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 12 },
};

const rowLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}

const colSpan = 8;

const { TextArea } = Input;
const { Option } = Select;
const { CheckableTag } = Tag;
const AddHouse = () => {
  

  return <Form {...layout}>
      <Row>
        <Col span={colSpan}>
          <Form.Item
            {...rowLayout}
            label="市"
            name="city"
            rules={[{required: true, message: '请选择城市'}]}
          >
            <Select style={{textAlign: "left"}} placeholder="请选择城市" allowClear={true}>
                <Option value="hz">杭州</Option>
                <Option value="bj">北京</Option>
              </Select>
          </Form.Item>
        </Col>
        <Col span={colSpan}>
          <Form.Item
            {...rowLayout}
            label="区/县"
            name="region"
            rules={[{required: true, message: '请选择区县'}]}
          >
            <Select style={{textAlign: "left"}} placeholder="请先选择所在城市" allowClear={true}>
                <Option value="hz">东城区</Option>
                <Option value="bj">西城区</Option>
              </Select>
          </Form.Item>
        </Col>
        <Col span={colSpan}>
          <Form.Item
            {...rowLayout}
            label="所在街道"
            name="street"
            rules={[{required: true, message: '请输入所在街道'}]}
          >
              <Input placeholder="所在街道"/>
          </Form.Item>
        </Col>
        <Col span={colSpan}>
          <Form.Item
            {...rowLayout}
            label="所在小区"
            name="district"
            rules={[{required: true, message: '请输入所在小区'}]}
          >
              <Input placeholder="所在小区"/>
          </Form.Item>
        </Col>
        <Col span={colSpan}>
          <Form.Item
            {...rowLayout}
            label="详细地址"
            name="address"
            rules={[{required: true, message: '请输入详细地址'}]}
          >
              <Input placeholder="详细地址"/>
          </Form.Item>
        </Col>
        <Col span={colSpan}>
          <Form.Item
            {...rowLayout}
            label="房间数量"
            name="room"
            rules={[{required: true, message: '请输入房间数量'}]}
            >
              <InputNumber  placeholder="房间数量" min={1} style={{width: "100%"}}/>
          </Form.Item>
        </Col>
        <Col span={colSpan}>
          <Form.Item
            {...rowLayout}
            label="客厅数量"
            name="parlour"
          >
              <InputNumber placeholder="客厅数量" style={{width: "100%"}} min={0}/>
          </Form.Item>
        </Col>
        <Col span={colSpan}>
          <Form.Item
            {...rowLayout}
            label="房间朝向"
            name="direction"
            rules={[{required: true, message: '请选择房间朝向'}]}
          >
              <Select style={{textAlign: "left"}} placeholder="请选择房间朝向">
                <Option value="1">朝东</Option>
                <Option value="2">朝南</Option>
                <Option value="3">朝西</Option>
                <Option value="4">朝北</Option>
              </Select>
          </Form.Item>
        </Col>
        <Col span={colSpan}>
          <Form.Item
            {...rowLayout}
            label="建筑时间"
            name="buildYear"
            rules={[{required: true, message: '请输入建筑时间'}]}
          >
              <Input placeholder="建筑时间"/>
          </Form.Item>
        </Col>
        <Col span={colSpan}>
          <Form.Item
            {...rowLayout}
            label="所在楼层"
            name="floor"
            rules={[{required: true, message: '请输入所在楼层'}]}
          >
              <InputNumber placeholder="所在楼层" style={{width: "100%"}}/>
          </Form.Item>
        </Col>
        <Col span={colSpan}>
          <Form.Item
            {...rowLayout}
            label="总楼层"
            name="totalFloor"
            rules={[{required: true, message: '请输入总楼层'}]}
          >
              <InputNumber placeholder="总楼层" min={1} style={{width: "100%"}}/>
          </Form.Item>
        </Col>
        <Col span={colSpan}>
          <Form.Item
            {...rowLayout}
            label="面积"
            name="area"
            rules={[{required: true, message: '请输入房间面积'}]}
          >
              <InputNumber placeholder="面积" min={10} style={{width: "100%"}}/>
          </Form.Item>
        </Col>
        <Col span={colSpan}>
          <Form.Item
            {...rowLayout}
            label="定价"
            name="price"
            rules={[{required: true, message: '请输入定价'}]}
          >
              <InputNumber placeholder="定价" min={0} style={{width: "100%"}}/>
          </Form.Item>
        </Col>
        <Col span={colSpan}>
          <Form.Item
            {...rowLayout}
            label="租赁方式"
            name="rentWay"
            rules={[{required: true, message: '请选择租赁方式'}]}
          >
              <Select style={{textAlign: "left"}} placeholder="请选择租赁方式">
                <Option value={0}>合租</Option>
                <Option value={1}>整租</Option>
              </Select>
          </Form.Item>
        </Col>
        <Col span={colSpan}>
          <Form.Item
            {...rowLayout}
            label="地铁线路"
            name="subwayLineId"
          >
              <Select placeholder="请先选择所在城市" style={{textAlign: "left"}}>
                <Option value={1}>1号线</Option>
                <Option value={2}>2号线</Option>
                <Option value={3}>2号线</Option>
                <Option value={4}>4号线</Option>
              </Select>
          </Form.Item>
        </Col>
        <Col span={colSpan}>
          <Form.Item
            {...rowLayout}
            label="地铁站"
            name="subwayStationId"
          >
              <Select placeholder="请先选择地铁线" style={{textAlign: "left"}}>
                <Option value={1}>丰潭路</Option>
                <Option value={2}>古翠路</Option>
                <Option value={3}>文新路</Option>
                <Option value={4}>钱江世纪城</Option>
              </Select>
          </Form.Item>
        </Col>
        <Col span={colSpan}>
          <Form.Item
            {...rowLayout}
            label="距地铁距离"
            name="distanceToSubway"
          >
              <InputNumber min={-1} placeholder="如不近地铁则为-1" style={{width: "100%"}}/>
          </Form.Item>
        </Col>
      </Row>
      <Form.Item
        label="标签"
        name="tags"
      >
        <div style={{display: "flex"}}>
          <CheckableTag checked={true}>集体供暖</CheckableTag>
          <CheckableTag checked={true}>独立阳台</CheckableTag>
          <CheckableTag checked={true}>独立卫生间</CheckableTag>
          <CheckableTag checked={true}>空调</CheckableTag>
          <CheckableTag checked={true}>精装修</CheckableTag>
          <CheckableTag checked={true}>路由器</CheckableTag>
          <CheckableTag checked={true}>热水器</CheckableTag>
          <CheckableTag checked={true}>桌子</CheckableTag>
          <CheckableTag checked={true}>衣柜</CheckableTag>
          <CheckableTag checked={true}>拎包入住</CheckableTag>
          <CheckableTag checked={true}>洗衣机</CheckableTag>
          <CheckableTag checked={true}>电磁炉</CheckableTag>
        </div>
      </Form.Item>
      <Form.Item
        label="户型介绍"
        name="layoutDesc"
      >
        <Input placeholder="户型介绍"/>
      </Form.Item>
      <Form.Item
        label="交通出行"
        name="traffic"
      >
        <Input placeholder="交通出行"/>
      </Form.Item>
      <Form.Item
        label="房屋描述"
        name="description"
      >
        <TextArea  placeholder="房屋描述"  rows={4}/>
      </Form.Item>
      <Form.Item
        label=" "
        colon={false}
        valuePropName="fileList"
        name="coverUploader"
      >
         <Upload.Dragger name="files" action="/upload.do">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">点击或拖拽图片</p>
            <p className="ant-upload-hint">支持批量上传</p>
          </Upload.Dragger>
      </Form.Item>
      <Form.Item
        label="封面"
        name="cover"
      >
        <div style={{display: "flex"}}>
          请先上传图片从中选择封面
        </div>
      </Form.Item>
      <Form.Item
        colon={false}
        label=" "
        name="button"
      >
          <div style={{display: "flex"}}>
            <Button type="primary" style={{marginRight: "20px"}}>提交审核</Button>
            <Button>取消</Button>
          </div>
      </Form.Item>
    
  </Form>
}

export default AddHouse