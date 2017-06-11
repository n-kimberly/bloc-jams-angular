(function (){
    function seekBar ($document) {
      /**
      * @function calculatePercent
      * @desc private function that calculates percent fill of seekbar based on x position
      * @param {object} seekBar, {object} event
      * @return integer offsetXPercent
      */
        var calculatePercent = function(seekBar, event){
            var offsetX = event.pageX - seekBar.offset().left;
            var seekBarWidth = seekBar.width();
            var offsetXPercent = offsetX / seekBarWidth;
            offsetXPercent = Math.max(0, offsetXPercent);
            offsetXPercent = Math.min(1, offsetXPercent);
            return offsetXPercent;
        };


       return {
            templateUrl: 'templates/directives/seek_bar.html',
            replace: true,
            restrict: 'E',
               scope: {
             onChange: '&'
             },
           link: function(scope, element, attributes) {
                    scope.value = 0;
                    scope.max = 100;

               var seekBar = $(element);

          attributes.$observe('value', function(newValue) {
             scope.value = newValue;
         });

         attributes.$observe('max', function(newValue) {
             scope.max = newValue;
         });

        /**
        * @function percentString
        * @desc private function that returns percent of fill width for css styling
        * @return String
        */
               var percentString = function(){

               var value = scope.value;
               var max = scope.max;
               var percent = value / max * 100;
               return percent + "%";

           };
        /**
        * @function scope.fillStyle
        * @desc public method that forms a css style argument for filling the seekBar
        * @return {object} a css porperty for width
        */
             scope.fillStyle = function() {
           return {width: percentString()};
       };
             /**
        * @function scope.thumbStyle
        * @desc public method that forms a css style property for the position of the * * * thumb element
        * @return {object} a css porperty for width
        */
            scope.thumbStyle = function() {
                return {left: percentString()};
            }

               scope.onClickSeekBar = function(event) {
                   var percent = calculatePercent(seekBar, event);
                   scope.value = percent * scope.max;
                   notifyOnChange(scope.value);
               };
    /**
    * @function scope.trackThumb
    * @desc public method that tracks mousemove while mouse down and adjusts seekbar width
    */
               scope.trackThumb = function(){

                   $document.bind('mousemove.thumb', function(event){
                       var percent = calculatePercent(seekBar, event);
                      scope.$apply(function(){
                       scope.value = percent * scope.max;
                          notifyOnChange(scope.value);
                       });
                   });

                   $document.bind('mouseup.thumb', function(){
                       $document.unbind('mousemove.thumb');
                       $document.unbind('mouseup.thumb');
                   });
               };

               var notifyOnChange = function(newValue) {
                   if (typeof scope.onChange==='function') {
                       scope.onChange({value: newValue});
                   }
               };
    }

    };
 }
   angular
        .module('blocJams')
        .directive('seekBar',['$document', seekBar]);

})();
