(function () {
    'use strict';

    angular.module('app.core')
        .factory('utilService', utilService);

    /* @ngInject */
    function utilService() {

        var service = {
            log: log,
            formatTruncatedHtml: formatTruncatedHtml,
            printStackTrace: printStackTrace, //printStackTrace is a global object from stacktrace-js library
            simulatelongRunningFunction: simulatelongRunningFunction
        };

        function log(enclosingMsg, logObj) {
            console.log("Start of " + enclosingMsg);
            console.log(logObj);
            console.log("End of " + enclosingMsg);
        }

        function formatTruncatedHtml(truncatedHtml, originalHtml) {
            var lastOpenAnchorTag = truncatedHtml.lastIndexOf("<a");
            var lastCloseAnchorTag = truncatedHtml.lastIndexOf("</a>");
            if (lastCloseAnchorTag < lastOpenAnchorTag) {

                var truncatedAnchorHtml = truncatedHtml.substring(lastOpenAnchorTag); //this assumes truncatedHtml and orignalHtml have the same content before the truncated point

                var origCloseAnchorTagIndex = originalHtml.indexOf("</a>", lastOpenAnchorTag);
                var replacingAnchorLength = origCloseAnchorTagIndex - lastOpenAnchorTag + "</a>".length;
                var replacingAnchorHtml = originalHtml.substr(lastOpenAnchorTag, replacingAnchorLength);

                //truncatedHtml = truncatedHtml.replace(truncatedAnchorHtml, replacingAnchorHtml);
                truncatedHtml = truncatedHtml.substring(0, lastOpenAnchorTag) + replacingAnchorHtml;
                truncatedHtml += ' ...';
            }

            var lastOpenLiTag = truncatedHtml.lastIndexOf("<li>");
            var lastCloseLiTag = truncatedHtml.lastIndexOf("</li>");
            if (lastCloseLiTag < lastOpenLiTag) {
                truncatedHtml += "</li>";
                //truncatedHtml += "...";
            }

            //var lastOpenLiTag = truncatedHtml.lastIndexOf("<li>");
            //var lastCloseLiTag = truncatedHtml.lastIndexOf("</li>");
            //if (lastCloseLiTag < lastOpenLiTag) {
            //    truncatedHtml = truncatedHtml.substring(0, lastOpenLiTag);
            //    truncatedHtml += "...";
            //}

            //var lastOpenAnchorTag = truncatedHtml.lastIndexOf("<a");
            //var lastCloseAnchorTag = truncatedHtml.lastIndexOf("</a>");
            //if (lastCloseAnchorTag < lastOpenAnchorTag) {
            //    truncatedHtml = html.substring(0, lastOpenAnchorTag);
            //    if(truncatedHtml.length > 0) {
            //        truncatedHtml += "...";
            //    }
            //}

            return truncatedHtml;
        }

        function simulatelongRunningFunction() {
            for (var i = 0; i < 2000000000; i++) {
                var b = i * 2 / 3;
            }
        }

        return service;
    }

})();
