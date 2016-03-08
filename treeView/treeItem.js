/**
 * Created by federicolaggiard on 24/02/16.
 */
var templates = require('../templates/templates.js');

module.exports = Vue.component('tree-item', {
  template: templates.item,
  name: 'tree-item',
  props: {
    itemData: {
      type: Object,
      required: true,
      sync: false
    },
    isSingle: {
      type: Boolean,
      required: true,
      sync: false
    },
    isRoot: {
      type: Boolean,
      required: true,
      sync: false
    }
  },
  components: {
    'tree-item': require('./treeItem.js')
  },
  data: function()
  {
    return {
      level: '1'
    };
  },
  computed:{
    hasChilds: function(){
      return !!this.itemData.children && this.itemData.children.length > 0
    }
  },
  methods: {
    nodeClick: function(){
      this.$dispatch('node-clicked', this);
    }
  }
});