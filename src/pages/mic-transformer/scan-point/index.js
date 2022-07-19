import React, { useState, useRef } from 'react';
import Content from "../../../layout/content/Content";
import { Badge, Alert } from "reactstrap";
import Icon from "../../../components/icon/Icon";
import barcodeSound from './barcode-sound.mp3';
import scanAnimated from './scan-animated.gif';
import useSound from 'use-sound'
import QrReader from "react-qr-reader";
import API from '../../../api';
import { useForm } from "react-hook-form";
import "./style.css"

const ScanEvent = () => {
  const [playSound] = useSound(barcodeSound, { volume: 2 });
  const [data, setData] = useState('');
  const [selected, setSelected] = useState("environment");
  const [processing, setProcessing] = useState(false);
  const [userId, setUserId] = useState(0);
  const [eventId, setEventId] = useState(0);
  const [poin, setPoin] = React.useState(0);
  const [nama_user, setNamaUser] = React.useState('');
  const [error, setError] = React.useState(false);
  const [warning, setWarning] = React.useState(false);
  const [isNotUser, setIsNotUser] = React.useState(false);
  const [isPoinAdded, setIsPoinAdded] = React.useState(false);

  const { errors, register, handleSubmit } = useForm();
  const onFormSubmit = (data, e) => {
    const result = {
      total_poin: data.poin,
      status: 'user',
      TeamId_or_UserId: userId,
      eventId,
    }
    API.addUserPoints(result).then(res => {
      console.log(res)
      setIsPoinAdded(true);
    }).catch(err => {
      console.log(err);
    }).finally(() => {
      e.target.reset();
    })
  }

  const handleScan = async (scanData) => {
    if (scanData) {
      const status = scanData.split('/')[0];
      const TeamId_or_UserId = scanData.split('/')[1];
      const eventId = scanData.split('/')[2];
      setData(scanData);
      setEventId(eventId);
      setIsPoinAdded(false);
      if (TeamId_or_UserId !== undefined) {
        if (status === 'user') {
          setUserId(TeamId_or_UserId);
          API.getUserInfo(TeamId_or_UserId).then(res => {
            setPoin(res.total_poin);
            setNamaUser(res.nama);
            setError(false);
            setProcessing(false);         
          }).catch(err => {
            console.log(err);
            setError(true);
          }).finally(() => {
            playSound();
          })
        } else {
          setIsNotUser(true);
          setWarning(false);
          setError(false);
        }
      } else {
        setIsNotUser(false);
        setWarning(false);
        setError(true);
      }
    } else {
      console.log(`data is not loaded`);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <Content>
      <div>
          <div className="form-inline d-flex justify-content-center mt-3">
            {processing && (
              <div className="form-group mb-2 mr-2">
                <select
                  className="form-control form-select pr-3"
                  id="fv-topics"
                  name="topics"
                  onChange={(e) => setSelected(e.target.value)}
                >
                  <option value={"environment"}>Kamera Belakang</option>
                  <option value={"user"}>Kamera Depan</option>
                </select>
              </div>
            )}
            <button type="button" className="btn btn-primary mb-2" onClick={() => setProcessing(!processing)}>{!processing ? `Buka Kamera` : `Tutup Kamera`}</button>
          </div>

          {error && (
            <div className="mb-3">
              <Alert color="danger" className="alert-icon">
                {" "}
                <Icon name="alert-circle" /> Barcode tidak ditemukan{" "}
              </Alert>
            </div>
          )}

          {warning && (
            <div className="mb-3">
              <Alert color="warning" className="alert-icon">
                {" "}
                <Icon name="alert-circle" /> User tidak berada pada event ini{" "}
              </Alert>
            </div>
          )}

          {isNotUser && (
            <div className="mb-3">
              <Alert color="warning" className="alert-icon">
                {" "}
                <Icon name="alert-circle" /> Barcode hanya untuk team{" "}
              </Alert>
            </div>
          )}

          {processing && (
            <QrReader
              className="scanner"
              facingMode={selected}
              delay={500}
              onError={handleError}
              onScan={handleScan}
              style={{ margin: 'auto' }}
            />

          )}

          {isPoinAdded && (
            <div className="mb-3">
              <Alert color="success" className="alert-icon">
                {" "}
                <Icon name="check" /> Poin berhasil ditambahkan{" "}
              </Alert>
            </div>
          )}

          {!isPoinAdded && data && !processing && (
            <>
              <div style={{ width: "100%", margin: "0 auto" }}>
                <img src={scanAnimated} alt="scan animated" style={{ width: "100%" }} />
                <Badge color="success" style={{ display: "block", width: "fit-content", margin: "10px auto" }}>Success</Badge>
                <Badge color="primary" style={{ display: "block", width: "fit-content", margin: "0 auto" }}>{nama_user}</Badge>
                <Badge color="primary" style={{ display: "block", width: "fit-content", margin: "0 auto" }}>{`Poin: ${poin}`}</Badge>
              </div>

              <h5 className='mt-4'>Poin</h5>
              <form onSubmit={handleSubmit(onFormSubmit)}>
                <div className="form-group mb-2">
                  <label htmlFor="poin" className='mb-0'>
                    Masukkan poin :
                  </label>
                  <input
                    ref={register({ required: "This field is required" })}
                    type="number"
                    className="form-control"
                    id="poin"
                    name="poin"
                    autoFocus
                    autoComplete='off'
                  />
                  {errors.poin && <span className="invalid">{errors.poin.message}</span>}
                </div>
                <div className='d-flex justify-content-between'>
                  <span></span>
                  <button type="submit" className="btn btn-primary mb-2">Submit</button>
                </div>
              </form>
            </>
          )}
        </div>
    </Content>
  )
}

export default ScanEvent