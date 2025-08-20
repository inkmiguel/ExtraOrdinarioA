export const genereteID = () => {
  let letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
  let id = '';
  let totalLetras = letras.length;
  for (let i = 0; i < 15; i++) {
    id += letras.charAt(Math.floor(Math.random() * totalLetras));
  }
  return id;
};
