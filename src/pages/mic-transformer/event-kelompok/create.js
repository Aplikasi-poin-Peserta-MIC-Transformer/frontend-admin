/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from 'react'
import Content from "../../../layout/content/Content";
import { Row, Col, FormGroup, Label, Form } from "reactstrap";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/Component";
import classNames from "classnames";

const create = () => {
  const { errors, register, handleSubmit } = useForm();

  const [file, setFile] = useState([]);
  function handleChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  const onFormSubmit = (e) => {
    console.log(e);
  };
  const formClass = classNames({
    "form-validate mb-4": true,
  });

  return (
    <Content>
      <Form className={formClass} onSubmit={handleSubmit(onFormSubmit)}>
        <Row className="g-gs">
          <Col md="12">
            <FormGroup>
              <Label className="form-label" htmlFor="namaEvent">
                Nama Event
              </Label>
              <div className="form-control-wrap">
                <input
                  ref={register({ required: true })}
                  type="text"
                  id="namaEvent"
                  name="namaEvent"
                  className="form-control"
                />
                {errors.namaEvent && <span className="invalid">This field is required</span>}
              </div>
            </FormGroup>
            <FormGroup>
              <Label className="form-label" htmlFor="jml_pos">
                Jumlah Pos
              </Label>
              <div className="form-control-wrap">
                <input
                  ref={register({ required: true })}
                  type="number"
                  id="jml_pos"
                  name="jml_pos"
                  className="form-control"
                />
                {errors.jml_pos && <span className="invalid">This field is required</span>}
              </div>
            </FormGroup>
            <FormGroup>
              <Label className="form-label">Gambar Pos</Label>
              <div className="form-control-wrap">
                <div className="custom-file">
                  <input
                    type="file"
                    className="custom-file-input"
                    id="customFile"
                    onChange={handleChange}
                  />
                  <label className="custom-file-label" htmlFor="customFile">
                    {file.length > 0 ? file[0]?.name : "Choose files" }
                  </label>
                </div>
                {file.length > 0 && <img src={file} alt="preview" className="img-preview" />}
              </div>
            </FormGroup>
          </Col>
          {/* <Col md="6">
            <FormGroup>
              <Label className="form-label" htmlFor="pilihEvent">
                Tambah Pos
              </Label>
              {Array.from(Array(15).keys()).map((idx) => (
                <React.Fragment key={idx}>
                  <div className="form-control-wrap mt-2">
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text" id="inputGroup-sizing-sm">
                          Poin Pos {idx + 1}
                        </span>
                      </div>
                      <input
                        ref={register({ required: false })}
                        type="number" 
                        className="form-control" 
                        name={`pos_${idx + 1}`}
                      />
                      {errors[`pos_${idx + 1}`] && <span className="invalid">This field is required</span>}
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </FormGroup>
          </Col> */}
          <Col md="12">
            <FormGroup className='d-flex justify-content-end'>
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