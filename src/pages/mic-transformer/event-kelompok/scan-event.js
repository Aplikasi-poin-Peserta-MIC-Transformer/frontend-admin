/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react'
import Content from "../../../layout/content/Content";
import QrReader from "react-qr-reader";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
} from "../../../components/Component";
import {
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { Badge, Alert } from "reactstrap";
import Icon from "../../../components/icon/Icon";
import barcodeSound from './barcode-sound.mp3';
import scanAnimated from './scan-animated.gif';
import useSound from 'use-sound'
import { useParams } from 'react-router';
import API from '../../../api';
import { useForm } from "react-hook-form";

const ScanEvent = () => {
  const { id } = useParams();
  const [playSound] = useSound(barcodeSound, { volume: 2 });
  const [dataModal, setDataModal] = useState({});
  const [modal, setModal] = useState(false);
  const toggle = () => {
    setModal(!modal);
    setProcessing(!processing)
  }

  const [data, setData] = useState('');
  const [selected, setSelected] = useState("environment");
  const [processing, setProcessing] = useState(false);

  const [namaEvent, setNamaEvent] = useState('');
  const [totalPos, setTotalPos] = useState(0);

  React.useEffect(() => {
    API.getEventId(id).then(res => {
      setNamaEvent(res.nama_event);
      setTotalPos(res.jml_pos);
    }).catch(err => {
      console.log(err);
    })
  }, [id, toggle]);

  const [timId, setTimId] = useState(0);
  const [pos, setPos] = React.useState(0);
  const [poin, setPoin] = React.useState(0);
  const [nama_team, setNamaTeam] = React.useState('');
  const [error, setError] = React.useState(false);
  const [warning, setWarning] = React.useState(false);
  const [isNotTeam, setIsNotTeam] = React.useState(false);
  const [isPoinAdded, setIsPoinAdded] = React.useState(false);

  const { errors, register, handleSubmit } = useForm();
  const onFormSubmit = (data, e) => {
    const result = {
      total_poin: data.poin,
      status: 'team',
      TeamId_or_UserId: timId,
      eventId: id,
      pos: `${dataModal?.id + 1}`
    }
    API.addPoints(result).then(res => {
      console.log(res);
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
      setIsPoinAdded(false);
      if (TeamId_or_UserId !== undefined) {
        if (eventId === id) {
          if (status === 'team') {
            setTimId(TeamId_or_UserId);
            API.getTeamId(TeamId_or_UserId).then(res => {
              setError(false);
              setPos(res.pos);
              setPoin(res.total_poin);
              setNamaTeam(res.nama_tim);
              setProcessing(false);
              playSound();
            }).catch(err => {
              console.log(err);
              setError(true);
            })
          } else {
            setIsNotTeam(true);
            setWarning(false);
            setError(false);
          }
        } else {
          setIsNotTeam(false);
          setWarning(true);
          setError(true);
        }
      } else {
        setIsNotTeam(false);
        setWarning(false);
        setError(true);
      }
    } else {
      console.log(`not loaded data data`);
    }
  };
  const handleError = (err) => {
    console.error(err);
  };

  return (
    <Content page="component">
      <Block size="lg">
        <BlockHead>
          <BlockHeadContent>
            <BlockTitle tag="h1">{namaEvent}</BlockTitle>
          </BlockHeadContent>
        </BlockHead>
        <ul className="list-group">
          {Array.from(Array(totalPos).keys()).map((idx) => {
            return (
              <React.Fragment key={idx}>
                <li
                  className="list-group-item text-center"
                  style={{ cursor: "pointer", marginBottom: "10px" }}
                  onClick={() => {
                    toggle();
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
              </React.Fragment>
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

          {isNotTeam && (
            <div className="mb-3">
              <Alert color="warning" className="alert-icon">
                {" "}
                <Icon name="alert-circle" /> Barcode hanya untuk team{" "}
              </Alert>
            </div>
          )}

          {processing && (
            <QrReader
              className="videoSize"
              facingMode={selected}
              delay={500}
              onError={handleError}
              onScan={handleScan}
            // style={{ width: "80%", maxHeight: "80vh" }}
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
                <Badge color="primary" style={{ display: "block", width: "fit-content", margin: "0 auto" }}>{nama_team}</Badge>
                <Badge color="primary" style={{ display: "block", width: "fit-content", margin: "0 auto" }}>{`Pos: ${pos}`}</Badge>
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
        </ModalBody>
      </Modal>
    </Content>
  )
}

export default ScanEvent
