/**
 * Created by federicolaggiard on 17/02/16.
 */


var treeBuilder = {

  controller: function(){

    return{
      treeData: [
        {
          "name": "V1",
          "parent": null,
          "children": [
            {
              "name": "V2",
              "parent": "V1",
              "children": [
                {
                  "name": "V3",
                  "parent": "V2"
                },
                {
                  "name": "V4",
                  "parent": "V2",
                  "children": [
                    {
                      "name": "V5",
                      "parent": "V3"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }

  },


  view: function(ctrl){
    return iterator(ctrl.treeData);

    function iterator(data){
      return data.map(function(item){
        if(item.parent === null) {
          return m.component(itemComponent, {isRoot: true});
        }else{

        }
      })
    }

  }

};

var itemComponent = {

  controller: function(cfg){

    return {
      isRoot: cfg.isRoot
    }
  },
  view: function(ctrl){
    return m('div', {
      id: ctrl.isRoot ? 'root' : '',
      className: 'item'
    },
      m('div', {
        className: 'version pending'
      },[
        m('div', {
          className: 'img'
        },
          m('img', {
            src: './img1.png'
          })
        ),
        m('div', {
          className: 'content'
        },[
          m('div', { className: 'top'},[
            m('span', { className: 'date'}, '08/01/15 15:35'),
            m('div', { className: 'version-n'}, '1')
          ]),
          m('div', { className: 'bottom'},
            m('span', {className: 'status'}, [
              'STATUS:',
              m('span', {className: 'status-value'}, "To be approved")
            ])
          )
        ])
      ])
    );
  }

};
var branchComponent = {
  controller: function(){

  },
  view: function(ctrl){

  }
};
var entryComponent = {
  controller: function(){

  },
  view: function(ctrl){

  }
};


m.mount(document.getElementById("tree-wrapper"), treeBuilder);