import React from "react";
import { Area, Container, Header, PhotoList, ScreenWarning } from "./styles";
import * as Photos from "./services/photos";
import { Photo } from "./types/Photo";
import PhotoItem from "./components/PhotoItem";

const App = () => {
  const [loading, setLoading] = React.useState(false);
  const [photos, setPhotos] = React.useState<Photo[]>([]);

  React.useEffect(() => {
    const getPhotos = async () => {
      setLoading(true);
      setPhotos(await Photos.getAll());
      setLoading(false);
      console.log(photos);
    };
    getPhotos();
  }, []);

  return (
    <Container>
      <Area>
        <Header>Galeria de Fotos</Header>
        {loading && (
          <ScreenWarning>
            <div className="emoji">🤚</div>
            <div>Carregando...</div>
          </ScreenWarning>
        )}

        {!loading && photos.length > 0 && (
          <PhotoList>
            {photos.map((item, index) => (
              <PhotoItem key={index} url={item.url} name={item.name} />
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
