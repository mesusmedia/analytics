# Como achar a causa do 500 no WordPress

## Caminho A — sem mexer em código (mais fácil)

Só funciona se o /wp-admin ainda abre.

1. Entrar em `espacobottega.com/wp-admin`.
2. Ferramentas > Saúde do site > aba Informações.
3. Abrir a seção "Servidor" e "Constantes do WordPress".
   Anotar `memory_limit`, `max_execution_time`, versão do PHP.
4. Instalar o plugin **Query Monitor** (gratuito, oficial).
   Ele mostra erros de PHP direto na barra de admin.
5. Instalar o plugin **WP Debugging** (gratuito).
   Ele liga o log sozinho, sem editar arquivo.
6. Abrir a URL que quebra, voltar ao admin e ler o erro.

## Caminho B — editando wp-config.php (funciona mesmo com o site fora do ar)

### B1. Achar o arquivo

Pelo painel da hospedagem:
- Hostinger: hPanel > Arquivos > Gerenciador de arquivos
- cPanel: File Manager
- SiteGround: Site Tools > Site > File Manager
- Kinsta / WP Engine: SFTP

Caminho do arquivo: `public_html/wp-config.php`
(às vezes `public_html/espacobottega.com/wp-config.php`)

### B2. Fazer backup

Botão direito no `wp-config.php` > Copy / Download.
Guardar uma cópia antes de editar. Sempre.

### B3. Editar

Abrir com "Edit" / "Editar". Procurar a linha:

```php
/* That's all, stop editing! Happy publishing. */
```
ou em português:
```php
/* Isso é tudo, pare de editar! Bom blogging. */
```

**Acima** dessa linha, colar:

```php
define( 'WP_DEBUG', true );
define( 'WP_DEBUG_LOG', true );
define( 'WP_DEBUG_DISPLAY', false );
@ini_set( 'display_errors', 0 );
define( 'WP_MEMORY_LIMIT', '512M' );
define( 'WP_MAX_MEMORY_LIMIT', '512M' );
```

Se já existir `define( 'WP_DEBUG', false );`, trocar o `false` por `true`
em vez de duplicar a linha.

Salvar.

### B4. Reproduzir o erro

Abrir no navegador, em aba anônima:

```
https://espacobottega.com/nutricionista-esportivo-porto-alegre/?nocache=1
```

O `?nocache=1` fura o cache e força o PHP a rodar. Se der 500, ótimo — foi gravado.

### B5. Ler o log

No gerenciador de arquivos, abrir:

```
public_html/wp-content/debug.log
```

Ir até o fim do arquivo. Procurar a linha mais recente com `PHP Fatal error`.

Exemplo do que aparece:

```
[07-Sep-2026 15:06:22 UTC] PHP Fatal error: Uncaught Error: Call to undefined
method Elementor\Plugin::instance() in
/home/user/public_html/wp-content/plugins/nome-do-plugin/arquivo.php:214
```

A parte depois de `/plugins/` é o culpado. Nesse exemplo: `nome-do-plugin`.

### B6. Log do servidor (se o debug.log ficar vazio)

Vazio significa que o PHP morreu antes do WordPress carregar.
Então o erro está no log do servidor:

- cPanel: Metrics > Errors
- Hostinger: hPanel > Avançado > Logs de erro do PHP
- Arquivo: `public_html/error_log`

## Depois de achar o plugin culpado

1. Desativar só ele. Testar a URL.
2. Se resolveu: atualizar o plugin. Se já está atualizado, procurar substituto.
3. Se o /wp-admin não abre, desativar pelo gerenciador de arquivos:
   renomear a pasta de `wp-content/plugins/nome-do-plugin`
   para `wp-content/plugins/nome-do-plugin-OFF`.
   O WordPress desativa sozinho.

## Se o log não apontar nada

Teste da metade:

1. Renomear `wp-content/plugins` para `plugins-OFF`. Site volta? É plugin.
2. Voltar o nome. Renomear as pastas de plugin metade por vez.
3. Repetir até sobrar o culpado. 5 a 6 rodadas resolvem 50 plugins.

## Limpar depois

Terminado o diagnóstico, voltar no `wp-config.php`:

```php
define( 'WP_DEBUG', false );
```

E apagar `wp-content/debug.log`. Ele fica público e pode expor caminhos do servidor.

## Purgar o cache

Depois de qualquer correção, limpar o cache do plugin
(WP Rocket, LiteSpeed, W3 Total Cache) e do Cloudflare, se houver.
Senão o cliente continua vendo a versão velha.
