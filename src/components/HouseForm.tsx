import React, { useEffect, useState } from 'react'
import { Button, Col, DatePicker, Empty, Form, Input, message, Row, Select, Spin, Tag } from 'antd';
import style from '@assets/global-style';
import styled from 'styled-components';
import { handleResponse } from "@utils/handle-reponse";
import AddressApi from "@apis/address";
import { useSelector } from 'react-redux'
import moment from "moment"
import PictureUploader from "./PictureUploader";
import {HouseDirectionList, HouseTagList} from "../base/HouseBaseEntity";

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

interface address {
  id: number,
  enName: string,
  cnName: string,
  level: string,
  baiduMapLng: number,
  baiduMapLat: number,
}

interface subway {
  id: number,
  name: string,
  cityEnName: string
}

interface subwayStation {
  id: number,
  subwayId: number,
  name: string
}
const RegionPlaceHolderContainer = ["请先选择所在城市", "请选择区县"];
const SubwayPlaceHolderContainer = ["请先选择所在城市", "请选择地铁线路"];
const SubwayStationPlaceHolderContainer = ["请先选择地铁线路", "请选择地铁站"];

const HouseForm = (props) => {

  const { initValue, onSubmit, buttonName = "保存", buttonLoading = false, onCancel= (dirty) => {}} = props;

  const [form] = Form.useForm();
  // 城市列表
  const [cities, setCities] = useState<address[]>([]);
  // 城市列表加载中
  const [isCityLoading, setIsCityLoading] = useState(false);
  // 区县列表
  const [regions, setRegions] = useState<address[]>([]);
  // 区县提示信息
  const [regionPlaceholder, setRegionPlaceHolder] = useState(0);
  // 区县列表加载中
  const [isRegionLoading, setIsRegionLoading] = useState(false);
  // 地铁线路列表
  const [subways, setSubways] = useState<subway[]>([]);
  // 地铁线路提示信息
  const [subwayPlaceholder, setSubwayPlaceholder] = useState(0);
  // 地铁线路列表加载中
  const [isSubwayLoading, setIsSubwayLoading] = useState(false);
  // 地铁站列表
  const [subwayStations, setSubwayStations] = useState<subwayStation[]>([]);
  // 地铁站列表加载中
  const [isSubwayStationLoading, setIsSubwayStationLoading] = useState(false);
  // 地铁站列表占位信息
  const [subwayStationPlaceholder, setSubwayStationPlaceholder] = useState(0);
  // 接口限制
  const limits = useSelector(state => state.common.limits);
  // 表单是否被修改锅
  const [formDirty, setFormDirty] = useState(false);

  useEffect(() => {
    if (initValue) {
      form.setFieldsValue(initValue);
      if (initValue.city) {
        getSupportRegions(initValue.city);
        getSupportSubways(initValue.city);
      }
      if (initValue.subway) {
        getSupportSubwayStations(initValue.subway);
      }
    }
  }, [form, initValue])

  useEffect(() => {
    getSupportCities();
  }, [])

  // 获取城市列表
  const getSupportCities = () => {
    return handleResponse(AddressApi.getSupportCities(), (data) => setCities(data.list), "获取城市列表失败", setIsCityLoading);
  }
  // 获取区县列表
  const getSupportRegions = (cityEnName) => {
    return handleResponse(AddressApi.getSupportRegions(cityEnName), (data) => setRegions(data.list), "获取区县列表失败", setIsRegionLoading)
  }
  // 处理表单值改变
  const handleValuesChange = (changedValues) => {
    setFormDirty(true);
    // 如果城市改变，则联动县与地铁线路
    if (Object.keys(changedValues).indexOf("city") !== -1) {
      form.setFieldsValue({ region: undefined, subway: undefined, subwayStation: undefined });
      setRegions([]);
      setSubways([]);
      setSubwayStations([]);
      setSubwayStationPlaceholder(0);
      if (changedValues.city) {
        setRegionPlaceHolder(1);
        setSubwayPlaceholder(1);
        getSupportRegions(changedValues.city);
        getSupportSubways(changedValues.city);
      } else {
        setRegionPlaceHolder(0);
        setSubwayPlaceholder(0);
      }
    }
    // 如果地铁线路改变，则联动地铁站
    if (Object.keys(changedValues).indexOf("subway") !== -1) {
      form.setFieldsValue({ subwayStation: undefined });
      setSubwayStations([]);
      if (changedValues.subway) {
        setSubwayStationPlaceholder(1);
        getSupportSubwayStations(changedValues.subway);
      } else {
        setSubwayStationPlaceholder(0);
      }
    }
  }

  // 获取地铁线路列表
  const getSupportSubways = (cityEnName) => {
    return handleResponse(AddressApi.getSupportSubways(cityEnName), (data) => setSubways(data.list), "获取地铁线路失败", setIsSubwayLoading);
  }
  // 获取地铁站列表
  const getSupportSubwayStations = (subwayId) => {
    return handleResponse(AddressApi.getSupportSubwayStations(subwayId), (data) => setSubwayStations(data.list), "获取地铁线站失败", setIsSubwayStationLoading);
  }

  // 处理表单完成
  const handleFormFinish = (values) => {
    const subway: any = subways.find(item => item.id === values.subway) || {};
    const subwayStation: any = subwayStations.find(item => item.id === values.subwayStation) || {};
    const houseForm = {
      ...values,
      cityEnName: values.city,
      regionEnName: values.region,
      buildYear: values.buildYear.year(),
      cover: values.picture.imageList.find(item => item.uid === values.picture.cover)?.path,
      pictures: values.picture.imageList.map(item => {
        return {
          path: item.path,
          width: item.width,
          height: item.height
        }
      }),
      subwayLineId: subway.id || "",
      subwayLineName: subway.name || "",
      subwayStationId: subwayStation.id || "",
      subwayStationName: subwayStation.name || "",
      tags: values.tags
    }
    onSubmit && onSubmit(houseForm);

  }

  // 数字校验
  const numberValidate = (message, pattern?) => ({
    validator (rule, value) {
      const regx = pattern || /^[0-9]*$/;
      if (!value || regx.test(value)) {
        return Promise.resolve();
      }
      return Promise.reject(message);
    },
  });
  // 禁用大于当前年的建筑日期
  const disabledBuildDate = current => {
    return current.isAfter(moment());
  };
  return (
    <Style>
      <Form {...layout} className="global-form" onValuesChange={handleValuesChange} form={form} onFinish={handleFormFinish}>
        <Row gutter={20}>
          <Col span={colSpan} >
            <Form.Item
              {...rowLayout}
              label="标题"
              name="title"
              rules={[{ required: true, message: '请输入标题信息' }]}
            >
              <Input placeholder="标题信息" />
            </Form.Item>
          </Col>
          <Col span={colSpan} >
            <Form.Item
              {...rowLayout}
              label="市"
              name="city"
              rules={[{ required: true, message: '请选择城市' }]}
            >
              <Select
                style={{ textAlign: "left" }}
                showSearch={true}
                optionFilterProp="children"
                placeholder="请选择城市"
                notFoundContent={isCityLoading ? <Spin size="small" /> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}>
                {
                  cities.map(city => <Option key={city.cnName} value={city.enName}>{city.cnName}</Option>)
                }
              </Select>
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item
              {...rowLayout}
              label="区/县"
              name="region"
              rules={[{ required: true, message: '请选择区县' }
              ]}
            >
              <Select style={{ textAlign: "left" }}
                      showSearch={true}
                      optionFilterProp="children"
                      placeholder={RegionPlaceHolderContainer[regionPlaceholder]} notFoundContent={isRegionLoading ? <Spin size="small" /> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}>
                {
                  regions.map(region => <Option key={region.enName} value={region.enName}>{region.cnName}</Option>)
                }
              </Select>
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item
              {...rowLayout}
              label="所在街道"
              name="street"
              rules={[{ required: true, message: '请输入所在街道' }]}
            >
              <Input placeholder="所在街道" />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item
              {...rowLayout}
              label="所在小区"
              name="district"
              rules={[{ required: true, message: '请输入所在小区' }]}
            >
              <Input placeholder="所在小区" />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item
              {...rowLayout}
              label="详细地址"
              name="address"
              rules={[{ required: true, message: '请输入详细地址' }]}
            >
              <Input placeholder="详细地址" />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item
              {...rowLayout}
              label="房间朝向"
              name="direction"
              rules={[{ required: true, message: '请选择房间朝向' }]}
            >
              <Select style={{ textAlign: "left" }} placeholder="请选择房间朝向">
                {
                  HouseDirectionList.map(item => <Option value={item.value} key={item.value}>{item.label}</Option>)
                }
              </Select>
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item
              {...rowLayout}
              label="房间数量"
              name="room"
              rules={[{ required: true, message: '请输入房间数量' }, numberValidate("房间数量只能为正整数", /^\+?[1-9][0-9]*$/)]}
            >
              <Input placeholder="房间数量" min={1} style={{ width: "100%" }} suffix="间" />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item
              {...rowLayout}
              label="客厅数量"
              name="parlour"
              rules={[numberValidate("客厅数量只能为非负整数", /^\d+$/)]}
            >
              <Input placeholder="客厅数量" style={{ width: "100%" }} suffix="间" />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item
              {...rowLayout}
              label="卫生间数量"
              name="bathroom"
              rules={[numberValidate("卫生间数量只能为非负整数", /^\d+$/)]}
            >
              <Input placeholder="卫生间数量" style={{ width: "100%" }} suffix="间" />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item
              {...rowLayout}
              label="所在楼层"
              name="floor"
              rules={[{ required: true, message: '请输入所在楼层' }, numberValidate("楼层只能为整数", /^-?\d+$/)]}
            >
              <Input placeholder="所在楼层" style={{ width: "100%" }} suffix="层" />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item
              {...rowLayout}
              label="总楼层"
              name="totalFloor"
              dependencies={["floor"]}
              rules={[{ required: true, message: '请输入总楼层' },
              ({ getFieldValue }) => ({
                validator (rule, value) {
                  if (!value || !getFieldValue('floor') || parseInt(getFieldValue('floor')) <= parseInt(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject("总楼层不能小于房屋所在楼层");
                },
              }),
              numberValidate("总楼层只能为正整数", /^\+?[1-9][0-9]*$/)
              ]}
            >
              <Input placeholder="总楼层" min={1} style={{ width: "100%" }} suffix="层" />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item
              {...rowLayout}
              label="面积"
              name="area"
              rules={[{ required: true, message: '请输入房间面积' }, numberValidate("房屋面积只能为正整数", /^\+?[1-9][0-9]*$/)]}
            >
              <Input placeholder="面积" min={10} style={{ width: "100%" }} suffix="㎡" />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item
              {...rowLayout}
              label="定价"
              name="price"
              rules={[{ required: true, message: '请输入定价' }, numberValidate("房屋定价只能为正整数", /^\+?[1-9][0-9]*$/)]}
            >
              <Input placeholder="定价" min={0} style={{ width: "100%" }} suffix="元/月" />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item
              {...rowLayout}
              label="建筑时间"
              name="buildYear"
              rules={[{ required: true, message: '请输入建筑时间' }]}
            >
              <DatePicker disabledDate={disabledBuildDate} picker="year" placeholder={"建筑时间"} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item
              {...rowLayout}
              label="租赁方式"
              name="rentWay"
              rules={[{ required: true, message: '请选择租赁方式' }]}
            >
              <Select style={{ textAlign: "left" }} placeholder="请选择租赁方式">
                <Option value={0}>合租</Option>
                <Option value={1}>整租</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item
              {...rowLayout}
              label="地铁线路"
              name="subway"
            >
              <Select placeholder={SubwayPlaceHolderContainer[subwayPlaceholder]}
                      style={{ textAlign: "left" }}
                      showSearch={true}
                      optionFilterProp="children"
                      allowClear={true}
                      notFoundContent={isSubwayLoading ? <Spin size="small" /> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}>
                {
                  subways.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)
                }
              </Select>
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item
              {...rowLayout}
              label="地铁站"
              name="subwayStation"
            >
              <Select placeholder={SubwayStationPlaceHolderContainer[subwayStationPlaceholder]}
                      style={{ textAlign: "left" }}
                      showSearch={true}
                      optionFilterProp="children"
                      allowClear={true}
                      notFoundContent={isSubwayStationLoading ? <Spin size="small" /> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}>
                {
                  subwayStations.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)
                }
              </Select>
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item
              {...rowLayout}
              label="距地铁距离"
              name="distanceToSubway"
              rules={[numberValidate("距地铁距离只能为整数", /^-?\d+$/)]}
            >
              <Input min={-1} placeholder="如不近地铁则为-1" style={{ width: "100%" }} suffix="米" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="标签"
          name="tags"
        >
          <HouseTags />
        </Form.Item>
        <Form.Item

          label="户型介绍"
          name="layoutDesc"
        >
          <Input placeholder="房屋整体户型相关介绍" />
        </Form.Item>
        <Form.Item

          label="交通出行"
          name="traffic"
        >
          <Input placeholder="周边的交通设施" />
        </Form.Item>
        <Form.Item

          label="周边配套"
          name="roundService"
        >
          <Input placeholder="周边的服务配套设施，如: 学校，医院等" />
        </Form.Item>
        <Form.Item

          label="房屋描述"
          name="description"
        >
          <TextArea placeholder="说点什么核心亮点之类的" rows={4} />
        </Form.Item>
        <Form.Item
          label="房源图片"
          name="picture"
          rules={[{ required: true, message: '至少上传一张房屋图片' }]}
        >
          <PictureUploader limits={{
            types: limits.housePhotoTypeLimit,
            size: limits.housePhotoSizeLimit
          }} />
        </Form.Item>
        <Form.Item
          colon={false}
          label=" "
          name="button"
        >
          <div style={{ display: "flex" }}>
            <Button type="primary" style={{ marginRight: "20px" }} htmlType="submit" loading={buttonLoading}>{buttonName}</Button>
            <Button onClick={() => onCancel(formDirty)}>取消</Button>
          </div>
        </Form.Item>
      </Form>
    </Style >
  )
}

// 房屋标签
export const HouseTags = (props) => {

  const { value = [], onChange } = props;
  // 处理标签点击
  const handleTagChange = (tag, checked) => {
    const nextSelectedTags = checked ? [...value, tag] : value.filter(t => t !== tag);
    handleChange(nextSelectedTags)
  }
  const handleChange = changedValue => {
    if (onChange) {
      onChange(changedValue)
    }
  }
  return (
    <div style={{ display: "flex" }} >
      {
        HouseTagList.map(tag => <CheckableTag
          key={tag}
          checked={value.indexOf(tag) > -1}
          onChange={checked => handleTagChange(tag, checked)}
        >{tag}</CheckableTag>)
      }
    </div>
  )
}
const Style = styled.div`

.ant-tag {
  border: 1px solid ${style['theme-color']};
  color: ${style['theme-color']}
}

.ant-tag-checkable-checked {
   color: #fff;
}

.img-file-item {
    margin-right: 10px;
    padding: 8px;
    margin-bottom: 10px;
    width: 104px;
    height: 104px;
    border: 1px solid #d9d9d9;
    border-radius: 8px;
  &:hover {
    .img-hover {
      opacity: 1;
    }
  }
  .img-cover {
    position: absolute;
    width: 20%;
    bottom: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 0px;
    width: 100%;
    font-size: 13px;
    background: ${style['theme-color']};
    color: #fff;
  }
  .img-wrap {
    width: 86px;
    height: 86px;
    position: relative;
  }
  .img-hover {
    opacity: 0;
    position: absolute;
    left: 0px;
    top: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    padding: 8px;
    background-color: rgba(0, 0, 0, 0.5);
    transition: all 0.5s;
    .iconfont {
      color: #fff;
      font-size: 14px;
      cursor: pointer;
    }
    .iconeye {
      margin-right: 10px;
      position: relative;
    }
    /* .iconeye::after {
      position
    } */
  }
  .img-file {
    width: 100%;
    height: 100%;
    transition: all 1s;
  }
}
 .global-center {
   display: flex;
   align-items: center;
   flex-wrap:wrap;
 }
 .thumbnail-icon{
    color: white;
    fontSize: 16px;
    cursor: pointer;
    padding: 2px 5px;
 }
 .ant-upload-picture-card-wrapper{
    width: auto;
 }
`
export default React.memo(HouseForm);
