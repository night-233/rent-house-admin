import React from "react";
import {withRouter} from "react-router-dom";

/**
 * 编辑房源
 * @constructor
 */
const index = (props) => {

    const {location, match} = props;

    console.log(match)
    return (
        <div>
            房源编辑: {match.params.houseId}
        </div>
    )
}

export default withRouter(index);
