import React from "react";
import {withRouter} from "react-router-dom";

/**
 * 编辑房源
 * @constructor
 */
const index = (props) => {

    const {location} = props;

    return (
        <div>
            房源编辑: {location}
        </div>
    )
}

export default withRouter(index);
