import React from 'react'
import Content from "../../../layout/content/Content";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
} from "../../../components/Component";
import QRCode from "react-qr-code";

const BarcodeKelompok = () => {
  return (
    <Content page="component">
      <Block size="lg">
        <BlockHead>
          <BlockHeadContent>
            <BlockTitle tag="h1" className='text-center mb-4'>Nama Kelompok</BlockTitle>
            <div id="qr-code" className="d-flex justify-content-center">
              <QRCode value={`Nama-kelompok`} />
            </div>

            <BlockTitle tag="h2" className='text-center mt-4'>Poin: {80} </BlockTitle>
          </BlockHeadContent>
        </BlockHead>
      </Block>
    </Content>
  )
}

export default BarcodeKelompok