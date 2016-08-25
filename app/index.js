/**
 * Created by Weili on 8/25/2016.
 */

var generators = require('yeoman-generator');
var _ = require('lodash');


module.exports = generators.Base.extend({
    constructor: function(){
        generators.Base.apply(this, arguments);

    },

    initializing: function(){
        console.log('init');
    },
    prompting: function(){
    },
    configuring: function(){
    },
    writing: function(){
    },
    conflicts: function(){
    },
    install: function(){
    },
    end: function(){
    }


});