<template>
  <div :style="overlayStyle" class="modal-mask">
    <div :style="modalStyle" class="modal-wrapper">
      <div class="modal-container" :class="[mobileVersion ? 'col-12': 'col-4']">
        <div class="modal-header">
          <h5 class="modal-title">
            <slot name="header"></slot>
          </h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            @click="closeModal"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <slot></slot>
        </div>
        <div class="modal-footer d-flex flex-row justify-content-between">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "modal",
  props: {
    showModal: {
      type: Boolean,
      default: false
    },
    mobileVersion: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    closeModal() {
      this.$parent.$emit("closeModalEvent");
    }
  },
  computed: {
    modalStyle() {
      if (this.showModal) {
        return `transition: 0.5s; transform: scale(1);`;
      } else {
        return `transform: scale(0);`;
      }
    },
    overlayStyle() {
      if (this.showModal) {
        return `transition: opacity 1s ease`;
      } else {
        return `transform: scale(0);`;
      }
    }
  }
};
</script>
<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
  transition: 0.5s;
}

.modal-container {
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}
</style>