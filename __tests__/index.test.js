import genDiff from '../index';

test('gendiff', () => {
  expect(genDiff('file1.json', 'file2.json')).toEqual('- follow: false \n  host: hexlet.io \n- proxy: 123.234.53.22 \n- timeout: 50 \n+ timeout: 20 \n+ verbose: true');
  expect(genDiff('file1.yml', 'file2.yml')).toEqual('- follow: false \n  host: hexlet.io \n- proxy: 123.234.53.22 \n- timeout: 50 \n+ timeout: 20 \n+ verbose: true');
});
