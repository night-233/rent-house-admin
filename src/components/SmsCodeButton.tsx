import React, {CSSProperties, useEffect, useState} from "react";
import styled from "styled-components";
import {Button, Modal} from "antd";
import Tools from "@utils/tools";
import openApi from "@apis/open";
import SlideImageVerify from "@components/SlideImageVerify";



interface SmsCodeButtonProps {
    style?: CSSProperties,
    phone: string,
    operateType: ("resetPassword" | "login" | "signUp"),
}

/**
 * 发送短信按钮
 * Created by Administrator on 2020/8/12
 */
const SmsCodeButton = (props: SmsCodeButtonProps) => {

    const {style, phone, operateType} = props;


    const [timer, setTimer] = useState({
        count: 60,
        active: false
    });

    const [sendSmsBtn, setSendSmsBtn] = useState<any>({
        text: "获取验证码",
        disabled: false,
        sending: false
    });

    const [verifyVisible, setVerifyVisible] = useState(false);

    // 获取验证码倒计时
    useEffect(() => {
        let timeout: any = null;
        if(timer.active){
            if(timer.count === 0){
                setTimer({active: false, count: 60});
                setSendSmsBtn({text: "获取验证码", disable: false, sending: false});
            }else{
                timeout = setTimeout(() => {
                    const nextCount = timer.count - 1;
                    setTimer({active: true, count: nextCount});
                    setSendSmsBtn({text: "重新获取" + nextCount, disable: true, sending: false});
                }, 1000);
            }
        } else if (!timer.active && timer.count !== 0) {
            clearTimeout(timeout);
        }
        return () => clearTimeout(timeout);
    }, [timer]);

    const handleClick = () => {
        setVerifyVisible(true);

    };
    const handleVerifySuccess = (code) => {
      setVerifyVisible(false);
      openApi.sendMessage({  operationType: operateType,
          phoneNumber: phone, verifyCode: code}).then(res => {
          if(res){
              setTimer({count: 60, active: true});
              setSendSmsBtn({text: "重新获取" + 60, disable: true, sending: false});
          }else{
              setSendSmsBtn({text: "获取验证码", disable: false, sending: false});
          }
      });
    };

    return (
        <Container>
            <Button type="primary"
                    style={{height: 45, width: 116, borderRadius: 3, marginLeft: 10, ...style}}
                    onClick={handleClick}
                    loading={sendSmsBtn.sending}
                    disabled={(!(phone && Tools.checkPhone(phone)) || sendSmsBtn.disable)}>
                {sendSmsBtn.text}
            </Button>
            <Modal visible={verifyVisible} footer={null} title="请完成安全验证" width={350} onCancel={() => setVerifyVisible(false)}>
                <div style={{ width: 300, paddingTop: 150}}>
                    <SlideImageVerify phone={phone} visible={verifyVisible} onSuccess={handleVerifySuccess} defaultActive={true}/>
                </div>
            </Modal>
        </Container>

    )
};
const Container = styled.div`

`;

export default SmsCodeButton;
