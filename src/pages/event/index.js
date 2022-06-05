/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react'
import Content from "../../layout/content/Content";
import { Icon } from "../../components/Component";
import { useHistory } from 'react-router-dom';
import {
  ReactDataTable,
} from "../../components/Component";

const Event = () => {
  const history = useHistory();
  const [eventData, setData] = useState([]);

  useEffect(() => {
    const newData = Array.from(Array(15).keys()).map((idx) => {
      return{
        id: idx,
        event: `Event ${idx}`,
        perusahaan: `Perusahaan ${idx}`,
        tanggal: `Tanggal ${idx}`,
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
      selector: (row) => row.tanggal,
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
            <button type='button' className='btn btn-primary p-1 mr-1' onClick={() => history.push(`/event/edit/${row.id}`)}><Icon name="pen-alt-fill"/></button>
            <button type='button' className='btn btn-danger p-1'><Icon name="trash-fill"/></button>
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
          <Icon name="reload-alt"/>
        </button>
      </div>
      <ReactDataTable data={eventData} columns={dataTableColumns} keyFilter='event' pagination />
    </Content>
  )
}

export default Event