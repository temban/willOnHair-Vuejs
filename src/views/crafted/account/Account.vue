<template>
  <!--begin::Navbar-->
       <div v-if="loading" style="background:rgba(0,0,0,0.3);height:100vh;width:100vw;position:fixed;top:0;left:0;z-index: 100;"> 
           <div class="ring">Loading</div>
      </div>
  <div class="card mb-5 mb-x-5">
    <div class="card-body pb-0 d-flex justify-content-center">
      <!--begin::Details-->
      <div class="d-flex flex-wrap flex-sm-nowrap">
        <!--begin: Pic-->
        <div class="me-20 mb-4">
          <div
            class="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative"
          >
     

            <div v-if="!image"  class="avatar-upload">
        <div class="avatar-edit">
            <input type='file' id="imageUpload" @change="handleFileUpload($event)" accept=".png, .jpg, .jpeg" />
            <label for="imageUpload"></label>
        </div>
        <div class="avatar-preview">
          <img
                        src="/assets/img/person.png"
                        class="rounded-circle img-fluid"
                        style="
                          border-radius: 160px;
                          image-resolution: 3000000dpi;
                          background-color: #000;
                          background-position: center; 
                          background-size: cover;
                          background-repeat: no-repeat;
                          max-width: 100%;
                          max-height: 100%;
                          height: 180px;
                          width: 180px;
                        "
                      />
        </div>
    </div>


                    <div v-else  class="avatar-upload">
        <div class="avatar-edit">
            <input type='file' id="imageUpload" @change="handleFileUpload($event)" accept=".png, .jpg, .jpeg" />
            
            <label for="imageUpload"></label>
        </div>
        <div class="avatar-preview">
<img
  :src="'https://willonhair.shintheo.com/api/v1/image/res.partner/'+ profile +'/image_1920?unique=true&filename_field=name&file_response=true'"
  style="
    border-radius: 160px;
    image-resolution: 30dpi;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    max-width: 100%;
    max-height: 100%;
    height: 192px;
    width: 192px;
  "
/>

        </div>
    </div>


            
            <div
              class="position-absolute translate-middle bottom-0 start-100 mb-6 bg-success rounded-circle border border-4 border-white h-20px w-20px"
            ></div>
          </div>
        </div>
        <!--end::Pic-->

        <!--begin::Info-->
        <div class="flex-grow-1 my-10">
          <!--begin::Title-->
          <div
            class="d-flex justify-content-between align-items-start flex-wrap mb-2"
          >
            <!--begin::User-->
            <div class="d-flex flex-column">
              <!--begin::Name-->
              <div class="d-flex align-items-center mb-2">
                <a
                  href="#"
                  class="text-gray-800 text-hover-primary fs-1 fw-bold me-1"
                  >{{ current_user_name }}</a
                
                >
              </div>
            </div>
            <!--end::User-->
          </div>
          <!--end::Title-->

          <!--begin::Stats-->
          <div class="d-flex flex-wrap flex-stack">
            <!--begin::Wrapper-->
            <div class="d-flex flex-column flex-grow-1 pe-8">
              <!--begin::Stats-->
              <div class="d-flex flex-wrap">
                <!--begin::Stat-->
                <div
                  class="border border-gray-300 border-dashed rounded min-w-100px py-3 px-4 me-12 mb-3"
                >
                  <!--begin::Number-->
                  <div class="d-flex align-items-center">
                    <KTIcon
                      icon-name="arrow-up"
                      icon-class="fs-3 text-success me-2"
                    />
                    <div class="fs-2 fw-bold">{{ client_points }}</div>
                  </div>
                  <!--end::Number-->

                  <!--begin::Label-->
                  <div class="fw-semobold fs-6 text-gray-400">Points</div>
                  <!--end::Label-->
                </div>
                <!--end::Stat-->


                <!--begin::Stat-->
                <div
                  class="border border-gray-300 border-dashed rounded min-w-100px py-3 px-4 me-6 mb-3"
                >
                  <!--begin::Number-->
                  <div class="d-flex align-items-center">
                    <KTIcon
                      icon-name="arrow-up"
                      icon-class="fs-3 text-success me-2"
                    />
                    <div
                      class="fs-2 fw-bold"
                      data-kt-countup="true"
                      data-kt-countup-value="60"
                      data-kt-countup-prefix="%"
                    >
                      {{ client_bonus }}
                    </div>
                  </div>
                  <!--end::Number-->

                  <!--begin::Label-->
                  <div class="fw-semobold fs-6 text-gray-400">Bonus</div>
                  <!--end::Label-->
                </div>
                <!--end::Stat-->
              </div>
              <!--end::Stats-->
            </div>
            <!--end::Wrapper-->

            <!--begin::Progress-->
            <!--end::Progress-->
          </div>
          <!--end::Stats-->
        </div>
        <!--end::Info-->
      </div>
      <!--end::Details-->

      <!--begin::Navs-->
    
      <!--begin::Navs-->
    </div>
    <div class="d-flex justify-content-center overflow-auto h-55px mx-5">
        <ul
          class="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bold flex-nowrap"
        >
          <!--begin::Nav item-->
          <li class="nav-item">
            <router-link
              to="/crafted/account/overview"
              class="nav-link text-active-primary me-6"
              active-class="active"
            >
            Aperçu
            </router-link>
          </li>
          <!--end::Nav item-->
          <!--begin::Nav item-->
          <li class="nav-item">
            <router-link
              to="/crafted/account/settings"
              class="nav-link text-active-primary me-6"
              active-class="active"
            >
            Paramètre
            </router-link>
          </li>
          <!--end::Nav item-->
        </ul>
      </div>
  </div>
  <!--end::Navbar-->
  <router-view></router-view>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent } from "vue";
import Dropdown3 from "@/components/dropdown/Dropdown3.vue";
import axios from "axios";
import FormData from "form-data"
import Swal from "sweetalert2";

export default defineComponent({
  name: "kt-account",
  data() {
      return {
        value: String(localStorage.getItem("current_user_id")),
        userId: localStorage.getItem("current_user_id"),
        userEmail: '',
        current_user_name: localStorage.getItem("current_user_name"),
        client_points: '',
        client_bonus: '',
        reqPoints:'',
        size: 300,
        profile:localStorage.getItem("current_user_partnerId"),
        image:"",
        loading: false,
      }
    },
  components: {
    Dropdown3,
  },

  mounted(){

let config1 = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://willonhair.shintheo.com/api/manager.points/search',
  headers: { 
    'api-key': 'NMMAG3K4IVS0L6VYEPXLJ1Z0RR77AR67', 
  }
};

axios.request(config1)
.then((response) => {
    this.reqPoints = response.data.data[0].manager_required_bonus_points
  console.log(response.data.data[0].manager_required_bonus_points);
})
.catch((error) => {
  console.log(error);
});


let config2 = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://willonhair.shintheo.com/api/v1/image/res.partner/${this.profile}/image_1920?unique=true&filename_field=name&file_response=true`,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ZnJpZWRyaWNoOmF6ZXJ0eTEyMw==',
      }
    };
    axios.request(config2)
      .then((response) => {
         
      })
      .catch((error) => {
        console.log(error);
      });

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
  this.image = response.data.data[0].image_1920;
  // console.log("rrrrrrrrrrrrrrrrrrrrrr",response.data.data[0].image_1920);
})
.catch((error) => {
  console.log(error);
});
  

        let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://willonhair.shintheo.com/api/res.users/${this.userId}`,
      headers: {
        'api-key': 'NMMAG3K4IVS0L6VYEPXLJ1Z0RR77AR67',
      }
    };
    axios.request(config)
      .then((response) => {
    //   console.log(response.data.data);
      this.userEmail = response.data.data[0].login
      this.client_points = response.data.data[0].client_points;
      this.client_bonus = response.data.data[0].client_bonus;


    //   console.log('client_points--------->>', response.data.data[0].client_points)
    //   console.log('client_bonus--------->>', response.data.data[0].client_bonus)
      })
      .catch((error: any) => {
        console.log(error);
      });
      
    },
    methods: {
      handleFileUpload(e) {
           this.loading = true;
        let icon = e.target.files[0];

let data = new FormData();
data.append('ufile', icon);

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://willonhair.shintheo.com/api/v1/upload/res.partner/'+ localStorage.getItem("current_user_partnerId")+'/image_1920',
  headers: { 
    'Content-Type': 'multipart/form-data', 
    'Authorization': 'Basic ZnJpZWRyaWNoOmF6ZXJ0eTEyMw==', 
    "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": 0
  },
  data : data
};

axios.request(config)
.then((response) => {
  if(JSON.stringify(response.data) ==="true"){
    this.loading = false;
    window.location.reload()
    console.log("piccccccc", JSON.stringify(response.data))
  }
})
.catch((error) => {
  this.loading = false;
  Swal.fire({
        icon: "error",
        title: "Quelque chose s'est mal passé !",
        showConfirmButton: false,
        timer: 1500
    })
  console.log(error);
});
      },
    },
  
  setup() {
    return {
      getAssetPath,
    };
  },
});
</script>
<style lang="scss" scoped>

.avatar-upload {
    position: relative;
    max-width: 205px;
    margin: 50px auto;
    .avatar-edit {
        position: absolute;
        right: 12px;
        z-index: 1;
        top: 10px;
        input {
            display: none;
            + label {
                display: inline-block;
                width: 34px;
                height: 34px;
                margin-bottom: 0;
                border-radius: 100%;
                background: #FFFFFF;
                border: 1px solid transparent;
                box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
                cursor: pointer;
                font-weight: normal;
                transition: all .2s ease-in-out;
                &:hover {
                    background: #f1f1f1;
                    border-color: #d6d6d6;
                }
                &:after {
                    content: "\f030";
                    font-family: 'FontAwesome';
                    color: #757575;
                    position: absolute;
                    top: 5px;
                    left: 0;
                    right: 0;
                    text-align: center;
                    margin: auto;
                }
            }
        }
    }
    .avatar-preview {
        width: 192px;
        height: 192px;
        position: relative;
        border-radius: 100%;
        border: 6px solid #f8f8f8;
        margin-top: -40px;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
        > div {
            width: 100%;
            height: 100%;
            border-radius: 100%;
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
        }
    }
}

.row:after {
  content: "";
  display: table;
  clear: both;
  opacity: 2;
}
.ring {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 150px;
  height: 150px;
  background: transparent;
  border: 3px solid #3c3c3c;
  border-radius: 50%;
  text-align: center;
  line-height: 150px;
  font-family: sans-serif;
  font-size: 20px;
  color: #fff000;
  letter-spacing: 4px;
  text-transform: uppercase;
  text-shadow: 0 0 10px #fff000;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}
.ring:before {
  content: "";
  position: absolute;
  top: -3px;
  left: -3px;
  width: 100%;
  height: 100%;
  border: 3px solid transparent;
  border-top: 3px solid #fff000;
  border-right: 3px solid #fff000;
  border-radius: 50%;
  animation: animateC 2s linear infinite;
}
pan {
  display: block;
  position: absolute;
  top: calc(50% - 2px);
  left: 50%;
  width: 50%;
  height: 4px;
  background: transparent;
  transform-origin: left;
  animation: animate 2s linear infinite;
}
pan:before {
  content: "";
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #fff000;
  top: -6px;
  right: -8px;
  box-shadow: 0 0 20px #fff000;
}
@keyframes animateC {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes animate {
  0% {
    transform: rotate(45deg);
  }
  100% {
    transform: rotate(405deg);
  }
}

</style>
