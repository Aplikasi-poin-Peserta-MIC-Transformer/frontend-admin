import React, { useState, useEffect } from 'react'
import Content from "../../../layout/content/Content";
import { useParams } from 'react-router';
import API from '../../../api';
import {
  ReactDataTable,
} from "../../../components/Component";
import { Icon } from "../../../components/Component";

const KelasemenKelompok = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [namaEvent, setNamaEvent] = useState('');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => { 
    API.getKlasemen(id, 'team')
      .then(res => {
        setData(res.klasemen);
        setNamaEvent(res.nama_event);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      })
  }, [id])

  const dataTableColumns = [
    {
      name: "No",
      selector: (row, idx) => idx + 1,
      sortable: true,
      maxWidth: "100px",
    },
    {
      name: "Nama Tim",
      selector: (row) => row.nama_tim,
      sortable: true,
    },
    {
      name: "Total Poin",
      selector: (row) => row.total_poin,
      sortable: true,
    },
  ];

  const reloadData = () => {
    setLoading(true);
    API.getKlasemen(id, 'team')
      .then(res => {
        setData(res.klasemen);
        setNamaEvent(res.nama_event);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <Content>
      <h1>{namaEvent}</h1>
      <div className="d-flex justify-content-end mb-2">
        <button type="button" className="btn btn-primary" onClick={() => reloadData()}>
          <Icon name="reload-alt" />
        </button>
      </div>
      <ReactDataTable data={data} columns={dataTableColumns} loading={loading} keyFilter='nama_tim' />
    </Content>
  )
}

export default KelasemenKelompok