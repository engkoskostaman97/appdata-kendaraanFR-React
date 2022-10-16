import React, { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import icon from "../assets/iconapp.svg";
import { API } from "../config/api";

export default function EditPages() {
  const { noreg } = useParams();

  const [form, setForm] = useState({
    noreg: "",
    name: "",
    address: "",
    brand: "",
    years: "",
    capacity: "",
    colour: "",
    fuel: "",
  });

  let { data: kendaraan1 } = useQuery("kendaraan2", async () => {
    const response = await API.get("/kendaraan/" + noreg);
    setForm({
      ...form,
      noreg: response.data.noreg,
      name: response.data.name,
      address: response.data.address,
      brand: response.data.brand,
      years: response.data.years,
      capacity: response.data.capacity,
      colour: response.data.colour,
      fuel: response.data.fuel,
    });
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      await API.patch("/kendaraan", form);
      alert("data berhasil dirubah");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <div>
      <Container className="mt-3 opacity-75">
        <h3>
          <span>
            <img src={icon} style={{ width: "30px" }} className="m-3" alt="" />
          </span>
          Aplikasi Data Kendaraan
        </h3>
        <h5 className="my-3">Edit Data Kendaraan</h5>
        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
          <Row>
            <Col>
              <Row>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>No. Register Kendaraan</Form.Label>
                    <Form.Control
                      type="text"
                      name="noreg"
                      id="noreg"
                      value={form.noreg}
                      onChange={handleChange}
                      disabled
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Nama Pemilik</Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      id="name"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Merk Kendaraan</Form.Label>
                    <Form.Control
                      type="text"
                      name="brand"
                      id="brand"
                      value={form.brand}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Alamat Pemilik Kendaraan</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="address"
                      id="address"
                      value={form.address}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col xs={12} md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Tahun Pembuatan</Form.Label>
                    <Form.Control
                      type="number"
                      name="years"
                      id="years"
                      value={form.years}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Kapasitas Silinder</Form.Label>
                    <Form.Control
                      type="number"
                      name="capacity"
                      id="capacity"
                      value={form.capacity}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Warna Kendaraan</Form.Label>
                    <select
                      className="form-select"
                      name="colour"
                      id="colour"
                      value={form.colour}
                      onChange={handleChange}
                      required
                    >
                      <option disabled>Pilih Warna Kendaraan</option>
                      <option value="Merah">Merah</option>
                      <option value="Hitam">Hitam</option>
                      <option value="Biru">Biru</option>
                      <option value="Abu-abu">Abu-abu</option>
                      <option value="Hijau">Hijau</option>
                    </select>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Bahan Bakar</Form.Label>
                    <select
                      className="form-select"
                      name="fuel"
                      id="fuel"
                      value={form.fuel}
                      onChange={handleChange}
                      required
                    >
                      <option disabled>Pilih Bahan Bakar</option>
                      <option value="Solar">Solar</option>
                      <option value="Bensin">Bensin</option>
                      <option value="Diesel">Diesel</option>
                    </select>
                  </Form.Group>
                </Col>
              </Row>
              <Button type="submit" style={{ width: "100px" }}>
                Ubah
              </Button>
              <Link to={"/"}>
                <Button
                  variant="secondary"
                  className="ms-2"
                  style={{ width: "100px" }}
                >
                  Kembali
                </Button>
              </Link>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
}
