
<script>
  import { onMount } from 'svelte';
  import { goto } from '$app/navigation';
  import { supabase } from '#lib/supabase.js';

  let usuario = $state(null);
  let servicio = $state('Reparación de celulares');
  let descripcion = $state('');
  let solicitudes = $state([]);
  let cargando = $state(true);
  let enviando = $state(false);
  let mensaje = $state('');
  let error = $state('');

  async function cargarSolicitudes() {
    const { data, error: consultaError } = await supabase
      .from('solicitudes')
      .select('*')
      .eq('cliente_id', usuario.id)
      .order('created_at', { ascending: false });

    if (consultaError) throw consultaError;
    solicitudes = data || [];
  }

  onMount(async () => {
    const { data, error: authError } = await supabase.auth.getUser();

    if (authError || !data.user) {
      await goto('/login');
      return;
    }

    usuario = data.user;

    try {
      await cargarSolicitudes();
    } catch (e) {
      error = e.message;
    } finally {
      cargando = false;
    }
  });

  async function enviarSolicitud(event) {
    event.preventDefault();
    mensaje = '';
    error = '';
    enviando = true;

    try {
      const { error: insertError } = await supabase
        .from('solicitudes')
        .insert({
          cliente_id: usuario.id,
          servicio,
          descripcion
        });

      if (insertError) throw insertError;

      descripcion = '';
      mensaje = '¡Solicitud enviada correctamente!';
      await cargarSolicitudes();
    } catch (e) {
      error = e.message;
    } finally {
      enviando = false;
    }
  }

  async function cerrarSesion() {
    await supabase.auth.signOut();
    await goto('/login');
  }
</script>

<svelte:head>
  <title>Mis solicitudes | JonathanGSM</title>
</svelte:head>

<main>
  <header>
    <a href="/">Jonathan<span>GSM</span></a>
    <button onclick={cerrarSesion}>Cerrar sesión</button>
  </header>

  {#if cargando}
    <p class="centro">Cargando tu cuenta...</p>
  {:else}
    <section class="contenedor">
      <p class="etiqueta">ÁREA DE CLIENTES</p>
      <h1>Mis solicitudes</h1>
      <p class="subtitulo">Bienvenido, {usuario?.user_metadata?.nombre || usuario?.email}</p>

      <div class="panel">
        <h2>Nueva solicitud</h2>
        <form onsubmit={enviarSolicitud}>
          <label for="servicio">¿Qué servicio necesitas?</label>
          <select id="servicio" bind:value={servicio}>
            <option>Reparación de celulares</option>
            <option>Microsoldaduras</option>
            <option>Copias e impresiones</option>
            <option>Digitación y digitalización</option>
            <option>Contratos</option>
            <option>Plastificación</option>
            <option>Papelería</option>
            <option>Otro</option>
          </select>

          <label for="descripcion">Describe lo que necesitas</label>
          <textarea id="descripcion" bind:value={descripcion}
            placeholder="Escribe aquí los detalles de tu solicitud..."
            required minlength="5"></textarea>

          {#if mensaje}<p class="mensaje">{mensaje}</p>{/if}
          {#if error}<p class="error">{error}</p>{/if}

          <button class="enviar" type="submit" disabled={enviando}>
            {enviando ? 'Enviando...' : 'Enviar solicitud'}
          </button>
        </form>
      </div>

      <div class="panel">
        <h2>Historial de solicitudes</h2>
        {#if solicitudes.length === 0}
          <p class="subtitulo">Todavía no has realizado ninguna solicitud.</p>
        {:else}
          {#each solicitudes as item}
            <article class="solicitud">
              <div>
                <strong>{item.servicio}</strong>
                <p>{item.descripcion}</p>
                <small>{new Date(item.created_at).toLocaleDateString('es-DO')}</small>
              </div>
              <span>{item.estado}</span>
            </article>
          {/each}
        {/if}
      </div>
    </section>
  {/if}
</main>

<style>
  :global(body) {
    margin: 0;
    background: #080f1c;
    color: #f1f5f9;
    font-family: Arial, sans-serif;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 7%;
    border-bottom: 1px solid #26364c;
  }

  header a {
    color: white;
    font-size: 24px;
    font-weight: bold;
    text-decoration: none;
  }

  header a span { color: #3995ff; }

  button {
    cursor: pointer;
    border: 0;
    border-radius: 8px;
    padding: 11px 16px;
    color: white;
    background: #245da0;
  }

  .contenedor {
    max-width: 850px;
    margin: 50px auto;
    padding: 0 20px;
  }

  .etiqueta {
    color: #62aaff;
    font-size: 12px;
    letter-spacing: 2px;
    font-weight: bold;
  }

  h1 { font-size: 34px; margin-bottom: 8px; }
  h2 { margin-top: 0; }

  .subtitulo { color: #94a3b8; line-height: 1.6; }

  .panel {
    background: #111d2e;
    border: 1px solid #26364c;
    border-radius: 14px;
    padding: 25px;
    margin-top: 25px;
  }

  label {
    display: block;
    margin: 18px 0 8px;
    font-size: 14px;
  }

  select, textarea {
    box-sizing: border-box;
    width: 100%;
    padding: 13px;
    border: 1px solid #34465e;
    border-radius: 8px;
    background: #0b1524;
    color: white;
    font: inherit;
  }

  textarea { min-height: 110px; resize: vertical; }

  .enviar { margin-top: 18px; background: #287bd1; }
  .enviar:disabled { opacity: .6; }

  .mensaje, .error { padding: 10px; border-radius: 7px; }
  .mensaje { color: #9be7b0; background: #173a2b; }
  .error { color: #ffaaaa; background: #451e29; }

  .solicitud {
    display: flex;
    justify-content: space-between;
    gap: 15px;
    padding: 18px 0;
    border-top: 1px solid #26364c;
  }

  .solicitud p { color: #cbd5e1; }
  .solicitud small { color: #94a3b8; }
  .solicitud span { color: #70b4ff; font-size: 13px; }
  .centro { text-align: center; margin-top: 80px; }

  @media (max-width: 600px) {
    .solicitud { flex-direction: column; }
  }
</style>
