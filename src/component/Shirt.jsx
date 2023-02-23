import React, { useState } from "react";
import shirt from "../img/shirtFrame.png";
import axios from "axios";
import { Image } from "cloudinary-react";
import "./Shirt.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown, Button, Form } from "react-bootstrap";
import Draggable from "react-draggable";
const Shirt = () => {
  //bximqdsn
  const [image, setImage] = useState("");
  const [publicId, setPublicId] = useState("");
  const [color, setColor] = useState("white");
  const [size, setSize] = useState("100");

  console.log(color);
  function uploadImage() {
    console.log(image[0]);
    const formData = new FormData();
    formData.append("file", image[0]);
    formData.append("upload_preset", "bximqdsn");

    axios
      .post("https://api.cloudinary.com/v1_1/dl3d51t8b/image/upload", formData)
      .then((response) => setPublicId(response.data.public_id));
  }

  function handleChange(e) {
    console.log(e.target);
    setSize(e.target.value);
  }
  return (
    <>
      <h2>Editar camiseta</h2>
      <div className="d-flex  justify-content-center">
        <div className="col-8 d-flex">
          <input
            class="form-control"
            type="file"
            onChange={(e) => setImage(e.target.files)}
          />
          <Button variant="light" onClick={uploadImage}>
            Cargar
          </Button>
        </div>
      </div>

      <br />

      <div>
        <div className="container" style={{ border: "1px solid red" }}>
          <img
            className="image1"
            style={{ backgroundColor: `${color}` }}
            src={shirt}
            alt="Shirt Frame"
          />

          {publicId ? (
            <Draggable
              bounds={{ left: -150, top: -200, right: 50, bottom: 10 }}
            >
              <Image
                className="overlay"
                style={{ width: `${size}px` }}
                cloudName="dl3d51t8b"
                publicId={`https://res.cloudinary.com/dl3d51t8b/image/upload/v1677110992/${publicId}.png`}
              />
            </Draggable>
          ) : (
            <p></p>
          )}
        </div>
        <div className="mt-3">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Seleccionar Color
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1" onClick={() => setColor("blue")}>
                Azul
              </Dropdown.Item>
              <Dropdown.Item href="#/action-2" onClick={() => setColor("red")}>
                Rojo
              </Dropdown.Item>
              <Dropdown.Item
                href="#/action-3"
                onClick={() => setColor("white")}
              >
                Blanco
              </Dropdown.Item>
              <Dropdown.Item
                href="#/action-4"
                onClick={() => setColor("black")}
              >
                Negro
              </Dropdown.Item>
              <Dropdown.Item
                href="#/action-5"
                onClick={() => setColor("green")}
              >
                Verde
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="d-flex justify-content-center">
          <div className="col-5">
            <Form.Label>Zoom</Form.Label>
            <Form.Range
              min="100"
              max="180"
              step="10"
              onChange={(e) => handleChange(e)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Shirt;
