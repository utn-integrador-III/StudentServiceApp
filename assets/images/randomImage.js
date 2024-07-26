/* eslint-disable prettier/prettier */
const images = {
    1: require('./ajustes.png'),
    2: require('./bitacora.png'),
    3: require('./lostandfound.png'),
};

export default function randomImage(){
    let min = 1;
    let max = 3;
    let random = Math.floor(Math.random() * (max - min + 1)) + min;
    return images[random];
}
