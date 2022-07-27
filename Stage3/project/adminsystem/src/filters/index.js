import vue from 'vue';
import moment from 'moment';

vue.filter('formatTime', (v) => moment(v).format('YYYY-MM-DD HH:mm:ss'));
