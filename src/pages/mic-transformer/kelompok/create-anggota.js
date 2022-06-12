/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import Content from "../../../layout/content/Content";
import { Row, Col, FormGroup, Label, Form } from "reactstrap";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/Component";
import classNames from "classnames";

const create_anggota = () => {
  const { errors, register, handleSubmit } = useForm();

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
          <Col md="6">
            <FormGroup>
              <Label className="form-label" htmlFor="pilihEvent">
                Nama Kelompok
              </Label>
              {Array.from(Array(15).keys()).map((idx) => (
                <React.Fragment key={idx}>
                  <div className="form-control-wrap mt-2">
                    <input
                      ref={register({ required: true })}
                      type="number"
                      className="form-control"
                      placeholder={`Nama Kelompok ${idx + 1}`}
                      name={`kelompok_${idx + 1}`}
                    />
                    {errors[`kelompok_${idx + 1}`] && <span className="invalid">This field is required</span>}
                  </div>
                </React.Fragment>
              ))}
            </FormGroup>
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

export default create_anggota