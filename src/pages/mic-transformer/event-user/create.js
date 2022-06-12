/* eslint-disable react-hooks/rules-of-hooks */
import React, {useState} from 'react'
import { Row, Col, FormGroup, Label, Form } from "reactstrap";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/Component";
import classNames from "classnames";

// const dateFormat = (date) => {
//   var now = date;
//   var day = ("0" + now.getDate()).slice(-2);
//   var month = ("0" + (now.getMonth() + 1)).slice(-2);
//   var today = now.getFullYear() + "-" + (month) + "-" + (day);
//   return today;
// }
const create = ({form, isUpdate}) => {
  const { errors, register, handleSubmit } = useForm();
  const [namaEvent, setNamaEvent] = useState(isUpdate ? form?.nama_event : "");
  const [perusahaan, setPerusahaan] = useState(isUpdate ? form?.nama_perusahaan : "");
  const [tanggalMulai, setTanggalMulai] = useState(isUpdate ? form?.tanggal_mulai : "");
  const [tanggalSelesai, setTanggalSelesai] = useState(isUpdate ? form?.tanggal_selesai : "");
  const [bobotPoint, setBobotPoint] = useState(isUpdate ? form?.bobot_point : "");

  const onFormSubmit = (e) => {
    console.log(e);
  };
  const formClass = classNames({
    "form-validate mb-4": true,
  });

  return (
    <>
      <Form className={formClass} onSubmit={handleSubmit(onFormSubmit)}>
        <Row className="g-gs">
          <Col md="6">
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
                  value={namaEvent}
                  onChange={(e) => setNamaEvent(e.target.value)}
                  className="form-control"
                />
                {errors.namaEvent && <span className="invalid">This field is required</span>}
              </div>
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <Label className="form-label" htmlFor="perusahaan">
                Nama Perusahaan
              </Label>
              <div className="form-control-wrap">
                <input
                  ref={register({ required: true })}
                  type="text"
                  id="perusahaan"
                  name="perusahaan"
                  value={perusahaan}
                  onChange={(e) => setPerusahaan(e.target.value)}
                  className="form-control"
                />
                {errors.perusahaan && <span className="invalid">This field is required</span>}
              </div>
            </FormGroup>
          </Col>
          <Col sm="6">
            <FormGroup>
              <Label className="form-label" htmlFor="mulai">
                Mulai
              </Label>
              <div className="form-control-wrap">
                <input
                  ref={register({ required: true })}
                  type="date"
                  id="mulai"
                  name="mulai"
                  value={tanggalMulai}
                  onChange={(e) => setTanggalMulai(e.target.value)}
                  className="form-control"
                />
                {errors.perusahaan && <span className="invalid">This field is required</span>}
              </div>
            </FormGroup>
          </Col>
          <Col sm="6">
            <FormGroup>
              <Label className="form-label" htmlFor="selesai">
                Selesai
              </Label>
              <div className="form-control-wrap">
                <input
                  ref={register({ required: true })}
                  type="date"
                  id="selesai"
                  name="selesai"
                  value={tanggalSelesai}
                  onChange={(e) => setTanggalSelesai(e.target.value)}
                  className="form-control"
                />
                {errors.perusahaan && <span className="invalid">This field is required</span>}
              </div>
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
              <Label className="form-label" htmlFor="bobot_poin">
                Bobot Poin
              </Label>
              <div className="form-control-wrap">
                <input
                  ref={register({ required: true })}
                  type="number"
                  id="bobot_poin"
                  name="bobot_poin"
                  value={bobotPoint}
                  onChange={(e) => setBobotPoint(e.target.value)}
                  className="form-control"
                />
                {errors.bobot_poin && <span className="invalid">This field is required</span>}
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
    </>
  )
}

export default create