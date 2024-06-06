const dadosQuiz = [
    {
      pergunta: 'Qual é a capital da França?',
      opcoes: ['Paris', 'Londres', 'Berlim', 'Madri'],
      resposta: 'Paris',
    },
    {
      pergunta: 'Qual é o maior planeta em nosso sistema solar?',
      opcoes: ['Marte', 'Saturno', 'Júpiter', 'Netuno'],
      resposta: 'Júpiter',
    },
    {
      pergunta: 'Qual país venceu a Copa do Mundo FIFA em 2018?',
      opcoes: ['Brasil', 'Alemanha', 'França', 'Argentina'],
      resposta: 'França',
    },
    {
      pergunta: 'Qual é a montanha mais alta do mundo?',
      opcoes: ['Monte Everest', 'K2', 'Kangchenjunga', 'Makalu'],
      resposta: 'Monte Everest',
    },
    {
      pergunta: 'Qual é o maior oceano da Terra?',
      opcoes: [
        'Oceano Pacífico',
        'Oceano Índico',
        'Oceano Atlântico',
        'Oceano Ártico',
      ],
      resposta: 'Oceano Pacífico',
    },
    {
      pergunta: 'Qual é o símbolo químico do ouro?',
      opcoes: ['Au', 'Ag', 'Cu', 'Fe'],
      resposta: 'Au',
    },
    {
      pergunta: 'Quem pintou a Mona Lisa?',
      opcoes: [
        'Pablo Picasso',
        'Vincent van Gogh',
        'Leonardo da Vinci',
        'Michelangelo',
      ],
      resposta: 'Leonardo da Vinci',
    },
    {
      pergunta: 'Qual planeta é conhecido como o Planeta Vermelho?',
      opcoes: ['Marte', 'Vênus', 'Mercúrio', 'Urano'],
      resposta: 'Marte',
    },
    {
      pergunta: 'Qual é a maior espécie de tubarão?',
      opcoes: [
        'Tubarão Branco',
        'Tubarão-baleia',
        'Tubarão-tigre',
        'Tubarão-martelo',
      ],
      resposta: 'Tubarão-baleia',
    },
    {
      pergunta: 'Qual animal é conhecido como o Rei da Selva?',
      opcoes: ['Leão', 'Tigre', 'Elefante', 'Girafa'],
      resposta: 'Leão',
    },
  ];
  
  const containerQuiz = document.getElementById('quiz');
  const containerResultado = document.getElementById('result');
  const botaoEnviar = document.getElementById('submit');
  const botaoTentarNovamente = document.getElementById('retry');
  const botaoMostrarResposta = document.getElementById('showAnswer');
  
  let perguntaAtual = 0;
  let pontuacao = 0;
  let respostasIncorretas = [];
  
  function embaralharArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function exibirPergunta() {
    const dadosPergunta = dadosQuiz[perguntaAtual];
  
    const elementoPergunta = document.createElement('div');
    elementoPergunta.className = 'pergunta';
    elementoPergunta.innerHTML = dadosPergunta.pergunta;
  
    const elementoOpcoes = document.createElement('div');
    elementoOpcoes.className = 'opcoes';
  
    const opcoesEmbaralhadas = [...dadosPergunta.opcoes];
    embaralharArray(opcoesEmbaralhadas);
  
    for (let i = 0; i < opcoesEmbaralhadas.length; i++) {
      const opcao = document.createElement('label');
      opcao.className = 'opcao';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = opcoesEmbaralhadas[i];
  
      const textoOpcao = document.createTextNode(opcoesEmbaralhadas[i]);
  
      opcao.appendChild(radio);
      opcao.appendChild(textoOpcao);
      elementoOpcoes.appendChild(opcao);
    }
  
    containerQuiz.innerHTML = '';
    containerQuiz.appendChild(elementoPergunta);
    containerQuiz.appendChild(elementoOpcoes);
  }
  
  function verificarResposta() {
    const opcaoSelecionada = document.querySelector('input[name="quiz"]:checked');
    if (opcaoSelecionada) {
      const resposta = opcaoSelecionada.value;
      if (resposta === dadosQuiz[perguntaAtual].resposta) {
        pontuacao++;
      } else {
        respostasIncorretas.push({
          pergunta: dadosQuiz[perguntaAtual].pergunta,
          respostaIncorreta: resposta,
          respostaCorreta: dadosQuiz[perguntaAtual].resposta,
        });
      }
      perguntaAtual++;
      opcaoSelecionada.checked = false;
      if (perguntaAtual < dadosQuiz.length) {
        exibirPergunta();
      } else {
        exibirResultado();
      }
    }
  }
  
  function exibirResultado() {
    containerQuiz.style.display = 'none';
    botaoEnviar.style.display = 'none';
    botaoTentarNovamente.style.display = 'inline-block';
    botaoMostrarResposta.style.display = 'inline-block';
    containerResultado.innerHTML = `Você marcou ${pontuacao} de ${dadosQuiz.length}!`;
  }
  
  function tentarNovamenteQuiz() {
    perguntaAtual = 0;
    pontuacao = 0;
    respostasIncorretas = [];
    containerQuiz.style.display = 'block';
    botaoEnviar.style.display = 'inline-block';
    botaoTentarNovamente.style.display = 'none';
    botaoMostrarResposta.style.display = 'none';
    containerResultado.innerHTML = '';
    exibirPergunta();
  }
  
  function mostrarResposta() {
    containerQuiz.style.display = 'none';
    botaoEnviar.style.display = 'none';
    botaoTentarNovamente.style.display = 'inline-block';
    botaoMostrarResposta.style.display = 'none';
  
    let respostasIncorretasHtml = '';
    for (let i = 0; i < respostasIncorretas.length; i++) {
      respostasIncorretasHtml += `
        <p>
          <strong>Pergunta:</strong> ${respostasIncorretas[i].pergunta}<br>
          <strong>Sua resposta:</strong> ${respostasIncorretas[i].respostaIncorreta}<br>
          <strong>Resposta correta:</strong> ${respostasIncorretas[i].respostaCorreta}
        </p>
      `;
    }
  
    containerResultado.innerHTML = `
      <p>Você marcou ${pontuacao} de ${dadosQuiz.length}!</p>
      <p>Respostas incorretas:</p>
      ${respostasIncorretasHtml}
    `;
  }
  
  botaoEnviar.addEventListener('click', verificarResposta);
  botaoTentarNovamente.addEventListener('click', tentarNovamenteQuiz);
  botaoMostrarResposta.addEventListener('click', mostrarResposta);

  // Função para calcular a pontuação com base nas questões acertadas
function calcularPontuacao() {
  return pontuacao; // Neste caso, vamos simplesmente retornar o número de questões acertadas como pontuação
}

// Função para exibir o resultado final e oferecer opções de troca de pontos
function exibirResultado() {
  containerQuiz.style.display = 'none';
  botaoEnviar.style.display = 'none';
  botaoTentarNovamente.style.display = 'inline-block';
  botaoMostrarResposta.style.display = 'inline-block';
  
  const pontuacaoFinal = calcularPontuacao();
  containerResultado.innerHTML = `Você marcou ${pontuacaoFinal} de ${dadosQuiz.length}!`;
  
  // Se o jogador tiver marcado pelo menos uma questão corretamente, oferecer opções de troca de pontos
  if (pontuacaoFinal > 0) {
    const botaoTrocarDesconto = document.createElement('button');
    botaoTrocarDesconto.textContent = 'Trocar Pontos por Desconto';
    botaoTrocarDesconto.addEventListener('click', trocarPorDesconto);

    const botaoTrocarProduto = document.createElement('button');
    botaoTrocarProduto.textContent = 'Trocar Pontos por Produto';
    botaoTrocarProduto.addEventListener('click', trocarPorProduto);

    containerResultado.appendChild(botaoTrocarDesconto);
    containerResultado.appendChild(botaoTrocarProduto);
  }
}

// Função para trocar pontos por desconto
function trocarPorDesconto() {
  const pontosPorDesconto = 1; // Definindo a taxa de troca: 1 ponto por 1% de desconto
  const descontoMaximo = 50; // Definindo o máximo de desconto que pode ser aplicado (em porcentagem)

  const pontuacaoFinal = calcularPontuacao();
  const descontoGanho = Math.min(pontuacaoFinal * pontosPorDesconto, descontoMaximo);
  
  // Exibir mensagem com o desconto ganho
  alert(`Parabéns! Você ganhou ${descontoGanho}% de desconto em sua próxima compra.`);
}

// Função para trocar pontos por produto
function trocarPorProduto() {
  // Aqui você pode adicionar a lógica para permitir que o usuário escolha um produto para resgatar com seus pontos
  // Por exemplo, você pode exibir uma lista de produtos e permitir que o usuário escolha um deles para resgatar com seus pontos
  // Após a escolha do produto, você pode atualizar a interface do usuário e subtrair os pontos necessários da pontuação do jogador
  alert("Em breve, você poderá trocar seus pontos por produtos!");
}
  
  exibirPergunta();
  