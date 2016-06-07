!function(c){var e=function(a){this.element=c(a)};e.prototype={constructor:e,show:function(){var a=this.element,f=a.closest("ul:not(.dropdown-menu)"),b=a.attr("data-target"),g,d;b||(b=(b=a.attr("href"))&&b.replace(/.*(?=#[^\s]*$)/,""));a.parent("li").hasClass("active")||(g=f.find(".active a").last()[0],d=c.Event("show",{relatedTarget:g}),a.trigger(d),d.isDefaultPrevented()||(b=c(b),this.activate(a.parent("li"),f),this.activate(b,b.parent(),function(){a.trigger({type:"shown",relatedTarget:g})})))},activate:function(a,f,b){function g(){d.removeClass("active").find("> .dropdown-menu > .active").removeClass("active");a.addClass("active");e?(a[0].offsetWidth,a.addClass("in")):a.removeClass("fade");a.parent(".dropdown-menu")&&a.closest("li.dropdown").addClass("active");b&&b()}var d=f.find("> .active"),e=b&&c.support.transition&&d.hasClass("fade");e?d.one(c.support.transition.end,g):g();d.removeClass("in")}};c.fn.tab=function(a){return this.each(function(){var f=c(this),b=f.data("tab");b||f.data("tab",b=new e(this));if("string"==typeof a)b[a]()})};c.fn.tab.Constructor=e;c(function(){c("body").on("click.tab.data-api",'[data-toggle="tab"], [data-toggle="pill"]',function(a){a.preventDefault();c(this).tab("show")})})}(window.jQuery);!function(b){var f=function(a,c){this.$element=b(a);this.options=b.extend({},b.fn.collapse.defaults,c);this.options.parent&&(this.$parent=b(this.options.parent));this.options.toggle&&this.toggle()};f.prototype={constructor:f,dimension:function(){return this.$element.hasClass("width")?"width":"height"},show:function(){var a,c,d,e;if(!this.transitioning){a=this.dimension();c=b.camelCase(["scroll",a].join("-"));if((d=this.$parent&&this.$parent.find("> .accordion-group > .in"))&&d.length){if((e=d.data("collapse"))&&e.transitioning)return;d.collapse("hide");e||d.data("collapse",null)}this.$element[a](0);this.transition("addClass",b.Event("show"),"shown");b.support.transition&&this.$element[a](this.$element[0][c])}},hide:function(){var a;this.transitioning||(a=this.dimension(),this.reset(this.$element[a]()),this.transition("removeClass",b.Event("hide"),"hidden"),this.$element[a](0))},reset:function(a){var b=this.dimension();this.$element.removeClass("collapse")[b](a||"auto")[0].offsetWidth;this.$element[null!==a?"addClass":"removeClass"]("collapse");return this},transition:function(a,c,d){var e=this,f=function(){"show"==c.type&&e.reset();e.transitioning=0;e.$element.trigger(d)};this.$element.trigger(c);c.isDefaultPrevented()||(this.transitioning=1,this.$element[a]("in"),b.support.transition&&this.$element.hasClass("collapse")?this.$element.one(b.support.transition.end,f):f())},toggle:function(){this[this.$element.hasClass("in")?"hide":"show"]()}};b.fn.collapse=function(a){return this.each(function(){var c=b(this),d=c.data("collapse"),e="object"==typeof a&&a;d||c.data("collapse",d=new f(this,e));if("string"==typeof a)d[a]()})};b.fn.collapse.defaults={toggle:!0};b.fn.collapse.Constructor=f;b(function(){b("body").on("click.collapse.data-api","[data-toggle=collapse]",function(a){var c=b(this),d,a=c.attr("data-target")||a.preventDefault()||(d=c.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,"");d=b(a).data("collapse")?"toggle":c.data();c[b(a).hasClass("in")?"addClass":"removeClass"]("collapsed");b(a).collapse(d)})})}(window.jQuery);!function(c){var e=function(a,b){this.init("tooltip",a,b)};e.prototype={constructor:e,init:function(a,b,d){this.type=a;this.$element=c(b);this.options=this.getOptions(d);this.enabled=!0;if("click"==this.options.trigger)this.$element.on("click."+this.type,this.options.selector,c.proxy(this.toggle,this));else"manual"!=this.options.trigger&&(a="hover"==this.options.trigger?"mouseenter":"focus",b="hover"==this.options.trigger?"mouseleave":"blur",this.$element.on(a+"."+this.type,this.options.selector,c.proxy(this.enter,this)),this.$element.on(b+"."+this.type,this.options.selector,c.proxy(this.leave,this)));this.options.selector?this._options=c.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},getOptions:function(a){a=c.extend({},c.fn[this.type].defaults,a,this.$element.data());a.delay&&"number"==typeof a.delay&&(a.delay={show:a.delay,hide:a.delay});return a},enter:function(a){var b=c(a.currentTarget)[this.type](this._options).data(this.type);if(!b.options.delay||!b.options.delay.show)return b.show();clearTimeout(this.timeout);b.hoverState="in";this.timeout=setTimeout(function(){"in"==b.hoverState&&b.show()},b.options.delay.show)},leave:function(a){var b=c(a.currentTarget)[this.type](this._options).data(this.type);this.timeout&&clearTimeout(this.timeout);if(!b.options.delay||!b.options.delay.hide)return b.hide();b.hoverState="out";this.timeout=setTimeout(function(){"out"==b.hoverState&&b.hide()},b.options.delay.hide)},show:function(){var a,b,d,c,e,f,g;if(this.hasContent()&&this.enabled){a=this.tip();this.setContent();this.options.animation&&a.addClass("fade");f="function"==typeof this.options.placement?this.options.placement.call(this,a[0],this.$element[0]):this.options.placement;b=/in/.test(f);a.remove().css({top:0,left:0,display:"block"}).appendTo(b?this.$element:document.body);d=this.getPosition(b);c=a[0].offsetWidth;e=a[0].offsetHeight;switch(b?f.split(" ")[1]:f){case"bottom":g={top:d.top+d.height,left:d.left+d.width/2-c/2};break;case"top":g={top:d.top-e,left:d.left+d.width/2-c/2};break;case"left":g={top:d.top+d.height/2-e/2,left:d.left-c};break;case"right":g={top:d.top+d.height/2-e/2,left:d.left+d.width}}a.css(g).addClass(f).addClass("in")}},setContent:function(){var a=this.tip(),b=this.getTitle();a.find(".tooltip-inner")[this.options.html?"html":"text"](b);a.removeClass("fade in top bottom left right")},hide:function(){var a=this.tip();a.removeClass("in");if(c.support.transition&&this.$tip.hasClass("fade")){var b=setTimeout(function(){a.off(c.support.transition.end).remove()},500);a.one(c.support.transition.end,function(){clearTimeout(b);a.remove()})}else a.remove();return this},fixTitle:function(){var a=this.$element;if(a.attr("title")||"string"!=typeof a.attr("data-original-title"))a.attr("data-original-title",a.attr("title")||"").removeAttr("title")},hasContent:function(){return this.getTitle()},getPosition:function(a){return c.extend({},a?{top:0,left:0}:this.$element.offset(),{width:this.$element[0].offsetWidth,height:this.$element[0].offsetHeight})},getTitle:function(){var a=this.$element,b=this.options;return a.attr("data-original-title")||("function"==typeof b.title?b.title.call(a[0]):b.title)},tip:function(){return this.$tip=this.$tip||c(this.options.template)},validate:function(){this.$element[0].parentNode||(this.hide(),this.options=this.$element=null)},enable:function(){this.enabled=!0},disable:function(){this.enabled=!1},toggleEnabled:function(){this.enabled=!this.enabled},toggle:function(){this[this.tip().hasClass("in")?"hide":"show"]()},destroy:function(){this.hide().$element.off("."+ this.type).removeData(this.type)}};c.fn.tooltip=function(a){return this.each(function(){var b=c(this),d=b.data("tooltip"),h="object"==typeof a&&a;d||b.data("tooltip",d=new e(this,h));if("string"==typeof a)d[a]()})};c.fn.tooltip.Constructor=e;c.fn.tooltip.defaults={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover",title:"",delay:0,html:!0}}(window.jQuery);!function(b){var f=function(a,c){this.options=c;this.$element=b(a).delegate('[data-dismiss="modal"]',"click.dismiss.modal",b.proxy(this.hide,this));this.options.remote&&this.$element.find(".modal-body").load(this.options.remote)};f.prototype={constructor:f,toggle:function(){return this[!this.isShown?"show":"hide"]()},show:function(){var a=this,c=b.Event("show");this.$element.trigger(c);!this.isShown&&!c.isDefaultPrevented()&&(b("body").addClass("modal-open"),this.isShown=!0,this.escape(),this.backdrop(function(){var c=b.support.transition&&a.$element.hasClass("fade");a.$element.parent().length||a.$element.appendTo(document.body);a.$element.show();c&&a.$element[0].offsetWidth;a.$element.addClass("in").attr("aria-hidden",!1).focus();a.enforceFocus();c?a.$element.one(b.support.transition.end,function(){a.$element.trigger("shown")}):a.$element.trigger("shown")}))},hide:function(a){a&&a.preventDefault();a=b.Event("hide");this.$element.trigger(a);this.isShown&&!a.isDefaultPrevented()&&(this.isShown=!1,b("body").removeClass("modal-open"),this.escape(),b(document).off("focusin.modal"),this.$element.removeClass("in").attr("aria-hidden",!0),b.support.transition&&this.$element.hasClass("fade")?this.hideWithTransition():this.hideModal())},enforceFocus:function(){var a=this;b(document).on("focusin.modal",function(b){a.$element[0]!==b.target&&!a.$element.has(b.target).length&&a.$element.focus()})},escape:function(){var a=this;if(this.isShown&&this.options.keyboard)this.$element.on("keyup.dismiss.modal",function(b){27==b.which&&a.hide()});else this.isShown||this.$element.off("keyup.dismiss.modal")},hideWithTransition:function(){var a=this,c=setTimeout(function(){a.$element.off(b.support.transition.end);a.hideModal()},500);this.$element.one(b.support.transition.end,function(){clearTimeout(c);a.hideModal()})},hideModal:function(){this.$element.hide().trigger("hidden");this.backdrop()},removeBackdrop:function(){this.$backdrop.remove();this.$backdrop=null},backdrop:function(a){var c=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var d=b.support.transition&&c;this.$backdrop=b('<div class="modal-backdrop '+c+'" />').appendTo(document.body);"static"!=this.options.backdrop&&this.$backdrop.click(b.proxy(this.hide,this));d&&this.$backdrop[0].offsetWidth;this.$backdrop.addClass("in");d?this.$backdrop.one(b.support.transition.end,a):a()}else!this.isShown&&this.$backdrop?(this.$backdrop.removeClass("in"),b.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(b.support.transition.end,b.proxy(this.removeBackdrop,this)):this.removeBackdrop()):a&&a()}};b.fn.modal=function(a){return this.each(function(){var c=b(this),d=c.data("modal"),e=b.extend({},b.fn.modal.defaults,c.data(),"object"==typeof a&&a);d||c.data("modal",d=new f(this,e));if("string"==typeof a)d[a]();else e.show&&d.show()})};b.fn.modal.defaults={backdrop:!0,keyboard:!0,show:!0};b.fn.modal.Constructor=f;b(function(){b("body").on("click.modal.data-api",'[data-toggle="modal"]',function(a){var c=b(this),d=c.attr("href"),e=b(c.attr("data-target")||d&&d.replace(/.*(?=#[^\s]+$)/,"")),d=e.data("modal")?"toggle":b.extend({remote:!/#/.test(d)&&d},e.data(),c.data());a.preventDefault();e.modal(d).one("hide",function(){c.focus()})})})}(window.jQuery);!function(a){var e=function(c,a){this.init("popover",c,a)};e.prototype=a.extend({},a.fn.tooltip.Constructor.prototype,{constructor:e,setContent:function(){var a=this.tip(),b=this.getTitle(),d=this.getContent();a.find(".popover-title")[this.options.html?"html":"text"](b);a.find(".popover-content")[this.options.html?"html":"text"](d);a.removeClass("fade top bottom left right in")},hasContent:function(){return this.getTitle()||this.getContent()},getContent:function(){var a=this.$element,b=this.options;return a.attr("data-content")||("function"==typeof b.content?b.content.call(a[0]):b.content)},tip:function(){this.$tip||(this.$tip=a(this.options.template));return this.$tip},destroy:function(){this.hide().$element.off("."+this.type).removeData(this.type)}});var f=a.fn.popover;a.fn.popover=function(c){return this.each(function(){var b=a(this),d=b.data("popover"),f="object"==typeof c&&c;d||b.data("popover",d=new e(this,f));if("string"==typeof c)d[c]()})};a.fn.popover.Constructor=e;a.fn.popover.defaults=a.extend({},a.fn.tooltip.defaults,{placement:"right",trigger:"click",content:"",template:'<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"></div></div></div>'});a.fn.popover.noConflict=function(){a.fn.popover=f;return this}}(window.jQuery);!function(e){function t(e){return e.replace(/^\//,"").replace(/(index|default).[a-zA-Z]{3,4}$/,"").replace(/\/$/,"")}var n=t(location.pathname),i=function(){for(var t=0,n=arguments.length;n>t;t++){var i=arguments[t],a=e(i);if(0<a.scrollTop())return i;a.scrollTop(1);var l=0<a.scrollTop();if(a.scrollTop(0),l)return i}return[]}("html","body");e("a[href*=#]").not("[role=button]").each(function(){var a=t(this.pathname)||n;if(n==a&&(location.hostname==this.hostname||!this.hostname)&&this.hash.replace(/#/,"")){var a=e(this.hash),l=this.hash;if("#left"==this.hash||"#right"==this.hash||"#feedback-popup"==this.hash)return!1;if(l){var o=a.offset()?a.offset().top:0;e(this).click(function(t){t.preventDefault(),"#top"==e(t.target).attr("href")?e(i).animate({scrollTop:0},400,function(){location.hash=l}):e(i).animate({scrollTop:o},400,function(){location.hash=l})})}}}),e.fn.scrollBanner=function(t){function n(){1>o&&(o=r),o>r&&(o=1);var e=l.scrollWidthDynamic?(o-1)*l.scrollWidth.outerWidth()*-1:(o-1)*l.scrollWidth*-1;l.divScroll.animate({"margin-left":e+"px"},700,"easeInOutCirc"),l.controls.find(".scroll").removeClass("active"),l.controls.find(":nth-child("+o+")").addClass("active"),l.hideControls&&i()}function i(){l.scrollRight.show(),l.scrollLeft.show(),o==r&&l.scrollRight.hide(),1==o&&l.scrollLeft.hide()}var a={divScroll:e(this),defaultPosition:1,controls:e(""),maxPerPage:1,hideControls:0,scrollWidthDynamic:!1,repeatAnimation:0},l=e.extend(a,t),o=l.defaultPosition,r=l.divScroll.children().size();if(1<l.maxPerPage&&(r=r-l.maxPerPage+1),l.hideControls&&i(),l.scrollLeft.click(function(e){e.preventDefault(),o--,n()}),l.scrollRight.click(function(e){e.preventDefault(),o++,n()}),l.controls.find(".scroll").click(function(e){e.preventDefault(),o=l.controls.find(".scroll").index(this)+1,n()}),e(window).bind("load resize",function(){var e=l.divScroll.find(">div"),t=e.parents(".wrap-overflow").width();e.width(t)}),0<l.repeatAnimation){var s=setInterval(function(){l.scrollRight.click()},5e3);l.divScroll.add(l.scrollLeft).add(l.scrollRight).add(l.controls).mouseenter(function(){clearInterval(s)}).mouseleave(function(){s=setInterval(function(){l.scrollRight.click()},5e3)})}},e.fn.fixMenu=function(t){var n={menu:e(this),menuHeight:e(this).outerHeight(!0),heightInner:e(this).find("ul").height()+e(this).find("ul").marginTop-1,defaultPositionTop:e(this).offset().top,defaultPositionTopOffset:0},i=e.extend(n,t);e(window).scroll(function(){var t=e(window).scrollTop(),n=i.defaultPositionTop;0!=i.defaultPositionTopOffset&&(n+=i.defaultPositionTopOffset),t>n?(i.menu.addClass("fixed"),i.menu.next().css({"padding-top":i.menuHeight})):(i.menu.removeClass("fixed"),i.menu.next().css({"padding-top":0}))})},e(".main-intro").find(".wrap-scroll").scrollBanner({scrollLeft:e(".main-intro").find(".scroll-left"),scrollRight:e(".main-intro").find(".scroll-right"),scrollWidth:e(".main-intro").find(".wrap-overflow"),scrollWidthDynamic:!0,controls:e(".wrap-scroll").parent().siblings(".controls"),defaultPosition:1,repeatAnimation:6e3}),e(".main-intro-with-nav").find(".wrap-scroll").scrollBanner({scrollLeft:e(".main-intro-with-nav").find(".scroll-left"),scrollRight:e(".main-intro-with-nav").find(".scroll-right"),scrollWidth:e(".main-intro-with-nav").find(".wrap-overflow"),scrollWidthDynamic:!0,controls:e(".main-intro-with-nav").find(".controls"),defaultPosition:1,repeatAnimation:6e3}),e(".slide-button").click(function(t){t.preventDefault(),e(".controls").find('.scroll[href="'+e(t.target).attr("href")+'"]').click()}),e(".recent-posts").find(".wrap-scroll").scrollBanner({scrollLeft:e(".recent-posts").find(".scroll-left"),scrollRight:e(".recent-posts").find(".scroll-right"),scrollWidth:e(".recent-posts").find(".recent-post").outerWidth(!0),defaultPosition:1,maxPerPage:parseInt(e(".recent-posts").parents(".container").outerWidth()/e(".recent-posts").find(".recent-post").outerWidth(!0)),hideControls:1}),e(".fix").size()&&e(".fix").fixMenu({menuHeight:56,defaultPositionTopOffset:-30}),e("#exampleTabs a").click(function(t){t.preventDefault(),e(this).tab("show")}),e(".show-tooltip").tooltip({placement:"bottom",delay:{hide:1500}}),e(".show-popover").popover({delay:{hide:0},html:!0,trigger:"hover"}),e(".slide-button.icon").tooltip({placement:"right"}).on("hover",function(){e(".tooltip").addClass("blue-tooltip")}),e(".signup-form").submit(function(){var t=e(this).find(".password"),n=e(this).find(".email"),i=!0;return 6>t.val().length&&(t.parents(".input-prepend").addClass("invalid"),i=!1),t=n.val(),/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(t)||(n.parents(".input-prepend").addClass("invalid"),i=!1),i}),e(".signup-form").find("input").focus(function(){e(this).parents(".invalid").removeClass("invalid")}),e("#contact-form").bind("click blur",function(){errorMessages=Object({jform_contact_name:"Enter a first name",jform_contact_lastname:"Enter a last name",jform_contact_email:"Please enter a valid email address",jform_contact_website:"Please enter a valid company website",jform_contact_message:"Your message cannot be empty"}),e("form").find("label.invalid").each(function(){e(this).html(errorMessages[e(this).attr("for")])})}),e("form").find("label.invalid").each(function(){e(this).html(errorMessages[e(this).attr("for")])}),e("#modal-video").bind("hidden",function(){e("#video-groupdocs").attr("src",e("#video-groupdocs").attr("src"))}),e('a[href^="#feedback-popup"]').click(function(t){t.preventDefault(),e("#zenbox_tab").click()}),e(".sale").find(".btn").click(function(t){t.preventDefault(),e(this).siblings().removeClass("active"),e(this).addClass("active"),t=e(this).attr("href"),t=t.substring(1),e(".permonth, .peryear, .peryears").hide(),e("."+t).show()}),e(".nav-collapse .nav > li.deeper").prepend('<span class="to-expand"> </span>'),e(".to-expand").click(function(){e(this).toggleClass("to-collapse"),e(this).parent().toggleClass("collapse")}),e(".nav-collapse .nav > li.deeper").addClass("collapse"),e(".nav-collapse .nav > li > ul > li.active").parents(".active").removeClass("collapse").find(".to-expand").toggleClass("to-collapse"),e.fn.fadeNews=function(t){function n(t){e(l.scrollName.get(l.counterItem)).fadeOut("200"),e(l.scrollItem.get(l.counterItem)).fadeOut("200",function(){i("next"==t?"next":"prev"),e(l.scrollItem.get(l.counterItem)).add(e(l.scrollName.get(l.counterItem))).fadeIn()})}function i(e){r.add(o).removeClass("disabled"),"next"==e?(l.counterItem+1<l.countElements&&l.counterItem++,l.counterItem+1==l.countElements&&o.addClass("disabled")):(0<l.counterItem&&l.counterItem--,0==l.counterItem&&r.addClass("disabled"))}var a={widget:e(this),scrollItem:e(this).find(".wn-scroll-item"),scrollName:e(this).find(".wn-scroll-name"),counterItem:0,countElements:e(this).find(".wn-scroll-item").size()},l=e.extend(a,t),o=l.widget.find(".wn-next"),r=l.widget.find(".wn-prev");l.scrollItem.add(l.scrollName).hide(),e(l.scrollItem.get(0)).add(e(l.scrollName.get(0))).show(),i("prev"),o.add(r).click(function(t){return t.preventDefault(),l.scrollItem.stop(),l.scrollName.stop(),e(t.target).hasClass("disabled")?!1:void n(e(t.target).hasClass("wn-next")?"next":"prev")})},e(".widget-news-fade").each(function(){e(this).fadeNews()}),e(".pricing-figure-heading").find('.btn[role="button"]').click(function(t){t.preventDefault();var n=e(t.target);activePlan=e(t.target).attr("href"),e(".select-pp").find("li").removeClass("active"),n.parent().addClass("active"),e(".plan-table").hide(),e(activePlan).show()}),e(".pricing-figure").find(".row:not(:last-child)").click(function(t){switch("radio"!==t.target.type&&($(":radio",this).attr("checked","checked"),$(":radio",this).trigger("click")),e(t.target).parents(".row").parents(".pricing-figure").find(".active").removeClass("active").end().end().addClass("active"),e(".plan-selected .price").empty().append(e(".plan-table:visible>.row.active>.cell>.price-value").html()+"<br><span>/Month</span>"),e(".plan-selected h3").empty().append(e(".plan-table:visible>.row.active>.cell:nth-child(2)").html()),e(".plan-selected h3").empty().append(e(".plan-table:visible>.row.active>.cell:nth-child(2)").html()),e(".pricing-figure-heading").find(".active>a").attr("href")){case"#monthly":e(".plan-selected h3+p").empty().append("Paid Monthly");break;case"#annual":e(".plan-selected h3+p").empty().append("Paid Annual");break;case"#biennial":e(".plan-selected h3+p").empty().append("Paid Biennial")}}).end().end().find("#monthly, #biennial").hide(),e(".xmas-topbar").find(".btn-close").click(function(t){t.preventDefault(),e(".xmas-topbar").animate({"margin-top":"-50px"},600),t=new Date,t.setTime(t.getTime()+12096e5),t="; expires="+t.toGMTString(),document.cookie=escape("hideXmasHeader")+"="+escape(1)+t+"; path=/"})}(jQuery);
// script-new.js
$("#showModalSyncapp").click(function(a){a.preventDefault();switch($(".select-os option:selected").val()){case "mac":window.location="http://groupdocs.com/Community/files/11/sync-apps/sync_app_for_mac/default.aspx";break;case "lin":window.location="http://groupdocs.com/Community/files/11/sync-apps/sync_app_for_linux/default.aspx";break;case "win":window.location="http://groupdocs.com/Community/files/11/sync-apps/sync_app_for_windows/default.aspx"}});

//external links
$('a[rel="external"]').attr('target', '_blank');

