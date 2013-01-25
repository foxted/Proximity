(function($) {
	var params = {
		debug: false,
		modulo: 1,
		responsive: false,
		overflow: false
	};
	$.fn.elementExtra = function(element){
		/*
			Element width
		*/
		var elementWidth = parseInt(element.css('width').match(/\d+\.?\d*/g));
		
		/*
			Border width
		*/
		var elementBorderRightWidth = parseInt(element.css('border-right-width').match(/\d+\.?\d*/g));
		var elementBorderLeftWidth = parseInt(element.css('border-left-width').match(/\d+\.?\d*/g));
		var elementBorderWidth = elementBorderLeftWidth + elementBorderRightWidth;
		
		/*
			Margin width
		*/
		var elementMarginRightWidth = parseInt(element.css('margin-right').match(/\d+\.?\d*/g));
		var elementMarginLeftWidth = parseInt(element.css('margin-left').match(/\d+\.?\d*/g));
		var elementMarginWidth = elementMarginLeftWidth + elementMarginRightWidth;
		/*
			Padding width
		*/
		var elementPaddingRightWidth = parseInt(element.css('padding-right').match(/\d+\.?\d*/g));
		var elementPaddingLeftWidth = parseInt(element.css('padding-left').match(/\d+\.?\d*/g));
		var elementPaddingWidth = elementPaddingLeftWidth + elementPaddingRightWidth;
		
		/*
			Final element width
		*/
		var elementExtraWidth = elementBorderWidth + elementMarginWidth + elementPaddingWidth;
		
		/*
			Return final element width
		*/		
		return elementExtraWidth;

	}
	/*
		Return the position of an element
		
		@param int Index of elements
		@param int Elements number
	*/
	$.fn.modulox = function(index, modulo) {
		return Math.abs(index % modulo);
	};
	/*
		Return the ratio
		
		@param element Current element
	*/
	$.fn.moduloxGenerator = function(element){
		/*
			Element & Parent width
		*/
		var elementWidth = parseInt(element.css('width').match(/\d+\.?\d*/g));
		var elementExtraWidth = this.elementExtra(element);
		var elementOverflowWidth = elementWidth + elementExtraWidth;
		console.log('Element Width '+elementWidth);
		console.log('Element extra '+elementExtraWidth);
		console.log('Overflow '+elementOverflowWidth);
		var parentWidth = parseInt(element.parent().css('width').match(/\d+\.?\d*/g));
		
		/*
			Calculates ratio
		*/
		var ratio = Math.round((elementOverflowWidth / parentWidth)*100);
		
		/*
			Check ratio
		*/
		if(elementExtraWidth > 0)
		{
			ratio = parentWidth / elementOverflowWidth;
			if(this.params.responsive && !this.params.overflow) {
				ratio = ratio - 1;
			}
		}
		else{
			ratio = parentWidth / elementWidth;
		}
		console.log("Extra width : "+elementExtraWidth);
		console.log("Ratio : "+ Math.round(ratio));
		return Math.round(ratio);
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
		/*
			Get modulo
		*/
		if(typeof(opts)=='undefined')
		{
			opts = {
				modulo: 0,
				debug: false
			}
		}
		this.params = $.extend(this.params, opts); // Initialize parameters
		if(this.params.modulo != 0) this.params.modulo = this.moduloxGenerator(i);
		
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
			console.log("##########################################");
			console.log("INDEX = "+index);
			console.log("PARENT = "+i.parent().width());
			var elementSize = parseInt(i.css('width').match(/\d+\.?\d*/g));
			var elementExtra = this.elementExtra(i);
			var elementWidth = elementSize + elementExtra;
			console.log("ELEMENT WIDTH = " + elementWidth);
			console.log('DIVISION = '+i.parent().width()/this.elementExtra(i));
			console.log("MODULO = "+this.params.modulo);
			console.log('POSITION = '+position);
			console.log("##########################################");
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