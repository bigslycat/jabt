// @flow

import { readFileSync } from 'fs';

import resolve from './resolve';

import type { PlainType } from './types';

type RcType = {
  entry?: string,
  path?: string,
  publicPath?: string,
  filename?: string,
  tplPath?: string,
  locals?: PlainType,
};

type GetRcType = (params?: {
  filename?: string,
  defaults?: RcType,
}) => RcType;

const getRc: GetRcType = ({
  filename = '.jabtrc',
  defaults = {
    title: 'React app by JABT',
  },
} = {}) => {
  try {
    const rcPath = resolve(filename);
    const rcRaw = readFileSync(rcPath, 'utf8');

    return JSON.parse(rcRaw);
  } catch (e) {
    return defaults;
  }
};

export default getRc;
