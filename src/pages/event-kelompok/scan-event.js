import React, { useState } from 'react'
import Content from "../../layout/content/Content";
import { QrReader } from 'react-qr-reader';
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
} from "../../components/Component";
import {
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { Badge } from "reactstrap";
import Icon from "../../components/icon/Icon";
import barcodeSound from './barcode-sound.mp3';
import scanAnimated from './scan-animated.gif';
import useSound from 'use-sound'

const ScanEvent = () => {
  const [playSound] = useSound(barcodeSound, { volume: 2 });
  const [dataModal, setDataModal] = useState({});
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
    setProcessing(!processing)
  }

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
  }
  return (
    <Content page="component">
      <Block size="lg">
        <BlockHead>
          <BlockHeadContent>
            <BlockTitle tag="h1">Nama Event camera v2</BlockTitle>
            <p>
              Cards are built with as little markup and styles as possible, but still manage to deliver a ton of
              control and customization.
            </p>
          </BlockHeadContent>
        </BlockHead>
        <ul className="list-group">
          {Array.from(Array(15).keys()).map((idx) => {
            return (
              <>
                <li
                  className="list-group-item text-center"
                  key={idx+1}
                  style={{ cursor: "pointer", marginBottom: "10px" }}
                  onClick={() => {
                    toggle();
                    setValue('');
                    setDataModal({
                      id: idx,
                      event: `Event ${idx}`,
                      perusahaan: `Perusahaan ${idx}`,
                      tanggal: `Tanggal ${idx}`,
                      bobot_point: idx + 10,
                    });
                  }}>
                  <BlockTitle tag="h5" key={idx}>Pos ke {idx + 1}</BlockTitle>
                </li>
              </>
            )
          })}
        </ul>
      </Block>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader
          toggle={toggle}
          close={
            <button className="close" onClick={toggle}>
              <Icon name="cross" />
            </button>
          }
        >
          Pos ke {dataModal?.id + 1}
        </ModalHeader>
        <ModalBody>
          <h3 className='text-center'>Bobot Poin {dataModal.bobot_point}</h3>

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
          
          {processing && (
            <QrReader
              // facingMode={selected}
              constraints={{
                facingMode: selected
              }}
              delay={500}
              onResult={(result, error) => {
                if (!!result) {
                  setData(result?.text);
                  setProcessing(false);
                  playSound()
                  console.log(`result`, result?.text);
                }

                if (!!error) {
                  console.log(`error`, error);
                }
              }}
              // chooseDeviceId={()=>selected}
              // className="scanner"
              videoStyle={{ width: "100%", height: "75%", borderRadius: "15px" }}
              videoContainerStyle={{ marginBottom: "-100px" }}
            />
          )}

          {data && !processing && (
            <div style={{ width: "100%", margin: "0 auto" }}>
              <img src={scanAnimated} alt="scan animated" style={{ width: "100%" }} />
              <Badge color="success" style={{ display: "block", width: "fit-content", margin: "0 auto" }}>Success</Badge>
            </div>
          )}

          <h5>Poin</h5>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-2">
              <label htmlFor="codeBarcode" className='mb-0'>
                Masukkan poin :
              </label>
              <input
                type="number"
                className="form-control"
                id="codeBarcode"
                value={value}
                onChange={handleChange}
                autoFocus
                autoComplete='off'
              />
            </div>
            <div className='d-flex justify-content-between'>
              <span></span>
              <button type="submit" className="btn btn-primary mb-2" onClick={toggle}>Submit</button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </Content>
  )
}

export default ScanEvent
