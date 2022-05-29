
const parseCSV = (csv: string, xHeaders: boolean, yHeaders: boolean): { xheaders: string[], yheaders: string[], data: number[][] } => {

  const lines = csv.replace(/\r\n/g, '\n').split('\n');
  let xheaders: string[] = [];
  let yheaders: string[] = [];
  let data: number[][] = [];

  if(lines.length === 0) throw new Error("File is empty");
  for(let i = 0; i < lines.length; i++) {
    if(lines[i].split(';').length !== lines[0].split(';').length) 
      throw new Error("Could not parse file\nValues are incorrectly formatted");
  }

  if(lines[0].split(";").length === 0) {
    xHeaders = false;
  }

  if(yHeaders && lines[0].split(";").length === 1) 
    throw new Error("This file only contains one row. Turn off row names before continuing");


  if (xHeaders && yHeaders) {
    yheaders = lines[0].split(';');
    xheaders = lines.slice(1).map((l, _) => l.split(';')[0]);
    data = yheaders.slice(1).map((y, i) => {
      return lines.slice(1).map((l, _) => {
        return +l.split(';')[i+1];
      });
    });
  } else if(!xHeaders && !yHeaders) {
    yheaders = lines[0].split(";").map((_, i) => "col"+(i+1));
    yheaders.splice(0, 0, "name");
    xheaders = lines.map((l, i) => (i+1)+"");
    data = yheaders.map((y, i) => {
      return lines.map((l, _) => {
        return +l.split(';')[i];
      });
    });
  } else if(xHeaders) {
    yheaders = lines[0].split(";").map((_, i) => "col"+(i+1));
    xheaders = lines.slice(0).map((l, _) => l.split(';')[0]);
    data = yheaders.slice(1).map((y, i) => {
      return lines.slice(0).map((l, _) => {
        return +l.split(';')[i+1];
      });
    });
  } else if(yHeaders) {
    yheaders = lines[0].split(';');
    yheaders.splice(0, 0, "name");
    xheaders = lines.map((l, i) => (i+1)+"");
    data = yheaders.map((y, i) => {
      return lines.slice(1).map((l, _) => {
        return +l.split(';')[i];
      });
    });
  }

  data.flat().map((v, i) => {
     if(v < 0) 
      throw new Error("This file contains negative values.\nNegative values are not supported in this version."); 
      return 0
    })

  return { xheaders, yheaders, data };
}

export default parseCSV;