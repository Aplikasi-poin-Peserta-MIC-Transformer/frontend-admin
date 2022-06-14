/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react'
import Content from "../../../layout/content/Content";
import { Icon } from "../../../components/Component";
import {
  ReactDataTable,
  Button,
} from "../../../components/Component";
import { useForm } from "react-hook-form";
import { Row, Col, Form, FormGroup, Spinner, Label, Alert } from "reactstrap";
import API from '../../../api';
import { useParams } from 'react-router';

const Kelompok = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    API.getTeamsIdEvent(id)
      .then(res => {
        setData(res);
        setLoadingData(false);
      })
      .catch(err => {
        console.log(err);
      })
  }, [id]);

  const dataTableColumns = [
    {
      name: "No",
      selector: (row, idx) => idx + 1,
      sortable: true,
      maxWidth: "100px",
    },
    {
      name: "Nama Tim",
      selector: (row) => row.nama_tim,
      sortable: true,
    },
    {
      name: "Username",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Total Poin",
      selector: (row) => row.total_poin,
      sortable: true,
    },
    {
      name: "Nama Event",
      selector: (row) => row.nama_event,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => {
        return (
          <>
            <button type='button' className='btn btn-primary p-1 mr-1'><Icon name="pen-alt-fill" /></button>
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

  const { errors, register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [passState, setPassState] = useState(false);
  const [errorRegister, setErrorRegister] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onFormSubmit = (data, e) => {
    const value = {
      ...data,
      EventId: id
    }
    setLoading(true);
    API.registerTeams(value)
      .then(res => {
        setErrorRegister(false);
        API.getTeamsIdEvent(id).then(res => {
            setData(res);
            setLoadingData(false);
          }).catch(err => {
            console.log(err);
          })
        e.target.reset();
      })
      .catch(err => {
        console.log(err);
        setErrorRegister(true);
        setErrorMessage('Username already exist');
      })
      .finally(() => {
        setLoading(false);
      })
  }

  return (
    <Content>
      {errorRegister && (
        <div className="mb-3">
          <Alert color="danger" className="alert-icon">
            {" "}
            <Icon name="alert-circle" className="mr-1" /> {errorMessage}
          </Alert>
        </div>
      )}
        <Form className="is-alter mb-4" onSubmit={handleSubmit(onFormSubmit)}>
          <Row className="g-gs">
            <Col md="12">
              <FormGroup>
                <Label className="form-label" htmlFor="nama_tim">
                  Nama Tim
                </Label>
                <div className="form-control-wrap">
                  <input
                    ref={register({ required: true })}
                    type="text"
                    id="nama_tim"
                    name="nama_tim"
                    placeholder='Tulis nama tim'
                    className="form-control"
                  />
                  {errors.nama_tim && <span className="invalid">This field is required</span>}
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
                    name="username"
                    ref={register({ required: "This field is required" })}
                    placeholder="Enter username"
                    className="form-control-lg form-control"
                  />
                  {errors.username && <span className="invalid">{errors.username.message}</span>}
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
                    className={`form-icon lg form-icon-right password-switch ${passState ? "is-hidden" : "is-shown"}`}
                  >
                  <Icon name="eye" className="passcode-icon icon-show"></Icon>

                    <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                  </a>
                  <input
                    type={passState ? "text" : "password"}
                    id="password"
                    name="password"
                    ref={register({ required: "This field is required" })}
                    placeholder="Enter password"
                    className={`form-control-lg form-control ${passState ? "is-hidden" : "is-shown"}`}
                  />
                  {errors.password && <span className="invalid">{errors.password.message}</span>}
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

      <ReactDataTable data={data} columns={dataTableColumns} keyFilter='nama_tim' loading={loadingData} pagination />
    </Content>
  )
}

export default Kelompok