/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react'
import Content from "../../../layout/content/Content";
import { Icon } from "../../../components/Component";
import {
  ReactDataTable,
} from "../../../components/Component";
import CreateEventUser from './create';
import {
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";

const Event = () => {
  const [eventData, setData] = useState([]);
  const [formUpdate, setFormUpdate] = useState({});
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  useEffect(() => {
    const newData = Array.from(Array(15).keys()).map((idx) => {
      return{
        id: idx,
        event: `Event ${idx}`,
        perusahaan: `Perusahaan ${idx}`,
        tanggal_mulai: `2022-06-12`,
        tanggal_selesai: `2022-06-19`,
        bobot_point: 100,
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
      name: "Perusahaan",
      selector: (row) => row.perusahaan,
      sortable: true,
    },
    {
      name: "Tanggal mulai",
      selector: (row) => row.tanggal_mulai,
      sortable: true,
    },
    {
      name: "Bobot Point",
      selector: (row) => row.bobot_point,
      sortable: true,
      maxWidth: "150px",
    },
    {
      name: "Actions",
      cell: (row) => {
        return (
          <>
            <button type='button' className='btn btn-primary p-1 mr-1' onClick={() => {
              setFormUpdate({
                nama_event: row.event,
                nama_perusahaan: row.perusahaan,
                tanggal_mulai: row.tanggal_mulai,
                tanggal_selesai: row.tanggal_selesai,
                bobot_point: row.bobot_point,
              })
              toggle();
            }}><Icon name="pen-alt-fill"/></button>
            <button type='button' className='btn btn-danger p-1'><Icon name="trash-fill"/></button>
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

  const [createForm, setCreateForm] = useState(false);
  return (
    <Content>
      <div className="d-flex justify-content-end mb-2">
        <button type="button" className="btn btn-primary mr-2" onClick={() => setCreateForm(!createForm)}>
          <Icon name="plus-circle-fill" className="mr-1" />{` Tambah Event`}
        </button>
        <button type="button" className="btn btn-primary">
          <Icon name="reload-alt"/>
        </button>
      </div>

      {createForm  && <CreateEventUser />}

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
          Update event
        </ModalHeader>
        <ModalBody>
          {modal && <CreateEventUser form={formUpdate} isUpdate />}
        </ModalBody>
      </Modal>
    </Content>
  )
}

export default Event