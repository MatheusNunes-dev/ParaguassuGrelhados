/* cardapio.js — Paraguassu Grelhados */
(function () {

  'use strict';

  /* ── Abre um bloco ──────────────────────────── */
  function openCat(title, body) {


    title.classList.add('open');
    body.classList.add('open');

    requestAnimationFrame(() => {
      body.style.maxHeight = body.scrollHeight + 'px';
    });

  }

  /* ── Fecha um bloco ─────────────────────────── */
  function closeCat(title, body) {


    title.classList.remove('open');
    body.classList.remove('open');

    body.style.maxHeight = '0px';

  }

  /* ── Inicializa UM cat-block ────────────────── */
  function initBlock(block) {


    if (block.dataset.init) {
      return;
    }

    block.dataset.init = '1';

    const title = block.querySelector('.cat-title');
    let body = block.querySelector('.cat-body');

    if (!title) {
      return;
    }

    /* cria .cat-body se não existir */
    if (!body) {

      body = document.createElement('div');
      body.className = 'cat-body';

      const children = [...block.children].filter(child => child !== title);

      children.forEach(child => {
        body.appendChild(child);
      });

      block.appendChild(body);

    }

    /* começa fechado */
    closeCat(title, body);

    /* clique */
    title.addEventListener('click', function () {


      if (title.classList.contains('open')) {

        closeCat(title, body);

      } else {

        openCat(title, body);

      }

    });

  }

  /* ── Inicializa seção ───────────────────────── */
  function initSection(section) {

    if (!section) return;

    section.querySelectorAll('.cat-block').forEach(initBlock);

  }

  /* ── Troca de aba ───────────────────────────── */
  window.switchTab = function (id, btn) {


    document.querySelectorAll('.menu-section').forEach(section => {
      section.classList.remove('active');
    });

    document.querySelectorAll('.tab-btn').forEach(button => {
      button.classList.remove('active');
    });

    const section = document.getElementById('sec-' + id);

    if (section) {


      section.classList.add('active');

      /* inicializa accordions da nova aba */
      initSection(section);

      /* fecha todos ao trocar */
      section.querySelectorAll('.cat-block').forEach(block => {

        const title = block.querySelector('.cat-title');
        const body  = block.querySelector('.cat-body');

        if (title && body) {
          closeCat(title, body);
        }

      });

    } else {


    }

    if (btn) {
      btn.classList.add('active');
    }

    const nav = document.querySelector('.tab-nav');

    if (nav) {

      window.scrollTo({
        top: nav.offsetTop,
        behavior: 'smooth'
      });

    }

  };

  /* ── Init inicial ───────────────────────────── */
  window.addEventListener('load', function () {

    const activeSection = document.querySelector('.menu-section.active');

    if (!activeSection) {

      return;

    }

    initSection(activeSection);


  });

})();