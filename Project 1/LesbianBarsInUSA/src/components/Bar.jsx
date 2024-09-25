import React from "react";

const Bar = (props) => {
    return (
        <td className={"Bar " + props.bar}>
            <img src={props.img}/>
            <h5>{props.bar}</h5>
            <h6>{props.location}</h6>
            <a href={props.web}><button>Visit</button></a>
        </td>
    )
}

export default Bar;