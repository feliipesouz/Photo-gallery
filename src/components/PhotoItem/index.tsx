import React from "react";
import { Contianer } from "./styles";

type Props = {
  url: string;
  name: string;
};
const PhotoItem = ({ url, name }: Props) => {
  return (
    <Contianer>
      <img src={url} alt={name} />
      {name}
    </Contianer>
  );
};

export default PhotoItem;
