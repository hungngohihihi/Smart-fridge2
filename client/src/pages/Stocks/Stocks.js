import React, { useState, useEffect } from "react";
import ListStocks from "../../components/Stock/ListStock";
import AddStock from "../../components/Stock/AddStock";
import SearchStock from "../../components/Stock/SearchStock";
import Notification from "../../components/Noti/Notification";
import "./stocks.scss";

const Stocks = ({ isMobile, locationList, username }) => {
  document.title = "FridgeMan - Stocks";

  const [addVisible, setAddVisibility] = useState(false);
  const [searchVisible, setSearchVisibility] = useState(false);

  const [stocks, setStocks] = useState([]);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("all-locations");

  const [listExpired, setList] = useState([]);

  const getDifDays = (expiration) => {
    let today = new Date();
    let expDate = new Date(expiration);
    return Math.round((expDate - today) / (1000 * 3600 * 24) + 1);
  };

  const getStocks = async () => {

    await fetch("/api/stocks")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setStocks(data);
        const listExpiration = [];

        data.forEach(item => {
          if (getDifDays(item.expiration) < 0) {
            listExpiration.push(`"${item.name}" has expired!`);
          }
        });

        setList(listExpiration);
      });

  };

  useEffect(() => {
    getStocks();
  }, []);

  return (
    <div className="stocks page">
      <div className="stock-content">
        <h3>{username}'s</h3>
        <h1>Stock List</h1>
        <div className="navigation-buttons">
          <button
            onClick={() => {
              setAddVisibility(true);
            }}
          >
            Add Item
          </button>
          <button
            onClick={() => {
              setSearchVisibility(true);
            }}
          >
            Search Item
          </button>
        </div>
        <AddStock
          locationList={locationList}
          getStocks={getStocks}
          setAddVisibility={setAddVisibility}
          addVisible={addVisible}
        />
        <SearchStock
          name={name}
          location={location}
          setName={setName}
          setLocation={setLocation}
          locationList={locationList}
          setStocks={setStocks}
          setSearchVisibility={setSearchVisibility}
          searchVisible={searchVisible}
        />
        <ListStocks
          locationList={locationList}
          getStocks={getStocks}
          stocks={stocks}
          setStocks={setStocks}
          isMobile={isMobile}
        />
      </div>
      <Notification
        listMessage={listExpired}
      />
    </div>
  );
};

export default Stocks;