import React from 'react';
import Matriz from '../components/Matriz';
export default {
  title: 'matriz',
  component: Matriz,
};

const Tiles = Array(8*8).fill(0).map((_, i) => ({
  checked: false,
  index: i,
  checkTile: null,
  isValid: false,
  clickIndex: 0
}));

const TilesTwo = Array(40).fill(0).map((_, i) => ({
  checked: false,
  index: i,
  checkTile: null,
  isValid: false,
  clickIndex: 0
}));

const TilesThree = Array(128).fill(0).map((_, i) => ({
    checked: false,
    index: i,
    checkTile: null,
    isValid: false,
    clickIndex: 0
  }));


export const Matrix8_8 = () => <Matriz tiles={Tiles}/>;

export const Matrix4_4 = () => <Matriz tiles={TilesTwo} />;

export const Matrix16_16 = () => <Matriz tiles={TilesTwo} />;
