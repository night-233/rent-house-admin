import React, { useEffect, useState, useCallback } from 'react';
import { Select, DatePicker, Input, Col, Row } from 'antd';
import styled from 'styled-components'
import moment from 'moment';
import adminApi from '@/apis/admin'
import { useImmer } from "use-immer";
import AddressApi from "@apis/address";
import style from '@/assets/global-style'
import { Table } from 'antd';
import { FormOutlined } from "@ant-design/icons/lib";
import { NavLink } from 'react-router-dom'

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
    key: 'title',
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
    key: 'cover',
    width: 150,
    render: cover => (
      <>
        <img style={{ width: '120px' }} typeof="Image" src={cover} alt='' />
      </>
    ),
  },
  {
    title: '面积',
    dataIndex: 'area',
    key: 'area',
    width: 80
  },
  {
    title: '价格',
    key: 'price',
    dataIndex: 'price',
    width: 80
  },
  {
    title: '楼层',
    dataIndex: 'floor',
    key: 'floor',
    width: 80
  },
  {
    title: '带看次数',
    dataIndex: 'watchTimes',
    key: 'watchTimes',
    width: 80
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    width: 100
  },
  {
    title: '发布状态',
    dataIndex: 'statusText',
    key: 'statusText',
    width: 90,
    render: (statusText) => (
      <StatusStyle color={statusText.color}>
        <div className='status-card'>
          {statusText.text}
        </div>
      </StatusStyle>
    ),
  },
  {
    title: '操作',
    dataIndex: 'id',
    key: 'id',
    render: (id) => (
      <NavLink to={`/editHouse/${id}`}><div className='icon-box' ><FormOutlined /></div></NavLink>
    ),
    width: 80
  },
];

const StatusStyle = styled.div`
  .status-card {
    border-color: ${props => props.color};
    color: ${props => props.color};
  }
`

const statusMap = [
  { id: 0, text: '未审核', color: '#db162f' },
  { id: 1, text: '审核通过', color: '#51c6cf' },
  { id: 2, text: '已出租', color: '#F0A202' },
  { id: 3, text: '逻辑删除', color: '#db162f' },
]

const { Option } = Select;
const { RangePicker } = DatePicker;

function HouseList (props) {

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
    }, 500)
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
    console.log(date)
    setParams((draft) => {
      draft.createTimeMin = date ? date[0]?.format(dateFormat) : ''
      draft.createTimeMax = date ? date[1]?.format(dateFormat) : ''
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
        statusText: statusMap[item.status],
        key: item.id
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
                  cities?.map((city) => (
                    <Option value={city?.enName} key={city.id} >{city.cnName}</Option>
                  ))
                }
              </Select>
            </Col>
            <Col span={colSpan}>
              <Select defaultValue='所有状态' onChange={handleChangeStatus}>
                {
                  statusMap?.map((status) => (
                    <Option value={status.id} key={status.id} >{status.text}</Option>
                  ))
                }
              </Select>
            </Col>
            <Col span={6}>
              <RangePicker
                format={dateFormat}
                ranges={{
                  Today: [moment(), moment()],
                  'This Month': [moment().startOf('month'), moment().endOf('month')],
                }}
                onChange={handleChangeDate}
              />
            </Col>
            <Col span={colSpan}>
              <Input placeholder="请输入房源标题" onChange={handleChangeTitle} />
            </Col>
          </Row>
          <Table
            className='global-table'
            pagination={{ position: ['bottomCenter'], hideOnSinglePage: true, pageSize: params.pageSize, total: total, onChange: handleSetPage }}
            columns={columns}
            loading={loading}
            bordered={false}
            rowKey={(record: any) => record.id}
            dataSource={data}
          />
        </section>
      </section>
    </Style>
  )
}

const Style = styled.div`
.house-list {
  
}
a {
  color: ${style['lighter-font']}
}
.status-card {
  border: 1px solid red;
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid;
  font-size: 12px;
  text-align: center;
  position: relative;
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