<template>
  <table v-if="flattenArray.length > 0" class="table">
    <tbody>
      <thead>
        <th scope="col"></th>
        <th scope="col"></th>
      </thead>
        <tr :key="index + 'TD'" v-for="(item, index) in flattenArray">
          <th :class="item.header ? 'header': ''" scope="row">{{item.name}}</th>
          <td v-if="item.value != true && item.value != false">{{item.value}}</td>
           <td v-else-if="item.value == true && !item.header">
             <i class="fas fa-check"></i>
           </td>
           <td v-else-if="!item.header">
             <i class="fas fa-times"></i>
           </td>
           <td v-else>
            
           </td>
        </tr>
    </tbody>
  </table> 
</template>

<script>
export default {
  name: "technical-details",
  data() {
    return {
      details: {
        Herstellernummer: "5JDRC",
        EANNumber: "5397184082577",
        Processor: {
          TurboBoost: "3.10 GHz",
          Cache: "3 MB",
          Type: "Intel® Core™ i5 (7. Generation) 7200U Prozessor 2x 2,5 GHz"
        },
        Display: {
          Size: '39 cm (15,6")',
          Resolution: "1920 x 1080 Pixel (Full HD)",
          Art: "mattes Display",
          LED: true,
          HDTV: "FULL HD (1080p)"
        },
        Ram: {
          Size: "16GB",
          Technology: "DDR4"
        },
        HardDisk: {
          Size: "1TB",
          Typ: "SSD",
          Format: "M2"
        }
      },
      index: 0,   
      array: []  
    };
  },
  computed: {
    flattenArray(){
      this.flattenObject(this.details)
      return this.array;
    }      
  },
  methods:{
    flattenObject(details) { 
      Object.keys(details).forEach(key => {
        this.array.push({
          name: key,
          value: ' ',
          header: false
        });
        
        let value = details[key];
        if (typeof value !== "object") {
          this.array[this.array.length - 1].value = value;         
        } else {
           this.array[this.array.length - 1].header = true;     
          this.flattenObject(value);
        }
      });
    },
  }
};
</script>

<style>
</style>
