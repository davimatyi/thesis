
const parseCSV = (csv: string, includeHeaders: boolean): { xheaders: string[], yheaders: string[], data: number[][] } => {

  const lines = csv.replace(/\r\n/g, '\n').split('\n');
  let xheaders: string[] = [];
  let yheaders: string[] = [];
  let data: number[][] = [];


  if (includeHeaders) {
    yheaders = lines[0].split(';');
    xheaders = lines.slice(1).map((l, _) => l.split(';')[0]);
    data = yheaders.slice(1).map((y, i) => {
      return lines.slice(1).map((l, _) => {
        return +l.split(';')[i+1];
      });
    });
  }

  return { xheaders, yheaders, data };
}

export default parseCSV;