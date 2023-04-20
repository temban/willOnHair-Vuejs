<template>
  <!--begin::Wrapper-->
  <div class="w-lg-500px p-10">
    <!--begin::Form-->
    <VForm
      class="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
      novalidate
      @submit="onSubmitRegister"
      id="kt_login_signup_form"
      :validation-schema="registration"
    >
      <!--begin::Heading-->
      <div class="mb-10 text-center">
        <!--begin::Title-->
        <h1 class="text-dark mb-3">Créer un compte</h1>
        <!--end::Title-->

        <!--begin::Link-->
        <div class="text-gray-400 fw-semobold fs-4">
          Avez vous déjà un compte?

          <router-link to="/sign-in" class="link-primary fw-bold">
            Se connecter ici
          </router-link>
        </div>
        <!--end::Link-->
      </div>
      <!--end::Heading-->

      <!--begin::Action-->
      <!-- <button type="button" class="btn btn-light-primary fw-bold w-100 mb-10">
        <img
          alt="Logo"
          :src="getAssetPath('media/svg/brand-logos/google-icon.svg')"
          class="h-20px me-3"
        />
        Sign in with Google
      </button> -->
      <!--end::Action-->

      <!--begin::Separator-->
      <!-- <div class="d-flex align-items-center mb-10">
        <div class="border-bottom border-gray-300 mw-50 w-100"></div>
        <span class="fw-semobold text-gray-400 fs-7 mx-2">OR</span>
        <div class="border-bottom border-gray-300 mw-50 w-100"></div>
      </div> -->
      <!--end::Separator-->

      <!--begin::Input group-->
      <div class="row fv-row mb-7">
        <!--begin::Col-->
        <div class="col-xl-6">
          <label class="form-label fw-bold text-dark fs-6">Prénom</label>
          <Field
            class="form-control form-control-lg form-control-solid"
            type="text"
            placeholder=""
            name="first_name"
            v-model="first_name"
            autocomplete="off"
          />
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="first_name" />
            </div>
          </div>
        </div>
        <!--end::Col-->

        <!--begin::Col-->
        <div class="col-xl-6">
          <label class="form-label fw-bold text-dark fs-6">Nom de famille</label>
          <Field
            class="form-control form-control-lg form-control-solid"
            type="text"
            placeholder=""
            name="last_name"
            v-model="last_name"
            autocomplete="off"
          />
          <div class="fv-plugins-message-container">
            <div class="fv-help-block">
              <ErrorMessage name="last_name" />
            </div>
          </div>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="fv-row mb-7">
        <label class="form-label fw-bold text-dark fs-6">Email</label>
        <Field
          class="form-control form-control-lg form-control-solid"
          type="email"
          placeholder=""
          name="email"
          v-model="email"
          autocomplete="off"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="email" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="mb-10 fv-row" data-kt-password-meter="true">
        <!--begin::Wrapper-->
        <div class="mb-1">
          <!--begin::Label-->
          <label class="form-label fw-bold text-dark fs-6"> Mot de passe </label>
          <!--end::Label-->

          <!--begin::Input wrapper-->
          <div class="position-relative mb-3">
            <Field
              class="form-control form-control-lg form-control-solid"
              type="password"
              placeholder=""
              name="password"
              v-model="password"
              autocomplete="off"
            />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="password" />
              </div>
            </div>
          </div>
          <!--end::Input wrapper-->
          <!--begin::Meter-->
          <div
            class="d-flex align-items-center mb-3"
            data-kt-password-meter-control="highlight"
          >
            <div
              class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"
            ></div>
            <div
              class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"
            ></div>
            <div
              class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"
            ></div>
            <div
              class="flex-grow-1 bg-secondary bg-active-success rounded h-5px"
            ></div>
          </div>
          <!--end::Meter-->
        </div>
        <!--end::Wrapper-->
        <!--begin::Hint-->
        <div class="text-muted">
          Utilisez 8 caractères ou plus avec un mélange de lettres, de chiffres et de symboles.
        </div>
        <!--end::Hint-->
      </div>
      <!--end::Input group--->

      <!--begin::Input group-->
      <div class="fv-row mb-5">
        <label class="form-label fw-bold text-dark fs-6"
          >Confirmez le mot de passe</label
        >
        <Field
          class="form-control form-control-lg form-control-solid"
          type="password"
          placeholder=""
          name="password_confirmation"
          autocomplete="off"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="password_confirmation" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <label class="form-check form-check-custom form-check-solid">
          <Field
            class="form-check-input"
            type="checkbox"
            name="toc"
            value="1"
          />
          <span class="form-check-label fw-semobold text-gray-700 fs-6">
            Je suis d'accord au &
            <a href="#" class="ms-1 link-primary">Termes et conditions</a>.
          </span>
        </label>
      </div>
      <!--end::Input group-->

      <!--begin::Actions-->
      <div class="text-center">
        <button
        @click="signup()"
          id="kt_sign_up_submit"
          ref="submitButton"
          type="submit"
          class="btn btn-lg btn-primary"
        >
          <span class="indicator-label"> Soumettre </span>
          <span class="indicator-progress">
            Please wait...
            <span
              class="spinner-border spinner-border-sm align-middle ms-2"
            ></span>
          </span>
        </button>
      </div>
      <!--end::Actions-->
    </VForm>
    <!--end::Form-->
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, nextTick, onMounted, ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import * as Yup from "yup";
import { useAuthStore, type User } from "@/stores/auth";
import { useRouter } from "vue-router";
import { PasswordMeterComponent } from "@/assets/ts/components";
import Swal from "sweetalert2";
import axios from "axios";
import router from "@/router";

export default defineComponent({
  name: "sign-up",
  components: {
    Field,
    VForm,
    ErrorMessage,
  },
  data(){
    return{
     password:"",
     email:"",
     last_name:"",
     first_name:"",
    }
  },
  mounted() {

  },
  created() {},
  methods:{
    signup() {

let signIn = () => {
  let data = ({
  "jsonrpc": "2.0",
  "params": {
    "db": "willonhair",
    "login": this.email,
    "password": this.password
  }
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://willonhair.shintheo.com/web/session/authenticate',
  headers: { 
    'Content-Type': 'application/json', 
  },
  data : data
};

axios.request(config)
.then((response: { data: any }) => {
  //setUserid(JSON.stringify(response.data));
  console.log(response.data);
  localStorage.setItem('current_user_id', JSON.parse(JSON.stringify(response.data.result.uid)))
  localStorage.setItem('current_user_partnerId',JSON.stringify(response.data.result.partner_id))
  localStorage.setItem('current_user_name', JSON.parse(JSON.stringify(response.data.result.name)))
  localStorage.setItem('current_username_email', JSON.parse(JSON.stringify(response.data.result.username)))

  // router.push({ path: '/dashboard' })
  // router.push({ name: "/dashboard" });
  window.location.href = "/#/dashboard";
})
.catch((error: any) => {
  console.log(error);
  Swal.fire({
         text: "Quelque chose s'est mal passé !",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Essayer à nouveau!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semobold btn-light-danger",
          },
        }).then(() => {
         window.location.reload();
        });
});
}

      var data = {name: this.first_name +" "+ this.last_name ,
        login:this.email,
        password: this.password,
        sel_groups_1_9_10:10};
    
    var config = {
      method: 'post',
    maxBodyLength: Infinity,
      url: 'https://willonhair.shintheo.com/api/res.users/create',
      headers: { 
        'api-key': 'NMMAG3K4IVS0L6VYEPXLJ1Z0RR77AR67', 
        'Content-Type': 'text/plain', 
      },
      data : data
    };
    axios(config)
    .then(function (response: { data: any }) {
      console.log(JSON.stringify(response.data));
      signIn();
    })
    .catch(function (error: any) {
      console.log(error);

      if( error.response.status){
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'OPERATION ECHOUE',
            text: "Ce conte exist deja!",
            showConfirmButton: false,
            timer: 3000
          })
      } else{
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: 'OPERATION ECHOUE',
            showConfirmButton: false,
            timer: 1500
          })
      }

    
    });
    
  },
},
  setup() {
    const store = useAuthStore();
    const router = useRouter();

    const submitButton = ref<HTMLButtonElement | null>(null);

    const registration = Yup.object().shape({
      first_name: Yup.string().required().label("Name"),
      last_name: Yup.string().required().label("Surname"),
      email: Yup.string().min(4).required().email().label("Email"),
      password: Yup.string().required().label("Password"),
      password_confirmation: Yup.string()
        .required()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .label("Password Confirmation"),
    });

    onMounted(() => {
      nextTick(() => {
        PasswordMeterComponent.bootstrap();
      });
    });

    const onSubmitRegister = async (values: any) => {
      values = values as User;

      // Clear existing errors
      store.logout();

      // eslint-disable-next-line
      submitButton.value!.disabled = true;

      // Activate indicator
      submitButton.value?.setAttribute("data-kt-indicator", "on");

      // Send login request
      await store.register(values);

      const error = Object.values(store.errors);

      submitButton.value?.removeAttribute("data-kt-indicator");
      // eslint-disable-next-line
      submitButton.value!.disabled = false;
    };

    return {
      registration,
      onSubmitRegister,
      submitButton,
      getAssetPath,
    };
  },
});

</script>
