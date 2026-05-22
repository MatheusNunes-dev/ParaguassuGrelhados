/* cardapio.js — Paraguassu Grelhados */
(function () {
  'use strict';

  function openCat(title, body) {
    title.classList.add('open');
    body.classList.add('open');
    /* scrollHeight calculado AGORA, no clique — nunca em cache */
    body.style.maxHeight = body.scrollHeight + 'px';
  }

  function closeCat(title, body) {
    title.classList.remove('open');
    body.classList.remove('open');
    body.style.maxHeight = '0px';
  }

  function initBlock(block) {
    if (block.dataset.init) return;
    block.dataset.init = '1';

    const title = block.querySelector('.cat-title');
    if (!title) return;

    let body = block.querySelector('.cat-body');

    if (!body) {
      body = document.createElement('div');
      body.className = 'cat-body';
      [...block.children]
        .filter(c => c !== title)
        .forEach(c => body.appendChild(c));
      block.appendChild(body);
    }

    /* Fecha sem transição para não piscar no carregamento */
    body.style.transition = 'none';
    body.style.maxHeight  = '0px';
    body.classList.remove('open');
    title.classList.remove('open');
    /* Força reflow — sem isso o Chrome ignora o transition:none */
    body.getBoundingClientRect();
    /* Reativa transição */
    body.style.transition = '';

    title.addEventListener('click', function () {
      if (title.classList.contains('open')) {
        closeCat(title, body);
      } else {
        openCat(title, body);
      }
    });
  }

  function initSection(section) {
    if (!section) return;
    section.querySelectorAll('.cat-block').forEach(initBlock);
  }

  window.switchTab = function (id, btn) {
    document.querySelectorAll('.menu-section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

    const section = document.getElementById('sec-' + id);
    if (section) {
      section.classList.add('active');
      initSection(section);
      section.querySelectorAll('.cat-block').forEach(block => {
        const t = block.querySelector('.cat-title');
        const b = block.querySelector('.cat-body');
        if (t && b) closeCat(t, b);
      });
    }

    if (btn) btn.classList.add('active');

    const nav = document.querySelector('.tab-nav');
    if (nav) window.scrollTo({ top: nav.offsetTop, behavior: 'smooth' });
  };

  /* Inicializa a seção ativa no load */
  window.addEventListener('load', function () {
    const active = document.querySelector('.menu-section.active');
    initSection(active);
  });

  /* Garante re-init após fontes carregarem (elimina race condition) */
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () {
      const active = document.querySelector('.menu-section.active');
      if (!active) return;
      /* Reseta apenas blocos que estão fechados — preserva estado aberto */
      active.querySelectorAll('.cat-block').forEach(function (block) {
        const body = block.querySelector('.cat-body');
        if (body && !body.classList.contains('open')) {
          body.style.maxHeight = '0px';
        }
      });
    });
  }

})();