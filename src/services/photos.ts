import { Photo } from "../types/Photo";
import { storage } from "../libs/firebase"; //Uma variável que tem referência ao meu storage
import { ref, listAll, getDownloadURL } from "firebase/storage";

export const getAll = async () => {
  let list: Photo[] = [];
  //Primeiro eu faço referência ao meu storage, e depois eu faço uma referência a pasta que eu quero acessar.
  let imagesFolder = ref(storage, "images")
  // A função listAll precisa de uma referência(Ela vai listar tudo que tiver lá), e ela vai me retornar uma promisse, e no final um ListResult
  let photoList = await listAll(imagesFolder)

  for (let i in photoList.items) {
    let photoUrl = await getDownloadURL(photoList.items[i])
    //Preciso gerar a minha url, pois não tenho por padrão!
    list.push({
      name: photoList.items[i].name,
      url: photoUrl
    })
  }
  return list;
};

//O Bucket(Banco de arquivos estáticos) do firebase é pago, mas o da AWS não!
/* 
ANOTAÇÕES: 
-O firebase funciona, na maioria dos serviços, com base em nó, então nós fazemos referência a um local específico dentro do firebase.
-Com o storage não é diferênte, nós vamos fazer referência ao próprio storage OU a uma pasta dentro do storage OU a um arquivo dentro de uma pasta que ta dentro do storage.  

-Então, primeiro, eu tenho que fazer referência ao que eu vou fazer, e só depois, eu faço algo.
*/
