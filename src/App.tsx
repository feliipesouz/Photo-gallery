import React, { FormEvent } from "react";
import {
  Area,
  Container,
  Header,
  PhotoList,
  ScreenWarning,
  UploadForm,
} from "./styles";
import * as Photos from "./services/photos";
import { Photo } from "./types/Photo";
import PhotoItem from "./components/PhotoItem";

const App = () => {
  const [uploading, setUploading] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [photos, setPhotos] = React.useState<Photo[]>([]);

  React.useEffect(() => {
    getPhotos();
  }, []);

  const getPhotos = async () => {
    setLoading(true);
    setPhotos(await Photos.getAll());
    setLoading(false);
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //Aqui verificamos se tem arquivo selecionado, se não tiver, não iremos fazer nada!
    const formData = new FormData(e.currentTarget); //Aqui pegamos o formulário
    //Preciso ajudar o ts a identificar que o meu file abaixo é um File, pois ele pode ser tanto um File como um null.(INTERESSANTE)
    const file = formData.get("image") as File; //Aqui pegamos o campo image do nosso primeiro input a baixo.

    //Validando se o arquivo existe e se não está corrompido.
    if (file && file.size > 0) {
      setUploading(true);
      let result = await Photos.insertFile(file);
      setUploading(false);

      if (result instanceof Error) {
        alert(`${result.name} - ${result.message}`);
      } else {
        let newPhotoList = [...photos, result];
        setPhotos(newPhotoList);
      }
    }
  };

  const handleDelete = async (name: string) => {
    await Photos.deleteFile(name);
    getPhotos();
  };

  return (
    <Container>
      <Area>
        <Header>Galeria de Fotos</Header>

        <UploadForm method="POST" onSubmit={handleFormSubmit}>
          <input type={"file"} name={"image"} />
          <input type={"submit"} name={"Enviar"} />
          {uploading && "Enviando..."}
        </UploadForm>

        {loading && (
          <ScreenWarning>
            <div className="emoji">🤚</div>
            <div>Carregando...</div>
          </ScreenWarning>
        )}

        {!loading && photos.length > 0 && (
          <PhotoList>
            {photos.map((item, index) => (
              <PhotoItem
                key={index}
                url={item.url}
                name={item.name}
                onDelete={handleDelete}
              />
            ))}
          </PhotoList>
        )}

        {!loading && photos.length === 0 && (
          <ScreenWarning>
            <div className="emoji">😕</div>
            <div>"Não há imagens armazenadas!"</div>
          </ScreenWarning>
        )}
      </Area>
    </Container>
  );
};

export default App;
