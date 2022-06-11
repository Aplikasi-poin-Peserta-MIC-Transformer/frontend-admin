import React, { useState, useRef } from 'react';
import Content from "../../../layout/content/Content";
import barcodeSound from './barcode-sound.mp3';
import scanAnimated from './scan-animated.gif';
import useSound from 'use-sound'
import QrReader from "react-qr-reader";
import "./style.css"

const ScanEvent = () => {
  const [playSound] = useSound(barcodeSound, { volume: 2 });
  const inputRef = useRef(null);
  const formScanRef = useRef(null);
  const [data, setData] = useState('');
  const [value, setValue] = useState('');
  const [selected, setSelected] = useState("environment");
  const [processing, setProcessing] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [scanValid, setScanValid] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data !== '') {
      console.log('handleSubmit', data);
    }
  }

  const handleChange = (e) => {
    console.log('handleChange', e.target.value);
    setData(e.target.value);
    setValue(e.target.value);
    setTimeout(() => {
      setValue('');
      formScanRef.current.focus();
    }, [500]);
  }

  const handleScan = async (scanData) => {
    if (scanData) {
      console.log(`loaded data data`, scanData);
      setData(scanData);
      setProcessing(false);
      setScanValid(true);
      playSound()
      inputRef.current.focus();
    } else {
      console.log(`not loaded data data`);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };
  

  const handlePoints = (e) => {
    e.preventDefault();
    console.log('handlePoints', e.target.points.value);
  }

  return (
    <Content>
      <div>
        <h5>Scan Menggunakan Kamera</h5>
        <div className="form-inline">
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
          <button type="button" className="btn btn-primary mb-2" onClick={() => setProcessing(!processing)} style={{ marginRight: "10px" }}>{!processing ? `Open camera` : `Close camera`}</button>
          <button type="button" className="btn btn-primary mb-2" onClick={() => setFormOpen(!formOpen)}>{!formOpen ? `Open Form Scan` : `Close Form Scan`}</button>
        </div>

        {formOpen && (
          <>
            <h5>Scan Point Form</h5>
            <form onSubmit={handleSubmit} className="d-flex justify-content-start">
              <div className="form-group mb-2 mr-2">
                <label htmlFor="codeBarcode" className='mb-0'>
                  Arahkan cursor disini, setelah itu scan :
                </label>
                <input
                  ref={formScanRef}
                  type="text"
                  className="form-control"
                  id="codeBarcode"
                  name="codeBarcode"
                  value={value}
                  onChange={handleChange}
                  autoFocus
                  autoComplete='off'
                />
              </div>
              <button type="submit" className="btn btn-primary mb-2">Submit</button>
            </form>
          </>
        )}

        <p>Hasil: <b>{data}</b></p>
        {processing && (
            <QrReader
            className="scanner"
              facingMode={selected}
              delay={500}
              onError={handleError}
              onScan={handleScan}
            // style={{ width: "80%", maxHeight: "80vh" }}
            />
        )}

        {data && !processing && (
          <>
            <h5>Berikan Poin</h5>
            <form onSubmit={handlePoints} className="d-flex justify-content-start">
              <div className="form-group mb-2 mr-2">
                <input
                  ref={inputRef}
                  type="number"
                  className="form-control"
                  id="points"
                  name="points"
                  autoComplete='off'
                />
              </div>
              <button type="submit" className="btn btn-primary mb-2">Submit</button>
            </form>
          </>
        )}

        {scanValid && !processing && (
          <div style={{ width: "100%", margin: "0 auto" }}>
            <img src={scanAnimated} alt="scan animated" className="scanner" />
          </div>
        )}
      </div>
    </Content>
  )
}

export default ScanEvent