import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import Content from "../../layout/content/Content";
import "./style.css"

const ScanEvent = () => {
  const [data, setData] = useState('');
  const [selected, setSelected] = useState("environment");
  const [processing, setProcessing] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (data !== '') {
      console.log('handleSubmit', data);
    }
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
          <button type="button" className="btn btn-primary mb-2" onClick={() => setProcessing(!processing)}>{!processing ? `Open camera` : `Close camera`}</button>
        </div>

        <h5>Scan Point Form</h5>
        <form onSubmit={handleSubmit} className="d-flex justify-content-start">
          <div className="form-group mb-2 mr-2">
            <label htmlFor="codeBarcode" className='mb-0'>
              Arahkan cursor disini, setelah itu scan :
            </label>
            <input
              type="text"
              className="form-control"
              id="codeBarcode"
              value={data}
              onChange={(e) => setData(e.target.value)}
              autoFocus
              autoComplete='off'
            />
          </div>
          <button type="submit" className="btn btn-primary mb-2">Submit</button>
        </form>


        <p>Hasil: <b>{data}</b></p>
        {processing && (
          <QrReader
            facingMode={selected}
            delay={500}
            onResult={(result, error) => {
              if (!!result) {
                setData(result?.text);
                setProcessing(false);
                console.log(`result`, result?.text);
              }

              if (!!error) {
                console.log(error);
              }
            }}
            // chooseDeviceId={()=>selected}
            className="scanner"
          />
        )}
      </div>
    </Content>
  )
}

export default ScanEvent