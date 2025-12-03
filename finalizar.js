function carregarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");
    const lista = document.getElementById("lista-itens");
    const totalSpan = document.getElementById("total-pedido");

    if (carrinho.length === 0) {
        lista.innerHTML = "<p>Seu carrinho está vazio.</p>";
        totalSpan.textContent = "0,00";
        return;
    }

    let html = "<ul>";
    let total = 0;
    carrinho.forEach((item) => {
        html += `<li>${item.nome} - R$ ${item.preco.toFixed(2)}</li>`;
        total += item.preco;
    });
    html += "</ul>";
    lista.innerHTML = html;
    totalSpan.textContent = total.toFixed(2);
}

document
    .getElementById("form-finalizar")
    .addEventListener("submit", function (e) {
        e.preventDefault();

        const nome = document.getElementById("nome").value.trim();
        const telefone = document.getElementById("telefone").value.trim();
        const pagamento = document.getElementById("pagamento").value;
        const observacoes = document.getElementById("observacoes").value.trim();
        const carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");

        if (carrinho.length === 0) {
            alert("Seu carrinho está vazio.");
            return;
        }

        const pedido = {
            id: Math.floor(Math.random() * 10000),
            cliente: { nome, telefone },
            pagamento,
            observacoes,
            itens: carrinho,
            total: carrinho.reduce((t, p) => t + p.preco, 0),
            status: "Aguardando retirada",
        };

        console.log("Pedido confirmado:", pedido);
        alert(`Pedido ${pedido.id} confirmado!`);

        localStorage.removeItem("carrinho");
        window.location.href = "index.html";
    });

  


  
