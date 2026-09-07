# Diagnóstico — HTTP 500 em /nutricionista-esportivo-porto-alegre/

## Sintoma relatado
- Cliente abre a URL, vê "Esta página não está funcionando — HTTP ERROR 500".
- Em outro celular abriu de primeira.
- Ao atualizar (F5 / reload), o erro volta.

## Leitura do sintoma
500 é erro de **servidor** (PHP/WordPress), não do HTML da landing.
O HTML colado é entregue pelo WordPress; se o PHP falha antes de imprimir,
o browser recebe 500 e nenhum HTML.

O padrão "abre de primeira, quebra ao atualizar" é assinatura de **cache de página**:

1. Primeiro acesso → plugin de cache (WP Rocket / LiteSpeed / Cloudflare / cache do host)
   devolve HTML estático já gravado. Não passa pelo PHP. Abre normal.
2. Reload / URL com parâmetro / usuário logado / mobile-cache separado →
   ignora o cache, executa o PHP. O PHP quebra. 500.

Ou seja: a página **já está quebrada**; o cache está escondendo a falha
para parte dos visitantes.

## Causas prováveis, em ordem
1. Fatal error de PHP em plugin ou tema (Elementor + addon desatualizado).
2. `memory_limit` estourado — a página é longa, Elementor + 5 iframes de YouTube
   + Maps costumam estourar 128M em plano compartilhado.
3. `max_execution_time` / timeout de FastCGI.
4. Corrupção de OPcache após atualização de plugin.
5. Erro em `.htaccess` ou regra de mod_security no host.

## Como confirmar (ordem exata)
1. `wp-config.php`: ligar log
   ```php
   define('WP_DEBUG', true);
   define('WP_DEBUG_LOG', true);
   define('WP_DEBUG_DISPLAY', false);
   ```
   Recarregar a URL e ler `wp-content/debug.log` — a linha `PHP Fatal error`
   nomeia arquivo e plugin.
2. Ler o `error_log` do host (cPanel > Errors, ou `logs/` do domínio).
3. Purgar o cache inteiro e recarregar. Se o 500 passa a ser 100% dos acessos,
   confirma a hipótese do cache.
4. Testar com `?nocache=1` na URL — força bypass do cache.
5. Subir `memory_limit` para 512M e retestar.
6. Se o log não apontar: desativar plugins em lote pela metade até isolar.

## Problemas encontrados no código da página (não causam o 500, mas pioram)
1. **Carrossel triplica o DOM e nunca para**
   `carousel.innerHTML += carousel.innerHTML + carousel.innerHTML` multiplica
   os cards por 3 e dispara `requestAnimationFrame` em loop infinito, sem
   condição de parada. Em celular fraco isso trava a rolagem e aquece o aparelho.
   Reescrever com 2 cópias e `IntersectionObserver` para pausar fora da tela.
2. **5 iframes de YouTube carregados de uma vez**
   Cada um puxa ~1MB de JS. Trocar por thumbnail com play (lazy facade)
   ou pelo menos `loading="lazy"` no iframe.
3. **Tailwind via CDN (`cdn.tailwindcss.com`)**
   Compila o CSS no browser a cada visita. É build de desenvolvimento,
   não deve ir para produção. Gera FOUC e piora LCP.
4. **Imagem de fundo do hero sem otimização**
   PNG gerado por IA, servido em tamanho cheio. Converter para WebP.
5. **Cards de resultado com `pointer-events-none` no mobile**
   O visitante não consegue interagir com o carrossel no celular.

## Conclusão
O 500 é servidor. Sem acesso ao log não dá para nomear o plugin culpado —
o passo 1 acima resolve isso em minutos. O cache está mascarando a falha,
por isso o comportamento parece aleatório entre aparelhos.
