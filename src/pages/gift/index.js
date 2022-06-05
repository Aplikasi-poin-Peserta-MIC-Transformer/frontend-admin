import React, { useState, useEffect } from 'react'
import Content from "../../layout/content/Content";
import { Icon } from "../../components/Component";
import { useHistory } from 'react-router-dom';
import {
  ReactDataTable,
} from "../../components/Component";

const Gift = () => {
  const history = useHistory();
  const [eventData, setData] = useState([]);

  useEffect(() => {
    const newData = Array.from(Array(15).keys()).map((idx) => {
      return {
        id: idx,
        nama_gift: `Gift Name ${idx}`,
        harga: `10.000`,
        jumlah: 10,
        gambar: `https://via.placeholder.com/150`,
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
      name: "Nama Gift",
      selector: (row) => row.nama_gift,
      sortable: true,
    },
    {
      name: "Harga",
      selector: (row) => row.harga,
      sortable: true,
    },
    {
      name: "Jumlah",
      selector: (row) => row.jumlah,
      sortable: true,
      maxWidth: "120px",
    },
    {
      name: "Gambar",
      selector: (row) => row.gambar,
      cell: (row) => <img src={row.gambar} alt="gambar" width="100px" />,
      sortable: true,
      style: {
        justifyContent: "center",
      }
    },
    {
      name: "Actions",
      cell: (row) => {
        return (
          <>
            <button type='button' className='btn btn-primary p-1 mr-1' onClick={() => history.push(`/event/edit/${row.id}`)}><Icon name="pen-alt-fill" /></button>
            <button type='button' className='btn btn-danger p-1'><Icon name="trash-fill" /></button>
          </>
        )
      },
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
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
          <Icon name="reload-alt" />
        </button>
      </div>
      <ReactDataTable data={eventData} columns={dataTableColumns} keyFilter='nama_gift' pagination />
    </Content>
  )
}

export default Gift