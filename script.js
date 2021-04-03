var cartaSakura = {
    nome: "Sakura",
    imagem: "img/Sakura.webp",
    atributos: {
        ataque: 75,
        defesa: 45,
        magia: 25
    }
}

var cartaTsunade = {
    nome: "Tsunade",
    imagem: "img/Tsunade.png",
    atributos: {
        ataque: 98,
        defesa: 90,
        magia: 55
    }
}

var cartaSasuke = {
    nome: "Sasuke",
    imagem: "https://i.pinimg.com/474x/1e/73/b9/1e73b9e8379b1d79a008cd90dc5b5d75.jpg",
    atributos: {
        ataque: 88,
        defesa: 62,
        magia: 90
    }
}

var cartaMadara = {
    nome: "Madara",
    imagem: "https://i.pinimg.com/originals/ab/f3/4f/abf34f786dea68b7832b7fb99bc4c230.jpg",
    atributos: {
        ataque: 98,
        defesa: 90,
        magia: 100
    }
}

var cartaNaruto = {
    nome: "Naruto",
    imagem: "https://img.jakpost.net/c/2017/03/20/2017_03_20_23786_1490003305._large.jpg",
    atributos: {
        ataque: 80,
        defesa: 60,
        magia: 82
    }
}

var cartaKakashi = {
    nome: "Kakashi",
    imagem: "img/Kakashi.webp",
    atributos: {
        ataque: 70,
        defesa: 60,
        magia: 95
    }
}

var cartaItachi = {
    nome: "Itachi",
    imagem: "https://static.wikia.nocookie.net/gengakurenosato/images/a/a1/Itachi_Uchiha.png/revision/latest/scale-to-width-down/340?cb=20110515160338",
    atributos: {
        ataque: 95,
        defesa: 70,
        magia: 98
    }
}

var cartaGaara = {
    nome: "Gaara",
    imagem: "https://i.pinimg.com/originals/24/eb/dd/24ebdd6a7d2b8753bcdc90565bb8af3c.jpg",
    atributos: {
        ataque: 90,
        defesa: 100,
        magia: 55    }
}

var cartaMaquina
var cartaJogador
var cartas = [cartaSakura, cartaTsunade, cartaSasuke, cartaMadara, cartaNaruto, cartaKakashi, cartaItachi, cartaGaara]
//            0           1           2          3         4            5            6           7     

var pontosJogador = 0;
var pontosMaquina = 0;

atualizaPlacar();
atualizaQuantidadeDeCartas()

function atualizaQuantidadeDeCartas(){
  var divQuantidadeCartas = document.getElementById('quantidade-cartas');
  var html = "Quantidade de cartas no jogo: " + cartas.length;
  divQuantidadeCartas.innerHTML = html;
}

function atualizaPlacar(){
  var divPlacar = document.getElementById("placar");
  var html = "jogador "+ pontosJogador + "/" + pontosMaquina +" maquina";
  divPlacar.innerHTML = html;
}

function sortearCarta() {
    var numeroCartaMaquina = parseInt(Math.random() * cartas.length);
    cartaMaquina = cartas[numeroCartaMaquina]
    cartas.splice(numeroCartaMaquina, 1);

    var numeroCartaJogador = parseInt(Math.random() * cartas.length);
        cartaJogador = cartas[numeroCartaJogador];    
        cartas.splice(numeroCartaJogador, 1);

    document.getElementById('btnSortear').disabled = true
    document.getElementById('btnJogar').disabled = false

    exibeCartaJogador()
}


function exibeCartaJogador() {
    var divCartaJogador = document.getElementById("carta-jogador")
    var moldura = '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent.png" style=" width: inherit; height: inherit; position: absolute;">';
    divCartaJogador.style.backgroundImage = `url(${cartaJogador.imagem})`
    var nome = `<p class="carta-subtitle">${cartaJogador.nome}</p>`
    var opcoesTexto = ""

    for (var atributo in cartaJogador.atributos) {
        opcoesTexto += "<input type='radio' name='atributo' value='" + atributo + "'>" + atributo + " " + cartaJogador.atributos[atributo] + "<br>"
    }

    var html = "<div id='opcoes' class='carta-status'>"

    divCartaJogador.innerHTML = moldura + nome + html + opcoesTexto + '</div>'
}

function obtemAtributoSelecionado() {
    var radioAtributo = document.getElementsByName('atributo')
    for (var i = 0; i < radioAtributo.length; i++) {
        if (radioAtributo[i].checked) {
            return radioAtributo[i].value
        }
    }
}

function jogar() {
    var divResultado = document.getElementById("resultado")
    var atributoSelecionado = obtemAtributoSelecionado()

    if (cartaJogador.atributos[atributoSelecionado] > cartaMaquina.atributos[atributoSelecionado]) {
        htmlResultado = '<p class="resultado-final">Venceu</p>'
      pontosJogador++
    } else if (cartaJogador.atributos[atributoSelecionado] < cartaMaquina.atributos[atributoSelecionado]) {
        htmlResultado = '<p class="resultado-final">Perdeu</p>'
      pontosMaquina++
    } else {
        htmlResultado = '<p class="resultado-final">Empatou</p>'
    }

  if (cartas.length == 0){
    alert("Fim de Jogo!")
    if (pontosJogador > pontosMaquina) {
      htmlResultado = '<p class="resultado-final">VOCÊ VENCEU O JOGO!!!</p>'
      } else if (pontosMaquina > pontosJogador) {
       htmlResultado = '<p class="resultado-final">VOCÊ PERDEU O JOGO!!!</p>'
      } else {
        htmlResultado = '<p class="resultado-final">ESSE JOGO EMPATOU!!!</p>'
      }
  } else {
    document.getElementById('btnProximaRodada').disabled = false
  }
    divResultado.innerHTML = htmlResultado
  document.getElementById('btnJogar').disabled = true
  
  atualizaPlacar()
    exibeCartaMaquina()
  atualizaQuantidadeDeCartas()
}

function exibeCartaMaquina() {
    var divCartaMaquina = document.getElementById("carta-maquina")
    var moldura = '<img src="https://www.alura.com.br/assets/img/imersoes/dev-2021/card-super-trunfo-transparent.png" style=" width: inherit; height: inherit; position: absolute;">';
    divCartaMaquina.style.backgroundImage = `url(${cartaMaquina.imagem})`
    var nome = `<p class="carta-subtitle">${cartaMaquina.nome}</p>`
    var opcoesTexto = ""

    for (var atributo in cartaMaquina.atributos) {
        console.log(atributo)
        opcoesTexto += "<p type='text' name='atributo' value='" + atributo + "'>" + atributo + " " + cartaMaquina.atributos[atributo] + "<br>"
    }

    var html = "<div id='opcoes' class='carta-status --spacing'>"

    divCartaMaquina.innerHTML = moldura + nome + html + opcoesTexto + '</div>'
  
}

function proximaRodada() {
  var divCartas = document.getElementById('cartas')
  
  divCartas.innerHTML = `<div id="carta-jogador" class="carta"></div> <div id="carta-maquina" class="carta"> </div>`
  
  document.getElementById('btnSortear').disabled = false
  document.getElementById('btnJogar').disabled = true
  document.getElementById('btnProximaRodada').disabled = true
  
  var divResultado = document.getElementById('resultado')
  divResultado.innerHTML = ""
}