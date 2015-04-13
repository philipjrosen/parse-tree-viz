angular.module('app.home', [])

.controller('HomeCtrl', ['$scope', function ($scope) {
  $scope.verb = 'Visualize';
  $scope.noun = 'this!';
  $scope.sentence = "";
  var treeData = [
    {
      children: [{
          children: [{
              children: [{
                  children: null,
                  name: "the",
                  parent: "DT"
              }],
              name: "DT",
              parent: "NP"
          }, {
              children: [{
                  children: null,
                  name: "quick",
                  parent: "NN"
              }],
              name: "NN",
              parent: "NP"
          }],
          name: "NP",
          parent: "NP+S"
      }, {
          children: [{
              children: [{
                  children: null,
                  name: "brown",
                  parent: "VB"
              }],
              name: "VB",
              parent: "VP"
          }, {
              children: [{
                  children: [{
                      children: [{
                          children: null,
                          name: "fox",
                          parent: "JJ"
                      }],
                      name: "JJ",
                      parent: "NP"
                  }, {
                      children: [{
                          children: null,
                          name: "jumps",
                          parent: "NN"
                      }],
                      name: "NN",
                      parent: "NP"
                  }],
                  name: "NP",
                  parent: "NP"
              }, {
                  children: [{
                      children: [{
                          children: null,
                          name: "over",
                          parent: "IN"
                      }],
                      name: "IN",
                      parent: "PP"
                  }, {
                      children: [{
                          children: [{
                              children: null,
                              name: "the",
                              parent: "DT"
                          }],
                          name: "DT",
                          parent: "NP"
                      }, {
                          children: [{
                              children: null,
                              name: "lazy",
                              parent: "JJ"
                          }],
                          name: "JJ",
                          parent: "NP"
                      }, {
                          children: [{
                              children: null,
                              name: "dog",
                              parent: "NN"
                          }],
                          name: "NN",
                          parent: "NP"
                      }],
                      name: "NP",
                      parent: "PP"
                  }],
                  name: "PP",
                  parent: "NP"
              }],
              name: "NP",
              parent: "VP"
          }],
          name: "VP",
          parent: "NP+S"
      }],
      name: "NP+S",
      parent: null
    }
  ];

  var margin = {top: 20, right: 120, bottom: 20, left: 120},
    width = 960 - margin.right - margin.left,
    height = 800 - margin.top - margin.bottom;

  var i = 0;

  //define the tree layout and get a reference to it
  var tree = d3.layout.tree()
    .size([height, width]);

  //declare the function to be used for connecting nodes and get a reference
  var diagonal = d3.svg.diagonal()
    .projection(function(d) { return [d.x, d.y]; });

  //append svg element to body and define it's properties
  var svg = d3.select("body").append("svg")
    .attr("width", width + margin.right + margin.left)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  root = treeData[0];

  update(root);

  function update(source) {

  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse();
  var links = tree.links(nodes);

  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth * 100; });

  // Declare the node function/variable
  var node = svg.selectAll("g.node")
    .data(nodes, function(d) { return d.id || (d.id = ++i); });

  // Enter the nodes.
  var nodeEnter = node.enter().append("g")
    .attr("class", "node")
    .attr("transform", function(d) {
      return "translate(" + d.x + "," + d.y + ")"; });

  nodeEnter.append("circle")
    .attr("r", 10)
    .style("fill", "#fff");

  nodeEnter.append("text")
    .style("fill", "#fff")
    .attr("x", function(d) {
      return d.children || d._children ? -13 : 13; })
    .attr("dy", ".35em")
    .attr("text-anchor", function(d) {
      return d.children || d._children ? "end" : "start"; })
    .text(function(d) { return d.name; })
    .style("fill-opacity", 1);

  // Declare the links
  var link = svg.selectAll("path.link")
    .data(links, function(d) { return d.target.id; });

  // Enter the links.
  link.enter().insert("path", "g")
    .attr("class", "link")
    .attr("d", diagonal);
  }

}]);
