<template>
  <!--begin::Basic info-->
  <div class="card mb-5 mb-xl-10">
    <!--begin::Card header-->
    <div
      class="card-header border-0 cursor-pointer"
      role="button"
      data-bs-toggle="collapse"
      data-bs-target="#kt_account_profile_details"
      aria-expanded="true"
      aria-controls="kt_account_profile_details"
    >
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bold m-0">Détails du profil</h3>
      </div>
      <!--end::Card title-->
    </div>
    <!--begin::Card header-->

    <!--begin::Content-->
    <div id="kt_account_profile_details" class="collapse show">
      <!--begin::Form-->
      <VForm
        id="kt_account_profile_details_form"
        class="form"
        novalidate
        @submit="saveChanges1()"
        :validation-schema="profileDetailsValidator"
      >
        <!--begin::Card body-->
        <div class="card-body border-top p-9">

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-semobold fs-6"
              >Nom</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                    type="text"
                    name="name"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    placeholder="Nom"
                    v-model="profileDetails.name"
              />
              <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="name" />
                    </div>
                  </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-semobold fs-6"
              >E-mail</label
            >
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="email"
                name="email"
                class="form-control form-control-lg form-control-solid"
                placeholder="E-mail"
                v-model="profileDetails.email"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="email" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6">
              <span class="required">Numéro de téléphone</span>

              <i
                class="fas fa-exclamation-circle ms-1 fs-7"
                data-bs-toggle="tooltip"
                title="Phone number must be active"
              ></i>
            </label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="tel"
                name="phone"
                class="form-control form-control-lg form-control-solid"
                placeholder="Téléphone"
                v-model="profileDetails.contactPhone"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="phone" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->


        </div>
        <!--end::Card body-->

        <!--begin::Actions-->
        <div class="card-footer d-flex justify-content-end py-6 px-9">
          <!-- <button
            type="reset"
            class="btn btn-light btn-active-light-primary me-2"
          >
            Discard
          </button> -->

          <button
            type="submit"
            id="kt_account_profile_details_submit"
            ref="submitButton1"
            class="btn btn-primary"
          >
            <span class="indicator-label"> Sauvegarder </span>
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
    <!--end::Content-->
  </div>
  <!--end::Basic info-->

  <!--begin::Sign-in Method-->
  <div class="card mb-5 mb-xl-10">
    <!--begin::Card header-->
    <div
      class="card-header border-0 cursor-pointer"
      role="button"
      data-bs-toggle="collapse"
      data-bs-target="#kt_account_signin_method"
    >
      <div class="card-title m-0">
        <h3 class="fw-bolder m-0">Changer votre mot de passe</h3>
      </div>
    </div>
    <!--end::Card header-->

    <!--begin::Content-->
    <div id="kt_account_signin_method" class="collapse show">
      <!--begin::Card body-->
      <div class="card-body border-top p-9">
        <!--begin::Password-->
        <div class="d-flex flex-wrap align-items-center mb-8">
          <div
            id="kt_signin_password"
            :class="{ 'd-none': passwordFormDisplay }"
          >
            <div class="fs-4 fw-bolder mb-1">Mot de passe</div>
            <div class="fs-6 fw-semobold text-gray-600">************</div>
          </div>
          <div
            id="kt_signin_password_edit"
            class="flex-row-fluid"
            :class="{ 'd-none': !passwordFormDisplay }"
          >
            <div class="fs-6 fw-semobold text-gray-600 mb-4">
              Le mot de passe doit comporter au moins 8 caractères et contenir des symboles            </div>

            <!--begin::Form-->
            <VForm
              id="kt_signin_change_password"
              class="form"
              novalidate
              @submit="updatePassword()"
              :validation-schema="changePassword"
            >
              <div class="row mb-6">
                <div class="col-lg-6">
                  <div class="fv-row mb-0">
                    <label
                      for="newpassword"
                      class="form-label fs-6 fw-bold mb-3"
                      >Nouveau mot de passe</label
                    >
                    <Field
                      type="password"
                      class="form-control form-control-lg form-control-solid fw-semobold fs-6"
                      name="newpassword"
                      v-model="UpdatePassword.password"
                      id="newpassword"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="newpassword" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-6">
                  <div class="fv-row mb-0">
                    <label
                      for="confirmpassword"
                      class="form-label fs-6 fw-bold mb-3"
                      >Confirmer le nouveau mot de passe</label
                    >
                    <Field
                      type="password"
                      class="form-control form-control-lg form-control-solid fw-semobold fs-6"
                      name="confirmpassword"
                      id="confirmpassword"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="confirmpassword" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex">
                <button
                  id="kt_password_submit"
                  type="submit"
                  ref="updatePasswordButton"
                  class="btn btn-primary me-2 px-6"
                >
                  <span class="indicator-label"> Mettre à jour </span>
                  <span class="indicator-progress">
                    Please wait...
                    <span
                      class="spinner-border spinner-border-sm align-middle ms-2"
                    ></span>
                  </span>
                </button>
                <button
                  id="kt_password_cancel"
                  type="button"
                  @click="passwordFormDisplay = !passwordFormDisplay"
                  class="btn btn-color-gray-400 btn-active-light-primary px-6"
                >
                  Annuler
                </button>
              </div>
            </VForm>
            <!--end::Form-->
          </div>
          <div
            id="kt_signin_password_button"
            class="ms-auto"
            :class="{ 'd-none': passwordFormDisplay }"
          >
            <button
              @click="passwordFormDisplay = !passwordFormDisplay"
              class="btn btn-light fw-bolder"
            >
            Réinitialiser
            </button>
          </div>
        </div>
        <!--end::Password-->
      </div>
      <!--end::Card body-->
    </div>
    <!--end::Content-->
  </div>
  <!--end::Sign-in Method-->


  <!--end::Deactivate Account-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import Swal from "sweetalert2";
import * as Yup from "yup";
import axios from "axios";

interface ProfileDetails {
  name: string;
  email: string;
  contactPhone: string;
}
interface updatePassword {
  password: string;
}
export default defineComponent({
  name: "account-settings",
  components: {
    ErrorMessage,
    Field,
    VForm,
  },
  data(){
    return{
      phone1:"",
      profile:localStorage.getItem("current_user_partnerId"),
      img:"",
    }
  },
  mounted(){
    let config3 = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://willonhair.shintheo.com/api/res.partner/'+ localStorage.getItem("current_user_partnerId"),
  headers: { 
    'api-key': 'NMMAG3K4IVS0L6VYEPXLJ1Z0RR77AR67', 
  }
};

axios.request(config3)
.then((response) => {
  if(response.data.data[0].phone){
    this.profileDetails.contactPhone = response.data.data[0].phone;
  }
})
.catch((error) => {
  console.log(error);
});
  },
  setup() {
    let fileInput:any;

    const submitButton1 = ref<HTMLElement | null>(null);
    const submitButton2 = ref<HTMLElement | null>(null);
    const submitButton3 = ref<HTMLElement | null>(null);
    const submitButton4 = ref<HTMLElement | null>(null);
    const submitButton5 = ref<HTMLElement | null>(null);
    const updateEmailButton = ref<HTMLElement | null>(null);
    const updatePasswordButton = ref<HTMLElement | null>(null);

    const emailFormDisplay = ref(false);
    const passwordFormDisplay = ref(false);

    const profileDetailsValidator = Yup.object().shape({
      name: Yup.string().required().label("First name"),
      email: Yup.string().required().label("Company"),
      phone: Yup.string().required().label("Contact phone"),
    });

    const changeEmail = Yup.object().shape({
      emailaddress: Yup.string().required().email().label("Email"),
      confirmemailpassword: Yup.string().required().label("Password"),
    });

    const changePassword = Yup.object().shape({
      newpassword: Yup.string().min(4).required().label("Password"),
      confirmpassword: Yup.string()
        .min(4)
        .required()
        .oneOf([Yup.ref("newpassword"), null], "Passwords must match")
        .label("Password Confirmation"),
    });

    const profileDetails = ref<ProfileDetails>({
      name: String(localStorage.getItem("current_user_name")),
      email:  String(localStorage.getItem("current_username_email")),
      contactPhone: "",
    });

    const UpdatePassword = ref<updatePassword>({
      password: "",
    });
    const saveChanges1 = () => {
      if (submitButton1.value) {
        // Activate indicator
        submitButton1.value.setAttribute("data-kt-indicator", "on");

let profile=()=>{

let data1 = {"phone": profileDetails.value.contactPhone,
             "mobile": profileDetails.value.contactPhone};

let config = {
  method: 'put',
  maxBodyLength: Infinity,
  url: 'https://willonhair.shintheo.com/api/res.partner/'+localStorage.getItem("current_user_partnerId"),
  headers: { 
    'api-key': 'NMMAG3K4IVS0L6VYEPXLJ1Z0RR77AR67', 
    'Content-Type': 'text/plain', 
  },
  data : data1
};

axios.request(config)
.then((response) => {
  console.log(JSON.stringify(response.data));
  setTimeout(() => {
    Swal.fire({
        icon: "success",
        title: "Profile Saved!",
        showConfirmButton: false,
        timer: 1500
    })
          submitButton1.value?.removeAttribute("data-kt-indicator");

       }, 2);
})
.catch((error) => {
  console.log(error);
  Swal.fire({
        icon: "error",
        title: "Quelque chose s'est mal passé !",
        showConfirmButton: false,
        timer: 1500
    })
});



};

    var data = { 
      name: profileDetails.value.name,
      login: profileDetails.value.email};
    // var data = '{"name": "aaaaaaaaaaaa"}';

    var config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: 'https://willonhair.shintheo.com/api/res.users/' + localStorage.getItem("current_user_id"),
      headers: {
        'api-key': 'NMMAG3K4IVS0L6VYEPXLJ1Z0RR77AR67',
        'Content-Type': 'text/plain',
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        localStorage.setItem("current_username_email", profileDetails.value.email)
        localStorage.setItem("current_user_name", profileDetails.value.name)
        profile();
    
        console.log('modif');
      })
      .catch(function (error) {
        Swal.fire({
        icon: "error",
        title: "Quelque chose s'est mal passé !",
        showConfirmButton: false,
        timer: 1500
    })
        console.log(error);
      });
      }
    };



    const updatePassword = () => {
      if (updatePasswordButton.value) {
        // Activate indicator
        updatePasswordButton.value.setAttribute("data-kt-indicator", "on");

        Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true
    }).then(function(result) {
        if (result.value) {
          var data = {password: UpdatePassword.value.password};
    // var data = '{"name": "aaaaaaaaaaaa"}';

    var config = {
      method: 'put',
      maxBodyLength: Infinity,
      url: 'https://willonhair.shintheo.com/api/res.users/' + localStorage.getItem("current_user_id"),
      headers: {
        'api-key': 'NMMAG3K4IVS0L6VYEPXLJ1Z0RR77AR67',
        'Content-Type': 'text/plain',
      },
      data: data
    };
    axios.request(config)
      .then((response) => {
        setTimeout(() => {
          updatePasswordButton.value?.removeAttribute("data-kt-indicator");

          Swal.fire({
            text: "Password is successfully changed!",
            icon: "success",
            confirmButtonText: "Ok",
            buttonsStyling: false,
            heightAuto: false,
            customClass: {
              confirmButton: "btn btn-light-primary",
            },
          }).then(() => {
            passwordFormDisplay.value = false;
          });
        }, 20);
      })
     
      .catch((error) => {
        Swal.fire({
        icon: "error",
        title: "Quelque chose s'est mal passé !",
        showConfirmButton: false,
        timer: 1500
    })
        console.log(error);
      });
            // result.dismiss can be "cancel", "overlay",
            // "close", and "timer"
        }else{
          setTimeout(() => {
          updatePasswordButton.value?.removeAttribute("data-kt-indicator");
        }, 20);
        }
    });
      }
    };


    return {
      submitButton1,
      submitButton2,
      submitButton3,
      submitButton4,
      submitButton5,
      saveChanges1,
      profileDetails,
      UpdatePassword,
      emailFormDisplay,
      passwordFormDisplay,
      profileDetailsValidator,
      changeEmail,
      changePassword,
      updateEmailButton,
      updatePasswordButton,
      updatePassword,
      getAssetPath,
      fileInput
    };
  },
});
</script>
