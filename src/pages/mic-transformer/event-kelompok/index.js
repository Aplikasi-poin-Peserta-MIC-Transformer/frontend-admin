/* eslint-disable array-callback-return */
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

const Event = () => {
  const history = useHistory();
  const [eventData, setData] = useState([]);
  const [imgPos, setImgPos] = useState('');
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal)

  useEffect(() => {
    const newData = Array.from(Array(15).keys()).map((idx) => {
      return{
        id: idx,
        event: `Event ${idx}`,
        perusahaan: `Perusahaan ${idx}`,
        tanggal: `Tanggal ${idx}`,
        bobot_point: 100,
        gambar: `https://via.placeholder.com/300`,
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
      name: "Event",
      selector: (row) => row.event,
      sortable: true,
    },
    {
      name: "Gambar Pos",
      cell: (row) => <button type='button' className='btn btn-success' onClick={() => {
        toggle()
        setImgPos(row.gambar)
      }}><Icon name="img-fill"/></button>,
      sortable: false,
      maxWidth: "150px",
      style: {
        justifyContent: "center",
      }
    },
    {
      name: "Actions",
      cell: (row) => {
        return (
          <>
            <button type='button' className='btn btn-primary p-1 mr-1' onClick={() => history.push(`/event-kelompok/scan/${row.id}`)}><Icon name="eye-fill" /></button>
            <button type='button' className='btn btn-primary p-1 mr-1' onClick={() => history.push(`/event-kelompok/edit/${row.id}`)}><Icon name="pen-alt-fill"/></button>
            <button type='button' className='btn btn-danger p-1'><Icon name="trash-fill"/></button>
          </>
        )
      },
      maxWidth: "200px",
      sortable: false,
      style: {
        justifyContent: "center",
      }
    },
  ];
  return (
    <Content>
      <div className="d-flex justify-content-end mb-2">
        <button type="button" className="btn btn-primary mr-2" onClick={() => history.push('/event/create')}>
          <Icon name="plus-circle-fill" className="mr-1" />{` Tambah Event`}
        </button>
        <button type="button" className="btn btn-primary">
          <Icon name="reload-alt"/>
        </button>
      </div>
      <ReactDataTable data={eventData} columns={dataTableColumns} keyFilter='event' pagination />

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader
          toggle={toggle}
          close={
            <button className="close" onClick={toggle}>
              <Icon name="cross" />
            </button>
          }
        >
          Gambar Pos
        </ModalHeader>
        <ModalBody>
          <div className='d-flex justify-content-center'>
            <img src={imgPos} alt="gambar pos" className="img-fluid" />
          </div>
        </ModalBody>
      </Modal>
    </Content>
  )
}

export default Event