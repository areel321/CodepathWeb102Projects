import React from "react";
import Bar from "./Bar";
import arcanadurham from "../assets/arcanadurham.jpeg";
import boycottbar from "../assets/boycotbar.png";
import cubbyhole from "../assets/cubbyhole.png";
import dorothys from "../assets/dorothys.jpg";
import femme from "../assets/femme.png";
import gossipgrill from "../assets/gossipgrill.png";
import honeys from "../assets/honeys.png";
import jolenes from "../assets/jolenes.png";
import nobodysdarling from "../assets/nobodysdarling.png";
import scarletfox from "../assets/scarletfox.png";
import therubyfruit from "../assets/therubyfruit.png";
import wildsidewest from "../assets/wildsidewest.png";



const BarCards = () => {
    return (
        <div className="BarCards">
            <table>
                <tbody>
                    <tr>
                        <td>
                        <Bar bar="Arcana Durham" location="Durham, NC" img={arcanadurham} web="https://www.arcanadurham.com/gallery"/>
                        </td>
                        <td>
                        <Bar bar="Boycott Bar" location= "Phoenix, az" img={boycottbar} web="https://www.boycottbarphx.com/"/>
                        </td>
                        <td>
                        <Bar bar="CubbyHole" location="New York City, NY" img={cubbyhole} web="https://www.cubbyholebar.com/"/>
                        </td>
                        <td>
                        <Bar bar="Dorothy" location="Chicago, IL" img={dorothys} web="https://www.dorothydownstairs.com/hello"/>
                        </td>  
                    </tr>
                    <tr>
                        <td>
                        <Bar bar="Femme" location="Worcester, MA" img={femme} web="https://www.femmebarworcester.com/"/>
                        </td>
                        <td>
                        <Bar bar="Gossip Grill" location="San Diego, CA" img={gossipgrill} web="https://gossipgrill.com/"/>
                        </td>
                        <td>
                        <Bar bar="Honey's" location="Los Angeles, CA" img={honeys} web="https://www.honeysla.com/"/>
                        </td>
                        <td>
                        <Bar bar="Jolene's" location="San Francisco, CA" img={jolenes} web="https://www.jolenessf.com/"/>
                        </td>  
                    </tr>
                    <tr>
                        <td>
                        <Bar bar="Nobody's Darling" location="Chicago, IL" img={nobodysdarling} web="https://www.nobodysdarlingbar.com/"/>
                        </td>
                        <td>
                        <Bar bar="Scarlet Fox" location="San Francisco, CA" img={scarletfox} web="https://scarletfoxsf.com/"/>
                        </td>
                        <td>
                        <Bar bar="The Ruby Fruit" location="Los Angeles, CA" img={therubyfruit} web="https://www.therubyfruit.com/"/>
                        </td>
                        <td>
                        <Bar bar="Wild Side West" location="San Francisco, CA" img={wildsidewest} web="https://www.wildsidewest.com/"/>
                        </td>  
                    </tr>
                    
                </tbody>
            </table>
        </div>
    )
}

export default BarCards;