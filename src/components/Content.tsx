//Content.js
import React, { useState } from "react";
import { useAsync } from "react-async";
import { fetchFood } from "./FoodApi";
import Logo from "../logo.png"

const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
interface IApiSample {
    name: String;
    type: String;
    harvest_season: [String];
    storage_season: [String];
}

let dateObj = new Date();
let month = dateObj.getUTCMonth();
const currentMonth: String = monthNames[month];

const Content = () => {
    const [showHarvest, setShowHarvest] = useState<boolean>(true);
    const [harvestString, setHarvestString] = useState<string>("Frisch vom Feld");
    const [showFruits, setshowFruits] = useState<boolean>(true);
    const [showSalat, setshowSalat] = useState<boolean>(true);
    const [showVegetables, setshowVegetables] = useState<boolean>(true);
    const [Veggie, setVeggie] = useState<string>("✅ ");
    const [Fruit, setFruit] = useState<string>("✅ ");
    const [Salat, setSalat] = useState<string>("✅ ");
    const [reSyncApi, setreSyncApi] = useState<boolean>(false);

    const getClassFromFoodType = (type:String):string=>{
         if(type === "Salat"){
             return "App-card-body-fruit"
         } else if(type === "Vegetable") {
             return "App-card-body-fruit"
         } else {
             return "App-card-body-fruit"
         }
    }

    const buildTableBody = (pending: boolean, data: any, error: any) => {
        if (pending) {
            return (
                <div className="grid_wrapper">
                    <div className="one">Loading data ...</div>
                </div>
            );
        } else if (error) {
            return (
                <div className="grid_wrapper">
                    <div className="one">Could not fetch API ...</div>
                </div>
            );
        } else {
            let input: [IApiSample] = data["data"]["food_by_month"];

            return (
                <>
                        {input.map((foodArr) => {
                            if (foodArr["type"] === "Fruit" && !showFruits) {
                                return <> </>;
                            }
                            if (foodArr["type"] === "Vegetable" && !showVegetables) {
                                return <> </>;
                            }
                            if (foodArr["type"] === "Salat" && !showSalat) {
                                return <> </>;
                            }
                            return (
                                <>
                                <div className="col-md-2 pb-3 pb-md-3">
                                    <div className="card">
                                        <div className="card-header">
                                            <img justify-content="center" width="20%" src={Logo} alt="Card image cap" className="rounded" />
                                        </div>
                                        <div className={getClassFromFoodType(foodArr["type"])}>
                                            <div className="card-title">{foodArr["name"]}</div>
                                        </div>
                                    </div>
                                </div>
                                </>
                            );
                        })}
                </>
            );
        }
    };

    let { data, error, isPending } = useAsync({
        promiseFn: fetchFood,
        harvest: showHarvest,
        watch: reSyncApi,
    });

    const setStatusVegetables = () => {
        setshowVegetables(!showVegetables);
        if (!showVegetables) {
            document
                .getElementById("veggie-button")
                ?.classList.add("active");
                setVeggie("✅ ")
        } else {
            document
                .getElementById("veggie-button")
                ?.classList.remove("active");
                setVeggie("❎ ")
        }
        setreSyncApi(!reSyncApi);

    };
    const setStatusFruits = () => {
        setshowFruits(!showFruits);
        if (!showFruits) {
            document
                .getElementById("fruit-button")
                ?.classList.add("active");
                setFruit("✅ ")
        } else {
            document
                .getElementById("fruit-button")
                ?.classList.remove("active");
                setFruit("❎ ")
        }
        setreSyncApi(!reSyncApi);
    };
    const setStatusSalat = () => {
        setshowSalat(!showSalat);
        if (!showSalat) {
            document
                .getElementById("salat-button")
                ?.classList.add("active");
                setSalat("✅ ")
        } else {
            document
                .getElementById("salat-button")
                ?.classList.remove("active");
                setSalat("❎ ")
        }
        setreSyncApi(!reSyncApi);
    };

    const setStatusHarvest = () => {
        setShowHarvest(!showHarvest);        
        if (!showHarvest) {
        document
            .getElementById("showStorage")
            ?.classList.add("active");
            setHarvestString("Frisch vom Feld")
        } else {
        document
            .getElementById("showHarvest")
            ?.classList.remove("active");
            setHarvestString("Aus dem Lager")
        }
        setreSyncApi(!reSyncApi);
    };

    return (
        <main className="content">
            <section>
                <div className="jumbotron text-center mt-2">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h1>Es ist {currentMonth}</h1>
                                <p>            Übersicht für den aktuellen Monat
                                    <br />
                                    Saisonal & Regional sind</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section__title">
                <div className="App-container-fluid">
                    <div className="row text-center mt-4">
                            <div className="col-md-3 pb-3 pb-md-3">
                                <button  type="button" onClick={setStatusVegetables} id="veggie-button" className="btn btn-outline-success active"  >{Veggie}Vegetables</button></div>
                            <div className="col-md-3 pb-3 pb-md-3">
                                <button type="button" onClick={setStatusFruits} id="fruit-button" className="btn btn-outline-success active"  >{Fruit}Fruit</button></div>
                            <div className="col-md-3 pb-3 pb-md-3">
                                <button type="button" onClick={setStatusSalat} id="salat-button" className="btn btn-outline-success active"  >{Salat}Salat</button>
                            </div>
                            <div className="col-md-3 pb-3 pb-md-3">
                                <button type="button" onClick={setStatusHarvest} id="showStorage" className="btn btn-outline-success active"  >{harvestString}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="App-pre-scrollable"> 
                <div className="App-container-fluid">
                    <div className="row text-center mt-4">
                        {buildTableBody(isPending, data, error)}
                    </div>
                </div>
            </section>
            <section className="section__wrapper" id="section--about">
                <div className="jumbotron text-center mt-2">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h1>About</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section__wrapped">
                    <h3 className="App-section">...</h3>
                </div>
            </section>
            <section className="section__wrapper" id="section--api-doc">
                <div className="jumbotron text-center mt-2">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <h1>API documentation</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="section__wrapped">
                    <h3 className="App-section">...</h3>
                </div>
            </section>
        </main>
    );
};
export default Content;
