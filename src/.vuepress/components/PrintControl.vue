<template>
  <div :class="printClass">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    printOnly: {
      type: Boolean,
      default: false,
    },
    screenOnly: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    printClass() {
      if (this.printOnly) return "only-print";
      if (this.screenOnly) return "no-print";
      return "";
    },
  },
};
</script>
