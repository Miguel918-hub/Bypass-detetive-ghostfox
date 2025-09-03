import fetch from 'node-fetch';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'Nenhum link fornecido.' });
    }

    try {
      // Aqui você pode usar APIs de link unlock, por exemplo:
      // let apiUrl = `https://api.universalbypass.io/unlock?url=${encodeURIComponent(url)}`
      // let response = await fetch(apiUrl)
      // let data = await response.json()
      // res.status(200).json({ finalLink: data.url });

      // Exemplo simulado
      res.status(200).json({ finalLink: url + '?bypassed=true' });
    } catch (err) {
      res.status(500).json({ error: 'Falha ao processar o link.' });
    }
  } else {
    res.status(405).json({ error: 'Método não permitido.' });
  }
}
