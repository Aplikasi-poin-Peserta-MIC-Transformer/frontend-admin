import React, { useState, useEffect } from 'react'
import Content from "../../../layout/content/Content";
import { Icon } from "../../../components/Component";
import { useHistory } from 'react-router-dom';
import {
  ReactDataTable,
} from "../../../components/Component";
import {
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import QRCode from "react-qr-code";

const UserEvent = () => {
  const history = useHistory();
  const [eventData, setData] = useState([]);
  const [dataModal, setDataModal] = useState({});
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  useEffect(() => {
    const newData = Array.from(Array(15).keys()).map((idx) => {
      return {
        id: idx,
        nama: `Nama user ${idx}`,
        event: `Event ${idx}`,
        noWa: `No WA ${idx}`,
        perusahaan: `Perusahaan ${idx}`,
        point: 100,
      }
    });
    setData(newData);
  }, []);

  const dataTableColumns = [
    {
      name: "No",
      selector: (row, idx) => idx + 1,
      sortable: true,
      maxWidth: "100px",
    },
    {
      name: "Nama",
      selector: (row) => row.nama,
      sortable: true,
    },
    {
      name: "Event",
      selector: (row) => row.event,
      sortable: true,
    },
    {
      name: "Nomor Wa",
      selector: (row) => row.noWa,
      sortable: true,
    },
    {
      name: "Perusahaan",
      selector: (row) => row.perusahaan,
      sortable: true,
    },
    {
      name: "Point",
      selector: (row) => row.point,
      sortable: true,
      maxWidth: "150px",
    },
    {
      name: "Actions",
      cell: (row) => {
        return (
          <>
            <button type='button' className='btn btn-primary p-1 mr-1'
              onClick={() => {
                setDataModal(row);
                toggle();
              }}
            ><Icon name="eye-fill" /></button>
            <button type='button' className='btn btn-danger p-1'><Icon name="trash-fill" /></button>
          </>
        )
      },
      maxWidth: "150px",
      sortable: false,
      style: {
        justifyContent: "center",
      }
    },
  ];

  // download QR code
  const downloadQRCode = () => {
    // download svg qr code to png
    const svg = document.getElementById("qr-code").innerHTML;
    const svg64 = btoa(svg);
    const img64 = "data:image/svg+xml;base64," + svg64;
    const img = new Image();
    img.src = img64;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const canvasData = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = canvasData;
      a.download = `${dataModal.nama}.png`;
      a.click();
    }
  }
  return (
    <Content>
      <div className="d-flex justify-content-end mb-2">
        <button type="button" className="btn btn-primary">
          <Icon name="reload-alt" />
        </button>
      </div>
      <ReactDataTable data={eventData} columns={dataTableColumns} keyFilter='nama' pagination />

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader
          toggle={toggle}
          close={
            <button className="close" onClick={toggle}>
              <Icon name="cross" />
            </button>
          }
        >
          {dataModal.nama}
        </ModalHeader>
        <ModalBody>
          <div id="qr-code" className="d-flex justify-content-center">
            <QRCode value={dataModal.nama} />
          </div>
          <div className="d-flex justify-content-center mt-3">
            <button type="button" className="btn btn-primary ml-2" onClick={downloadQRCode}>
              Download{` `}<Icon className='ml-2' name="download" />
            </button>
          </div>
        </ModalBody>
      </Modal>
    </Content>
  )
}

export default UserEvent