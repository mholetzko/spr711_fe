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
                                <div className="col-md-3 pb-1 pb-md-0">
                                    <div className="card">
                                        <div className="card-header">
                                            <img justify-content="center" width="20%" src={Logo} alt="Card image cap" className="rounded" />
                                        </div>
                                        <div className={getClassFromFoodType(foodArr["type"])}>
                                            <h5 className="card-title">{foodArr["name"]}</h5>
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
        setShowHarvest(true);
        setreSyncApi(!reSyncApi);
        document
            .getElementById("showStorage")
            ?.classList.remove("food_info__tab--active");
        document
            .getElementById("showHarvest")
            ?.classList.add("food_info__tab--active");
    };

    const setStatusStorage = () => {
        setShowHarvest(false);
        setreSyncApi(!reSyncApi);
        document
            .getElementById("showHarvest")
            ?.classList.remove("food_info__tab--active");
        document
            .getElementById("showStorage")
            ?.classList.add("food_info__tab--active");
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
                    <div className="container">
                        <div className="row text-center">
                            
                            <div className="col-md-4 pb-1 pb-md-0">
                                <button  type="button" onClick={setStatusVegetables} id="veggie-button" className="btn btn-outline-success active"  >{Veggie}Vegetables</button></div>
                            <div className="col-md-4 pb-1 pb-md-0">
                                <button type="button" onClick={setStatusFruits} id="fruit-button" className="btn btn-outline-success active"  >{Fruit}Fruit</button></div>
                            <div className="col-md-4 pb-1 pb-md-0">
                                <button type="button" onClick={setStatusSalat} id="salat-button" className="btn btn-outline-success active"  >{Salat}Salat</button></div>
                        </div>
                    </div>
                </div>
                <div className="food_info">
                    <div className="food_info__tab-container">
                        <button
                            className="btn food_info__tab food_info__tab--1 food_info__tab--active"
                            id="showHarvest"
                            onClick={setStatusHarvest}
                        >
                            Frisch vom Feld
                        </button>
                        <button
                            className="btn food_info__tab food_info__tab--2"
                            id="showStorage"
                            onClick={setStatusStorage}
                        >
                            Aus dem Lager
                        </button>
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
