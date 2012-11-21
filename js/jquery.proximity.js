(function($) {
	var params = {
		debug: false,
		modulo: 1
	};
	
	/*
		Return the position of an element
		
		@param int Index of elements
		@param int Elements number
	*/
	$.fn.modulox = function(index, modulo) {
		var modResult;
		modResult = index % modulo;
		return Math.round(modResult);
	};
	/*
		Return the ratio
		
		@param element Current element
	*/
	$.fn.moduloxGenerator = function(element){
		var windowSize = $(window).width();
		
		var parentWidth = element.parent().css('width');
		var elementWidth = element.css('width');
		
		var parentSize = parseInt(parentWidth.match(/\d+\.?\d*/g));
		var elementBorderSize = parseInt(element.css('border-width').match(/\d+\.?\d*/g)*2);
		var elementSize = parseInt(elementWidth.match(/\d+\.?\d*/g));
		
		elementSize = parseInt(elementSize+(elementBorderSize*2));
		
		elementSize += elementBorderSize;
		
		var ratio = Math.floor(parentSize/elementSize);
		
		return ratio;
	};
	/*
		Apply hover classes
		
		Options : 
			debug: true = Enable debugging / false = Disable debugging / Default : false
			modulo : 
		@param array Options
	*/
	$.fn.apply = function(opts)
	{
		/*
			Get all boxes
		*/
		
		index = $(this).index(); // Get index
		var boxes = $('li'); // Get boxes
		var nbElements = boxes.length; // Get number of boxes
		var i = $('li:eq('+index+')'); // Current element
		if(typeof(opts)=='undefined')
		{
			opts = {
				modulo: this.moduloxGenerator(i)
			}
		}
		if(typeof(opts.modulo) == 'undefined'){
			opts.modulo = this.moduloxGenerator(i)
		}
		this.params = $.extend(this.params, opts); // Initialize parameters
		
		// Initialize around boxes variables
		var topLeft, topCenter, topRight, left, right, bottomLeft, bottomCenter, bottomRight;
		
		/*
			Set positions
		*/
		topLeft = (index-this.params.modulo)-1;
		topCenter = (index-this.params.modulo);
		topRight = (index-this.params.modulo)+1;
		left = index-1;
		right = index+1;
		bottomLeft = (index+this.params.modulo)-1;
		bottomCenter = (index+this.params.modulo);
		bottomRight = (index+this.params.modulo)+1;
		
		position = this.modulox(index+1, this.params.modulo); // 1 if total left / 0 if total right
		
		/*
			Debug
		*/
		if(this.params.debug)
		{
			console.log("Parent Width = "+i.parent().width());
			console.log("Element Width = "+i.width());
			console.log('Index + 1 = '+(index+1));
			console.log('Modulo = '+this.params.modulo);
			console.log('Division = '+(index+1/this.params.modulo));
			console.log('Position = '+position);
		}
		
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
		if(!current.hasClass('current'))
		{
			current.addClass('current');
			if(this.params.debug) current.append('<span class="debug">Center</span>');
			
			if(position != 1 && topLeft >= 0){
				topLeftElement.addClass('topLeft');
				if(this.params.debug) topLeftElement.append('<span class="debug">Top Left</span>');
			}
			if(topCenter >= 0){
				topCenterElement.addClass('topCenter');
				if(this.params.debug) topCenterElement.append('<span class="debug">Top Center</span>');
			}
			if(position != 0 && topRight > 0){
				topRightElement.addClass('topRight');
				if(this.params.debug) topRightElement.append('<span class="debug">Top Right</span>');
			}
			
			if(position != 1){
				leftElement.addClass('left');
				if(this.params.debug) leftElement.append('<span class="debug">Left</span>');
			}
			if(position != 0){
				rightElement.addClass('right');
				if(this.params.debug) rightElement.append('<span class="debug">Right</span>');
			}
		
			if(position != 1 && bottomLeft <= nbElements){
				bottomLeftElement.addClass('bottomLeft');
				if(this.params.debug) bottomLeftElement.append('<span class="debug">Bottom Left</span>');
			}
			if(bottomCenter <= nbElements){
				bottomCenterElement.addClass('bottomCenter');
				if(this.params.debug) bottomCenterElement.append('<span class="debug">Bottom Center</span>');
			}
			if(position != 0 && bottomRight <= nbElements){
				bottomRightElement.addClass('bottomRight');
				if(this.params.debug) bottomRightElement.append('<span class="debug">Bottom Right</span>');
			}
		}
		else 
		{
			current.removeClass('current');
			if(this.params.debug) $('span.debug').remove();
				
			if(position != 1 && topLeft >= 0){
				topLeftElement.removeClass('topLeft');
			}
			if(topCenter >= 0){	
				topCenterElement.removeClass('topCenter');
			}
			if(position != 0 && topRight > 0){
				topRightElement.removeClass('topRight');
			}
			
			if(position != 1){
				leftElement.removeClass('left');
			}
			if(position != 0){
				rightElement.removeClass('right');
			}
		
			if(position != 1 && bottomLeft <= nbElements){
				bottomLeftElement.removeClass('bottomLeft');
			}
			if(bottomCenter <= nbElements){
				bottomCenterElement.removeClass('bottomCenter');
			}
			if(position != 0 && bottomRight <= nbElements){
				bottomRightElement.removeClass('bottomRight');
			}
		}		
	};
	$.fn.proximity = function(opts) 
	{ 
		$(this).find('li').each(function(){
			$(this).hover(function(){
				$(this).apply(opts);
			}, function(){
				$(this).apply(opts);
			});
		});
	};
})(jQuery);