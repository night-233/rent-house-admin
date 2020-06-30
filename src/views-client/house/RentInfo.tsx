import React from "react";
import styled from "styled-components";

/**
 * 租约信息
 */
const RentInfo = () => {

    return (
        <Container>
            <div className="nav-container">
                <h2 className="title">租约信息</h2>
                <div className="rent-info-row"><span className="label">可入住日期</span> <span className="value">随时入住</span></div>
                <div className="rent-info-row"><span className="label">签约时长</span> <span className="value">一年</span></div>
                <div className="rent-info-row"><span className="label">注意事项</span> <span className="value">租房合同签订步骤</span></div>
            </div>
        </Container>
    )
};

const Container = styled.div`
    .rent-info-row{
        color: rgba(0,0,0,.4);
        line-height: 20px;
        margin-top: 18px;
        font-size: 17px;
        .label{
            display: inline-block;
            min-width: 86px;
        }
        .value{
            color: rgba(0,0,0,.85);
            margin-left: 23px;
        }
    }
`;

export default RentInfo;
