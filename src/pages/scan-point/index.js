import React, { useState, useEffect } from 'react'
import Content from "../../layout/content/Content";
import { useHistory } from 'react-router-dom';
import {
  ReactDataTable,
} from "../../components/Component";

const ScanPoint = () => {
  const history = useHistory();
  const [eventData, setData] = useState([]);

  useEffect(() => {
    const newData = Array.from(Array(15).keys()).map((idx) => {
      return {
        id: idx,
        nama: `Nama Event ${idx}`,
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
      name: "Actions",
      cell: (row) => {
        return (
          <>
            <button type='button' className='btn btn-primary' onClick={() => history.push(`/scan-point/${row.nama?.replace(/\s+/g, '-').toLowerCase()}/${row.id}`)}>Pilih</button>
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
      <ReactDataTable data={eventData} columns={dataTableColumns} keyFilter='nama' pagination />
    </Content>
  )
}

export default ScanPoint