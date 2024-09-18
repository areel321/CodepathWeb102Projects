import React from "react";

const Bar = (props) => {
    return (
        <td className={"Bar " + props.color}>
            <h5>{props.event}</h5>
        </td>
    )
}

export default Bar;