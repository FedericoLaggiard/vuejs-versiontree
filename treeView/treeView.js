/**
 * Created by federicolaggiard on 24/02/16.
 */
var templates = require('../templates/templates.js');

module.exports = Vue.component('treeView', {
  template: templates.treeView,
  components: {
    'tree-item': require('./treeItem.js')
  },
  props:{
    tree: {
      type: Array,
      required: true,
      sync: true
    }
  }
});