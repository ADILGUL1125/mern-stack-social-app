import ImageKit from '@imagekit/nodejs';

const client = new ImageKit({
    publickey:process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY ,// This is the default and can be omitted
    urlEndpoint:process.env.URL_ENDPOINT
});



export default client;
