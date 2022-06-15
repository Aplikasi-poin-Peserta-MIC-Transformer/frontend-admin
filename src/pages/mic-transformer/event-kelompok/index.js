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
import API from '../../../api';

const Event = () => {
  const history = useHistory();
  const [eventData, setData] = useState([]);
  const [imgPos, setImgPos] = useState('');
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const toggle = () => setModal(!modal)

  useEffect(() => {
    API.getEvents().then(res => {
      setData(res);
      setLoading(false);
    }).catch(err => {
      console.log(err);
    })
  }, []);

  const reloadData = () => {
    setLoading(true);
    API.getEvents().then(res => {
      setData(res);
      setLoading(false);
    }).catch(err => {
      console.log(err);
    })
  }

  const dataTableColumns = [
    {
      name: "No",
      selector: (row, idx) => idx + 1,
      sortable: true,
      maxWidth: "100px",
    },
    {
      name: "Scan QR",
      cell: (row) => {
        return (
          <>
            <button type='button' className='btn btn-primary p-1 mr-1' onClick={() => history.push(`/event-kelompok/scan/${row.id}`)}><Icon name="scan" /></button>
          </>
        )
      },
      maxWidth: "100px",
      sortable: false,
      style: {
        justifyContent: "center",
      }
    },
    {
      name: "Nama Event",
      selector: (row) => row.nama_event,
      sortable: true,
      minWidth: "200px"
    },
    {
      name: "Jumlah Pos",
      selector: (row) => row.jml_pos,
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
      name: "Kelasemen",
      cell: (row) => <button type='button' className='btn btn-primary' onClick={() => {
        history.push(`/event-kelompok/kelasemen/${row.id}`)
      }}><Icon name="growth-fill" className="mr-1" />Kelasemen</button>,
      sortable: false,
      width: "200px",
      style: {
        justifyContent: "center",
      }
    },
    {
      name: "Kelompok",
      cell: (row) => <button type='button' className='btn btn-primary' onClick={() => {
        history.push(`/event-kelompok/tambah-kelompok/${row.id}`)
      }}>Tambah Tim</button>,
      sortable: false,
      width: "150px",
    },
    {
      name: "Actions",
      cell: (row) => {
        return (
          <>
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
        <button type="button" className="btn btn-primary mr-2" onClick={() => history.push('/event-kelompok/create')}>
          <Icon name="plus-circle-fill" className="mr-1" />{` Tambah Event`}
        </button>
        <button type="button" className="btn btn-primary" onClick={() => reloadData()}>
          <Icon name="reload-alt"/>
        </button>
      </div>
      <ReactDataTable data={eventData} columns={dataTableColumns} keyFilter='event' loading={loading} pagination />

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
            <img src={imgPos || `https://via.placeholder.com/300`} alt="gambar pos" className="img-fluid" />
          </div>
        </ModalBody>
      </Modal>
    </Content>
  )
}

export default Event