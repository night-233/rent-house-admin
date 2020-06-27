import {Input} from 'antd';
import React, {useEffect, useState} from "react";

/**
 * 数字输入框
 * @param props
 */
const NumericInput = (props) =>  {

    const {onChange, value } = props;




    const [numberValue, setNumberValue] = useState("");

    useEffect(() => {
        setNumberValue(value)
    }, [value])

    const handleChange = e => {
        const { value } = e.target;
        const reg = /^[0-9]*[1-9][0-9]*$/;
        if ((!isNaN(value) && reg.test(value)) || value === '' || value === '-') {
            setNumberValue(value);
            onChange && onChange(value);
        }
    };

    return(
            <Input
                {...props}
                value={value || numberValue}
                onChange={handleChange}
                maxLength={25}
            />
    );
};

export default NumericInput;
