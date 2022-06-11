import React, { useState, useRef } from 'react';
import { QrReader } from 'react-qr-reader';
import Content from "../../../layout/content/Content";
import "./style.css"

const ScanEvent = () => {
  const inputRef = useRef(null);
  const [data, setData] = useState('');
  const [value, setValue] = useState('');
  const [selected, setSelected] = useState("environment");
  const [processing, setProcessing] = useState(false);
  
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
      inputRef.current.focus();
    }, [500]);
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
              ref={inputRef}
              type="text"
              className="form-control"
              id="codeBarcode"
              value={value}
              onChange={handleChange}
              autoFocus
              autoComplete='off'
            />
          </div>
          <button type="submit" className="btn btn-primary mb-2">Submit</button>
        </form>


        <p>Hasil: <b>{data}</b></p>
        {processing && (
          <QrReader
            // facingMode={selected}
            constraints={{
              facingMode: { selected }
            }}
            delay={500}
            onResult={(result, error) => {
              if (!!result) {
                setData(result?.text);
                setProcessing(false);
                inputRef.current.focus();
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