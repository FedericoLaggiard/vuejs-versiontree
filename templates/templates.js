
  'use strict';
  module.exports = {"branch":"<div class=\"branch lv1\">\n  <tree-item></tree-item>\n</div>","entry":"<div class=\"entry sole\">\n\n</div>","item":"<!-- IF IS ROOT -->\n<div class=\"branch\" v-if=\"isRoot\">\n\n  <div class=\"item\" id=\"root\" @click=\"nodeClick\"></div>\n  <div class=\"branch fromRoot\">\n    <tree-item\n        v-for=\"child in itemData.children\"\n        :item-data=\"child\"\n        :is-single=\"itemData.children.length === 1\"\n        :is-root=\"false\">\n    </tree-item>\n  </div>\n\n</div>\n<!-- ELSE -->\n<div class=\"entry\"\n     v-else\n     :class=\"[ isSingle ? 'sole' : '' ]\">\n\n  <div class=\"item\" @click=\"nodeClick\"></div>\n  <div class=\"branch\" v-if=\"hasChilds\">\n\n    <tree-item\n        v-for=\"child in itemData.children\"\n        :item-data=\"child\"\n        :is-single=\"itemData.children.length === 1\"\n        :is-root=\"false\">\n    </tree-item>\n\n  </div>\n\n\n</div>\n","treeView":"<div id=\"tree-wrapper\">\n    <tree-item\n        :item-data=\"tree[0]\"\n        :is-root=\"true\"\n    ></tree-item>\n</div>"};