(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * Created by federicolaggiard on 17/02/16.
 */




var branchComponent = Vue.extend({
  template: '<div class="branch {{ lvl }}"></div>',
  props: ['lvl']
});

var entryComponent = Vuew.extend({
  template: '<div class="entry {{ sole }}"></div>',
  props: ['sole']
});

var itemComponent = Vue.extend({
  template: '',
  props: ["id"]
});

var treeGenerator = Vue.extend({
  template: "<div class='branch lv1'>" +
  "<item-component id='root'/>" +
  "" +
  "</div>",
  data: {
    treeData: [
    {
      "name": "Top Level",
      "parent": "null",
      "children": [
        {
          "name": "Level 2: A",
          "parent": "Top Level",
          "children": [
            {
              "name": "Son of A",
              "parent": "Level 2: A"
            },
            {
              "name": "Daughter of A",
              "parent": "Level 2: A"
            }
          ]
        },
        {
          "name": "Level 2: B",
          "parent": "Top Level"
        }
      ]
    }
  ]
  },
  components: {
    'item-component': itemComponent,
    'branch-component': branchComponent,
    'entry-component': entryComponent
  }
});
// register
Vue.component('tree-generator', treeGenerator);
new Vue({
  el: "#tree-wrapper"
});
},{}]},{},[1]);
