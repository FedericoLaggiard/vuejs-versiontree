(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by federicolaggiard on 17/02/16.
 */

const rawData = [
  { "name" : "Level 2: A", "parent":"Top Level" },
  { "name" : "Top Level", "parent":"null" },
  { "name" : "Son of A", "parent":"Level 2: A" },
  { "name" : "Daughter of A", "parent":"Level 2: A" },
  { "name" : "Level 2: B", "parent":"Top Level" }
];

var model =  {

  tree: [
    {
      "id": 0,
      "name": "Top Level",
      "parent": "null"
    }
  ],

  "ADD_NODE": function(curNode, newNode){

    if (!curNode.hasChilds){
      Vue.set(curNode.itemData, 'children', [newNode]);
    }else{
      curNode.itemData.children.push(newNode);
    }

  },

  "PARSE_RAW_DATA": function(rawData){

    var dataMap = rawData.reduce(function(map, node) {
      map[node.name] = node;
      return map;
    }, {});
    var treeData = [];
    rawData.forEach(function(node) {
      // add to parent
      var parent = dataMap[node.parent];
      if (parent) {
        // create child array if it doesn't exist
        (parent.children || (parent.children = []))
        // add node to child array
          .push(node);
      } else {
        // parent is null or missing
        treeData.push(node);
      }
    });
    return treeData;

  }

};

var app = new Vue({
  el: '#app',
  data: {
    treeData: JSON.parse(JSON.stringify(model.tree))
  },
  components: {
    'tree-view': require('./treeView/treeView.js')
  },
  methods: {
    itemClicked: function(item){
      model.ADD_NODE(item, {
        id: 0,
        "name": "new",
        "parent": item.name
      })
    },
    loadData: function(){
      model.tree = model.PARSE_RAW_DATA(rawData);
      Vue.set(this, 'treeData', JSON.parse(JSON.stringify(model.tree)));
    }
  },
  events: {
    'node-clicked': function(node){
      this.itemClicked(node);
    }
  }
});

window.model = model;
window.rawData = rawData;
},{"./treeView/treeView.js":4}],2:[function(require,module,exports){

  'use strict';
  module.exports = {"branch":"<div class=\"branch lv1\">\n  <tree-item></tree-item>\n</div>","entry":"<div class=\"entry sole\">\n\n</div>","item":"<!-- IF IS ROOT -->\n<div class=\"branch\" v-if=\"isRoot\">\n\n  <div class=\"item\" id=\"root\" @click=\"nodeClick\"></div>\n  <div class=\"branch fromRoot\">\n    <tree-item\n        v-for=\"child in itemData.children\"\n        :item-data=\"child\"\n        :is-single=\"itemData.children.length === 1\"\n        :is-root=\"false\">\n    </tree-item>\n  </div>\n\n</div>\n<!-- ELSE -->\n<div class=\"entry\"\n     v-else\n     :class=\"[ isSingle ? 'sole' : '' ]\">\n\n  <div class=\"item\" @click=\"nodeClick\"></div>\n  <div class=\"branch\" v-if=\"hasChilds\">\n\n    <tree-item\n        v-for=\"child in itemData.children\"\n        :item-data=\"child\"\n        :is-single=\"itemData.children.length === 1\"\n        :is-root=\"false\">\n    </tree-item>\n\n  </div>\n\n\n</div>\n","treeView":"<div id=\"tree-wrapper\">\n    <tree-item\n        :item-data=\"tree[0]\"\n        :is-root=\"true\"\n    ></tree-item>\n</div>"};
},{}],3:[function(require,module,exports){
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
},{"../templates/templates.js":2,"./treeItem.js":3}],4:[function(require,module,exports){
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
},{"../templates/templates.js":2,"./treeItem.js":3}]},{},[1]);
