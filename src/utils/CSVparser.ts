
const parseCSV = (csv: string, xHeaders: boolean, yHeaders: boolean): { xheaders: string[], yheaders: string[], data: number[][] } => {

  const lines = csv.replace(/\r\n/g, '\n').split('\n');
  let xheaders: string[] = [];
  let yheaders: string[] = [];
  let data: number[][] = [];

  if(lines.length === 0) throw new Error("File is empty");
  for(let i = 0; i < lines.length; i++) {
    if(lines[i].split(';').length !== lines[0].split(';').length) throw new Error("Could not parse file");
  }

  if(lines[0].split(";").length === 0) {
    xHeaders = false;
  }


  if (xHeaders && yHeaders) {
    yheaders = lines[0].split(';');
    xheaders = lines.slice(1).map((l, _) => l.split(';')[0]);
    data = yheaders.slice(1).map((y, i) => {
      return lines.slice(1).map((l, _) => {
        return +l.split(';')[i+1];
      });
    });
  } else if(!xHeaders && !yHeaders) {
    yheaders = lines[0].split(";").map((_, i) => "");
    xheaders = lines.map((l, i) => i+"");
    data = yheaders.map((y, i) => {
      return lines.map((l, _) => {
        return +l.split(';')[i];
      });
    });
  } else if(xHeaders) {
    yheaders = lines[0].split(";").map((_, i) => "");
    xheaders = lines.slice(0).map((l, _) => l.split(';')[0]);
    data = yheaders.slice(1).map((y, i) => {
      return lines.slice(0).map((l, _) => {
        return +l.split(';')[i+1];
      });
    });
  } else if(yHeaders) {
    yheaders = lines[0].split(';');
    xheaders = lines.map((l, i) => i+"");
    data = yheaders.slice(0).map((y, i) => {
      return lines.slice(1).map((l, _) => {
        return +l.split(';')[i];
      });
    });
  }


  return { xheaders, yheaders, data };
}

export default parseCSV;