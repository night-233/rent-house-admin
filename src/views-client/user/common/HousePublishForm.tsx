import React, {useEffect, useState} from "react";
import styled from "styled-components";
import {Prompt, useHistory} from "react-router";
import {Button, Col, DatePicker, Empty, Form, Input, notification, Row, Select, Spin, Tag} from "antd";
import {getLimits} from "@store/redux/common.redux";
import {handleResponse} from "@utils/handle-reponse";
import AddressApi from "@apis/address";
import {HouseDirectionList, HouseTagList} from "@base/HouseBaseEntity";
import moment from "moment";
import PictureUploader from "@components/PictureUploader";
import {useDispatch, useSelector} from 'react-redux'
import AdminApi from "@apis/admin";

const { Option } = Select;
const { CheckableTag } = Tag;
const { TextArea } = Input;

export enum HousePublishFormType {
    EDIT,
    ADD
}
/**
 * 房源发布表单
 * Created by Administrator on 2020/8/7
 */
const HousePublishForm = (props) => {

    const {initData, type} = props;

    const [leaveHint, setLeaveHint] = useState({
        show: true,
        path: ""
    });

    const [regions, setRegions] = useState<address[]>([]);
    const [regionLoading, setRegionLoading] = useState(false);

    // 地铁线路
    const [subwayList, setSubwayList] = useState<subway[]>([]);
    const [subwayListLoading, setSubwayListLoading] = useState(false);

    // 地铁站
    const [subwayStationList, setSubwayStationList] = useState<subwayStation[]>([]);
    const [subwayStationListLoading, setSubwayStationListLoading] = useState(false);
    const [subwayStationDisable, setSubwayStationDisable] = useState(true);
    const [toSubwayDistanceDisable, setToSubwayDistanceDisable] = useState(true);

    // 房屋描述计数
    const [descriptionCount, setDescriptionCount] = useState(0);

    const [buttonLoading, setButtonLoading] = useState(false);

    const history = useHistory();

    const [dirty, setDirty] = useState(false);

    const limits = useSelector(state => state.common.limits);

    const [form] = Form.useForm();

    useEffect(() => {
        if(initData){
            if (initData) {
                form.setFieldsValue(initData);
                if (initData.city) {
                    getSupportRegions(initData.city);
                    getSupportSubways(initData.city);
                }
                if (initData.subway) {
                    getSupportSubwayStations(initData.subway);
                    setSubwayStationDisable(false);
                }
                if(initData.subwayStation){
                    setToSubwayDistanceDisable(false);
                }
            }
        }
    }, [initData]);

    const numberValidate = (message, pattern?) => ({
        validator (rule, value) {
            const regx = pattern || /^[0-9]*$/;
            if (!value || regx.test(value)) {
                return Promise.resolve();
            }
            return Promise.reject(message);
        },
    });

    const city = useSelector(state => state.common.city);

    useEffect(() => {
        if(city){
            getSupportRegions(city.enName);
            getSupportSubways(city.enName);
        }
    }, [city]);

    // 获取限制条件
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getLimits());
    }, []);

    // 获取区县列表
    const getSupportRegions = (cityEnName) => {
        return handleResponse(AddressApi.getSupportRegions(cityEnName), (data) => setRegions(data.list), "获取区县列表失败", setRegionLoading)
    };

    // 获取地铁线路列表
    const getSupportSubways = (cityEnName) => {
        return handleResponse(AddressApi.getSupportSubways(cityEnName), (data) => setSubwayList(data.list), "获取地铁线路失败", setSubwayListLoading);
    };
    // 获取地铁站列表
    const getSupportSubwayStations = (subwayId) => {
        return handleResponse(AddressApi.getSupportSubwayStations(subwayId), (data) => setSubwayStationList(data.list), "获取地铁线站失败", setSubwayStationListLoading);
    };

    // 下拉框无数据时内容展示
    const selectNotFound = (loading, description = "暂无数据") =>{
        return loading ? <Spin size="small"/> : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={description}/>;
    };

    const handleValuesChange = (changedValue, allValue) => {
        setDirty(true);
        // 如果地铁线路改变
        if(Object.keys(changedValue).indexOf("subway") !== -1){
            form.setFieldsValue({subwayStation: null, distanceToSubway: null});
            // 如果地铁线路存在
            if(changedValue.subway){
                setSubwayStationDisable(false);
                getSupportSubwayStations(changedValue.subway);
            }else{
                setSubwayStationDisable(true);
                setToSubwayDistanceDisable(true);
            }
            return;
        }
        // 如果地铁站改变
        if(Object.keys(changedValue).indexOf("subwayStation") !== -1){
            form.setFieldsValue({distanceToSubway: null});
            // 如果地铁站存在
            if(changedValue.subwayStation){
                setToSubwayDistanceDisable(false);
            }else{
                setToSubwayDistanceDisable(true);
            }
            return;
        }
        // 如果房屋描述改变
        if(Object.keys(changedValue).indexOf("description") !== -1){
            setDescriptionCount(changedValue.description?.length || 0);
            return;
        }
        // 如果小区名称和户型改变
        if(Object.keys(changedValue).indexOf("district") !== -1
            || Object.keys(changedValue).indexOf("room")
            || Object.keys(changedValue).indexOf("parlour")
            || Object.keys(changedValue).indexOf("bathroom")
        ){
            const title = (allValue.district || "") + " " +
                ((allValue.room && allValue.parlour && allValue.bathroom) ? (allValue.room + "室" +  allValue.parlour + "厅" + allValue.bathroom + "卫") : "");
            form.setFieldsValue({
                title: title
            })
        }
    };

    // 总楼层校验
    const totalFloorChecker =  ({ getFieldValue }) => ({
        validator (rule, value) {
            if (!value || !getFieldValue('floor') || parseInt(getFieldValue('floor')) <= parseInt(value)) {
                return Promise.resolve();
            }
            return Promise.reject("总楼层不能小于房屋所在楼层");
        },
    });

    const handleFormFinish = (values) => {
        // 处理表单完成
        const subway: any = subwayList.find(item => item.id === values.subway) || {};
        const subwayStation: any = subwayStationList.find(item => item.id === values.subwayStation) || {};
        const region = regions.find(item => item.enName === values.region)?.cnName;
        const houseForm = {
            ...values,
            cityEnName: city.enName,
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
            tags: values.tags,
            address: region + values.street + values.district
        };

        if(type === HousePublishFormType.EDIT){
            handleEdit(houseForm);
            return;
        }
        if(type === HousePublishFormType.ADD){
            handlePublish(houseForm);
        }
    };

    // 编辑房源
    const handleEdit = (form) => {
        if(dirty){
            setButtonLoading(true);
            AdminApi.updateHouse({
                ...form,
                id: initData.id
            }).then(data => {
                setButtonLoading(false);
                if(data){
                    notification.success({
                        message: '修改成功',
                        description:
                            "您的房源修改成功，可在房源管理下管理该房源",
                    });
                    setLeaveHint({
                        show: false,
                        path: "/user/publish/manage"
                    });
                }
            });
        }else{
            setLeaveHint({
                show: false,
                path: "/user/publish/manage"
            });
        }
    };

    // 发布房源
    const handlePublish = (houseForm) => {
        setButtonLoading(true);
        AdminApi.addHouse(houseForm).then(data => {
            setButtonLoading(false);
            if(data) {
                notification.success({
                    message: '发布成功',
                    description:
                        "您的房源发布成功，可在房源管理下管理该房源",
                });
                setLeaveHint({
                    show: false,
                    path: "/user/publish/manage"
                });
            }
        });
    };

    // 设置不保存路由后跳转路由
    useEffect(() => {
        if(!leaveHint.show){
            history.push(leaveHint.path);
        }
    }, [leaveHint]);

    // 一键生成描述
    const handleGenerateDescription = () => {
        form.validateFields(["district", "region", "street", "room",
            "parlour", "bathroom", "floor", "totalFloor", "direction", "area",
            "buildYear", "rentWay", "price"]).then(res => {
            const values = form.getFieldsValue();
            const region = regions.find(item => item.enName === values.region)?.cnName;
            const district = `房子在${values.district}小区,环境优美,绿化充足\n`;
            const location = `位于${region}, ${values.street},入住即与精英为邻;\n`;
            const tags = `${values.tags?.length > 0 ? `房间配套有${values.tags.map(item => item + ",")}\n` : ""}`;

            let traffic = "";
            let subway: any = null;
            let subwayStation: any = null;
            if(values.subway){
                subway = subwayList.find(item => item.id === values.subway) || {};
                traffic += "在地铁" + subway.name + "上,";
            }
            if(values.subwayStation){
                subwayStation = subwayStationList.find(item => item.id === values.subwayStation) || {};
                traffic += "近地铁站" + subwayStation.name + ",";
            }
            if(values.distanceToSubway){
                traffic += values.distanceToSubway + "米";
            }
            if(traffic !== ""){
                traffic += "\n";
            }
            const last = `交通便利,附近的,小区周边配套设施齐全`;
            const description = district + location + tags + traffic + last;
            setDescriptionCount(description.length);
            form.setFieldsValue({description: description});
        });
    };

    return (
        <Container>
            <Prompt
                when={dirty && leaveHint.show}
                message='您的修改将不会被保存，是否继续'
            />
            <Form form={form} onValuesChange={handleValuesChange} onFinish={handleFormFinish}>
                {/* 基础信息 ***************************/}
                <Row>
                    <Col span={2} className="row-title-container">
                        <h2 className="title">基础信息</h2>
                    </Col>
                </Row>
                {/* 小区名称 */}
                <Row>
                    <Col span={2} className="row-title-container">
                        <span className="row-title star">
                            小区名称
                        </span>
                    </Col>
                    <Col className="row-input-container">
                        <Form.Item
                            label={null}
                            name="district"
                            rules={[{ required: true, message: '请输入小区名称' }]}
                        >
                            <Input placeholder="请输入小区名称" style={{...formStyle.input, width: 400}} />
                        </Form.Item>
                    </Col>
                </Row>
                {/* 地址 */}
                <Row>
                    <Col span={2} className="row-title-container">
                        <span className="row-title star">
                            详细地址
                        </span>
                    </Col>
                    <Col className="row-input-container">
                        <Form.Item
                            label=""
                            name="region"
                            rules={[{ required: true, message: '请选择区域' }
                            ]}
                        >
                            <Select style={{...formStyle.input, width: 190}}
                                    showSearch={true}
                                    optionFilterProp="children"
                                    placeholder="请选择区域"
                                    notFoundContent={selectNotFound(regionLoading, "无当前城市区域信息")}
                            >
                                {
                                    regions.map((region: address) => <Option key={region.enName} value={region.enName}>{region.cnName}</Option>)
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label=""
                            name="street"
                            rules={[{ required: true, message: '请输入街道' }
                            ]}
                        >
                            <Input style={{...formStyle.input, width: 190}} placeholder="请输入小区所在街道"/>
                        </Form.Item>
                    </Col>
                </Row>
                {/* 户型 */}
                <Row>
                    <Col span={2} className="row-title-container">
                        <span className="row-title star">
                            房屋户型
                        </span>
                    </Col>
                    <Col className="row-input-container">
                        <Form.Item
                            label={null}
                            name="room"
                            rules={[{ required: true, message: '必填' }, numberValidate("正整数", /^\+?[1-9][0-9]*$/)]}
                        >
                            <Input  style={{...formStyle.input, width: 120}} suffix="室" className="input-center" maxLength={1}/>
                        </Form.Item>
                        <Form.Item
                            label={null}
                            name="parlour"
                            rules={[{ required: true, message: '必填' }, numberValidate("非负整数", /^\d+$/)]}
                        >
                            <Input  style={{...formStyle.input, width: 120}} suffix="厅" className="input-center" maxLength={1}/>
                        </Form.Item>
                        <Form.Item
                            label={null}
                            name="bathroom"
                            rules={[{ required: true, message: '必填' }, numberValidate("非负整数", /^\d+$/)]}
                        >
                            <Input  style={{...formStyle.input, width: 120}} suffix="卫" className="input-center" maxLength={1}/>
                        </Form.Item>
                    </Col>
                </Row>
                {/* 楼层信息 */}
                <Row>
                    <Col span={2} className="row-title-container">
                        <span className="row-title star">
                            楼层信息
                        </span>
                    </Col>
                    <Col className="row-input-container">
                        <Form.Item
                            label={null}
                            name="floor"
                            rules={[{ required: true, message: '必填' }, numberValidate("非负整数", /^\+?[1-9][0-9]*$/)]}
                        >
                            <Input style={{...formStyle.input, textAlign: "center", width: 120}} prefix="第" suffix="层" className="input-center"/>
                        </Form.Item>
                        <Form.Item
                            label={null}
                            dependencies={["floor"]}
                            name="totalFloor"
                            rules={[{ required: true, message: '必填' }, numberValidate("非负整数", /^\+?[1-9][0-9]*$/), totalFloorChecker]}
                        >
                            <Input style={{...formStyle.input, width: 120}} prefix="共" suffix="层" className="input-center"/>
                        </Form.Item>
                    </Col>
                </Row>
                {/* 房屋出租 */}
                <Row>
                    <Col span={2} className="row-title-container">
                        <span className="row-title star">
                            出租房屋
                        </span>
                    </Col>
                    <Col className="row-input-container">
                        <Form.Item
                            label={null}
                            name="direction"
                            rules={[{ required: true, message: '必选' }]}
                        >
                            <Select style={{...formStyle.input, width: 120}} placeholder="请选择朝向">
                                {
                                    HouseDirectionList.map(item => <Option value={item.value} key={item.value}>{item.label}</Option>)
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label={null}
                            name="area"
                            rules={[{ required: true, message: '必填' }, numberValidate("非负整数", /^\+?[1-9][0-9]*$/)]}
                        >
                            <Input style={{...formStyle.input, width: 120}} prefix="共" suffix="㎡"  className="input-center"/>
                        </Form.Item>
                    </Col>
                </Row>
                {/**/}
                {/* 建房年份 */}
                <Row>
                    <Col span={2} className="row-title-container">
                        <span className="row-title star">
                            建房年份
                        </span>
                    </Col>
                    <Col className="row-input-container">
                        <Form.Item
                            name="buildYear"
                            rules={[{ required: true, message: '请选择建房年份' }]}
                        >
                            <DatePicker disabledDate={current => current && current.isAfter(moment().endOf("day"))} picker="year" placeholder={"建房年份"} style={{...formStyle.input, width: 120}} />
                        </Form.Item>
                    </Col>
                </Row>

                {/* 出租信息**************************************************/}
                <Row>
                    <Col span={2} className="row-title-container">
                        <h2 className="title">出租信息</h2>
                    </Col>
                </Row>
                {/* 出租方式 */}
                <Row>
                    <Col span={2} className="row-title-container">
                        <span className="row-title star">
                            出租方式
                        </span>
                    </Col>
                    <Col className="row-input-container">
                        <Form.Item
                            label={null}
                            name="rentWay"
                            rules={[{ required: true, message: '必选' }]}
                        >
                            <Select style={{...formStyle.input, width: 120}} placeholder="租赁方式">
                                <Option value={0}>合租</Option>
                                <Option value={1}>整租</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                {/* 租金信息*/}
                <Row>
                    <Col span={2} className="row-title-container">
                        <span className="row-title star">
                            租金信息
                        </span>
                    </Col>
                    <Col className="row-input-container">
                        <Form.Item
                            label={null}
                            name="price"
                            rules={[{ required: true, message: '必填' }, numberValidate("非负整数", /^\+?[1-9][0-9]*$/)]}
                        >
                            <Input style={{...formStyle.input, width: 120}}  suffix="元/月"  className="input-center"/>
                        </Form.Item>
                    </Col>
                </Row>

                {/* 详细介绍 ***************************/}
                <Row>
                    <Col span={2} className="row-title-container">
                        <h2 className="title">详细介绍</h2>
                    </Col>
                </Row>
                {/* 房源标题 */}
                <Row>
                    <Col span={2} className="row-title-container">
                        <span className="row-title star">
                            房源标题
                        </span>
                    </Col>
                    <Col className="row-input-container">
                        <Form.Item
                            label={null}
                            name="title"
                            rules={[{ required: true, message: '请输入房源标题'}]}
                        >
                            <Input placeholder="请输入房源标题" style={{...formStyle.input, width: 400}} />
                        </Form.Item>
                    </Col>
                </Row>
                {/* 地铁信息 */}
                <Row>
                    <Col span={2} className="row-title-container">
                        <span className="row-title">
                            地铁线路
                        </span>
                    </Col>
                    <Col className="row-input-container">
                        <Form.Item
                            label=""
                            name="subway"
                        >
                            <Select placeholder="请选择地铁线路"
                                    style={{...formStyle.input, width: 180}}
                                    showSearch={true}
                                    optionFilterProp="children"
                                    allowClear={true}
                                    notFoundContent={selectNotFound(subwayListLoading, "当前城市无地铁线路信息")}>
                                {
                                    subwayList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label=""
                            name="subwayStation"
                        >
                            <Select placeholder={"请选择地铁站"}
                                    style={{...formStyle.input, width: 180}}
                                    showSearch={true}
                                    optionFilterProp="children"
                                    allowClear={true}
                                    disabled={subwayStationDisable}
                                    notFoundContent={selectNotFound(subwayStationListLoading, "当前线路无地铁站信息")}>
                                {
                                    subwayStationList.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label={null}
                            name="distanceToSubway"
                            rules={[numberValidate("非负整数", /^\+?[1-9][0-9]*$/)]}
                        >
                            <Input disabled={toSubwayDistanceDisable} placeholder="地铁距离"  style={{...formStyle.input, width: 120}} suffix="米" className="input-center"/>
                        </Form.Item>
                    </Col>
                </Row>
                {/*    房屋配置 */}
                <Row>
                    <Col span={2} className="row-title-container">
                        <span className="row-title">
                            房屋配置
                        </span>
                    </Col>
                    <Col className="row-input-container">
                        <Form.Item
                            name="tags"
                        >
                            <HouseTags/>
                        </Form.Item>
                    </Col>
                </Row>
                {/* 房源描述*/}
                <Row>
                    <Col span={2} className="row-title-container">
                        <span className="row-title star">
                            房源描述
                        </span>
                    </Col>
                    <Col className="row-input-container" style={{display: "block"}}>
                        <p style={{cursor: "pointer", color: "#51c6cf", fontSize: "12px", marginBottom: 5}} onClick={handleGenerateDescription}>快速生成描述</p>
                        <Form.Item
                            name="description"
                            rules={[{ required: true, message: '请输入房源描述'}, {min: 6, message: "房源描述过短"}, {max: 300, message: "描述最多不超过300字"}]}
                        >
                            <TextArea
                                style={{...formStyle.input, width: 540, height: 130, marginRight: 0}}
                                placeholder="可以介绍一下房源亮点，交通、周边环境，可以入住的时间和对租客的要求等，
                                详细的描述会大大增加快速出租的机会！请不要在描述中包含：
                                1.任意形式的联系方式及变型词；
                                2.与房源或相关配套描述无关的内容；3.违反国家法律法规的内容等"
                            />
                        </Form.Item>
                        <div className="text-tip">
                            <span style={{color: "#FF420A"}}>{descriptionCount}</span>/300
                        </div>
                    </Col>
                </Row>

                {/* 房源图片 ***************************/}
                <Row>
                    <Col span={2} className="row-title-container">
                        <h2 className="title">房源图片</h2>
                    </Col>
                </Row>
                {/*上传图片*/}
                <Row>
                    <Col span={2} className="row-title-container">
                        <span className="row-title star">
                            上传图片
                        </span>
                    </Col>
                    <Col className="row-input-container" span={16}>
                        <Form.Item
                            name="picture"
                            rules={[{ required: true, message: '至少上传一张房屋图片' }]}
                        >
                            <PictureUploader limits={{
                                types: limits.housePhotoTypeLimit,
                                size: limits.housePhotoSizeLimit
                            }} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Button type="primary"  htmlType="submit" style={{width: 260, height: 44, margin: "0 auto"}} loading={buttonLoading}>
                        {
                            type === HousePublishFormType.ADD && (buttonLoading ? "发布中" : "发布")
                        }
                        {
                            type === HousePublishFormType.EDIT && (buttonLoading ? "修改中" : "确认修改")
                        }
                    </Button>
                </Row>
            </Form>
        </Container>
    )
};
const Container = styled.div`
    min-height: 500px;
    padding: 30px 20px;
    border: solid 1px #eee;
    .row-title-container{
        text-align: right;
        margin-right: 20px;
    }
    .row-title{
        line-height: 40px;
        color: #666;
        font-size: 14px;
        color: gray;
    }
    .star{
        &:before{
            content: "*";
            top: 2px;
            margin-right: 2px;
            color: #FF552E;
        }
    }
    .title{
        color: #000;
        font-size: 16px;
        font-weight: bolder;
        padding-bottom: 20px;
    }
    .row-input-container{
        display: flex;
    }
    .ant-input-suffix, .ant-input-prefix{
        color: #a6a6a6;
    }
    .ant-input-affix-wrapper-focused{
         .ant-input-suffix, .ant-input-prefix{
                color: #333 !important;
         }
    }
    .ant-select-selector{
        background-color: #fff;
        border: 1px solid #d9d9d9;
        border-radius: 0px !important;
        -webkit-transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        width: 100%;
        height: 40px !important;
        line-height: 40px !important;
        padding: 0 11px;
    }
    .ant-select-selection-placeholder{
        line-height: 40px !important;
    }
    .ant-select-selection-item{
        line-height: 40px !important;
    }
    .input-center{
        .ant-input{
            text-align: center;
        }
    }
    .ant-tag-checkable{
        border: 1px solid #d9d9d9;
        box-sizing: content-box;
        font-size: 14px;
        color: #a6a6a6;
    }
    .ant-tag-checkable-checked{
        border: 1px solid rgba(0, 0, 0, 0);
        color: #fff;
    }
    .text-tip {
        position: absolute;
        bottom: 30px;
        right: 10px;
        color: #aaa;
        font-size: 12px;
    }
`;
const HouseTags = (props) => {
    const { value = [], onChange } = props;
    // 处理标签点击
    const handleTagChange = (tag, checked) => {
        const nextSelectedTags = checked ? [...value, tag] : value.filter(t => t !== tag);
        handleChange(nextSelectedTags)
    };
    const handleChange = changedValue => {
        if (onChange) {
            onChange(changedValue)
        }
    };
    return (
        <div style={{ display: "flex", alignItems: "center", height: 40 }} >
            {
                HouseTagList.map(tag => <CheckableTag
                    key={tag}
                    checked={value.indexOf(tag) > -1}
                    onChange={checked => handleTagChange(tag, checked)}
                >{tag}</CheckableTag>)
            }
        </div>
    )
};

const formStyle = {
    input: {
        height: 40,
        borderRadius: 0,
        marginRight: 20
    }
};

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


export default HousePublishForm;
