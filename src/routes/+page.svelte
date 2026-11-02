
<script>
  const whatsapp = 'https://wa.me/18293235909';

  const servicios = [
    {
      numero: '01',
      icono: '📱',
      titulo: 'Reparación de celulares',
      descripcion: 'Soluciones para problemas de software y hardware de tu dispositivo.'
    },
    {
      numero: '02',
      icono: '🔬',
      titulo: 'Microsoldaduras',
      descripcion: 'Reparaciones electrónicas de precisión para dispositivos móviles.'
    },
    {
      numero: '03',
      icono: '🖨️',
      titulo: 'Copias e impresiones',
      descripcion: 'Impresiones y copias de documentos con buena calidad.'
    },
    {
      numero: '04',
      icono: '💻',
      titulo: 'Digitación y digitalización',
      descripcion: 'Pasamos tus documentos a formato digital de manera rápida.'
    },
    {
      numero: '05',
      icono: '📄',
      titulo: 'Contratos y documentos',
      descripcion: 'Elaboración y preparación de documentos y contratos.'
    },
    {
      numero: '06',
      icono: '📚',
      titulo: 'Papelería y plastificación',
      descripcion: 'Artículos de papelería y protección de documentos.'
    }
  ];
</script>

<svelte:head>
  <title>JonathanGSM | Tecnología y servicios</title>
  <meta
    name="description"
    content="Reparación de celulares, microsoldaduras, impresiones y servicios de papelería en Villa Sombrero, Baní."
  />
</svelte:head>

<div class="pagina">
  <header class="navbar">
    <a href="#inicio" class="logo">
      <span class="logo-icon">J</span>
      <span>Jonathan<span class="azul">GSM</span></span>
    </a>

    <nav>
      <a href="#inicio">Inicio</a>
      <a href="#servicios">Servicios</a>
      <a href="#nosotros">Nosotros</a>
      <a href="#contacto">Contacto</a>
    </nav>

    <a href="/login" class="btn-login">Acceso clientes ↗</a>
  </header>

  <main>
    <section class="hero" id="inicio">
      <div class="hero-contenido">
        <div class="etiqueta">
          <span class="punto"></span>
          TECNOLOGÍA Y SERVICIOS
        </div>

        <h1>
          Soluciones que<br />
          conectan contigo<span class="azul">.</span>
        </h1>

        <p class="hero-texto">
          Tecnología, reparación de celulares y servicios de papelería
          en un solo lugar. Estamos aquí para ayudarte.
        </p>

        <div class="hero-botones">
          <a href={whatsapp} target="_blank" rel="noreferrer" class="btn-principal">
            Contactar por WhatsApp ↗
          </a>
          <a href="#servicios" class="btn-secundario">Ver servicios ↓</a>
        </div>

        <div class="ubicacion">
          <span>📍</span>
          Villa Sombrero, Baní, República Dominicana
        </div>
      </div>

      <div class="hero-visual">
        <div class="circulo circulo-1"></div>
        <div class="circulo circulo-2"></div>
        <div class="telefono">
          <div class="telefono-camara"></div>
          <div class="telefono-pantalla">
            <span class="telefono-logo">J</span>
            <strong>JonathanGSM</strong>
            <small>Technology & Services</small>
            <div class="linea"></div>
            <span class="telefono-icono">⚡</span>
            <span class="telefono-status">Soluciones inteligentes</span>
          </div>
        </div>
        <div class="tarjeta-flotante">
          <span>✓</span>
          <div>
            <strong>Calidad y confianza</strong>
            <small>En cada servicio</small>
          </div>
        </div>
      </div>
    </section>

    <section class="estadisticas">
      <div>
        <strong>01</strong>
        <span>Atención personalizada</span>
      </div>
      <div>
        <strong>06+</strong>
        <span>Tipos de servicios</span>
      </div>
      <div>
        <strong>100%</strong>
        <span>Compromiso con el cliente</span>
      </div>
    </section>

    <section class="servicios seccion" id="servicios">
      <div class="encabezado">
        <span class="subtitulo">LO QUE HACEMOS</span>
        <h2>Servicios para cada necesidad<span class="azul">.</span></h2>
        <p>Encuentra soluciones tecnológicas y servicios útiles para tu día a día.</p>
      </div>

      <div class="grid-servicios">
        {#each servicios as servicio}
          <article class="servicio-card">
            <div class="servicio-arriba">
              <span class="servicio-icono">{servicio.icono}</span>
              <span class="servicio-numero">{servicio.numero}</span>
            </div>
            <h3>{servicio.titulo}</h3>
            <p>{servicio.descripcion}</p>
            <a href={whatsapp} target="_blank" rel="noreferrer">
              Consultar servicio ↗
            </a>
          </article>
        {/each}
      </div>
    </section>

    <section class="nosotros seccion" id="nosotros">
      <div class="nosotros-visual">
        <div class="visual-cuadro">
          <span>J</span>
          <strong>JonathanGSM</strong>
          <small>TECNOLOGÍA · SERVICIO · CONFIANZA</small>
        </div>
      </div>

      <div class="nosotros-texto">
        <span class="subtitulo">SOBRE NOSOTROS</span>
        <h2>Tu aliado en tecnología y servicios<span class="azul">.</span></h2>
        <p>
          En JonathanGSM ofrecemos soluciones para tus dispositivos móviles
          y servicios de papelería. Trabajamos para brindar una atención
          cercana, práctica y confiable a nuestra comunidad.
        </p>
        <a href={whatsapp} target="_blank" rel="noreferrer" class="btn-principal">
          Conócenos por WhatsApp ↗
        </a>
      </div>
    </section>

    <section class="contacto seccion" id="contacto">
      <span class="subtitulo">ESTAMOS PARA AYUDARTE</span>
      <h2>¿Qué necesitas resolver hoy<span class="azul">?</span></h2>
      <p>Escríbenos y con gusto te orientaremos sobre nuestros servicios.</p>
      <a href={whatsapp} target="_blank" rel="noreferrer" class="btn-principal">
        💬 Hablar por WhatsApp
      </a>
    </section>
  </main>

  <footer>
    <a href="#inicio" class="logo">
      <span class="logo-icon">J</span>
      <span>Jonathan<span class="azul">GSM</span></span>
    </a>
    <p>© 2026 JonathanGSM. Todos los derechos reservados.</p>
    <span>Villa Sombrero, Baní 🇩🇴</span>
  </footer>
</div>

<style>
  :global(*) {
    box-sizing: border-box;
  }

  :global(html) {
    scroll-behavior: smooth;
  }

  :global(body) {
    margin: 0;
    background: #080d17;
    color: #f4f7fc;
    font-family: Arial, Helvetica, sans-serif;
  }

  :global(a) {
    text-decoration: none;
  }

  .pagina {
    overflow: hidden;
    background:
      radial-gradient(ellipse at 75% 12%, #102443 0%, transparent 35%),
      #080d17;
  }

  .azul { color: #42a5ff; }

  .navbar {
    max-width: 1250px;
    margin: auto;
    padding: 25px 35px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 25px;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 10px;
    color: white;
    font-size: 21px;
    font-weight: 800;
  }

  .logo-icon {
    display: grid;
    place-items: center;
    width: 38px;
    height: 38px;
    border-radius: 11px;
    background: #208af0;
    color: white;
  }

  nav { display: flex; gap: 30px; }
  nav a { color: #aab6c8; font-size: 14px; }
  nav a:hover { color: #42a5ff; }

  .btn-login {
    color: white;
    border: 1px solid #34445c;
    padding: 12px 18px;
    border-radius: 9px;
    font-size: 13px;
  }

  .hero {
    max-width: 1250px;
    min-height: 590px;
    padding: 95px 45px;
    margin: auto;
    display: grid;
    grid-template-columns: 1.1fr 0.9fr;
    align-items: center;
    gap: 40px;
  }

  .etiqueta, .subtitulo {
    color: #42a5ff;
    font-size: 11px;
    letter-spacing: 2px;
    font-weight: 800;
  }

  .etiqueta {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .punto {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #42a5ff;
    box-shadow: 0 0 12px #42a5ff;
  }

  h1 {
    margin: 25px 0;
    font-size: clamp(44px, 5.5vw, 72px);
    line-height: 1.08;
    letter-spacing: -3px;
  }

  .hero-texto, .encabezado p, .contacto p {
    color: #9ba9bd;
    font-size: 16px;
    line-height: 1.8;
    max-width: 520px;
  }

  .hero-botones {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-top: 32px;
  }

  .btn-principal, .btn-secundario {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    padding: 15px 21px;
    border-radius: 9px;
    font-weight: 700;
    font-size: 13px;
  }

  .btn-principal {
    color: white;
    background: #1688ed;
    box-shadow: 0 8px 25px #1688ed35;
  }

  .btn-principal:hover { background: #0874d4; }

  .btn-secundario {
    color: white;
    border: 1px solid #34445c;
  }

  .ubicacion {
    margin-top: 45px;
    color: #8291a7;
    font-size: 12px;
  }

  .hero-visual {
    min-height: 390px;
    display: grid;
    place-items: center;
    position: relative;
  }

  .circulo {
    position: absolute;
    border: 1px solid #258ce92a;
    border-radius: 50%;
  }

  .circulo-1 { width: 350px; height: 350px; }
  .circulo-2 { width: 270px; height: 270px; }

  .telefono {
    width: 190px;
    height: 340px;
    border: 7px solid #33445c;
    border-radius: 30px;
    background: #101d31;
    padding: 12px;
    transform: rotate(-8deg);
    box-shadow: 0 25px 80px #0009;
    z-index: 1;
  }

  .telefono-camara {
    width: 65px;
    height: 13px;
    border-radius: 20px;
    background: #33445c;
    margin: -5px auto 17px;
  }

  .telefono-pantalla {
    height: 285px;
    background: linear-gradient(145deg, #123c6b, #071426);
    border-radius: 17px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .telefono-logo {
    font-size: 65px;
    font-weight: 900;
    color: #49adff;
  }

  .telefono-pantalla strong { font-size: 17px; }
  .telefono-pantalla small { color: #a5bedb; font-size: 9px; margin-top: 7px; }
  .linea { width: 60%; height: 1px; background: #ffffff30; margin: 22px 0; }
  .telefono-icono { font-size: 32px; }
  .telefono-status { color: #b8d9f8; font-size: 9px; margin-top: 8px; }

  .tarjeta-flotante {
    position: absolute;
    z-index: 2;
    bottom: 35px;
    right: 0;
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 15px;
    background: #17243a;
    border: 1px solid #34445c;
    border-radius: 12px;
    box-shadow: 0 15px 40px #0007;
  }

  .tarjeta-flotante > span {
    display: grid;
    place-items: center;
    background: #1688ed;
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }

  .tarjeta-flotante strong, .tarjeta-flotante small {
    display: block;
    font-size: 11px;
  }

  .tarjeta-flotante small { color: #9ba9bd; margin-top: 5px; }

  .estadisticas {
    border-top: 1px solid #26344a;
    border-bottom: 1px solid #26344a;
    max-width: 1160px;
    margin: 0 auto;
    padding: 30px;
    display: flex;
    justify-content: space-around;
    gap: 20px;
  }

  .estadisticas div { display: flex; flex-direction: column; gap: 8px; }
  .estadisticas strong { color: #42a5ff; font-size: 26px; }
  .estadisticas span { color: #9ba9bd; font-size: 12px; }

  .seccion { max-width: 1200px; margin: auto; padding: 110px 35px; }

  .encabezado { text-align: center; margin-bottom: 50px; }
  h2 { font-size: clamp(30px, 4vw, 45px); letter-spacing: -1.5px; margin: 18px 0; }
  .encabezado p { margin: auto; }

  .grid-servicios {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 18px;
  }

  .servicio-card {
    padding: 27px;
    background: #101a2b;
    border: 1px solid #25354b;
    border-radius: 14px;
    transition: 0.2s;
  }

  .servicio-card:hover {
    transform: translateY(-5px);
    border-color: #1688ed;
  }

  .servicio-arriba {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .servicio-icono { font-size: 30px; }
  .servicio-numero { color: #61738d; font-size: 12px; }
  .servicio-card h3 { font-size: 17px; margin-top: 25px; }
  .servicio-card p { color: #9ba9bd; font-size: 13px; line-height: 1.7; min-height: 65px; }
  .servicio-card a { color: #42a5ff; font-size: 12px; font-weight: 700; }

  .nosotros {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    gap: 70px;
  }

  .nosotros-visual {
    min-height: 300px;
    display: grid;
    place-items: center;
    border-radius: 20px;
    background: radial-gradient(circle, #164b7d, #101a2b 70%);
    border: 1px solid #263e5c;
  }

  .visual-cuadro { display: flex; flex-direction: column; align-items: center; gap: 12px; }
  .visual-cuadro span { font-size: 100px; font-weight: 900; color: #42a5ff; }
  .visual-cuadro strong { font-size: 24px; }
  .visual-cuadro small { font-size: 9px; letter-spacing: 2px; color: #9ba9bd; }
  .nosotros-texto p { color: #9ba9bd; line-height: 1.9; margin-bottom: 30px; }

  .contacto {
    text-align: center;
    border: 1px solid #263e5c;
    border-radius: 20px;
    margin-bottom: 80px;
    background: radial-gradient(ellipse at center, #142d4a, #0c1422);
  }

  .contacto p { margin: 0 auto 30px; }

  footer {
    border-top: 1px solid #26344a;
    padding: 30px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    color: #8291a7;
    font-size: 11px;
  }

  @media (max-width: 800px) {
    .navbar { padding: 20px; flex-wrap: wrap; }
    nav { order: 3; width: 100%; justify-content: center; gap: 18px; }
    .hero { grid-template-columns: 1fr; padding: 65px 25px; }
    .hero-visual { min-height: 390px; }
    .grid-servicios { grid-template-columns: repeat(2, 1fr); }
    .nosotros { grid-template-columns: 1fr; gap: 35px; }
    footer { flex-direction: column; text-align: center; }
  }

  @media (max-width: 500px) {
    .btn-login { padding: 10px; font-size: 11px; }
    nav { gap: 13px; }
    nav a { font-size: 11px; }
    .grid-servicios { grid-template-columns: 1fr; }
    .estadisticas { padding: 25px 12px; }
    .estadisticas strong { font-size: 20px; }
    .estadisticas span { font-size: 10px; }
    .seccion { padding: 75px 20px; }
    .tarjeta-flotante { right: -5px; }
  }
</style>