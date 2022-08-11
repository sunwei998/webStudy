import vue from 'vue';

vue.filter('formatPrice', (v) => `$${(v / 100).toFixed(2)}`);
