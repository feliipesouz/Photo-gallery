import { Photo } from "../types/Photo";
import { storage } from "../libs/firebase"; //Uma variável que tem referência ao meu storage
import {
  ref,
  listAll,
  getDownloadURL,
  deleteObject,
  uploadBytes
} from "firebase/storage";
import { v4 as createId } from "uuid"; //Essa lib possui vários recursos, um deles é o v4, que gera um hash aleatório.

export const getAll = async () => {
  let list: Photo[] = [];
  //Primeiro eu faço referência ao meu storage, e depois eu faço uma referência a pasta que eu quero acessar.
  let imagesFolder = ref(storage, "images");
  // A função listAll precisa de uma referência(Ela vai listar tudo que tiver lá), e ela vai me retornar uma promisse, e no final um ListResult
  let photoList = await listAll(imagesFolder);

  for (let i in photoList.items) {
    let photoUrl = await getDownloadURL(photoList.items[i]);
    //Preciso gerar a minha url, pois não tenho por padrão!
    list.push({
      name: photoList.items[i].name,
      url: photoUrl,
    });
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

export const insertFile = async (file: File) => {
  if (["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
    let randomName = createId();
    let newFile = ref(storage, `images/${randomName}`); //Crio a referência

    let upload = await uploadBytes(newFile, file);

    let photoUrl = await getDownloadURL(upload.ref); //Estou enviando a referêncnia do arquivo utilizando o ref, e com isso, gero a url e dou um get.

    //o Ref me retorna a referência desse arquivo em específico.
    return {
      name: upload.ref.name,
      url: photoUrl,
    } as Photo;
  } else {
    return new Error("Tipo de arquivo não permitido!");
  }
};

export const deleteFile = async (name: string) => {
  let referenceDelete = ref(storage, `images/${name}`)
  await deleteObject(referenceDelete);
}
