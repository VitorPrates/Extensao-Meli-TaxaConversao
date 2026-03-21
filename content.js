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
  let views = []
  let compras = []

  elementos.forEach((el) => {
    // Evita duplicar overlay
    // if (el.querySelector(".overlay-views")) return;
    const texto = el.innerText;
    // Verifica se é o campo de visitas
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

  caixa_pai.forEach((box, i) =>{
    box.style.backgroundColor = "#dcffdc"
    const p = box.querySelector("p");

    const texto = p.innerText;
    // Verifica se é o campo de visitas
    if (!texto.toLowerCase().includes("visitas") || !texto.toLowerCase().includes("vendidas") )
    {
      // console.log("ACHEUII")
      return
    };

    if (p)
    {
      if (p.querySelector(".overlay-views")) return;
      // Pega valores correspondentes
      const v = views[i] || 0;
      const c = compras[i] || 0;
      console.log(v)
      console.log(c)
      if(c == 0 || v == 0) {return}
      if(c > v) {return}
      // Evita divisão por zero
      const taxa = v > 0 ? ((c / v) * 100).toFixed(1) : 0;
      const novaDiv = document.createElement("div");
      novaDiv.className = "overlay-views"
      novaDiv.innerText = `${v} | ${c}`;
      
      p.appendChild(novaDiv); // adiciona dentro do <p>
    }
    else {return}
  })
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