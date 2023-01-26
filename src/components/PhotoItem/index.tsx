import React from "react";
import { Contianer } from "./styles";

type Props = {
  url: string;
  name: string;
  onDelete: (name: string) => void;
};
const PhotoItem = ({ url, name, onDelete }: Props) => {
  return (
    <Contianer>
      <img src={url} alt={name} />
      {name}
      <button onClick={()=> onDelete(name)}>Delete</button>
    </Contianer>
  );
};

export default PhotoItem;
