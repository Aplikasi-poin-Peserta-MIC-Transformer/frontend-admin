import React from 'react'
import Content from "../../../layout/content/Content";
import {
  Block,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
} from "../../../components/Component";

const BarcodeKelompok = () => {
  return (
    <Content page="component">
      <Block size="lg">
        <BlockHead>
          <BlockHeadContent>
            <BlockTitle tag="h1">Nama Event camera v2</BlockTitle>
            <p>
              Cards are built with as little markup and styles as possible, but still manage to deliver a ton of
              control and customization.
            </p>
          </BlockHeadContent>
        </BlockHead>
      </Block>
    </Content>
  )
}

export default BarcodeKelompok