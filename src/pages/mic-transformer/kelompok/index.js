/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react'
import Content from "../../../layout/content/Content";
import { Icon } from "../../../components/Component";
import { useHistory } from 'react-router-dom';
import {
  ReactDataTable,
} from "../../../components/Component";
import API from '../../../api';

const Kelompok = () => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.getAllTeams().then(res => {
      setData(res);
      setLoading(false);
    }).catch(err => {
      console.log(err);
    })
  }, []);

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
      name: "Username",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Nama Event",
      selector: (row) => row.nama_event,
      sortable: true,
    },
    {
      name: "Total Poin",
      selector: (row) => row.total_poin,
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => {
        return (
          <>
            <button type='button' className='btn btn-primary p-1 mr-1' onClick={() => history.push(`/kelompok/user/${row.id}`)}><Icon name="user-alt-fill" /></button>
          </>
        )
      },
      maxWidth: "100px",
      sortable: false,
      style: {
        justifyContent: "center",
      }
    },
  ];

  const reloadData = () => {
    API.getAllTeams().then(res => {
      setData(res);
      setLoading(false);
    }).catch(err => {
      console.log(err);
    })
  }

  return (
    <Content>
      <div className="d-flex justify-content-end mb-2">
        <button type="button" className="btn btn-primary" onClick={reloadData}>
          <Icon name="reload-alt" />
        </button>
      </div>

      <ReactDataTable data={data} columns={dataTableColumns} keyFilter='nama_tim' loading={loading} pagination />
    </Content>
  )
}

export default Kelompok