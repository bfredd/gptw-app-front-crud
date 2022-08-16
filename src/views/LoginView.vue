<style>
.form-signin {
  max-width: 330px;
  padding: 15px;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
    .bd-placeholder-img {
    font-size: 1.125rem;
    text-anchor: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    user-select: none;
    }

    @media (min-width: 768px) {
    .bd-placeholder-img-lg {
        font-size: 3.5rem;
    }
    }

    .b-example-divider {
    height: 3rem;
    background-color: rgba(0, 0, 0, .1);
    border: solid rgba(0, 0, 0, .15);
    border-width: 1px 0;
    box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
    }

    .b-example-vr {
    flex-shrink: 0;
    width: 1.5rem;
    height: 100vh;
    }

    .bi {
    vertical-align: -.125em;
    fill: currentColor;
    }

    .nav-scroller {
    position: relative;
    z-index: 2;
    height: 2.75rem;
    overflow-y: hidden;
    }

    .nav-scroller .nav {
    display: flex;
    flex-wrap: nowrap;
    padding-bottom: 1rem;
    margin-top: -1px;
    overflow-x: auto;
    text-align: center;
    white-space: nowrap;
    -webkit-overflow-scrolling: touch;
    }
</style>

<template>
    <main class="form-signin w-100 m-auto text-center">
    <form @submit.stop.prevent="submit()">
        <h1 class="h3 mb-3 fw-normal">Área restrita</h1>

        <div class="form-floating">
          <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" v-model="login">
          <label for="floatingInput" class="placeholderinput">Login</label>
        </div>

        <div class="form-floating">
          <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="password">
          <label for="floatingPassword" class="placeholderinput" >Senha</label>
        </div>

        <button class="w-100 btn btn-lg btn-primary" type="submit">LOGIN</button>

        <div class="alert alert-danger p-2 space-top" role="alert" v-if="errorApi">
          Dados inválidos!
        </div>

        <p class="mt-5 mb-3 text-muted">&copy; 2022</p>
    </form>
    </main>
</template>

<script>
import Cookie from 'js-cookie'

export default {
  data() {
    return {
      login: 'bruno@gmail2.com',
      password: '*Brainset981218.',
      errorApi: false
    }
  },
  methods: {
    submit() {
      this.errorApi = false
      const payload = {
          email: this.login, 
          password: this.password
      }
      fetch(`${import.meta.env.VITE_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          'Access': 'application/json',
        },
        body: JSON.stringify(payload)
      })
      .then(response => response.json())
      .then(res => {
        if(res.statusCode!=401){
          Cookie.set(import.meta.env.VITE_NAME_COOKIE_AUTH,res.token)
          this.$router.push('/')
        } else {
          this.errorApi = true
        }
      })
    }
  },
  created() {
    // Cookie.remove(import.meta.env.VITE_NAME_COOKIE_AUTH)
  },
  mounted() {

  }
}
</script>