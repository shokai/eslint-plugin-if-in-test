"use strict";

var assert = require("assert");
var util = require("../../lib/util");

describe('function "matchNode"', function(){

  describe("object matching", function(){

    it("should match", function(){
      assert(
        util.matchNode({name: "shokai"},
                         {name: "shokai"}));
      assert(
        util.matchNode({name: "shokai", age: 50},
                         {name: "shokai"}));
      assert(
        util.matchNode({name: "shokai", age: 50},
                         {name: "shokai", age: 50}));
    });


    it("should not match", function(){
      assert.equal(
        util.matchNode({name: "shokai"},
                         {name: "ahokai"})
        , false);
      assert.equal(
        util.matchNode({name: "shokai"},
                         {name: "shokai", age: 50})
        , false);
    });
  });

  describe("nested object matching", function(){
    it("should match", function(){
      assert(
        util.matchNode({name: "shokai", misc:{lang: "ja"}},
                         {misc:{lang: "ja"}}));
      assert(
        util.matchNode({name: "shokai", misc:{lang: "ja"}},
                         {name: "shokai", misc:{lang: "ja"}}));
    });

    it("should not match", function(){
      assert.equal(
        util.matchNode({name: "shokai", misc:{lang: "ja"}},
                         {misc:{lang: "en"}})
        , false);
      assert.equal(
        util.matchNode({name: "shokai", misc:{lang: "ja"}},
                         {name: "shokai", misc:{lang: "en"}})
        , false);
    });
  });

});
