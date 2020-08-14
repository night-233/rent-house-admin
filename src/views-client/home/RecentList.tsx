import React, {useEffect, useState} from "react";
import {Col, Row, Spin} from "antd";
import styled from "styled-components";
import {HouseBox} from "./HouseList";
import StorageUtil from "@utils/storage";
import {BROWSER_HISTORY_KEY} from "@views-client/house";
import HouseApi from "@apis/house";

const RecentList = () => {


    const [recentBrowser, setRecentBrowser] = useState<any>([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const browserList = StorageUtil.get(BROWSER_HISTORY_KEY);
        if(browserList instanceof Array){
            getRecentBrowser(browserList)
        }
        const handler = (e) => {
            if(e.key === BROWSER_HISTORY_KEY && (e.oldValue?.toString() !== e.newValue?.toString())){
                const newValue = e.newValue;
                const arr = JSON.parse(newValue);
                if(arr instanceof Array){
                    getRecentBrowser(arr);
                }
            }
        };
        window.addEventListener("storage", handler);
        return () => {
            window.removeEventListener("storage", handler);
        }
    }, []);

    // 获取最近浏览数据
    const getRecentBrowser = (houseIdList) => {
        setLoading(true);
        HouseApi.findAllByIds(houseIdList).then(res => {
            setLoading(false);
            if(res){
                setRecentBrowser(res.list);
            }
        })
    };

    return (
    <RecentViewContainer>
        {
            recentBrowser.length > 0 &&
                <>
                    <h1>最近浏览</h1>
                    <Spin spinning={loading}>
                        <Row gutter={[21, 21]}>
                            {
                                recentBrowser.map(item => <Col span={8} key={item.id}><HouseBox data={item}/></Col>)
                            }
                        </Row>
                    </Spin>
                </>
        }
    </RecentViewContainer>
    )
};
const RecentViewContainer = styled.div`
    h1{
        color: rgba(0,0,0,.85);
        margin: 40px 0 20px;
        font-size: 24px;
        font-weight: bold;
    }
`;
export default RecentList;
