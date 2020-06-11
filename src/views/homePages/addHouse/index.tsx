
import React, {useEffect, useState} from 'react'
import {
  Form,
  Select,
  Input,
  Row,
  Col,
  InputNumber,
  Tag,
  Upload,
  Button,
  Radio,
  DatePicker,
  Spin,
  Empty,
  Modal, message
} from 'antd';
import styled from 'styled-components';
import {handleResponse} from "@utils/handle-reponse";
import AddressApi from "@apis/address";
import {PlusOutlined} from "@ant-design/icons/lib";
import { useSelector } from 'react-redux'
import AdminApi from "@apis/admin";
import FileUtil from "@utils/file-util";

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

const Cover = styled.img`
  width: 100px;
  height: 100px;
`
const Style = styled.div`

`
const RadioContainer = styled.div`
.ant-radio-wrapper {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5715;
    list-style: none;
    -webkit-font-feature-settings: 'tnum', "tnum";
    font-feature-settings: 'tnum', "tnum";
    position: relative;
    display: inline-block;
    margin-right: 8px;
    white-space: nowrap;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
`
const PreviewModalContainer = styled.div`
  .preview-modal-container{
     .ant-modal-footer{
        padding: 10px 16px;
        background: transparent;
        border-top: 1px solid #f0f0f0;
        border-radius: 0 0 8px 8px;
        display: flex;
        justify-content: center;
      }
  }
`
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
const houseTagsArray = ["集体供暖","独立阳台","独立卫生间","空调","精装修","路由器","热水器","桌子","衣柜","拎包入住","洗衣机","电磁炉"];
const UploadHintContainer = styled.div`
    margin: 0 0 20px;
    line-height: 24px;
    color: #999;
    font-size: 14px;
    text-align: left;
`
const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="ant-upload-text">上传图片</div>
    </div>
);
const AddHouse = () => {

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
  const [isSubwayLoading ,setIsSubwayLoading] = useState(false);
  // 地铁站列表
  const [subwayStations, setSubwayStations] = useState<subwayStation[]>([]);
  // 地铁站列表加载中
  const [isSubwayStationLoading ,setIsSubwayStationLoading] = useState(false);
  // 地铁站列表占位信息
  const [subwayStationPlaceholder, setSubwayStationPlaceholder] = useState(0);
  // 房屋标签
  const [tags, setTags] = useState<string[]>([]);
  // 上传图片列表
  const [imageList, setImageList] = useState<any[]>([{
    uid: '-1',
    name: 'image.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },{
    uid: '-2',
    name: 'image.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },{
    uid: '-3',
    name: 'image.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },{
    uid: '-4',
    name: 'image.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  },{
    uid: '-5',
    name: 'image.png',
    status: 'done',
    url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  }]);
  // 预览模态框visible
  const [previewModalVisible, setPreviewModalVisible] = useState(false);
  const [previewTitle, setPreviewTitle] = useState("");
  // 预览图片
  const [previewImage, setPreviewImage] = useState("");
  // 接口限制
  const limits = useSelector(state => state.common.limits);
  // 待上传照片列表
  const [pictures, setPictures] = useState<any[]>([]);
  // 封面
  const [cover, setCover] = useState("");
  // 房源新增loading
  const [formButtonLoading, setFormButtonLoading] = useState(false);

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
    // 如果城市改变，则联动县与地铁线路
    if(Object.keys(changedValues).indexOf("city") !== -1){
      form.setFieldsValue({region: undefined, subway: undefined, subwayStation: undefined});
      setRegions([]);
      setSubways([]);
      setSubwayStations([]);
      setSubwayStationPlaceholder(0);
      if(changedValues.city) {
        setRegionPlaceHolder(1);
        setSubwayPlaceholder(1);
        getSupportRegions(changedValues.city);
        getSupportSubways(changedValues.city);
      }else{
        setRegionPlaceHolder(0);
        setSubwayPlaceholder(0);
      }
    }
    // 如果地铁线路改变，则联动地铁站
    if(Object.keys(changedValues).indexOf("subway") !== -1){
      form.setFieldsValue({subwayStation: undefined});
      setSubwayStations([]);
      if(changedValues.subway){
        setSubwayStationPlaceholder(1);
        getSupportSubwayStations(changedValues.subway);
      }else{
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
  // 处理标签点击
  const handleTagChange = (tag, checked) => {
    const nextSelectedTags = checked ? [...tags, tag] : tags.filter(t => t !== tag);
    setTags(nextSelectedTags)
  }
  // 处理上传文件改变
  const handleFileChange = ({fileList}) => {
    setImageList(fileList);
  }
  // 获取base64
  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  // 处理图片预览
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewModalVisible(true);
    setPreviewTitle(file.name);
  }
  // 处理上传图片
  const handleUpload =  ({file, onError, onSuccess}) => {
    return AdminApi.uploadPhoto(file).then((res) => {
      if (res) {
        setPictures([...pictures, res])
        onSuccess(res, file);
      } else {
        onError('上传失败')
      }
    })
  }
  // 图片上传校验
  const beforeUpload = (file) => {
   const currentType = file.type.split('/')[1];
    if(!limits.housePhotoTypeLimit.some(item => item === currentType)){
      message.error("仅支持:" + limits.housePhotoTypeLimit.join(",") + "; 格式");
      return false;
    }
    if( file.size > limits.housePhotoSizeLimit){
      message.error("单张图片最大:" + FileUtil.getFileSize(limits.housePhotoSizeLimit));
      return false;
    }
    return true;
  }
  // 处理表单完成
  const handleFormFinish = (values) => {
    const subway: any = subways.find(item => item.id === values.subway) || {};
    const subwayStation: any = subwayStations.find(item => item.subwayId === values.subwayStation.id) || {};
    const houseForm = {
      ...values,
      buildYear: values.buildYear.year(),
      cover: cover,
      housePictureList: pictures.map(item => {
        return {
          path: item.hash,
          width: item.width,
          height: item.height
        }
      }),
      subwayLineId: subway.id || "",
      subwayLineName: subway.name || "",
      subwayStationId: subwayStation.id || "",
      subwayStationName: subwayStation.name || "",
      tags: tags
    }
    console.dir(houseForm);
    console.log(JSON.stringify(houseForm));
   /* handleResponse( AdminApi.addHouse(houseForm), data => {
      console.dir(data);
    }, "新增房源失败", setFormButtonLoading);*/

  }

  const numberValidate =  (message, pattern?) => ({
    validator(rule, value) {
      const regx = pattern || /^[0-9]*$/;
      if (!value || regx.test(value)) {
        return Promise.resolve();
      }
      return Promise.reject(message);
    },
  })
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
              <Select style={{ textAlign: "left" }} placeholder="请选择城市" notFoundContent={isCityLoading ? <Spin size="small"/> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>}>
                {
                  cities.map(city => <Option key={city.enName} value={city.enName}>{city.cnName}</Option>)
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
              <Select style={{ textAlign: "left" }} placeholder={RegionPlaceHolderContainer[regionPlaceholder]} notFoundContent={isRegionLoading ? <Spin size="small"/> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>}>
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
              label="房间数量"
              name="room"
              rules={[{ required: true, message: '请输入房间数量' }, numberValidate("房间数量只能为正整数", /^\+?[1-9][0-9]*$/)]}
            >
              <Input placeholder="房间数量" min={1} style={{ width: "100%" }} suffix="间"/>
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item
              {...rowLayout}
              label="客厅数量"
              name="parlour"
              rules={[numberValidate("客厅数量只能为非负整数", /^\d+$/)]}
            >
              <Input placeholder="客厅数量" style={{ width: "100%" }} suffix="间"/>
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
              rules={[{ required: true, message: '请输入建筑时间' }]}
            >
              <DatePicker picker="year" placeholder={"建筑时间"} style={{width: "100%"}}/>
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item
              {...rowLayout}
              label="所在楼层"
              name="floor"
              rules={[{ required: true, message: '请输入所在楼层'}, numberValidate("楼层只能为整数", /^-?\d+$/)]}
            >
              <Input placeholder="所在楼层" style={{ width: "100%" }} suffix="层"/>
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item
              {...rowLayout}
              label="总楼层"
              name="totalFloor"
              rules={[{ required: true, message: '请输入总楼层' },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (!value || !getFieldValue('floor') || getFieldValue('floor') <= value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("总楼层不能小于房屋所在楼层");
                  },
                }),
                numberValidate("总楼层只能为正整数", /^\+?[1-9][0-9]*$/)
              ]}
            >
              <Input placeholder="总楼层" min={1} style={{ width: "100%" }} suffix="层"/>
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item
              {...rowLayout}
              label="面积"
              name="area"
              rules={[{ required: true, message: '请输入房间面积'}, numberValidate("房屋面积只能为正整数", /^\+?[1-9][0-9]*$/)]}
            >
              <Input placeholder="面积" min={10} style={{ width: "100%" }}  suffix="㎡"/>
            </Form.Item>
          </Col>
          <Col span={colSpan}>
            <Form.Item
              {...rowLayout}
              label="定价"
              name="price"
              rules={[{ required: true, message: '请输入定价'}, numberValidate("房屋定价只能为正整数", /^\+?[1-9][0-9]*$/)]}
            >
              <Input placeholder="定价" min={0} style={{ width: "100%" }} suffix="元/月"/>
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
              <Select placeholder={SubwayPlaceHolderContainer[subwayPlaceholder]} style={{ textAlign: "left" }} notFoundContent={isSubwayLoading ? <Spin size="small"/> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>}>
                {
                  subways.map(item => <Option key={item.id}  value={item.id}>{item.name}</Option>)
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
              <Select placeholder={SubwayStationPlaceHolderContainer[subwayStationPlaceholder]} style={{ textAlign: "left" }} notFoundContent={isSubwayStationLoading ? <Spin size="small"/> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>}>
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
              <Input min={-1} placeholder="如不近地铁则为-1" style={{ width: "100%" }} suffix="米"/>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="标签"
          name="tags"
        >
          <div style={{ display: "flex" }}>
            {
              houseTagsArray.map(tag => <CheckableTag key={tag} checked={tags.indexOf(tag) > -1} onChange={checked =>  handleTagChange(tag, checked)} >{tag}</CheckableTag>)
            }
          </div>
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
        name="image"
      >
        <PreviewModalContainer>
          <UploadHintContainer>请上传清晰、实拍的室内图片，请不要在图片上添加文字、数字、网址等内容，请勿上传名片、二维码、自拍照、风景照等与房源无关的图片，最多上传12张，每张最大10M</UploadHintContainer>
          <Upload
              listType="picture-card"
              fileList={imageList}
              multiple={true}
              onPreview={handlePreview}
              beforeUpload={beforeUpload}
              onChange={handleFileChange}
              customRequest={handleUpload}
              previewFile={(file) => {
                console.log('Your upload file:', file);
                return new Promise(() => file)
              }}
          >
            {imageList.length >= 12 ? null : uploadButton}
          </Upload>
          <Modal
              visible={previewModalVisible}
              title={previewTitle}
              footer={
                <div style={{display: "flex", flex: 1, justifyContent: "center"}}>
                  <Button type="primary" style={{margin: "auto"}}>设为封面</Button>
                </div>
                }
              onCancel={() => setPreviewModalVisible(false)}
          >
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </PreviewModalContainer>
      </Form.Item>
      <Form.Item
        colon={false}
        label=" "
        name="button"
      >
          <div style={{display: "flex"}}>
            <Button type="primary" style={{marginRight: "20px"}} htmlType="submit">提交审核</Button>
            <Button>取消</Button>
          </div>
        </Form.Item>
      </Form>
    </Style >
  )
}
export default React.memo(AddHouse)
