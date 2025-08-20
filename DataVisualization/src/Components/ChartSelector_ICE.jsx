import React, {useState} from "react";
import ElevationChart from "./ElevationChart";
import CorrosionRate from "./CR";
import CorrosionRate2 from "./CR_Sce2";
import Consolidated_CorrosionRate from "./Consolidated_CR";
import WallLoss from "./WallLoss";
import PressureDrop from "./PressureDrop";
import TemperatureDrop from "./TemperatureDrop";
import InclinationAngleChart from "./InclinationAngle";
import FlowRegime from "./FlowRegime";
import VelocityProfile from "./velocityProfile";
import AvgHL from "./AvgHL";

const ChartSelector_ICE = () => {
    console.log("ChartSelector_ICE rendered");
    const [selectedChart, setSelectedChart] = useState([]);

    const handleCheckboxChange = (chartId) => {
       setSelectedChart((prevSelected) => 
    prevSelected.includes(chartId) ? prevSelected.filter((id) => id !== chartId): // uncheck
       [...prevSelected, chartId]
 ); // check
    };

     return (
        <div style={{ padding: "1rem", fontSize: '20px'}}>
            <h2>Select a chart for IC:</h2>

            <label style={{cursor: 'pointer'}}>
                <input type="checkbox"
                checked={selectedChart.includes("elevation")}
                onChange={() => handleCheckboxChange("elevation")} />
                Liquid Hold-Up
            </label>

            <br />

            <label style={{cursor: 'pointer'}}>
                <input type="checkbox"
                checked={selectedChart.includes("corrosionRate")}
                onChange={() => handleCheckboxChange("corrosionRate")} />
                Corrosion Rate Scenario-1
            </label>

            <br />

            <label style={{cursor: 'pointer'}}>
                <input type="checkbox"
                checked={selectedChart.includes("corrosionRate2")}
                onChange={() => handleCheckboxChange("corrosionRate2")} />
                Corrosion Rate Scenario-2
            </label>

            <br />

            <label style={{cursor: 'pointer'}}>
                <input type="checkbox"
                checked={selectedChart.includes("consolidated_corrosionRate")}
                onChange={() => handleCheckboxChange("consolidated_corrosionRate")} />
                Consolidated Corrosion Rate
            </label>
            <br />

             <label style={{cursor: 'pointer'}}>
                <input type="checkbox"
                checked={selectedChart.includes("wallLoss")}
                onChange={() => handleCheckboxChange("wallLoss")} />
                % Wall-Loss
            </label>

            <br />

             <label style={{cursor: 'pointer'}}>
                <input type="checkbox"
                checked={selectedChart.includes("pressureDrop")}
                onChange={() => handleCheckboxChange("pressureDrop")} />
                Pressure Drop
            </label>

            <br />

             <label style={{cursor: 'pointer'}}>
                <input type="checkbox"
                checked={selectedChart.includes("temperatureDrop")}
                onChange={() => handleCheckboxChange("temperatureDrop")} />
                Temperature Drop
            </label>

            <br />

            <label style={{cursor: 'pointer'}}>
                <input type="checkbox"
                checked={selectedChart.includes("velocityProfile")}
                onChange={() => handleCheckboxChange("velocityProfile")} />
                Velocity Profile
            </label>

             <br />

             <label style={{cursor: 'pointer'}}>
                <input type="checkbox"
                checked={selectedChart.includes("inclinationAngle")}
                onChange={() => handleCheckboxChange("inclinationAngle")} />
                Inclination Angle
            </label>

            <br />

             <label style={{cursor: 'pointer'}}>
                <input type="checkbox"
                checked={selectedChart.includes("flowRegime")}
                onChange={() => handleCheckboxChange("flowRegime")} />
                Flow Regime
            </label>

            <br/>

            <label style={{cursor: 'pointer'}}>
                <input type="checkbox"
                checked={selectedChart.includes("dex")}
                onChange={() => handleCheckboxChange("dex")} />
                Liquid HoldUp vs DEx
            </label>

             {selectedChart.includes("elevation") && <ElevationChart/>}
             {selectedChart.includes("corrosionRate") && <CorrosionRate/>}
             {selectedChart.includes("corrosionRate2") && <CorrosionRate2/>}
             {selectedChart.includes("consolidated_corrosionRate") && <Consolidated_CorrosionRate/>}
             {selectedChart.includes("wallLoss") && <WallLoss/>}
             {selectedChart.includes("pressureDrop") && <PressureDrop/>}
             {selectedChart.includes("temperatureDrop") && <TemperatureDrop/>}
             {selectedChart.includes("velocityProfile") && <VelocityProfile/>}
             {selectedChart.includes("inclinationAngle") && <InclinationAngleChart/>}
             {selectedChart.includes("flowRegime") && <FlowRegime/>}
              {selectedChart.includes("dex") && <AvgHL/>}
             
            </div>
            )
}
export default ChartSelector_ICE
           