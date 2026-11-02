
<script>
  import { supabase } from '#lib/supabase.js';
  import { goto } from '$app/navigation';

  let modo = $state('login');
  let nombre = $state('');
  let telefono = $state('');
  let email = $state('');
  let password = $state('');
  let cargando = $state(false);
  let mensaje = $state('');
  let error = $state('');

  async function enviarFormulario(event) {
    event.preventDefault();

    mensaje = '';
    error = '';
    cargando = true;

    try {
      if (modo === 'registro') {
        const { data, error: registroError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              nombre,
              telefono
            }
          }
        });

        if (registroError) throw registroError;

        if (data.session) {
          await goto('/solicitudes');
        } else {
          mensaje = 'Cuenta creada. Revisa tu correo para confirmar el registro.';
        }
      } else {
        const { data, error: loginError } =
  await supabase.auth.signInWithPassword({
    email,
    password
  });

if (loginError) throw loginError;

// Consultar el rol del usuario
      const { data: perfil, error: perfilError } = await supabase
      .from('clientes')
      .select('rol')
      .eq('id', data.user.id)
      .single();

if (perfilError) throw perfilError;

// Redirigir según su rol
if (perfil.rol === 'admin') {
  await goto('/admin');
} else {
  await goto('/solicitudes');
}
      }
    } catch (e) {
      error = e.message || 'Ocurrió un error. Inténtalo nuevamente.';
    } finally {
      cargando = false;
    }
  }
</script>

<svelte:head>
  <title>Acceso de clientes | JonathanGSM</title>
  <meta name="description" content="Accede a tu cuenta de JonathanGSM." />
</svelte:head>

<main>
  <a class="logo" href="/">Jonathan<span>GSM</span></a>

  <section class="panel">
    <div class="icono">JG</div>

    <p class="etiqueta">ÁREA DE CLIENTES</p>

    <h1>{modo === 'login' ? 'Bienvenido de nuevo' : 'Crea tu cuenta'}</h1>

    <p class="subtitulo">
      {modo === 'login'
        ? 'Inicia sesión para gestionar tus solicitudes.'
        : 'Regístrate para solicitar nuestros servicios.'}
    </p>

    <div class="pestanas">
      <button
        class:activo={modo === 'login'}
        onclick={() => { modo = 'login'; mensaje = ''; error = ''; }}
      >
        Iniciar sesión
      </button>

      <button
        class:activo={modo === 'registro'}
        onclick={() => { modo = 'registro'; mensaje = ''; error = ''; }}
      >
        Registrarme
      </button>
    </div>

    <form onsubmit={enviarFormulario}>
      {#if modo === 'registro'}
        <label for="nombre">Nombre completo</label>
        <input id="nombre" bind:value={nombre} placeholder="Tu nombre" required />

        <label for="telefono">Teléfono</label>
        <input id="telefono" bind:value={telefono} placeholder="Ej. 8291234567" required />
      {/if}

      <label for="email">Correo electrónico</label>
      <input
        id="email"
        type="email"
        bind:value={email}
        placeholder="correo@ejemplo.com"
        required
      />

      <label for="password">Contraseña</label>
      <input
        id="password"
        type="password"
        bind:value={password}
        placeholder="Mínimo 6 caracteres"
        minlength="6"
        required
      />

      {#if error}
        <p class="error">{error}</p>
      {/if}

      {#if mensaje}
        <p class="mensaje">{mensaje}</p>
      {/if}

      <button class="enviar" type="submit" disabled={cargando}>
        {cargando
          ? 'Procesando...'
          : modo === 'login'
            ? 'Entrar a mi cuenta'
            : 'Crear cuenta'}
      </button>
    </form>

    <a class="volver" href="/">← Volver al inicio</a>
  </section>

  <p class="pie">© 2026 JonathanGSM · Villa Sombrero, Baní</p>
</main>

<style>
  :global(body) {
    margin: 0;
    background: #080f1c;
    color: #f1f5f9;
    font-family: Arial, sans-serif;
  }

  main {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 30px 18px;
    box-sizing: border-box;
  }

  .logo {
    color: white;
    font-size: 27px;
    font-weight: 800;
    text-decoration: none;
    margin-bottom: 28px;
  }

  .logo span {
    color: #3995ff;
  }

  .panel {
    width: 100%;
    max-width: 420px;
    box-sizing: border-box;
    padding: 34px;
    border: 1px solid #26364c;
    border-radius: 18px;
    background: #111d2e;
  }

  .icono {
    width: 48px;
    height: 48px;
    display: grid;
    place-items: center;
    border-radius: 13px;
    background: #173e70;
    color: #70b4ff;
    font-weight: 800;
    margin-bottom: 22px;
  }

  .etiqueta {
    color: #62aaff;
    font-size: 11px;
    font-weight: bold;
    letter-spacing: 2px;
  }

  h1 {
    font-size: 27px;
    margin: 10px 0;
  }

  .subtitulo {
    color: #94a3b8;
    font-size: 14px;
    line-height: 1.6;
  }

  .pestanas {
    display: flex;
    gap: 8px;
    margin: 25px 0;
    padding: 5px;
    background: #0b1524;
    border-radius: 10px;
  }

  .pestanas button {
    flex: 1;
    border: 0;
    border-radius: 7px;
    padding: 11px 5px;
    background: transparent;
    color: #94a3b8;
    cursor: pointer;
  }

  .pestanas button.activo {
    color: white;
    background: #245da0;
  }

  label {
    display: block;
    font-size: 13px;
    margin: 16px 0 8px;
  }

  input {
    width: 100%;
    box-sizing: border-box;
    padding: 13px;
    border: 1px solid #34465e;
    border-radius: 8px;
    outline: none;
    background: #0b1524;
    color: white;
  }

  input:focus {
    border-color: #3995ff;
  }

  .enviar {
    width: 100%;
    margin-top: 23px;
    padding: 14px;
    border: 0;
    border-radius: 8px;
    background: #287bd1;
    color: white;
    font-weight: bold;
    cursor: pointer;
  }

  .enviar:disabled {
    opacity: 0.6;
    cursor: wait;
  }

  .error, .mensaje {
    font-size: 13px;
    line-height: 1.5;
    padding: 10px;
    border-radius: 7px;
  }

  .error {
    color: #ffaaaa;
    background: #451e29;
  }

  .mensaje {
    color: #9be7b0;
    background: #173a2b;
  }

  .volver {
    display: block;
    margin-top: 23px;
    color: #8bbfff;
    text-align: center;
    text-decoration: none;
    font-size: 13px;
  }

  .pie {
    margin-top: 25px;
    color: #64748b;
    font-size: 12px;
    text-align: center;
  }

  @media (max-width: 480px) {
    .panel {
      padding: 25px 20px;
    }
  }
</style>
