/*! -- File: jquery.sequencingQuestion.js ( Input 0 ) -- */
!function(c){var d=function(a,b){this.options=b;this.$el=c(a);this.categories={};this.items={};this.initDB(b.outline);this.started=!1;this.tried=[];this.tries=0;this.initSubscribers();this.initInteractions();this.initialOrder=this.getCurrentOrder();this.options.accessible&&(this.accessibility=new d.Accessibility(this));this.setupAfterImageLoad();return this};d.DEFAULTS={accessible:!0,responsive:!1,strings:{scoreLabel:"Score:",retryLabel:"Retry"},outline:{},retries:0};d.constant=Object.freeze({screenReader:{visible:{tabindex:"1",
"aria-hidden":"false"},hidden:{tabindex:"-1","aria-hidden":"true"}}});d.prototype={initDB:function(a){this.db=function(){var a={};return{store:function(b){a[b.id]=b},get:function(b){return a[b]},getByKey:function(a,b){return links[a][b]},remove:function(b){delete a[item.id]},clear:function(){a={}},getLength:function(){return Object.keys(a).length}}}();var b=c.proxy(function(a){this.db.store(a);for(var c in a.elements)b(a.elements[c])},this);b(a)},start:function(){this.accessibility&&this.accessibility.start()},
initSubscribers:function(){var a=this;this.$el.on("click",".categories .category",function(){a.toggleCategoryActiveForCurrentItem(c(this))})},initInteractions:function(){this.$el.sortable({containment:this.$el,scroll:!1,items:".card_container",tolerance:"pointer",forcePlaceholderSize:!0,forceHelperSize:!0,distance:20,helper:"clone",axis:"vertical"==this.options.outline.parameters.config.layout?"y":!1})},setupAfterImageLoad:function(){var a=this.$el.find("img"),b=a.length,f=this,e=function(){--b;if(0>=
b)f.onImagesLoaded()};if(0==a.length)f.onImagesLoaded();a.each(function(){if(c(this).prop("complete"))e();else c(this).on("load",e)})},setHeights:function(){if("vertical"!=this.options.outline.parameters.config.layout){var a=0,b=this.$el.find(".card_container");b.css("min-height","").each(function(){a=Math.max(a,c(this).outerHeight())});b.css("min-height",a)}},onImagesLoaded:function(){this.setHeights();this.$el.css("opacity",1);this.$el.trigger(d.Events.onReady);this.start()},getCurrentOrder:function(){var a=
this;return this.$el.find(".card_container").toArray().map(function(b){return a.db.get(c(b).data("id"))})},scoreOrder:function(a){var b=0,c=this;a=a.map(function(a,d){var h=a.id===c.options.outline.elements[d].id?1:0,l=d;b+=h;if(!h)for(var k=0;d<c.options.outline.elements.length;k++)if(c.options.outline.elements[k].id===a.id){l=k;break}return{score:h,el:a,correctIdx:l}});return{score:b,individual:a}},score:function(){var a=this.options.outline.elements,b=this.scoreOrder(this.getCurrentOrder()).score;
return Math.floor(b/a.length*100)||0},fireResult:function(a){this.$el.trigger(SequencingQuestionEvents.onAttempt);(100===a||this.tries>=this.options.retries)&&this.$el.trigger(SequencingQuestionEvents.onSubmitted);if(100===a)this.$el.trigger(SequencingQuestionEvents.onCorrect);else{var b="on";this.tries<this.options.retries&&(b+="Attempt");this.$el.trigger(SequencingQuestionEvents[b+(0===a?"Incorrect":"PartialCorrect")])}},getxAPICompleteData:function(){return{correctOrder:this.options.outline.elements.map(function(a){return a.id}),
choices:this.options.outline.elements,responseOrder:this.getCurrentOrder().map(function(a){return a.id})}},hasSelection:function(){for(var a=this.getCurrentOrder(),b=0;b<this.initialOrder.length;b++)if(this.initialOrder[b].id!==a[b].id)return!0;return!1},enterReview:function(a){this.$el.sortable("disable");a=this.scoreOrder(this.getCurrentOrder());for(var b=0;b<a.individual.length;b++){var c=this.$el.find('.card_container[data-id\x3d"'+a.individual[b].el.id+'"]');c.addClass(a.individual[b].score?
"correct":"incorrect");c.find(".review_order").html(a.individual[b].correctIdx+1)}},exitReview:function(){this.$el.find(".card_container").removeClass("correct incorrect").find(".review_order").html("");this.$el.sortable("enable")},shuffleCards:function(){for(var a=this.$el.find(".items"),b=a.children();b.length;)a.append(b.splice(Math.floor(Math.random()*b.length),1)[0])},resetUI:function(){this.$el.find(".card_container").removeClass("correct incorrect").find(".review_order").html("");this.$el.sortable("enable");
this.shuffleCards();this.initialOrder=this.getCurrentOrder();this.passed=0;this.tried=[];this.start()},hasInlineFeedback:function(){return!0},showInlineFeedback:function(){return this.enterReview()},import:function(a){for(var b=this.$el.find(".card_container"),d=c(b.get(0)).parent(),b=b.detach(),e=0;e<a.order.length;e++){var g=c(b.filter('[data-id\x3d"'+a.order[e]+'"]').get(0));d.append(g)}},export:function(){return{order:this.getCurrentOrder().map(function(a){return a.id})}},reset:function(){this.resetUI();
this.tries=0},destroy:function(){}};c.fn.SequencingQuestion=function(a){var b=a,f=Array.prototype.slice.call(arguments,1);return this.each(function(){var e=c(this),g=c(this).data("dki.SequencingQuestion");options=c.extend(!0,{},d.DEFAULTS,"object"===typeof b&&b);if("string"===typeof a&&!g)return!1;g?"string"===typeof a&&(e=c(this).data("dki.SequencingQuestion"))&&e[a]&&e[a].apply(c(this).data("dki.SequencingQuestion"),f):e.data("dki.SequencingQuestion",new d(this,options))})};c.fn.SequencingQuestion.Constructor=
d;d.Events={onReady:"sequencingQuestionReady"};d.Accessibility=function(a){this.categoryCards=a;this.$el=a.$el;return this};d.Accessibility.prototype={start:function(){var a=this;this.$el.on("focus",".card_container",function(b){a.selectedCard=c(this)});this.$el.on("keydown",".card_container",function(b){if(13===b.keyCode)a.selectedCard=c(this);else if((37===b.keyCode||39===b.keyCode)&&a.selectedCard){var d=a.selectedCard[37===b.keyCode?"prev":"next"]();d[0]&&(d[37===b.keyCode?"before":"after"](a.selectedCard.detach()),
a.selectedCard[0].focus())}})}}}(window.jQuery);var SequencingQuestionEvents={onSubmitted:"sequencingQuestionSubmitted",onCorrect:"sequencingQuestionCorrect",onIncorrect:"sequencingQuestionIncorrect",onPartialCorrect:"sequencingQuestionPartialCorrect",onAttempt:"sequencingQuestionAttempt",onAttemptIncorrect:"sequencingQuestionAttemptIncorrect",onAttemptPartialCorrect:"sequencingQuestionAttemptPartialCorrect"};