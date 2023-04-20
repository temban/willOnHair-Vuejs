<template>
  <!--begin::Wrapper-->
  <div class="w-lg-500px p-10">







    <!--begin::Form-->
    <VForm
      class="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
      @submit="onSubmitForgotPassword"
      id="kt_login_password_reset_form"
      :validation-schema="forgotPassword"
    >
      <!--begin::Heading-->
      <div class="text-center mb-10">
        <!--begin::Title-->
        <h1 class="text-dark mb-3">Mot de passe oublié ?</h1>
        <!--end::Title-->

        <!--begin::Link-->
        <div class="text-gray-400 fw-semobold fs-4">
          Entrez votre email pour recevoir un nouveau mot de passe.        </div>
        <!--end::Link-->
      </div>
      <!--begin::Heading-->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <label class="form-label fw-bold text-gray-900 fs-6">Email</label>
        <Field
          class="form-control form-control-solid"
          type="email"
          placeholder=""
          name="email"
          autocomplete="off"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="email" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Actions-->
      <div class="d-flex flex-wrap justify-content-center pb-lg-0">
        <button
          type="submit"
          ref="submitButton"
          id="kt_password_reset_submit"
          class="btn btn-lg btn-primary fw-bold me-4"
        >
          <span class="indicator-label"> Soumettre </span>
          <span class="indicator-progress">
            Please wait...
            <span
              class="spinner-border spinner-border-sm align-middle ms-2"
            ></span>
          </span>
        </button>

        <router-link to="/sign-up" class="btn btn-lg btn-light-primary fw-bold"
          >Annuler</router-link
        >
      </div>
      <!--end::Actions-->
    </VForm>
    <!--end::Form-->




 
    
  </div>
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { useAuthStore } from "@/stores/auth";
import * as Yup from "yup";
import Swal from "sweetalert2";
import axios from "axios";
import router from "@/router";


export default defineComponent({
  name: "password-reset",
  components: {
    Field,
    VForm,
    ErrorMessage,
  },

  mounted(){

  },

  methods:{


    //    sendEmail() {
    //   Email.send({
    //     Host : "ssl0.ovh.net",
    // Username : "contact@willonhair.com",
    // Password : "WillOnH@ir.2020%",
    // To : 'tembanblaise12@gmail.com',
    // From : "noreply@willonhair.com",
    // Subject : "This is the subject",
    // Body : "And this is the body"
    //   })
    //     .then(function (message) {
    //       alert("mail sent successfully")
    //     });
    // },

 },
  setup() {
    const store = useAuthStore();

    const submitButton = ref<HTMLButtonElement | null>(null);

    //Create form validation object
    const forgotPassword = Yup.object().shape({
      email: Yup.string().email().required().label("Email"),
    });

    //Form submit function
    const onSubmitForgotPassword = async (values: any) => {
      values = values as string;

      // eslint-disable-next-line
      submitButton.value!.disabled = true;
      // Activate loading indicator
      submitButton.value?.setAttribute("data-kt-indicator", "on");

      // dummy delay
      // Send login request
      await store.forgotPassword(values);

      //michel@gmail.com


let changePassword= (email, id, name) =>{

  if(email === undefined ){

    Swal.fire({
          text: "L'utilisateur n'existe pas",
          icon: "warning",
          buttonsStyling: false,
          confirmButtonText: "Ok",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semobold btn-light-primary",
          },
        });
        
  submitButton.value?.removeAttribute("data-kt-indicator");

  } else{
    
  var pass = '';
            var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
                    'abcdefghijklmnopqrstuvwxyz0123456789@#$';
              
            for (let i = 1; i <= 8; i++) {
                var char = Math.floor(Math.random()
                            * str.length + 1);
                  
                pass += str.charAt(char)
            }

          

  var data = {password: pass};
  var config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: 'https://willonhair.shintheo.com/api/res.users/' + id,
      headers: {
        'api-key': 'NMMAG3K4IVS0L6VYEPXLJ1Z0RR77AR67',
        'Content-Type': 'text/plain',
      },
      data: data
    };
    axios.request(config)
      .then((response) => {
            console.log("passsword", pass)
            
        //     Swal.fire({
        //   text: "Votre nouveau mot de passe est: " + pass + " name" + name,
        //   icon: "success",
        //   buttonsStyling: false,
        //   confirmButtonText: "Ok, got it!",
        //   heightAuto: false, 
        //   customClass: {
        //     confirmButton: "btn fw-semobold btn-light-primary",
        //   },
        // }).then(() =>{
        //   router.push({ path: '/sign-in' })
        // });


let data = JSON.stringify({
  "name": name,
  "email": email,
  "subject": "Nouveau mot de passe WillOnHair",
  "code": pass
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'http://salon.shintheo.com:8443/api/mail/send',
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios.request(config)
.then((response) => {
  Swal.fire({
            title: "Mot de passe réinitialisé avec succès!",
            text: "Un nouveau mot de passe vous a été envoyé à l'adresse email spécifié",
            icon: "success",
            confirmButtonText: "Ok",
            buttonsStyling: false,
            heightAuto: false,
            customClass: {
              confirmButton: "btn btn-light-primary",
            },
          }).then(() =>{
          router.push({ path: '/sign-in' })
        });
  console.log(JSON.stringify(response.data));
  submitButton.value?.removeAttribute("data-kt-indicator");
})
.catch((error) => {
  Swal.fire({
        icon: "error",
        title: "Quelque chose s'est mal passé !",
        showConfirmButton: false,
        timer: 1500
    })
    submitButton.value?.removeAttribute("data-kt-indicator");
  console.log(error);
});

        


      })
     
      .catch((error) => {
        Swal.fire({
        icon: "error",
        title: "Quelque chose s'est mal passé ! 11",
        showConfirmButton: false,
        timer: 1500
    })
       submitButton.value?.removeAttribute("data-kt-indicator");
        console.log(error);
      });
  }
}


    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://willonhair.shintheo.com/api/res.users/search',
      headers: { 
        'api-key': 'NMMAG3K4IVS0L6VYEPXLJ1Z0RR77AR67', 
        'Content-Type': 'text/plain', 
      },
    };
    axios.request(config)
      .then((response) => {

console.log(values, response.data.data);

       let ListUsers = response.data.data
       var email;
       var userId ;
       var name;
        for (let i = 0; i < ListUsers.length; i++) {
          if (values.email === ListUsers[i].login){
             email = ListUsers[i].login
             userId = ListUsers[i].id;
             name = ListUsers[i].partner_id[0].name
            
}
        }

        changePassword(email, userId, name);
       
       
        

      })
      .catch((error) => {
        Swal.fire({
          text: "Quelque chose s'est mal passé !",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Essayer à nouveau!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semobold btn-light-danger",
          },
        });
        console.log(error);
        
      submitButton.value?.removeAttribute("data-kt-indicator");
      });

      // eslint-disable-next-line
        submitButton.value!.disabled = false;
    };

    return {
      onSubmitForgotPassword,
      forgotPassword,
      submitButton,
    };
  },
});
</script>
