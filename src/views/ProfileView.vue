<template>
  <div class="container text-center">
    <div class="row justify-content-center mb-3">
      <div class="col col-2">
        <div class="form-check">
          <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1">
          <label class="form-check-label" for="flexRadioDefault1">
            Rendin lao
          </label>
        </div>
      </div>
      <div class="col col-2">
        <div class="form-check">
          <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2">
          <label class="form-check-label" for="flexRadioDefault2">
            Annan rendile
          </label>
        </div>
      </div>
    </div>
    <div class="row justify-content-center mb-3">
      <div class="col col-4">
        <div class="input-group flex-nowrap">
          <span class="input-group-text">Eesnimi</span>
          <input type="text" class="form-control">
        </div>
      </div>
    </div>
    <div class="row justify-content-center mb-3">
      <div class="col col-4">
        <div class="input-group flex-nowrap">
          <span class="input-group-text">Perekonnanimi</span>
          <input type="text" class="form-control">
        </div>
      </div>
    </div>
    <div class="row justify-content-center mb-3">
      <div class="col col-4">
        <div class="input-group flex-nowrap">
          <span class="input-group-text">E-maili aadress</span>
          <input type="text" class="form-control">
        </div>
      </div>
    </div>
    <div class="row justify-content-center mb-3">
      <div class="col col-4">
        <div class="input-group flex-nowrap">
          <span class="input-group-text">Parool</span>
          <input type="password" class="form-control">
        </div>
      </div>
    </div>
    <div class="row justify-content-center mb-3">
      <div class="col col-4">
        <div class="input-group flex-nowrap">
          <span class="input-group-text">Korda parooli</span>
          <input type="password" class="form-control">
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col col-6">
        <button @click="createNewUser" type="submit" class="btn btn-primary">Registreeri uus kasutaja</button>
      </div>
    </div>

  </div>
</template>


<script>
export default {
  name: "ProfileView",

  data() {

  },
}
</script>

