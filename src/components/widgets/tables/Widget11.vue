<template>
  <!--begin::Tables Widget 11-->
  <div :class="widgetClasses" class="card">
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
            <template v-for="(item, index) in userAppointmen" :key="index">
              <tr>
                <td>
                  <div class="d-flex align-items-center">
                    <div  class="symbol symbol-50px me-5">
                                <img
                                  :src="'https://willonhair.shintheo.com/api/v1/image/business.resource/'+item.resource_id[0].id+'/image_1920?unique=true&filename_field=name&file_response=true'"
                                  alt=""
                                />
                              </div>

                              <div  class="symbol symbol-50px me-5">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpTNCxObuG09V5IdH7I7GVT0VlM0dQMb8gBA&usqp=CAU" class="" alt="" />
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
                  <a v-if="item.state !== 'done'" 
                    class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                  >
                    <KTIcon icon-name="trash" icon-class="fs-3" />
                  </a>
                  <a v-else
                    class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                  >
                   blocked
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
import { defineComponent } from "vue";

export default defineComponent({
  name: "kt-widget-11",
  components: {},
  props: {
    widgetClasses: String,
  },
  data() {
      return {
        userAppointment: [],
        current_user_name : localStorage.getItem('current_user_name'),
        current_user_partnerId : localStorage.getItem('current_user_partnerId'),
        current_username_email : localStorage.getItem('current_username_email')
      }
    },
  mounted: ()=>{
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://willonhair.shintheo.com/api/business.appointment/search',
      headers: {
        'api-key': 'NMMAG3K4IVS0L6VYEPXLJ1Z0RR77AR67',
        'Cookie': 'session_id=64a17f2198105caa0e711024319531e92ad4e4c6'
      }
    };
    axios.request(config)
    .then((response) => {
        const result: any[] = [];
        for (let index = 0; index <= JSON.parse(JSON.stringify(response.data.data)).length - 1; index++) {
          if (response.data.data[index].partner_id[0].id == localStorage.getItem('current_user_partnerId')) {
            result.push(response.data.data[index])
                       console.log('+++++++--->>>>>>uuuu', result)

          }
       }
      })
      .catch((error) => {
        console.log(error);
      });
   },
    methods: {
    cancelAppointement(){
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://willonhair.shintheo.com/api/business.appointment/search',
      headers: {
        'api-key': 'NMMAG3K4IVS0L6VYEPXLJ1Z0RR77AR67',
        'Cookie': 'session_id=64a17f2198105caa0e711024319531e92ad4e4c6'
      }
    };
    axios.request(config)
      .then((response) => {
        
      })
      .catch((error) => {
        console.log(error);
      });
    }
    },
  setup() {
    let userAppointmen: any[] = [];
    
    return {
      getAssetPath,
      userAppointmen
    };
  },
});
</script>
