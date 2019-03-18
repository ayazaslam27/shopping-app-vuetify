<template>
  <v-data-table
    v-if="technicalDetails"
    hide-headers
    :items="flattenArray"
    :rowsPerPage="-1"
    class="elevation-1"
  >
    <template v-slot:items="props">
      <td>{{ props.item.name }}</td>
      <td
        class="text-xs-right"
        v-if="props.item.value != true && props.item.value != false"
      >{{ props.item.value }}</td>
      <td class="text-xs-right" v-else-if="props.item.value == true && !props.item.header">
        <v-icon>done</v-icon>
      </td>
      <td class="text-xs-right" v-else-if="!props.item.header">
        <v-icon>close</v-icon>
      </td>
      <td v-else></td>
    </template>
  </v-data-table>
</template>

<script>
export default {
  name: "technical-details",
  data() {
    return {
      index: 0,
      array: []
    };
  },
  props: {
    technicalDetails: {
      type: Object,
      default: null
    }
  },
  computed: {
    flattenArray() {
      if (this.technicalDetails) {
        this.flattenObject(this.technicalDetails);
      }

      return this.array;
    }
  },
  methods: {
    flattenObject(details) {
      Object.keys(details).forEach(key => {
        this.array.push({
          name: key,
          value: " ",
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
    }
  }
};
</script>

<style>
</style>
