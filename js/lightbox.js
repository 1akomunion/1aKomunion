/* lightbox.js – galería “flechas lateral” sin plugins */
(function(){
  const fotos = [];                 // array con las rutas de las imgenes
  let   idx   = 0;                  // índice de la foto mostrada

  /* Construye el modal dinámicamente */
  const overlay = document.createElement('div');
  overlay.id = 'lb-overlay';
  overlay.innerHTML =
    `<span id="lb-close">&times;</span>
     <img id="lb-img">
     <a id="lb-prev">&#10094;</a>
     <a id="lb-next">&#10095;</a>`;
  document.body.appendChild(overlay);

  const lbImg   = document.getElementById('lb-img');
  const lbPrev  = document.getElementById('lb-prev');
  const lbNext  = document.getElementById('lb-next');
  const lbClose = document.getElementById('lb-close');

  /* Rellena el array fotos con las imágenes de la galería */
  document.querySelectorAll('.galeria-grupo a').forEach(a=>{
    const src = a.href;
    if(/\.(jpg|jpeg|png|gif|webp|JPG|JPEG|PNG|GIF|WEBP)$/i.test(src)){
      fotos.push(src);
      a.addEventListener('click', e=>{
        e.preventDefault();
        idx = fotos.indexOf(src);
        mostrar();
      });
    }
  });

  function mostrar(){
    overlay.style.display = 'flex';
    lbImg.src = fotos[idx];
  }
  function cerrar(){ overlay.style.display='none'; }

  lbClose.onclick = cerrar;
  overlay.onclick = e=>{ if(e.target===overlay) cerrar(); };

  lbPrev.onclick = ()=>{
    idx = (idx-1+fotos.length)%fotos.length;
    mostrar();
  };
  lbNext.onclick = ()=>{
    idx = (idx+1)%fotos.length;
    mostrar();
  };

  /* Teclado: Esc cierra, flechas cambian imagen */
  document.addEventListener('keydown', e=>{
    if(overlay.style.display!=='flex') return;
    if(e.key==='Escape') cerrar();
    if(e.key==='ArrowLeft')  lbPrev.click();
    if(e.key==='ArrowRight') lbNext.click();
  });
})();