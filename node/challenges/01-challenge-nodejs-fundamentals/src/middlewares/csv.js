import { parse } from 'csv-parse';

export async function csv(req, res) {
  const contentType = req.headers['content-type'];
  
  if (!contentType || !contentType.startsWith('multipart/form-data')) {
    return res.status(400).json({ error: 'Content-Type inválido. Esperado multipart/form-data.' });
  }

  const boundary = contentType.split('boundary=')[1];
  if (!boundary) {
    return res.status(400).json({ error: 'Boundary não encontrado no Content-Type.' });
  }

  const boundaryDelimiter = `--${boundary}`;
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  const body = Buffer.concat(buffers).toString();

  const parts = body.split(boundaryDelimiter).filter((part) => part.trim() && part !== '--');

  let csvContent = '';
  parts.forEach((part) => {
    if (part.includes('Content-Type: text/csv')) {
      const [, content] = part.split('\r\n\r\n');
      csvContent = content.split('\r\n')[0];
    }
  });

  if (!csvContent) {
    return res.status(400).json({ error: 'Arquivo CSV não encontrado.' });
  }

  const records = [];
  const parser = parse({ columns: true, delimiter: ',' });
  
  parser.on('data', (record) => {
    if (record !== 'title' || record !== 'description') {
      records.push(record)
    }
  });
  parser.on('error', (err) => {
    return res.status(400).json({ error: `Erro ao processar CSV: ${err.message}` });
  });

  parser.on('end', () => {
    console.log('CSV processado com sucesso!')
  });

  parser.write(csvContent);
  
  parser.end();
  req.body = { tasks: records }
}