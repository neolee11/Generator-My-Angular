/**
 * Created by Weili on 8/25/2016.
 */

var generators = require('yeoman-generator');
var _ = require('lodash');


module.exports = generators.Base.extend({
    constructor: function () {
        generators.Base.apply(this, arguments);

    },

    initializing: function () {
        console.log('init');
    },
    prompting: function () {
    },
    configuring: function () {
    },
    default: function () {
        // console.log("default");
    },
    writing: {
        gulpfile: function () {


        },

        packageJSON: function () {
        },

        git: function () {
        },

        bower: function () {

        },

        appStaticFiles: function () {
            // var source = this.templatePath('_gulp.png');
            // var destination = this.destinationPath('gulp.png');
            // this.copy(source, destination);
            // this.copy('_gulp.png', 'gulp.png');
            this.directory('GardTemplate', 'app');
        },

        scripts: function () {

        },

        html: function () {

        }
    },
    conflicts: function () {
    },
    install: function () {
    },
    end: function () {
    }


});