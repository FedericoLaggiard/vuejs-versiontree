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