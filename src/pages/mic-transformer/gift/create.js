/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import Content from "../../../layout/content/Content";
import { Row, Col, FormGroup, Label, Form } from "reactstrap";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/Component";
import classNames from "classnames";
import Select from 'react-select';

// const dateFormat = (date) => {
//   var now = date;
//   var day = ("0" + now.getDate()).slice(-2);
//   var month = ("0" + (now.getMonth() + 1)).slice(-2);
//   var today = now.getFullYear() + "-" + (month) + "-" + (day);
//   return today;
// }
const create = () => {
  const { errors, register, handleSubmit } = useForm();
  const [defaultFiles, setDefaultFiles] = useState("");

  const onFormSubmit = (e) => {
    console.log(e);
  };
  const formClass = classNames({
    "form-validate mb-4": true,
  });

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  return (
    <Content>
      <Form className={formClass} onSubmit={handleSubmit(onFormSubmit)}>
        <Row className="g-gs">
          <Col md="6">
            <FormGroup>
              <Label className="form-label" htmlFor="namaGift">
                Nama Gift
              </Label>
              <div className="form-control-wrap">
                <input
                  ref={register({ required: true })}
                  type="text"
                  id="namaGift"
                  name="namaGift"
                  className="form-control"
                />
                {errors.namaGift && <span className="invalid">This field is required</span>}
              </div>
            </FormGroup>
            <FormGroup>
              <Label className="form-label" htmlFor="jumlBrg">
                Jumlah Gift
              </Label>
              <div className="form-control-wrap">
                <input
                  ref={register({ required: true })}
                  type="number"
                  id="jumlBrg"
                  name="jumlBrg"
                  className="form-control"
                />
                {errors.jumlBrg && <span className="invalid">This field is required</span>}
              </div>
            </FormGroup>
            <FormGroup>
              <Label className="form-label" htmlFor="fv-message">
                Deskripsi
              </Label>
              <div className="form-control-wrap">
                <textarea
                  ref={register({
                    required: true,
                  })}
                  type="textarea"
                  className="form-control form-control-sm"
                  id="fv-message"
                  name="deskripsi"
                  placeholder="Write your message"
                />
                {errors.deskripsi && <span className="invalid">This field is required</span>}
              </div>
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <Label className="form-label" htmlFor="pilihEvent">
                Pilih Event
              </Label>
              <div className="form-control-wrap">
                <Select
                  // defaultValue={[colourOptions[2], colourOptions[3]]}
                  isMulti
                  name="colors"
                  options={options}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
              </div>
            </FormGroup>
            <FormGroup>
              <Label className="form-label" htmlFor="harga">
                Harga Point
              </Label>
              <div className="form-control-wrap">
                <input
                  ref={register({ required: true })}
                  type="number"
                  id="harga"
                  name="harga"
                  className="form-control"
                />
                {errors.harga && <span className="invalid">This field is required</span>}
              </div>
            </FormGroup>
            <FormGroup>
              <Label className="form-label">Gambar GIFT</Label>
              <div className="form-control-wrap">
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="customFile"
                    onChange={(e) => setDefaultFiles(e.target.files[0].name)}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    {defaultFiles === "" ? "Choose files" : defaultFiles}
                  </label>
                </div>
              </div>
            </FormGroup>
          </Col>
          <Col md="12">
            <FormGroup>
              <Button color="primary" size="lg">
                Simpan
              </Button>
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </Content>
  )
}

export default create