function buscacep() {
    // Pegando os dados do campo do CEP da página do HTML
    let cep = document.getElementById('campo_cep').value;
    console.log(cep);

    if (cep != "") {
        // Acessando o site que pega as informações do Correios e adicionando o valor que o usuário digitou
        let url = `https://brasilapi.com.br/api/cep/v1/${cep}`;
        // Chamando uma requisição no site
        let req = new XMLHttpRequest();
        req.open("GET", url);
        req.send();
        // Tratar a resposta da requisição
        req.onload = function () {
            // Verificando se a função funcionou
            if (req.status == 200) {
                let endereco = JSON.parse(req.response);
                // Local do endereço
                document.getElementById('campo_endereco').value = endereco.street;
                // Local do bairro
                document.getElementById('campo_bairro').value = endereco.neighborhood;
                // Local da cidade
                document.getElementById('campo_cidade').value = endereco.city;
                // Local do estado
                document.getElementById('campo_estado').value = endereco.state;
            } else if (req.status == 404) {
                alert("CEP inválido");
            } else {
                alert("Erro ao buscar informações do CEP");
            }
        }
    }
}

// Evento para buscar o CEP quando o usuário tira o cursor do campo do CEP
window.onload = function () {
    let campo_cep = document.getElementById("campo_cep");
    campo_cep.addEventListener("blur", buscacep);
}

function mostrar_ocultar() {
    var input_senha = document.getElementById('senha_pass');
    var btn_olho_senha = document.getElementById('olho_senha');

    if (input_senha.type === 'password') {
        input_senha.setAttribute('type', 'text');
        btn_olho_senha.classList.replace('olho_aberto', 'olho_fechado');
        btn_olho_senha.setAttribute('src', '/template_login/icons/olho_fechado.svg');
    } else {
        input_senha.setAttribute('type', 'password');
        btn_olho_senha.classList.replace('olho_fechado', 'olho_aberto');
        btn_olho_senha.setAttribute('src', '/template_login/icons/olho_aberto.svg');
    }
}


function mostrar_ocultar_r() {
    var input_senha = document.getElementById('confirmar_senha');
    var btn_olho_senha = document.getElementById('olho_senha1');

    if (input_senha.type === 'password') {
        input_senha.setAttribute('type', 'text');
        btn_olho_senha.classList.replace('olho_aberto1', 'olho_fechado1');
        btn_olho_senha.setAttribute('src', '/template_login/icons/olho_fechado.svg');
    } else {
        input_senha.setAttribute('type', 'password');
        btn_olho_senha.classList.replace('olho_fechado1', 'olho_aberto1');
        btn_olho_senha.setAttribute('src', '/template_login/icons/olho_aberto.svg');
    }
}


