import { readFileSync } from 'fs';

import resolve from '../src/resolve';
import getRc from '../src/getRc';

jest.mock('fs');
jest.mock('../src/resolve');

const FILENAME_DEFAULT = '.jabtrc';
const DEFAULTS_DEFAULT = {
  title: 'React app by JABT',
};

const FILENAME = 'FILENAME';
const FILE_PATH = 'FILE_PATH';
const DEFAULTS = 'DEFAULTS';
const FILE_CONTENT = '{ "param": "value" }';
const RESULT = JSON.parse(FILE_CONTENT);

JSON.parse = jest.fn();

const OPTIONS = {
  filename: FILENAME,
  defaults: DEFAULTS,
};

const readSuccess = (filename, options) => () => {
  jest.resetAllMocks();

  resolve.mockImplementation(() => FILE_PATH);
  readFileSync.mockImplementation(() => FILE_CONTENT);
  JSON.parse.mockImplementation(() => RESULT);

  const result = getRc(options);

  expect(resolve).toHaveBeenCalledTimes(1);
  expect(resolve).toHaveBeenCalledWith(filename);

  expect(readFileSync).toHaveBeenCalledTimes(1);
  expect(readFileSync).toHaveBeenCalledWith(FILE_PATH, 'utf8');

  expect(JSON.parse).toHaveBeenCalledTimes(1);
  expect(JSON.parse).toHaveBeenCalledWith(FILE_CONTENT);

  expect(result).toEqual(RESULT);
};

const resolveThrows = (filename, defaults, options) => () => {
  jest.resetAllMocks();

  resolve.mockImplementation(() => { throw new Error() });

  const result = getRc(options);

  expect(resolve).toHaveBeenCalledTimes(1);
  expect(resolve).toHaveBeenCalledWith(filename);

  expect(result).toEqual(defaults);
};

const readFileSyncThrows = (filename, defaults, options) => () => {
  jest.resetAllMocks();

  resolve.mockImplementation(() => FILE_PATH);
  readFileSync.mockImplementation(() => { throw new Error() });

  const result = getRc(options);

  expect(resolve).toHaveBeenCalledTimes(1);
  expect(resolve).toHaveBeenCalledWith(filename);

  expect(readFileSync).toHaveBeenCalledTimes(1);
  expect(readFileSync).toHaveBeenCalledWith(FILE_PATH, 'utf8');

  expect(result).toEqual(defaults);
};

const parseThrows = (filename, defaults, options) => () => {
  jest.resetAllMocks();

  resolve.mockImplementation(() => FILE_PATH);
  readFileSync.mockImplementation(() => FILE_CONTENT);
  JSON.parse.mockImplementation(() => { throw new Error() });

  const result = getRc(options);

  expect(resolve).toHaveBeenCalledTimes(1);
  expect(resolve).toHaveBeenCalledWith(filename);

  expect(readFileSync).toHaveBeenCalledTimes(1);
  expect(readFileSync).toHaveBeenCalledWith(FILE_PATH, 'utf8');

  expect(JSON.parse).toHaveBeenCalledTimes(1);
  expect(JSON.parse).toHaveBeenCalledWith(FILE_CONTENT);

  expect(result).toEqual(defaults);
};

describe('getRc():', () => {
  describe('Read, parse rc file and return this data when it is exists and valid', () => {
    it('from given path in filename option', readSuccess(FILENAME, OPTIONS));
    it('from $PWD/.jabtrc when filename option is not given', readSuccess(FILENAME_DEFAULT));
  });

  describe('Returns given default data', () => {
    it('when resolve() throws error', resolveThrows(FILENAME, DEFAULTS, OPTIONS));
    it('when readFileSync() throws error', readFileSyncThrows(FILENAME, DEFAULTS, OPTIONS));
    it('when JSON.parse() throws error', parseThrows(FILENAME, DEFAULTS, OPTIONS));
  });

  describe('Returns preset default data when defaults option is not given', () => {
    it('and resolve() throws error', resolveThrows(FILENAME_DEFAULT, DEFAULTS_DEFAULT));
    it('and readFileSync() throws error', readFileSyncThrows(FILENAME_DEFAULT, DEFAULTS_DEFAULT));
    it('and JSON.parse() throws error', parseThrows(FILENAME_DEFAULT, DEFAULTS_DEFAULT));
  });
});
