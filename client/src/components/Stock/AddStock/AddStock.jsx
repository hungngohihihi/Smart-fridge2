import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const AddStock = ({ getStocks, locationList, setAddVisibility, addVisible }) => {
  let today = new Date();
  let todayMonth =
    today.getMonth() + 1 < 10
      ? `0${today.getMonth() + 1}`
      : `${today.getMonth() + 1}`;
  let todayDate = `${today.getFullYear()}-${todayMonth}-${today.getDate()}`;
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [quantity, setQuantity] = useState("");
  const [success, setSuccess] = useState(false);
  const [expiration, setExpiration] = useState(todayDate);

  const addStock = async (e) => {
    e.preventDefault();
    const body = { name, location, quantity, expiration };
    await fetch("/api/stocks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setName("");
    setLocation(locationList[0] ? locationList[0].name : "");
    setQuantity("");
    setExpiration(todayDate);
    getStocks();
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Created item successful",
      confirmButtonText: '<div class="fa fa-thumbs-up"}>OK</div>',
    }).then((result) => {
      if (result.isConfirmed) setSuccess(true);
    });
  };

  useEffect(() => {
    setLocation(locationList[0] ? locationList[0].name : "");
  }, []);

  useEffect(() => {
    // Gọi hàm getPosts khi component cha được render hoặc khi có sự thay đổi trong posts
    getStocks();
  }, []);

  useEffect(() => {
    if (success) {
      // Set opacity to 0 to close the pop-up
      setAddVisibility(false); // Assuming setAddVisibility is a function to control the visibility
    }
  }, [success]);

  return (
    <div
      className="add-stock-modal"
      style={{
        opacity: addVisible ? "1" : "0",
        pointerEvents: addVisible ? "auto" : "none",
      }}
    >
      <form
        className="add"
        onSubmit={(e) => {
          addStock(e);
        }}
      >
        <h1 className="modal-title">Add a stock</h1>
        <div className="input-container">
          <div className="input">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Stock Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
          </div>

          <div className="input">
            <label htmlFor="location">Location</label>
            <select
              name="location"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
              }}
            >
              {locationList.map((location, key) => {
                return (
                  <option key={key} value={location.name}>
                    {location.name}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="input">
            <label htmlFor="quantity">Quantity</label>
            <input
              type="number"
              name="quantity"
              min="0"
              placeholder="Stock Quantity"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
              required
            />
          </div>
          <div className="input">
            <label htmlFor="expiration">Expiration</label>
            <input
              name="expiration"
              type="date"
              value={expiration}
              placeholder="MM/DD/YYYY"
              onChange={(e) => {
                setExpiration(e.target.value);
              }}
              required
            />
          </div>
        </div>
        <div className="btn-container">
          <button type="submit">Add</button>
          <button
            type="button"
            onClick={() => {
              setAddVisibility(false);
            }}
          >
            Close
          </button>
        </div>
      </form>
      <div
        className="modal-background"
        onClick={() => {
          setAddVisibility(false);
        }}
      ></div>
    </div>
  );
};

export default AddStock;
