/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react'
import Content from "../../../layout/content/Content";
import { Icon } from "../../../components/Component";
import { useHistory } from 'react-router-dom';
import {
  ReactDataTable,
  Button,
} from "../../../components/Component";
import { useForm } from "react-hook-form";
import { Row, Col, Form, FormGroup, Spinner, Label } from "reactstrap";

const Kelompok = () => {
  const history = useHistory();
  const [data, setData] = useState([]);

  useEffect(() => {
    const newData = Array.from(Array(15).keys()).map((idx) => {
      return {
        id: idx,
        nama_kelompok: `Kelompok ${idx}`,
        username: `username_${idx}`,
      }
    });
    setData(newData);
  }, []);

  const dataTableColumns = [
    {
      name: "No",
      selector: (row, idx) => idx + 1,
      sortable: true,
      maxWidth: "100px",
    },
    {
      name: "Nama Kelompok",
      selector: (row) => row.nama_kelompok,
      sortable: true,
    },
    {
      name: "Username",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => {
        return (
          <>
            <button type='button' className='btn btn-primary p-1 mr-1' onClick={() => history.push(`/kelompok/user/${row.id}`)}><Icon name="user-alt-fill" /></button>
            <button type='button' className='btn btn-danger p-1'><Icon name="trash-fill" /></button>
          </>
        )
      },
      maxWidth: "150px",
      sortable: false,
      style: {
        justifyContent: "center",
      }
    },
  ];


  const [showForm, setShowForm] = useState(false);
  const { errors, register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [passState, setPassState] = useState(false);

  const onFormSubmit = (data) => {
    console.log(data);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setPassState(true);
    }, 2000);
  }

  return (
    <Content>
      <div className="d-flex justify-content-end mb-2">
        <button type="button" className="btn btn-primary mr-2" onClick={() => setShowForm(!showForm)}>
          <Icon name="plus-circle-fill" className="mr-1" />{` Tambah Kelompok`}
        </button>
        <button type="button" className="btn btn-primary">
          <Icon name="reload-alt" />
        </button>
      </div>


      {showForm && (
        <Form className="is-alter mb-4" onSubmit={handleSubmit(onFormSubmit)}>
          <Row className="g-gs">
            <Col md="12">
              <FormGroup>
                <Label className="form-label" htmlFor="namaKelompok">
                  Nama Kelompok
                </Label>
                <div className="form-control-wrap">
                  <input
                    ref={register({ required: true })}
                    type="text"
                    id="namaKelompok"
                    name="namaKelompok"
                    placeholder='Tulis nama kelompok'
                    className="form-control"
                  />
                  {errors.namaKelompok && <span className="invalid">This field is required</span>}
                </div>
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="default-01">
                    Username
                  </label>
                </div>
                <div className="form-control-wrap">
                  <input
                    type="text"
                    id="default-01"
                    name="name"
                    ref={register({ required: "This field is required" })}
                    placeholder="Enter username"
                    className="form-control-lg form-control"
                  />
                  {errors.name && <span className="invalid">{errors.name.message}</span>}
                </div>
              </FormGroup>
            </Col>
            <Col md="6">
              <FormGroup>
                <div className="form-label-group">
                  <label className="form-label" htmlFor="password">
                    Password
                  </label>
                </div>
                <div className="form-control-wrap">
                  <a
                    href="#password"
                    onClick={(ev) => {
                      ev.preventDefault();
                      setPassState(!passState);
                    }}
                    className={`form-icon lg form-icon-right passcode-switch ${passState ? "is-hidden" : "is-shown"}`}
                  >
                    <Icon name="eye" className="passcode-icon icon-show"></Icon>

                    <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                  </a>
                  <input
                    type={passState ? "text" : "password"}
                    id="password"
                    name="passcode"
                    ref={register({ required: "This field is required" })}
                    placeholder="Enter passcode"
                    className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                  />
                  {errors.passcode && <span className="invalid">{errors.passcode.message}</span>}
                </div>
              </FormGroup>
            </Col>
            <Col md="12">
              <FormGroup className='d-flex justify-content-end'>
                <Button size="lg" type="submit" color="primary">
                  {loading ? <Spinner size="sm" color="light" /> : "Simpan"}
                </Button>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      )}

      <ReactDataTable data={data} columns={dataTableColumns} keyFilter='event' pagination />
    </Content>
  )
}

export default Kelompok