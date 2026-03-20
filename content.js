function formatarNumero(numero) {
  return numero.toLocaleString("pt-BR");
}

function extrairNumero(texto) {
  if (!texto) return null;

  // Remove tudo que não for número
  const numero = texto.replace(/\D/g, "");
  return numero ? parseInt(numero) : null;
}

function adicionarOverlay() {
  const elementos = document.querySelectorAll(".sc-list-generic-statistics__label");
  const caixa_info = document.querySelectorAll(".andes-badge__content");
  const caixa_pai = document.querySelectorAll(
  ".andes-badge.andes-badge--pill.andes-badge--accent.sc-list-generic-statistics.sc-list-channel-content__pill.sc-list-channel-content__pill--with-pipe.sc-list-channel-content__pill--marketplace.andes-badge--small.andes-badge--rounded-top-left.andes-badge--rounded-top-right.andes-badge--rounded-bottom-left.andes-badge--rounded-bottom-right"
);
  // caixa_pai.forEach((box) =>{
  //   box.style.backgroundColor = "green"
  // })


  let views = []
  let compras = []

  elementos.forEach((el) => {
    // Evita duplicar overlay
    // if (el.querySelector(".overlay-views")) return;
    const texto = el.innerText;
    // // Verifica se é o campo de visitas
    if (!texto.toLowerCase().includes("visitas")) return;

    const numero = extrairNumero(texto);
    if (!numero) return;

    views.push(numero)
  });
  elementos.forEach((el) => {
    // Evita duplicar overlay
    // if (el.querySelector(".overlay-views")) return;
    const texto = el.innerText;
    // // Verifica se é o campo de visitas
    if (!texto.toLowerCase().includes("vendidas")) return;

    const numero = extrairNumero(texto);
    if (!numero) return;

    compras.push(numero)
  });

  // caixa_pai.forEach((caixa, i) =>{
  //   const p = caixa.querySelector("p");
  //   if (p)
  //   {
  //     const novaDiv = document.createElement("div");
  //     novaDiv.textContent = "Minha nova div";
      
  //     p.appendChild(novaDiv); // adiciona dentro do <p>
  //   }
  // })

  //  caixa.style.width = "fit-content"
  //   // caixa.style.backgroundColor = `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`

  //   // Evita duplicar overlay
  //   if (caixa.querySelector(".overlay-views")) return;
  //   // const texto = el.innerText;
    
  //   // Pega valores correspondentes
  //   const v = views[i] || 0;
  //   const c = compras[i] || 0;

  //   // Evita divisão por zero
  //   const taxa = v > 0 ? ((c / v) * 100).toFixed(1) : 0;

  //   // Cria overlay
  //   const overlay = document.createElement("div");
  //   overlay.className = "overlay-views";
  //   overlay.innerText = `${taxa}%`;
  //   // Estilo (igual ao seu print)
  //   overlay.style.color = "black";
  //   // overlay.style.zIndex = "9999";

  //   caixa.appendChild(overlay);
  
}

// Observa mudanças na página (essencial pro Mercado Livre)
const observer = new MutationObserver(() => {
  adicionarOverlay();
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

// Executa inicialmente
setTimeout(adicionarOverlay, 1500);