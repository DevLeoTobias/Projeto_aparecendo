const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Tabela fixa de planos e preços em centavos (R$ 800,00 = 80000)
const planosFixos = {
  impulso: {
    mensal: {
      name: "Plano Impulso (Mensal)",
      price: 80000,
      quantity: 1
    },
    trimestral: {
      name: "Plano Impulso (Trimestral)",
      price: 210000,
      quantity: 1
    }
  },
  visibilidade: {
    mensal: {
      name: "Plano Visibilidade (Mensal)",
      price: 50000,
      quantity: 1
    },
    trimestral: {
      name: "Plano Visibilidade (Trimestral)",
      price: 120000,
      quantity: 1
    }
  }
};

app.post('/gerar-link', (req, res) => {
  const { plano, periodo } = req.body;

  // Valida se o plano e período existem
  if (!planosFixos[plano] || !planosFixos[plano][periodo]) {
    return res.status(400).json({ sucesso: false, mensagem: 'Plano ou período inválido.' });
  }

  const item = planosFixos[plano][periodo];

  // Monta o JSON para enviar no link do InfinitePay, encode para URL
  const itemsJSON = encodeURIComponent(JSON.stringify([item]));

  // Link seguro do InfinitePay, sem deixar o cliente alterar preço
  const urlSeguro = `https://checkout.infinitepay.io/apparecendo?items=${itemsJSON}&redirect_url=https://apparecendo.com/obrigado`;

  return res.json({
    sucesso: true,
    mensagem: 'Link seguro gerado com sucesso!',
    linkSeguro: urlSeguro
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
