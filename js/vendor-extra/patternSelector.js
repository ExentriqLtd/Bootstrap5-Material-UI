(function($)
	{
	$.fn.patternselect = function(options)
		{

		var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

		var patterns = [];
		if( options &&
			options.usetransparent===true)
			{
			patterns =
				[
				"pattern-modern",
				"modern-grid-1",
				"modern-grid-2",
				"modern-grid-3",
				"modern-grid-4",
				"modern-grid-5",
				]
			}
		else
			{
			patterns =
				[
					"singlebg",
				"45degreee_fabric",
				"60degree_gray",
				"always_grey",
				"bghead",
				"batthern",
				"beige_paper",
				"bgnoise_lg",
				"black_denim",
				"black-Linen",
				"black_linen_v2",
				"blackmamba",
				"black_paper",
				"black_scales",
				"black_thread",
				"bright_squares",
				"broken_noise",
				"brushed_alu_dark",
				"brushed_alu",
				"candyhole",
				"carbon_fibre_big",
				"carbon_fibre",
				"carbon_fibre_v2",
				"cardboard",
				"checkered_pattern",
				"circles",
				"classy_fabric",
				"concrete_wall_2",
				"concrete_wall_3",
				"concrete_wall",
				"connect",
				"cork_1",
				"crissXcross",
				"crossed_stripes",
				"crosses",
				"cubes",
				"dark_brick_wall",
				"dark_circles",
				"darkdenim3",
				"dark_leather",
				"dark_matter",
				"dark_mosaic",
				"dark_stripes",
				"dark_wood",
				"darth_stripe",
				"denim",
				"diagmonds",
				"diagonal-noise",
				"diamonds",
				"double_lined",
				"dvsup",
				"elastoplast",
				"elegant_grid",
				"exclusive_paper",
				"fabric_1",
				"fabric_plaid",
				"fake_brick",
				"fancy_deboss",
				"felt",
				"flowers",
				"foggy_birds",
				"foil",
				"gold_scale",
				"graphy",
				"gray_sand",
				"green_dust_scratch",
				"green-fibers",
				"green_gobbler",
				"gridme",
				"grilled",
				"groovepaper",
				"grunge_wall",
				"gun_metal",
				"handmadepaper",
				"hixs_pattern_evolution",
				"inflicted",
				"irongrip",
				"knitted-netting",
				"leather_1",
				"light_alu",
				"light_checkered_tiles",
				"light_grey_floral_motif",
				"light_honeycomb",
				"lined_paper",
				"littleknobs",
				"little_pluses",
				"merely_cubed",
				"micro_carbon",
				"mirrored_squares",
				"nami",
				"noise_pattern_with_crosslines",
				"noisy",
				"old_mathematics",
				"old_wall",
				"padded",
				"paper_1",
				"paper_2",
				"paper_3",
				"paven",
				"pineapplecut",
				"pinstripe",
				"plaid",
				"polaroid",
				"polonez_car",
				"pool_table",
				"project_papper",
				"px_by_Gre3g",
				"random_grey_variations",
				"ravenna",
				"real_cf",
				"ricepaper2",
				"ricepaper",
				"rip_jobs",
				"robots",
				"rockywall",
				"roughcloth",
				"rubber_grip",
				"silver_scales",
				
				"small-crackle-bright",
				"small_tiles",
				"smooth_wall",
				"soft_circle_scales",
				"soft_pad",
				"soft_wallpaper",
				"square_bg",
				"squares",
				"starring",
				"struckaxiom",
				"stucco",
				"subtle_freckles",
				"subtle_orange_emboss",
				"tactile_noise",
				"texturetastic_gray",
				"triangles",
				"type",
				"vertical_cloth",
				"vichy",
				"washi",
				"wavecut",
				"white_brick_wall",
				"white_carbon",
				"whitediamond",
				"white_paperboard",
				"white_plaster",
				"white_sand",
				"white_texture",
				"whitey",
				"wood_1",
				"wood_pattern",
				"woven",
				"xv",
				"zigzag",
			  	];
		  	}
		var settings =
			{
			style: 'pattern-select',
			placeholder: 'Select a Pattern',
			lookahead: 2,
			basePath : "/templates/exentriqManager3/static/img/patterns-single/"
			};

		var Patternselect = (function()
			{
			function Patternselect(original, o)
			  	{
				this.$original = $(original);
				this.options = o;
				this.active = false;

				this.setupHtml();
				this.getVisiblePatterns();
				this.bindEvents();

				var pattern = this.$original.val();
				if (!pattern || patterns.indexOf(pattern)==-1)
					{
					pattern=patterns[0];
				  	this.$original.val(pattern);
					}
				this.updateSelected();

			  	}

		  	Patternselect.prototype.bindEvents = function()
		  		{
				$('li', this.$results)
					.click(__bind(this.selectPattern, this))
					.mouseenter(__bind(this.activatePattern, this))
					.mouseleave(__bind(this.deactivatePattern, this));

				$('span', this.$select).click(__bind(this.toggleDrop, this));
				this.$arrow.click(__bind(this.toggleDrop, this));
		  		};

			Patternselect.prototype.toggleDrop = function(ev)
			  	{

				if(this.active)
					{
				  	this.$element.removeClass('pattern-select-active');
				  	this.$drop.hide();
				  	clearInterval(this.visibleInterval);
					}
				else
					{
				  	this.$element.addClass('pattern-select-active');
				  	this.$drop.show();
				  	this.moveToSelected();
				  	this.visibleInterval = setInterval(__bind(this.getVisiblePatterns, this), 500);
					}

				this.active = !this.active;
			  	};

			Patternselect.prototype.selectPattern = function()
				{
				var pattern = $('li.active', this.$results).data('value');
				this.$original.val(pattern).change();
				this.updateSelected();
				this.toggleDrop();
			  	};

			Patternselect.prototype.moveToSelected = function()
				{

				var $li, pattern = this.$original.val();

				if (pattern)
					{
					$li = $("li[data-value='"+ pattern +"']", this.$results);
					if($li.length === 0)
						$li = $("li", this.$results).first();
					}
				else
					{
					$li = $("li", this.$results).first();
					}

				this.$results.scrollTop($li.addClass('active').position().top);
			  	};

			Patternselect.prototype.activatePattern = function(ev)
			  	{
				$('li.active', this.$results).removeClass('active');
				$(ev.currentTarget).addClass('active');
			  	};

			Patternselect.prototype.deactivatePattern = function(ev)
				{
				$(ev.currentTarget).removeClass('active');
			  	};

			Patternselect.prototype.updateSelected = function()
			  	{
				var pattern = this.$original.val();
				$('span', this.$element).text("").css(this.toStyle(pattern));
			  	};

			Patternselect.prototype.setupHtml = function()
			  	{
			  	var elementID=null;
			  	var originalID;
			  	if(originalID=this.$original.attr("id"))
			  		{
			  		elementID=originalID+"_patternselector";
			  		try
			  			{
			  			$("#"+elementID).remove();
			  			}
			  		catch(e){};
			  		}

				this.$original.empty().hide();
				this.$element = $('<div>', {'class': this.options.style, 'id':elementID});
				this.$arrow = $('<div><b></b></div>');
				this.$select = $('<a><span>'+ this.options.placeholder +'</span></a>');
				this.$drop = $('<div>', {'class': 'fs-drop'});
				this.$results = $('<ul>', {'class': 'fs-results'});
				this.$original.after(this.$element.append(this.$select.append(this.$arrow)).append(this.$drop));
				this.$drop.append(this.$results.append(this.patternsAsHtml())).hide();
			  	};

			Patternselect.prototype.patternsAsHtml = function()
				{
				var l = patterns.length;
				var r, s, h = '';

				for(var i=0; i<l; i++)
					{
				  	r = this.toReadable(patterns[i]);
				  	s = this.toStyle(patterns[i]);
				  	h += '<li data-value="'+ patterns[i] +'"></li>';
					}

				return h;
			  	};

			Patternselect.prototype.toReadable = function(pattern)
			  	{
				return pattern.replace(/[\+|:]/g, ' ');
			  	};

			Patternselect.prototype.toStyle = function(pattern)
				{
				var patternUrl=this.options.basePath+pattern+".png";
				return {background:'url("'+patternUrl+'") repeat'};
			  	};

			Patternselect.prototype.getVisiblePatterns = function()
				{
				if(this.$results.is(':hidden')) return;

				var fs = this;
				var top = this.$results.scrollTop();
				var bottom = top + this.$results.height();

				if(this.options.lookahead)
					{
				  	var li = $('li', this.$results).first().height();
				  	bottom += li*this.options.lookahead;
					}

				$('li', this.$results).each(function()
					{
				  	var ft = $(this).position().top+top;
				  	var fb = ft + $(this).height();

				  	if ((fb >= top) && (ft <= bottom))
				  		{
						var pattern = $(this).data('value');
						$(this).css(fs.toStyle(pattern));
				  		}
					});
			  	};

			return Patternselect;
			})();

		return this.each(function(options)
			{
		  	// If options exist, lets merge them
		  	if (options) $.extend( settings, options );
		  	return new Patternselect(this, settings);
			});

	  	}
	})(jQuery);