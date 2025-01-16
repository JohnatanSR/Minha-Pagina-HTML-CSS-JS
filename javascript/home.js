

document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
    const mainContent = document.getElementById('main-content');

    const toggleSidebar = () => {
        sidebar.classList.toggle('collapsed');
        if (window.innerWidth <= 480) {
            sidebar.classList.toggle('show');
        }
    };

    const handleResize = () => {
        if (window.innerWidth > 480) {
            sidebar.classList.remove('collapsed', 'show');
        } else {
            sidebar.classList.add('show');
        }
    };

    sidebarToggleBtn.addEventListener('click', toggleSidebar);
    window.addEventListener('resize', handleResize);

    const loadContent = (url) => {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(html => {
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = html;

                const newContent = tempDiv.querySelector('div');
                if (newContent) {
                    // Limpa a div antes de adicionar o novo conteúdo
                    mainContent.innerHTML = '';

                    // Adiciona o novo conteúdo
                    mainContent.innerHTML = newContent.innerHTML;

                    // Remove CSS antigo
                    removeOldCSS();

                    // Carregar o CSS e JavaScript associados
                    loadCSS(tempDiv);
                    loadJS(tempDiv);

                    // Verifica se o conteúdo carregado é o login para adicionar o listener de "Cadastre-se"
                    if (url.includes('login.html')) {
                        const cadastroLink = document.querySelector('#cadastro');
                        if (cadastroLink) {
                            cadastroLink.addEventListener('click', (event) => {
                                event.preventDefault();
                                loadContent('/template_login/html/form_cadastro.html');
                            });
                        }
                    }
                    if (url.includes('login.html')) {
                        const cadastroLink = document.querySelector('#esqueci_senha');
                        if (cadastroLink) {
                            cadastroLink.addEventListener('click', (event) => {
                                event.preventDefault();
                                loadContent('/template_login/html/recuperar_senha.html');
                            });
                        }
                    }
                    if (url.includes('recuperar_senha.html')) {
                        const cadastroLink = document.querySelector('#logar');
                        if (cadastroLink) {
                            cadastroLink.addEventListener('click', (event) => {
                                event.preventDefault();
                                loadContent('/template_login/html/login.html');
                            });
                        }
                    }
                    if (url.includes('form_cadastro.html')) {
                        const cadastroLink = document.querySelector('#possui_cadastro');
                        if (cadastroLink) {
                            cadastroLink.addEventListener('click', (event) => {
                                event.preventDefault();
                                loadContent('/template_login/html/login.html');
                            });
                        }
                    }
                }
            })
            .catch(error => console.error('Erro ao carregar o conteúdo:', error));
    };

    const removeOldCSS = () => {
        // Remova todos os links CSS exceto os essenciais
        const links = document.querySelectorAll('link[rel="stylesheet"]');
        links.forEach(link => {
            if (!link.href.includes('home.css')) { // Mantenha o CSS essencial
                link.parentNode.removeChild(link);
            }
        });
    };

    const loadCSS = (tempDiv) => {
        const cssLinks = tempDiv.querySelectorAll('link[rel="stylesheet"]');
        cssLinks.forEach(link => {
            const newLink = document.createElement('link');
            newLink.rel = 'stylesheet';
            newLink.href = link.href;
            newLink.onload = () => {
                console.log(`CSS carregado: ${link.href}`);
            };
            document.head.appendChild(newLink);
        });
    };

    const loadJS = (tempDiv) => {
        const scripts = tempDiv.querySelectorAll('script');
        scripts.forEach(script => {
            const newScript = document.createElement('script');
            newScript.src = script.src;
            newScript.text = script.textContent;
            newScript.onload = () => {
                console.log(`Script carregado: ${script.src}`);
            };
            document.body.appendChild(newScript);
        });
    };

    document.getElementById('user-menu').addEventListener('click', (event) => {
        event.preventDefault();
        loadContent('/template_login/html/login.html'); 
    });

    // document.getElementById('user_config').addEventListener('click', (event) => {
    //     event.preventDefault();
    //     loadContent('/template_login/html/form_cadastro.html'); 
    // });

    document.getElementById('home').addEventListener('click', (event) => {
        event.preventDefault();
        loadContent('/template_login/html/cont_pag_ini.html'); 
    });
});





