//Content.js
import React, { useState } from "react";
import { useAsync } from "react-async";
import { fetchFood } from "./FoodApi";

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
  const [reSyncApi, setreSyncApi] = useState<boolean>(false);

  const buildTableHeader = () => {
    return (
      <>
        <div className="one">Name</div>
        <div className="two">Typ</div>
        <div className="three">Kaufen</div>
      </>
    );
  };

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
          <div className="grid_wrapper_heading">{buildTableHeader()}</div>
          <div className="grid_wrapper">
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
                  <div className="one">{foodArr["name"]}</div>
                  <div className="two">{foodArr["type"]}</div>
                  <div className="three">Buy at a random store</div>
                </>
              );
            })}
          </div>
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
    setreSyncApi(!reSyncApi);
  };
  const setStatusFruits = () => {
    setshowFruits(!showFruits);
    setreSyncApi(!reSyncApi);
  };
  const setStatusSalat = () => {
    setshowSalat(!showSalat);
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
      <section className="section__wrapper" id="section--food--list">
        <div className="section__title">
          <h2 className="section__description">Es ist {currentMonth}</h2>
          <h3 className="section__header">
            Übersicht für den aktuellen Monat
            <br />
            Saisonal & Regional sind
          </h3>
          <br />
          <div className="food_info__tab-container">
            <label className="switch">
              <input
                className="switch-input"
                type="checkbox"
                id="toggleVegetables"
                onChange={setStatusVegetables}
              />
              <span
                className="switch-label"
                data-on="Gemüse"
                data-off="Gemüse"
              ></span>
              <span className="switch-handle"></span>
            </label>
            <label className="switch">
              <input
                className="switch-input"
                type="checkbox"
                id="toggleSalat"
                onChange={setStatusSalat}
              />
              <span
                className="switch-label"
                data-on="Salat"
                data-off="Salat"
              ></span>
              <span className="switch-handle"></span>
            </label>
            <label className="switch">
              <input
                className="switch-input"
                type="checkbox"
                id="toggleFruit"
                onChange={setStatusFruits}
              />
              <span
                className="switch-label"
                data-on="Früchte"
                data-off="Früchte"
              ></span>
              <span className="switch-handle"></span>
            </label>
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
          {buildTableBody(isPending, data, error)}
        </div>
      </section>
      <section className="section__wrapper" id="section--about">
        <div className="section__wrapped">
          <h2 className="section__description">About</h2>
          <h3 className="section__header">...</h3>
        </div>
        <div className="section__wrapped">
          <h2 className="section__description">How it started</h2>
          <h3 className="section__header">...</h3>
        </div>
      </section>
      <section className="section__wrapper" id="section--api-doc">
        <div className="section__wrapped">
          <h2 className="section__description">API documentation</h2>
          <h3 className="section__header">...</h3>
        </div>
      </section>
    </main>
  );
};
export default Content;
