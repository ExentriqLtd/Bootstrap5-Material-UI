$.fn.animateRotate = function(start,angle, duration, easing, complete)
	{
    var args = $.speed(duration, easing, complete);
    var step = args.step;
    return this.each(function(i, e)
    	{
        args.step = function(now)
        	{
            $.style(e, 'transform', 'rotate(' + now + 'deg)');
            if (step) return step.apply(this, arguments);
       		};
        $({deg: start}).animate({deg: angle}, args);
   		});
	};