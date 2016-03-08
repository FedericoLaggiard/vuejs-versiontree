/**
 * Created by federicolaggiard on 24/02/16.
 */
var templates = require('../templates/templates.js');

module.exports = Vue.component('tree-branch', {
  template: templates.branch,
  components: {
    'tree-item': require('./treeItem.js')
  }
});