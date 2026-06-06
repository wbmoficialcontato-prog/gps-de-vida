module.exports = async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_SECRET_KEY;

  // Log para debug
  console.log('SUPABASE_URL:', SUPABASE_URL ? 'definida' : 'INDEFINIDA');
  console.log('SUPABASE_KEY:', SUPABASE_KEY ? `definida (${SUPABASE_KEY.substring(0,10)}...)` : 'INDEFINIDA');

  try {
    // Teste simples de inserção
    const teste = await fetch(
      `${SUPABASE_URL}/rest/v1/conversas`,
      {
        method: 'POST',
        headers: {
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          nome: 'teste',
          palavra_chave: 'teste123',
          historico: []
        })
      }
    );

    const status = teste.status;
    const body = await teste.text();
    console.log('Supabase status:', status);
    console.log('Supabase body:', body);

    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json({
      supabase_url: SUPABASE_URL ? 'ok' : 'missing',
      supabase_key: SUPABASE_KEY ? 'ok' : 'missing',
      insert_status: status,
      insert_body: body
    });

  } catch (err) {
    console.error('Erro:', err.message);
    return res.status(500).json({ error: err.message });
  }
};
