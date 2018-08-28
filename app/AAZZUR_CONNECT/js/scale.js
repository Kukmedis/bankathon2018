import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
// base width taken from nexus 5x emulator
const baseWidth = 360;
const baseHeight = 640;
const scaleFont = (size) => size * (width / baseWidth);
const scaleWidth = (size) => size * (width / baseWidth);
const scaleHeight = (size) => size * (height / baseHeight);

export {
    scaleFont,
    scaleWidth,
    scaleHeight
}