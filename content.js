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
  const caixa_pai = document.querySelectorAll(
    ".andes-badge.andes-badge--pill.andes-badge--accent.sc-list-generic-statistics.sc-list-channel-content__pill"
  );

  caixa_pai.forEach((box) => {
    const p = box.querySelector("p");
    if (!p) return;

    const labels = box.querySelectorAll(".sc-list-generic-statistics__label");

    let views = 0;
    let compras = 0;

    labels.forEach((el) => {
      const texto = el.innerText.toLowerCase();
      const numero = extrairNumero(texto);

      if (!numero) return;

      if (texto.includes("visitas")) {
        views = numero;
      }

      if (texto.includes("vendidas")) {
        compras = numero;
      }
    });

    if (p.querySelector(".overlay-views")) return;

    if (!views || !compras) return;
    if (compras > views) return;

    const taxa = ((views / compras)).toFixed(1);

    const novaDiv = document.createElement("div");
    novaDiv.className = "overlay-views";
    novaDiv.innerText = `${taxa}%`;

    p.appendChild(novaDiv);
  });
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