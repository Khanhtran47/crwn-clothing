import React from "react";

import CollectionItem from "../collection-item/collection-item.component";

import {
  CollectionPreviewContainer,
  TitlePreviewContainer,
  PreviewContainer,
} from "./collection-preview.styles";

const CollectionPreview = ({ title, items }) => (
  <CollectionPreviewContainer>
    <TitlePreviewContainer>{title.toUpperCase()}</TitlePreviewContainer>
    <PreviewContainer>
      {items
        .filter((item, idx) => idx < 4)
        .map((item) => (
          <CollectionItem key={item.id} item={item}></CollectionItem>
        ))}
    </PreviewContainer>
  </CollectionPreviewContainer>
);

export default CollectionPreview;
