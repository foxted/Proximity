(function($) {
	var modulo = 10;
	$.fn.modulox = function(index, modulo) {
		/*
			Return position of element
		*/
		var modResult;
		modResult = index % modulo;
		return modResult;
	};
	/*
		Apply hover classes
		@param object Current element
		@param boolean Action : true for addClass / false for removeClass
	*/
	$.fn.apply = function(action, modulo)
	{
		/*
			Get all boxes
		*/
		index = $(this).index(); // Get index
		var boxes = $('li'); // Get boxes
		var nbElements = boxes.length; // Get number of boxes

		var i = $('li:eq('+index+')'); // Current element
		
		// Initialize around boxes variables
		var topLeft, topCenter, topRight, left, right, bottomLeft, bottomCenter, bottomRight;
		
		/*
			Set positions
		*/
		topLeft = (index-modulo)-1;
		topCenter = index-modulo;
		topRight = (index-modulo)+1;
		left = index-1;
		right = index+1;
		bottomLeft = (index+modulo)-1;
		bottomCenter = index+modulo;
		bottomRight = index+modulo+1;
		
		position = this.modulox(index+1, modulo); // 1 if total left / 0 if total right
		
		//check(topLeft, topCenter, topRight, left, right, bottomLeft, bottomCenter, bottomRight, nbElements, position);
		
		/*
			Get elements
		*/
		current = $('li:eq('+index+')');
		
		topLeftElement = $('li:eq('+topLeft+')');
		topCenterElement = $('li:eq('+topCenter+')');
		topRightElement = $('li:eq('+topRight+')');
		
		leftElement = $('li:eq('+left+')');
		rightElement = $('li:eq('+right+')');
		
		bottomLeftElement = $('li:eq('+bottomLeft+')');
		bottomCenterElement = $('li:eq('+bottomCenter+')');
		bottomRightElement = $('li:eq('+bottomRight+')');
		
		/*
			Bind hover functions
		*/
		if(action == true)
		{
			current.addClass('current');
			
			if(position != 1 && topLeft >= 0) topLeftElement.addClass('topLeft');
			if(topCenter >= 0) topCenterElement.addClass('topCenter');
			if(position != 0 && topRight > 0) topRightElement.addClass('topRight');
			
			if(position != 1) leftElement.addClass('left');
			if(position != 0) rightElement.addClass('right');
		
			if(position != 1 && bottomLeft <= nbElements) bottomLeftElement.addClass('bottomLeft');
			if(bottomCenter <= nbElements) bottomCenterElement.addClass('bottomCenter');
			if(position != 0 && bottomRight <= nbElements) bottomRightElement.addClass('bottomRight');
		}
		else 
		{
			current.removeClass('current');
				
			if(position != 1 && topLeft >= 0) topLeftElement.removeClass('topLeft');
			if(topCenter >= 0) topCenterElement.removeClass('topCenter');
			if(position != 0 && topRight > 0) topRightElement.removeClass('topRight');
			
			if(position != 1) leftElement.removeClass('left');
			if(position != 0) rightElement.removeClass('right');
		
			if(position != 1 && bottomLeft <= nbElements) bottomLeftElement.removeClass('bottomLeft');
			if(bottomCenter <= nbElements) bottomCenterElement.removeClass('bottomCenter');
			if(position != 0 && bottomRight <= nbElements) bottomRightElement.removeClass('bottomRight');
		}
		
	}
	$.fn.proximity = function(modulo) 
	{ 
		this.each(function(){
			$(this).hover(function(){
				$(this).apply(true, modulo);
			}, function(){
				$(this).apply(false, modulo);
			});
		});
	};
})(jQuery);