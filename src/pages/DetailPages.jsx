import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import icon from "../assets/iconapp.svg";
import { API } from "../config/api";

export default function DetailPages() {
  let navigate = useNavigate();
  const { noreg } = useParams();

  const [dataKendaraanId, setdataKendaraanId] = useState([]);
  useEffect(() => {
    const dataKendaraanId = async () => {
      try {
        const response = await API.get("/kendaraan/" + noreg);
        setdataKendaraanId(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    dataKendaraanId();
  }, [setdataKendaraanId]);

  console.log(dataKendaraanId);

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div>
      <Container className="mt-3 opacity-75">
        <h3>
          <span>
            <img src={icon} style={{ width: "30px" }} className="m-3" alt="" />
          </span>
          Aplikasi Data Kendaraan
        </h3>
        <h5 className="my-3">Detail Data Kendaraan</h5>
        <Card className="bg-detail text-center">
          <Card.Body>
            <h5 className="my-3">
              No. Registrasi Kendaraan :<b> {dataKendaraanId.noreg}</b>
            </h5>
            <h5 className="my-3">Nama Pemilik : {dataKendaraanId.name}</h5>
            <h5 className="my-3">Merk Kendaraan : {dataKendaraanId.brand}</h5>
            <h5 className="my-3">
              Alamat Pemilik Kendaraan : {dataKendaraanId.address}
            </h5>
            <h5 className="my-3">Tahun Pembuatan : {dataKendaraanId.years}</h5>
            <h5 className="my-3">
              Kapasitas Silinder : {dataKendaraanId.capacity} cc
            </h5>
            <h5 className="my-3">Warna Kendaraan : {dataKendaraanId.colour}</h5>
            <h5 className="my-3">Bahan Bakar : {dataKendaraanId.fuel}</h5>
          </Card.Body>
        </Card>
        <Button onClick={handleBack} className="my-3">
          Kembali
        </Button>
      </Container>
    </div>
  );
}
