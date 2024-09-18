import React from "react";
import Bar from "./Bar";

const BarCards = () => {
    return (
        <div className="BarCards">
            <table>
                <tbody>
                    <tr>
                        <td>hello</td>
                        <Bar bar="what's up" color="green"/>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default BarCards;