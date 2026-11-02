
<script>
  import { onMount } from 'svelte';
  import { supabase } from '#lib/supabase.js';
  import { goto } from '$app/navigation';

  let solicitudes = $state([]);
  let clientes = $state([]);
  let cargando = $state(true);
  let error = $state('');

  async function cargarDatos() {
    cargando = true;
    error = '';

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      goto('/login');
      return;
    }

    const { data: perfil, error: errorPerfil } = await supabase
      .from('clientes')
      .select('rol')
      .eq('id', user.id)
      .single();

    if (errorPerfil || perfil?.rol !== 'admin') {
      goto('/');
      return;
    }

    const { data: datosClientes, error: errorClientes } =
      await supabase.from('clientes').select('*').order('created_at', { ascending: false });

    const { data: datosSolicitudes, error: errorSolicitudes } =
      await supabase.from('solicitudes').select('*').order('created_at', { ascending: false });

    if (errorClientes || errorSolicitudes) {
      error = 'No se pudieron cargar los datos.';
    } else {
      clientes = datosClientes || [];
      solicitudes = datosSolicitudes || [];
    }

    cargando = false;
  }

  async function cambiarEstado(id, estado) {
    const { error: fallo } = await supabase
      .from('solicitudes')
      .update({ estado })
      .eq('id', id);

    if (fallo) {
      error = fallo.message;
    } else {
      solicitudes = solicitudes.map(s =>
        s.id === id ? { ...s, estado } : s
      );
    }
  }

  async function cerrarSesion() {
    await supabase.auth.signOut();
    goto('/login');
  }

  onMount(cargarDatos);
</script>

<svelte:head>
  <title>Administración | JonathanGSM</title>
</svelte:head>

<div class="panel">
  <header>
    <div>
      <h1>Jonathan<span>GSM</span></h1>
      <p>Panel de administración</p>
    </div>
    <button class="salir" onclick={cerrarSesion}>Cerrar sesión</button>
  </header>

  {#if cargando}
    <p class="mensaje">Cargando panel...</p>
  {:else}
    {#if error}
      <p class="error">{error}</p>
    {/if}

    <h2>Resumen general</h2>

    <div class="resumen">
      <article>
        <span>Clientes registrados</span>
        <strong>{clientes.length}</strong>
      </article>
      <article>
        <span>Solicitudes recibidas</span>
        <strong>{solicitudes.length}</strong>
      </article>
      <article>
        <span>Pendientes</span>
        <strong>{solicitudes.filter(s => s.estado === 'Pendiente').length}</strong>
      </article>
    </div>

    <h2>Solicitudes de clientes</h2>

    {#if solicitudes.length === 0}
      <p class="mensaje">Todavía no hay solicitudes.</p>
    {:else}
      <div class="tabla">
        {#each solicitudes as solicitud}
          <article class="solicitud">
            <div>
              <h3>{solicitud.servicio}</h3>
              <p>{solicitud.descripcion}</p>
              <small>Cliente ID: {solicitud.cliente_id}</small>
              <small>Fecha: {new Date(solicitud.created_at).toLocaleDateString('es-DO')}</small>
            </div>

            <select
              value={solicitud.estado}
              onchange={(e) => cambiarEstado(solicitud.id, e.currentTarget.value)}
            >
              <option>Pendiente</option>
              <option>En proceso</option>
              <option>Completada</option>
              <option>Cancelada</option>
            </select>
          </article>
        {/each}
      </div>
    {/if}

    <h2>Clientes registrados</h2>

    <div class="tabla">
      {#each clientes as cliente}
        <article class="cliente">
          <div>
            <strong>{cliente.nombre}</strong>
            <p>{cliente.email}</p>
            <small>{cliente.telefono || 'Sin teléfono'}</small>
          </div>
          <span class="rol">{cliente.rol}</span>
        </article>
      {/each}
    </div>
  {/if}
</div>

<style>
  :global(body) {
    margin: 0;
    background: #0b1120;
    color: #e5e7eb;
    font-family: Arial, sans-serif;
  }

  .panel {
    max-width: 1100px;
    margin: auto;
    padding: 30px 20px;
  }

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #263247;
    padding-bottom: 20px;
    margin-bottom: 35px;
  }

  h1 { margin: 0; font-size: 28px; }
  h1 span { color: #38bdf8; }
  header p, .cliente p { color: #94a3b8; margin: 6px 0; }

  h2 { margin-top: 35px; font-size: 21px; }

  .resumen {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 15px;
  }

  .resumen article, .solicitud, .cliente {
    background: #151f32;
    border: 1px solid #263247;
    border-radius: 12px;
    padding: 20px;
  }

  .resumen span { color: #94a3b8; display: block; }
  .resumen strong { display: block; font-size: 30px; margin-top: 12px; color: #38bdf8; }

  .tabla { display: grid; gap: 12px; }

  .solicitud, .cliente {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 15px;
  }

  .solicitud h3 { margin-top: 0; }
  .solicitud p { color: #cbd5e1; }
  small { display: block; color: #94a3b8; margin-top: 6px; }

  select {
    background: #0b1120;
    color: white;
    border: 1px solid #38bdf8;
    border-radius: 7px;
    padding: 10px;
    max-width: 150px;
  }

  button {
    cursor: pointer;
    border: 0;
    border-radius: 8px;
    padding: 11px 16px;
    font-weight: bold;
  }

  .salir { background: #ef4444; color: white; }
  .rol { color: #38bdf8; font-weight: bold; }
  .mensaje { color: #94a3b8; }
  .error { color: #f87171; }

  @media (max-width: 600px) {
    .solicitud, .cliente { align-items: flex-start; flex-direction: column; }
    header { align-items: flex-start; gap: 15px; }
  }
</style>
