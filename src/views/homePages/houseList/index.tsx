import React, { useEffect, useState, useCallback } from 'react';
import { Select, DatePicker, Input, Col, Row } from 'antd';
import styled from 'styled-components'
import moment from 'moment';
import adminApi from '@/apis/admin'
import { useImmer } from "use-immer";
import AddressApi from "@apis/address";
import style from '@/assets/global-style'
import { Table, Tag, Space } from 'antd';
import { FormOutlined } from "@ant-design/icons/lib";
interface address {
  id: number,
  enName: string,
  cnName: string,
  level: string,
  baiduMapLng: number,
  baiduMapLat: number,
}
const columns = [
  {
    title: '标题',
    dataIndex: 'title',
    key: 'adminId',
    width: 120,
    render: title => (
      <>
        <div className='title'>{title}</div>
      </>
    )
  },
  {
    title: '封面',
    dataIndex: 'cover',
    key: 'adminId',
    width: 150,
    render: cover => (
      <>
        <img style={{ width: '120px' }} src={cover} alt='' />
      </>
    ),
  },
  {
    title: '面积',
    dataIndex: 'area',
    key: 'adminId',
    width: 80
  },
  {
    title: '价格',
    key: 'adminId',
    dataIndex: 'price',
    width: 80
  },
  {
    title: '楼层',
    dataIndex: 'floor',
    key: 'adminId',
    width: 80
  },
  {
    title: '带看次数',
    dataIndex: 'watchTimes',
    key: 'adminId',
    width: 80
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'adminId',
    width: 100
  },
  {
    title: '发布状态',
    dataIndex: 'statusText',
    key: 'adminId',
    width: 90,
    render: (statusText) => (
      <div className='status-card'>
        {statusText}
      </div>
    ),
  },
  {
    title: '操作',
    dataIndex: 'adminId',
    key: 'adminId',
    render: (row) => (
      <div className='icon-box'><FormOutlined /></div>
    ),
    width: 80
  },
];

const statusMap = [
  { id: 0, text: '未审核' },
  { id: 1, text: '审核通过' },
  { id: 2, text: '已出租' },
  { id: 3, text: '逻辑删除' },
]

function HouseList (props) {
  const { Option } = Select;
  const { RangePicker } = DatePicker;
  const [data, setData] = useState([]);
  const [total, setTotals] = useState(0)
  const [cities, setCities] = useState<address[]>([]);
  const [loading, setLoading] = useState(false)
  const [params, setParams] = useImmer({
    city: "",
    createTimeMax: "2021-06-01",
    createTimeMin: "2015-06-01",
    // direction: "",
    orderBy: "createTime",
    page: 1,
    pageSize: 5,
    status: 1,
    title: ""
  })

  let timer: any;
  const colSpan = 5
  const dateFormat = 'YYYY-MM-DD';

  const handleChangeCity = (value) => {
    setParams((draft) => {
      draft.city = value
    })
  }
  const handleChangeTitle = (e) => {
    if (timer) clearTimeout(timer)
    const value = e.target.value
    timer = setTimeout(() => {
      setParams((draft) => {
        draft.title = value
      })
    }, 300)
  }

  const handleChangeStatus = (value) => {
    setParams((draft) => {
      draft.status = value
    })
  }

  const handleSetPage = (value) => {
    setParams((draft) => {
      draft.page = value
    })
  }
  const handleChangeDate = (date) => {
    console.log(date[0].format(dateFormat))
    setParams((draft) => {
      draft.createTimeMin = date[0].format(dateFormat)
      draft.createTimeMax = date[1].format(dateFormat)
    })
  }

  const getSupportCities = useCallback(() => {
    return AddressApi.getSupportCities().then((res) => {
      if (res && Array.isArray(res.list)) {
        setCities(res.list)
      }
    })
  }, [])

  const getHousetList = useCallback(() => {
    setLoading(true)
    return adminApi.getHouseList(params).then((res) => {
      setLoading(false)
      if (res) {
        setTotals(res.total)
        if (Array.isArray(res.list)) {
          const data = dealListData(res.list)
          setData(data)
        }
      }
    })
  }, [params])

  const dealListData = (originData) => {

    return originData.map((item) => {
      return {
        ...item,
        createTime: moment(item.createTime).format('YYYY-MM-DD HH:mm:ss'),
        area: `${item.area} ㎡`,
        price: `¥ ${item.price}`,
        floor: `${item.floor} 层`,
        watchTimes: `${item.watchTimes} 次`,
        statusText: statusMap[item.status].text
      }
    })
  }

  useEffect(() => {
    getSupportCities()
  }, [getSupportCities])

  useEffect(() => {
    getHousetList()
  }, [getHousetList, params])


  return (
    <Style>
      <section className="house-list-wrap">
        <section className='nav-wrap global-flex'>
          <Row justify="start" style={{ marginBottom: '24px' }} gutter={20}>
            <Col span={3}>
              <Select defaultValue="全部城市" onChange={handleChangeCity}>
                {
                  cities?.map((city, index) => (
                    <>
                      <Option value={city?.enName} key={index} >{city.cnName}</Option>
                    </>
                  ))
                }
              </Select>
            </Col>
            <Col span={colSpan}>
              <Select defaultValue='所有状态' onChange={handleChangeStatus}>
                {
                  statusMap?.map((status, index) => (
                    <>
                      <Option value={status.id} key={status.id} >{status.text}</Option>
                    </>
                  ))
                }
              </Select>
            </Col>
            <Col span={6}>
              <RangePicker
                defaultValue={[moment('2015-01-01', dateFormat), moment(new Date(), dateFormat)]}
                format={dateFormat}
                onChange={handleChangeDate}
              />
            </Col>
            <Col span={colSpan}>
              <Input placeholder="请输入房源标题" onChange={handleChangeTitle} />
            </Col>
          </Row>
          <Table
            pagination={{ position: ['bottomCenter'], pageSize: params.pageSize, total: total, onChange: handleSetPage }}
            columns={columns}
            loading={loading}
            dataSource={data}
          />
        </section>
      </section>
    </Style>
  )
}

const Style = styled.div`
.status-card {
  border: 1px solid red;
  padding: 3px 6px;
  border-radius: 4px;
  border: 1px solid ${style['theme-color']};
  font-size: 12px;
  color: ${style['theme-color']};
  text-align: center;
}
.icon-box {
  cursor: pointer;
  &:hover {
    color: ${style['theme-color']}
  }
}
.title {
  font-size: 13px;
  color: ${style['lighter-font']}
}
.ant-select {
  width: 100%;
}

`

export default React.memo(HouseList);