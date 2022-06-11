/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react'
import Content from "../../../layout/content/Content";
import { Icon } from "../../../components/Component";
import { useHistory } from 'react-router-dom';
import {
  ReactDataTable,
} from "../../../components/Component";

const Kelompok = () => {
  const history = useHistory();
  const [data, setData] = useState([]);

  useEffect(() => {
    const newData = Array.from(Array(15).keys()).map((idx) => {
      return {
        id: idx,
        nama_kelompok: `Kelompok ${idx}`,
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
      name: "Nama Kelompok",
      selector: (row) => row.nama_kelompok,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => {
        return (
          <>
            <button type='button' className='btn btn-primary p-1 mr-1' onClick={() => history.push(`/kelompok/user/${row.id}`)}><Icon name="user-alt-fill" /></button>
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
      <ReactDataTable data={data} columns={dataTableColumns} keyFilter='event' pagination />
    </Content>
  )
}

export default Kelompok