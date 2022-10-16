import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Table,
} from "react-bootstrap";
import { useMutation, useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import icon from "../assets/iconapp.svg";
import { API } from "../config/api";

export default function Monitoring() {
  let navigate = useNavigate();

  let { data: kendaraan, refetch } = useQuery("kendaraanCache", async () => {
    const response = await API.get("/kendaraan");
    return response.data;
  });

  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };

  const handleDeletes = () => {
    setConfirmDelete(true);
  };

  const deleteById = useMutation(async (id) => {
    try {
      await API.delete("/kendaraan/" + id);
      refetch();
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    if (confirmDelete) {
      handleClose();
      deleteById.mutate(idDelete);
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

  const handleDetail = (id) => {
    navigate("/detail-data/" + id);
  };
  const handleUpdate = (id) => {
    navigate("/edit-data/" + id);
  };

  const [filter, setFilter] = useState("");
  let searchData = (e) => {
    setFilter(e.target.value);
  };

  let dataFilter = kendaraan?.filter((item) => {
    if (filter === "") {
      return item;
    } else if (item.noreg.toLowerCase().includes(filter.toLowerCase())) {
      return item;
    } else if (item.name.toLowerCase().includes(filter.toLowerCase())) {
      return item;
    }
  });

  return (
    <div>
      <Container className="mt-3 ">
        <h3>
          <span>
            <img src={icon} style={{ width: "30px" }} className="m-3" alt="" />
          </span>
          Aplikasi Data Kendaraan
        </h3>
        <Card className=" bg-search">
          <Card.Body>
            <Form>
              <Form.Group>
                <Form.Label className="t fw-bolder opacity-75">
                  No. Register
                </Form.Label>
                <Form.Control
                  type="search"
                  id="noreg"
                  name="noreg"
                  style={{ width: "30%" }}
                  onChange={searchData.bind(this)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className="fw-bolder opacity-75 mt-2">
                  Nama Pemilik
                </Form.Label>
                <Form.Control
                  type="search"
                  id="name"
                  name="name"
                  onChange={searchData.bind(this)}
                  style={{ width: "30%" }}
                />
              </Form.Group>
            </Form>
          </Card.Body>
        </Card>
        <Col className="text-end">
          <Link to={"/add-data"}>
            <Button
              variant="primary"
              className="my-2 fw-bolder"
              style={{ width: "10%" }}
            >
              Add
            </Button>
          </Link>
        </Col>
        <Table responsive striped bordered hover className="text-center">
          <thead>
            <tr className="opacity-75">
              <th>No</th>
              <th>No. Registrasi</th>
              <th>Nama Pemilik</th>
              <th>Merk Kendaraan</th>
              <th>Tahun Pembuatan</th>
              <th>Kapasitas</th>
              <th>Warna</th>
              <th>Bahan Bakar</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {dataFilter?.map((item, index) => (
              <tr key={index} className="opacity-75">
                <td>{index + 1}</td>
                <td>{item?.noreg}</td>
                <td>{item?.name}</td>
                <td>{item?.brand}</td>
                <td>{item?.years}</td>
                <td>{item?.capacity} cc</td>
                <td
                  className={
                    item.colour === "Biru"
                      ? "biru text-primary"
                      : item.colour === "Merah"
                      ? "merah text-danger"
                      : item.colour === "Abu-abu"
                      ? "abu text-secondary"
                      : item.colour === "Hitam"
                      ? "hitam text-dark"
                      : "hijau text-success"
                  }
                >
                  {item.colour}
                </td>
                <td>{item?.fuel}</td>
                <td className="d-flex gap-3">
                  <div
                    className="text-warning pointer"
                    onClick={() => handleDetail(item?.noreg)}
                  >
                    Detail
                  </div>
                  <div
                    className="text-primary pointer "
                    onClick={() => {
                      handleUpdate(item?.noreg);
                    }}
                  >
                    Edit
                  </div>
                  <div
                    className="text-danger pointer"
                    onClick={() => {
                      handleDelete(item?.noreg);
                    }}
                  >
                    Delete
                  </div>
                  <Modal show={show} onHide={handleClose} centered>
                    <Modal.Body>
                      <h3 className="text-center">Delete Data</h3>
                      <div className="my-4">
                        Anda yakin menghapus data {item?.noreg} ?
                      </div>
                      <div className="my-3 text-end">
                        <Button
                          variant="danger"
                          className="me-2"
                          style={{ width: "100px" }}
                          onClick={handleDeletes}
                        >
                          Ok
                        </Button>
                        <Button
                          variant="secondary"
                          style={{ width: "100px" }}
                          onClick={handleClose}
                        >
                          Batal
                        </Button>
                      </div>
                    </Modal.Body>
                  </Modal>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
}
