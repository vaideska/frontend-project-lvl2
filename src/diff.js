import fs from 'fs';
import path from 'path';
import process from 'process';

const getNormalPath = (filepath) => path.resolve(process.cwd(), filepath);

const diffFiles = (filepath1, filepath2) => {
  console.log(getNormalPath(filepath1));
  /* const jsonText1 = fs.readFileSync
  ('C:\\programming\\frontend-project-lvl2\\test\\file1.JSON', 'utf8');
  const jsonText2 = fs.readFileSync
  ('C:\\programming\\frontend-project-lvl2\\test\\file2.JSON', 'utf8'); */

  const jsonText1 = fs.readFileSync(getNormalPath(filepath1), 'utf8');
  const jsonText2 = fs.readFileSync(getNormalPath(filepath2), 'utf8');

  const jsonObj1 = JSON.parse(jsonText1);
  const jsonObj2 = JSON.parse(jsonText2);

  console.log(jsonObj1, jsonObj2);
};

//  diffFiles('C:\\programming\\test\\file1.JSON', 'C:\\programming\\test\\file2.JSON');

export default diffFiles;
