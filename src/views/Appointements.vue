<template>
  <!--begin::Tables Widget 11-->
  <div :class="widgetClasses" class="card">

    <div
      v-if="loading"
      style="
        background: rgba(0, 0, 0, 0.3);
        height: 100vh;
        width: 100vw;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100;
      "
    >
      <div class="ring">Loading</div>
    </div>
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">Mes rendez-vous</span>
<!-- 
        <span class="text-muted mt-1 fw-semobold fs-7"
          >Over 500 new products</span
        > -->
      </h3>
      <div class="card-toolbar">
      <router-link to="/book_appointement">
      
        <span  class="btn btn-sm btn-light-primary">
          <KTIcon icon-name="plus" icon-class="fs-2" />
          Nouveau Rendez-Vous
        </span>
      </router-link>
      </div>
      
    </div>
  
      
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body py-3">
      <!--begin::Table container-->
      <div class="table-responsive">
        <!--begin::Table-->
        <table class="table align-middle gs-0 gy-4">
          <!--begin::Table head-->
          <thead>
            <tr class="fw-bold text-muted bg-light">
              
              <th class="min-w-100px">Employees</th>
              <th class="min-w-125px">Services</th>
              <th class="min-w-125px">Debut</th>
              <th class="min-w-125px">Fin</th>
              <th class="min-w-125px">Reference</th>
              <th class="min-w-125px">Suivi</th>
               <th class="125px"></th>
            </tr>
          </thead>
          <!--end::Table head-->

          <!--begin::Table body-->
          <tbody>
            <template v-for="(item, index) in userAppointment" :key="index">
              <tr>
                <td>
                  <div class="d-flex align-items-center">
                    <div  class="symbol symbol-50px me-5">
                                <img
                                  :src="'https://willonhair.shintheo.com/api/v1/image/business.resource/'+item.resource_id[0].id+'/image_1920?unique=true&filename_field=name&file_response=true'"
                                  alt=""
                                />
                              </div>

                    <div class="d-flex justify-content-start flex-column">
                      <span
                        
                        class="text-dark fw-bold text-hover-primary mb-1 fs-6"
                        >{{ item.resource_id[0].name}}</span
                      >
                    </div>
                  </div>
                </td>

                <td>
                  <span
                    
                    class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6"
                    >{{ item.service_id[0].name.split(">")[0]}}</span
                  >
                </td>

                <td>
                  <span
                    
                    class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6"
                    >{{ item.datetime_start.replace("T", "   ") }}</span
                  >
                </td>
                
                <td>
                  <span
                    
                    class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6"
                    >{{ item.datetime_end.replace("T", "   ")  }}</span
                  >
                </td>

                <td>
                  <span
                    
                    class="text-dark fw-bold text-hover-primary d-block mb-1 fs-6"
                    >{{item.name  }}</span
                  >
                </td>

                <td>
     
     <span v-if="item.state === 'cancel'" className='fw-bold text-danger mb-1 fs-6'>
       {{ "Annule" }}
     </span>
     <span v-else-if="item.state === 'reserved'" className='fw-bold text-primary mb-1 fs-6'>
       {{ 'Planifier'}}
     </span>
     <span v-else className='fw-bold text-success mb-1 fs-6'>
       {{ 'Acheve' }}
     </span>
   </td>

                <td class="text-end">
                  <a v-if=" item.state === 'cancel'"
                    class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                  >
                  <i class="fa fa-ban" style="font-size:25px;color:red"></i>                  
                </a>

                  <a v-else-if=" item.state === 'reserved'"  @click="cancelAppointement(item.id)"
                    class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                  >
                  <KTIcon icon-name="trash" icon-class="fs-3" />
                  </a>

                  <a v-else-if=" item.state === 'done'" 
                    class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                  >
                 <i class="fa fa-check" style="font-size:25px;color:green"></i>
                  </a>
                </td>
              </tr>
            </template>
          </tbody>
          <!--end::Table body-->
        </table>
        <!--end::Table-->
      </div>
      <!--end::Table container-->
    </div>
    <!--begin::Body-->
  </div>
  <!--end::Tables Widget 11-->
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import axios from "axios";
import Swal from "sweetalert2";
import { defineComponent } from "vue";

declare interface userAppointment {
  resource_id: any,
    state: any,
    service_id: any,
    
    datetime_start: string,
    datetime_end: string,
    name: any,
    id:any

  }

export default defineComponent({
  name: "kt-widget-11",
  components: {},
  props: {
    widgetClasses: String,
  },
  data() {
      return {
        userAppointment: [] as userAppointment[],
        current_user_name : localStorage.getItem('current_user_name'),
        current_user_partnerId : localStorage.getItem('current_user_partnerId'),
        current_username_email : localStorage.getItem('current_username_email'),
        loading: false
      }
    },
  mounted(){

    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://willonhair.shintheo.com/api/business.appointment/search',
      headers: {
        'api-key': 'NMMAG3K4IVS0L6VYEPXLJ1Z0RR77AR67',
      }
    };
    axios.request(config)
    .then((response) => {
        const result: any[] = [];
        for (let index = 0; index <= JSON.parse(JSON.stringify(response.data.data)).length - 1; index++) {
          if (response.data.data[index].partner_id[0].id == this.current_user_partnerId) {
            result.push(response.data.data[index])
                       console.log('+++++++--->>>>>>uuuu', this.userAppointment)

          }
       }

       this.userAppointment =result;
      })
      .catch((error) => {
        console.log(error);
      });
   },
    methods: {
    cancelAppointement(id){
      Swal.fire({
        title: "Es-tu sûr?",
        text: "De vouloir annuler ce rendez-vous!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Oui, Annuler!",
        cancelButtonText: "Non",
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
      
          this.loading = true;
          let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://willonhair.shintheo.com/api/v1/call/business.appointment/action_cancel?ids=['+id+']',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ZnJpZWRyaWNoOmF6ZXJ0eTEyMw==',
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": 0
      }
    };

    axios.request(config)
      .then((response) => {
       // console.log(JSON.stringify(response.data));
       this.loading = false;
       Swal.fire({
            text: "Le rendez-vous a été annulé avec succès!",
            icon: "success",
            confirmButtonText: "Ok",
            buttonsStyling: false,
            heightAuto: false,
            customClass: {
              confirmButton: "btn btn-light-primary",
            },
          }).then(() => {
            window.location.reload();
          });
           
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
            // result.dismiss can be "cancel", "overlay",
            // "close", and "timer"
        }
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