if(typeof Object.create!=="function"){Object.create=function(obj){function F(){}F.prototype=obj;return new F();};}(function($,window,document){var Carousel={init:function(options,el){var base=this;base.$elem=$(el);base.options=$.extend({},$.fn.owlCarousel.options,base.$elem.data(),options);base.userOptions=options;base.loadContent();},loadContent:function(){var base=this,url;function getData(data){var i,content="";if(typeof base.options.jsonSuccess==="function"){base.options.jsonSuccess.apply(this,[data]);}else{for(i in data.owl){if(data.owl.hasOwnProperty(i)){content+=data.owl[i].item;}}base.$elem.html(content);}base.logIn();}if(typeof base.options.beforeInit==="function"){base.options.beforeInit.apply(this,[base.$elem]);}if(typeof base.options.jsonPath==="string"){url=base.options.jsonPath;$.getJSON(url,getData);}else{base.logIn();}},logIn:function(){var base=this;base.$elem.data("owl-originalStyles",base.$elem.attr("style"));base.$elem.data("owl-originalClasses",base.$elem.attr("class"));base.$elem.css({opacity:0});base.orignalItems=base.options.items;base.checkBrowser();base.wrapperWidth=0;base.checkVisible=null;base.setVars();},setVars:function(){var base=this;if(base.$elem.children().length===0){return false;}base.baseClass();base.eventTypes();base.$userItems=base.$elem.children();base.itemsAmount=base.$userItems.length;base.wrapItems();base.$owlItems=base.$elem.find(".owl-item");base.$owlWrapper=base.$elem.find(".owl-wrapper");base.playDirection="next";base.prevItem=0;base.prevArr=[0];base.currentItem=0;base.customEvents();base.onStartup();},onStartup:function(){var base=this;base.updateItems();base.calculateAll();base.buildControls();base.updateControls();base.response();base.moveEvents();base.stopOnHover();base.owlStatus();if(base.options.transitionStyle!==false){base.transitionTypes(base.options.transitionStyle);}if(base.options.autoPlay===true){base.options.autoPlay=5000;}base.play();base.$elem.find(".owl-wrapper").css("display","block");if(!base.$elem.is(":visible")){base.watchVisibility();}else{base.$elem.css("opacity",1);}base.onstartup=false;base.eachMoveUpdate();if(typeof base.options.afterInit==="function"){base.options.afterInit.apply(this,[base.$elem]);}},eachMoveUpdate:function(){var base=this;if(base.options.lazyLoad===true){base.lazyLoad();}if(base.options.autoHeight===true){base.autoHeight();}base.onVisibleItems();if(typeof base.options.afterAction==="function"){base.options.afterAction.apply(this,[base.$elem]);}},updateVars:function(){var base=this;if(typeof base.options.beforeUpdate==="function"){base.options.beforeUpdate.apply(this,[base.$elem]);}base.watchVisibility();base.updateItems();base.calculateAll();base.updatePosition();base.updateControls();base.eachMoveUpdate();if(typeof base.options.afterUpdate==="function"){base.options.afterUpdate.apply(this,[base.$elem]);}},reload:function(){var base=this;window.setTimeout(function(){base.updateVars();},0);},watchVisibility:function(){var base=this;if(base.$elem.is(":visible")===false){base.$elem.css({opacity:0});window.clearInterval(base.autoPlayInterval);window.clearInterval(base.checkVisible);}else{return false;}base.checkVisible=window.setInterval(function(){if(base.$elem.is(":visible")){base.reload();base.$elem.animate({opacity:1},200);window.clearInterval(base.checkVisible);}},500);},wrapItems:function(){var base=this;base.$userItems.wrapAll("<div class=\"owl-wrapper\">").wrap("<div class=\"owl-item\"></div>");base.$elem.find(".owl-wrapper").wrap("<div class=\"owl-wrapper-outer\">");base.wrapperOuter=base.$elem.find(".owl-wrapper-outer");base.$elem.css("display","block");},baseClass:function(){var base=this,hasBaseClass=base.$elem.hasClass(base.options.baseClass),hasThemeClass=base.$elem.hasClass(base.options.theme);if(!hasBaseClass){base.$elem.addClass(base.options.baseClass);}if(!hasThemeClass){base.$elem.addClass(base.options.theme);}},updateItems:function(){var base=this,width,i;if(base.options.responsive===false){return false;}if(base.options.singleItem===true){base.options.items=base.orignalItems=1;base.options.itemsCustom=false;base.options.itemsDesktop=false;base.options.itemsDesktopSmall=false;base.options.itemsTablet=false;base.options.itemsTabletSmall=false;base.options.itemsMobile=false;return false;}width=$(base.options.responsiveBaseWidth).width();if(width>(base.options.itemsDesktop[0]||base.orignalItems)){base.options.items=base.orignalItems;}if(base.options.itemsCustom!==false){base.options.itemsCustom.sort(function(a,b){return a[0]-b[0];});for(i=0;i<base.options.itemsCustom.length;i+=1){if(base.options.itemsCustom[i][0]<=width){base.options.items=base.options.itemsCustom[i][1];}}}else{if(width<=base.options.itemsDesktop[0]&&base.options.itemsDesktop!==false){base.options.items=base.options.itemsDesktop[1];}if(width<=base.options.itemsDesktopSmall[0]&&base.options.itemsDesktopSmall!==false){base.options.items=base.options.itemsDesktopSmall[1];}if(width<=base.options.itemsTablet[0]&&base.options.itemsTablet!==false){base.options.items=base.options.itemsTablet[1];}if(width<=base.options.itemsTabletSmall[0]&&base.options.itemsTabletSmall!==false){base.options.items=base.options.itemsTabletSmall[1];}if(width<=base.options.itemsMobile[0]&&base.options.itemsMobile!==false){base.options.items=base.options.itemsMobile[1];}}if(base.options.items>base.itemsAmount&&base.options.itemsScaleUp===true){base.options.items=base.itemsAmount;}},response:function(){var base=this,smallDelay,lastWindowWidth;if(base.options.responsive!==true){return false;}lastWindowWidth=$(window).width();base.resizer=function(){if($(window).width()!==lastWindowWidth){if(base.options.autoPlay!==false){window.clearInterval(base.autoPlayInterval);}window.clearTimeout(smallDelay);smallDelay=window.setTimeout(function(){lastWindowWidth=$(window).width();base.updateVars();},base.options.responsiveRefreshRate);}};$(window).resize(base.resizer);},updatePosition:function(){var base=this;base.jumpTo(base.currentItem);if(base.options.autoPlay!==false){base.checkAp();}},appendItemsSizes:function(){var base=this,roundPages=0,lastItem=base.itemsAmount-base.options.items;base.$owlItems.each(function(index){var $this=$(this);$this.css({"width":base.itemWidth}).data("owl-item",Number(index));if(index%base.options.items===0||index===lastItem){if(!(index>lastItem)){roundPages+=1;}}$this.data("owl-roundPages",roundPages);});},appendWrapperSizes:function(){var base=this,width=base.$owlItems.length*base.itemWidth;base.$owlWrapper.css({"width":width*3,"left":0});base.appendItemsSizes();},calculateAll:function(){var base=this;base.calculateWidth();base.appendWrapperSizes();base.loops();base.max();},calculateWidth:function(){var base=this;base.itemWidth=Math.round(base.$elem.width()/base.options.items);},max:function(){var base=this,maximum=((base.itemsAmount*base.itemWidth)-base.options.items*base.itemWidth)*-1;if(base.options.items>base.itemsAmount){base.maximumItem=0;maximum=0;base.maximumPixels=0;}else{base.maximumItem=base.itemsAmount-base.options.items;base.maximumPixels=maximum;}return maximum;},min:function(){return 0;},loops:function(){var base=this,prev=0,elWidth=0,i,item,roundPageNum;base.positionsInArray=[0];base.pagesInArray=[];for(i=0;i<base.itemsAmount;i+=1){elWidth+=base.itemWidth;base.positionsInArray.push(-elWidth);if(base.options.scrollPerPage===true){item=$(base.$owlItems[i]);roundPageNum=item.data("owl-roundPages");if(roundPageNum!==prev){base.pagesInArray[prev]=base.positionsInArray[i];prev=roundPageNum;}}}},buildControls:function(){var base=this;if(base.options.navigation===true||base.options.pagination===true){base.owlControls=$("<div class=\"owl-controls\"/>").toggleClass("clickable",!base.browser.isTouch).appendTo(base.$elem);}if(base.options.pagination===true){base.buildPagination();}if(base.options.navigation===true){base.buildButtons();}},buildButtons:function(){var base=this,buttonsWrapper=$("<div class=\"owl-buttons\"/>");base.owlControls.append(buttonsWrapper);base.buttonPrev=$("<div/>",{"class":"owl-prev","html":base.options.navigationText[0]||""});base.buttonNext=$("<div/>",{"class":"owl-next","html":base.options.navigationText[1]||""});buttonsWrapper.append(base.buttonPrev).append(base.buttonNext);buttonsWrapper.on("touchstart.owlControls mousedown.owlControls","div[class^=\"owl\"]",function(event){event.preventDefault();});buttonsWrapper.on("touchend.owlControls mouseup.owlControls","div[class^=\"owl\"]",function(event){event.preventDefault();if($(this).hasClass("owl-next")){base.next();}else{base.prev();}});},buildPagination:function(){var base=this;base.paginationWrapper=$("<div class=\"owl-pagination\"/>");base.owlControls.append(base.paginationWrapper);base.paginationWrapper.on("touchend.owlControls mouseup.owlControls",".owl-page",function(event){event.preventDefault();if(Number($(this).data("owl-page"))!==base.currentItem){base.goTo(Number($(this).data("owl-page")),true);}});},updatePagination:function(){var base=this,counter,lastPage,lastItem,i,paginationButton,paginationButtonInner;if(base.options.pagination===false){return false;}base.paginationWrapper.html("");counter=0;lastPage=base.itemsAmount-base.itemsAmount%base.options.items;for(i=0;i<base.itemsAmount;i+=1){if(i%base.options.items===0){counter+=1;if(lastPage===i){lastItem=base.itemsAmount-base.options.items;}paginationButton=$("<div/>",{"class":"owl-page"});paginationButtonInner=$("<span></span>",{"text":base.options.paginationNumbers===true?counter:"","class":base.options.paginationNumbers===true?"owl-numbers":""});paginationButton.append(paginationButtonInner);paginationButton.data("owl-page",lastPage===i?lastItem:i);paginationButton.data("owl-roundPages",counter);base.paginationWrapper.append(paginationButton);}}base.checkPagination();},checkPagination:function(){var base=this;if(base.options.pagination===false){return false;}base.paginationWrapper.find(".owl-page").each(function(){if($(this).data("owl-roundPages")===$(base.$owlItems[base.currentItem]).data("owl-roundPages")){base.paginationWrapper.find(".owl-page").removeClass("active");$(this).addClass("active");}});},checkNavigation:function(){var base=this;if(base.options.navigation===false){return false;}if(base.options.rewindNav===false){if(base.currentItem===0&&base.maximumItem===0){base.buttonPrev.addClass("disabled");base.buttonNext.addClass("disabled");}else if(base.currentItem===0&&base.maximumItem!==0){base.buttonPrev.addClass("disabled");base.buttonNext.removeClass("disabled");}else if(base.currentItem===base.maximumItem){base.buttonPrev.removeClass("disabled");base.buttonNext.addClass("disabled");}else if(base.currentItem!==0&&base.currentItem!==base.maximumItem){base.buttonPrev.removeClass("disabled");base.buttonNext.removeClass("disabled");}}},updateControls:function(){var base=this;base.updatePagination();base.checkNavigation();if(base.owlControls){if(base.options.items>=base.itemsAmount){base.owlControls.hide();}else{base.owlControls.show();}}},destroyControls:function(){var base=this;if(base.owlControls){base.owlControls.remove();}},next:function(speed){var base=this;if(base.isTransition){return false;}base.currentItem+=base.options.scrollPerPage===true?base.options.items:1;if(base.currentItem>base.maximumItem+(base.options.scrollPerPage===true?(base.options.items-1):0)){if(base.options.rewindNav===true){base.currentItem=0;speed="rewind";}else{base.currentItem=base.maximumItem;return false;}}base.goTo(base.currentItem,speed);},prev:function(speed){var base=this;if(base.isTransition){return false;}if(base.options.scrollPerPage===true&&base.currentItem>0&&base.currentItem<base.options.items){base.currentItem=0;}else{base.currentItem-=base.options.scrollPerPage===true?base.options.items:1;}if(base.currentItem<0){if(base.options.rewindNav===true){base.currentItem=base.maximumItem;speed="rewind";}else{base.currentItem=0;return false;}}base.goTo(base.currentItem,speed);},goTo:function(position,speed,drag){var base=this,goToPixel;if(base.isTransition){return false;}if(typeof base.options.beforeMove==="function"){base.options.beforeMove.apply(this,[base.$elem]);}if(position>=base.maximumItem){position=base.maximumItem;}else if(position<=0){position=0;}base.currentItem=base.owl.currentItem=position;if(base.options.transitionStyle!==false&&drag!=="drag"&&base.options.items===1&&base.browser.support3d===true){base.swapSpeed(0);if(base.browser.support3d===true){base.transition3d(base.positionsInArray[position]);}else{base.css2slide(base.positionsInArray[position],1);}base.afterGo();base.singleItemTransition();return false;}goToPixel=base.positionsInArray[position];if(base.browser.support3d===true){base.isCss3Finish=false;if(speed===true){base.swapSpeed("paginationSpeed");window.setTimeout(function(){base.isCss3Finish=true;},base.options.paginationSpeed);}else if(speed==="rewind"){base.swapSpeed(base.options.rewindSpeed);window.setTimeout(function(){base.isCss3Finish=true;},base.options.rewindSpeed);}else{base.swapSpeed("slideSpeed");window.setTimeout(function(){base.isCss3Finish=true;},base.options.slideSpeed);}base.transition3d(goToPixel);}else{if(speed===true){base.css2slide(goToPixel,base.options.paginationSpeed);}else if(speed==="rewind"){base.css2slide(goToPixel,base.options.rewindSpeed);}else{base.css2slide(goToPixel,base.options.slideSpeed);}}base.afterGo();},jumpTo:function(position){var base=this;if(typeof base.options.beforeMove==="function"){base.options.beforeMove.apply(this,[base.$elem]);}if(position>=base.maximumItem||position===-1){position=base.maximumItem;}else if(position<=0){position=0;}base.swapSpeed(0);if(base.browser.support3d===true){base.transition3d(base.positionsInArray[position]);}else{base.css2slide(base.positionsInArray[position],1);}base.currentItem=base.owl.currentItem=position;base.afterGo();},afterGo:function(){var base=this;base.prevArr.push(base.currentItem);base.prevItem=base.owl.prevItem=base.prevArr[base.prevArr.length-2];base.prevArr.shift(0);if(base.prevItem!==base.currentItem){base.checkPagination();base.checkNavigation();base.eachMoveUpdate();if(base.options.autoPlay!==false){base.checkAp();}}if(typeof base.options.afterMove==="function"&&base.prevItem!==base.currentItem){base.options.afterMove.apply(this,[base.$elem]);}},stop:function(){var base=this;base.apStatus="stop";window.clearInterval(base.autoPlayInterval);},checkAp:function(){var base=this;if(base.apStatus!=="stop"){base.play();}},play:function(){var base=this;base.apStatus="play";if(base.options.autoPlay===false){return false;}window.clearInterval(base.autoPlayInterval);base.autoPlayInterval=window.setInterval(function(){base.next(true);},base.options.autoPlay);},swapSpeed:function(action){var base=this;if(action==="slideSpeed"){base.$owlWrapper.css(base.addCssSpeed(base.options.slideSpeed));}else if(action==="paginationSpeed"){base.$owlWrapper.css(base.addCssSpeed(base.options.paginationSpeed));}else if(typeof action!=="string"){base.$owlWrapper.css(base.addCssSpeed(action));}},addCssSpeed:function(speed){return{"-webkit-transition":"all "+speed+"ms ease","-moz-transition":"all "+speed+"ms ease","-o-transition":"all "+speed+"ms ease","transition":"all "+speed+"ms ease"};},removeTransition:function(){return{"-webkit-transition":"","-moz-transition":"","-o-transition":"","transition":""};},doTranslate:function(pixels){return{"-webkit-transform":"translate3d("+pixels+"px, 0px, 0px)","-moz-transform":"translate3d("+pixels+"px, 0px, 0px)","-o-transform":"translate3d("+pixels+"px, 0px, 0px)","-ms-transform":"translate3d("+pixels+"px, 0px, 0px)","transform":"translate3d("+pixels+"px, 0px,0px)"};},transition3d:function(value){var base=this;base.$owlWrapper.css(base.doTranslate(value));},css2move:function(value){var base=this;base.$owlWrapper.css({"left":value});},css2slide:function(value,speed){var base=this;base.isCssFinish=false;base.$owlWrapper.stop(true,true).animate({"left":value},{duration:speed||base.options.slideSpeed,complete:function(){base.isCssFinish=true;}});},checkBrowser:function(){var base=this,translate3D="translate3d(0px, 0px, 0px)",tempElem=document.createElement("div"),regex,asSupport,support3d,isTouch;tempElem.style.cssText="  -moz-transform:"+translate3D+"; -ms-transform:"+translate3D+"; -o-transform:"+translate3D+"; -webkit-transform:"+translate3D+"; transform:"+translate3D;regex=/translate3d\(0px, 0px, 0px\)/g;asSupport=tempElem.style.cssText.match(regex);support3d=(asSupport!==null&&asSupport.length===1);isTouch="ontouchstart"in window||window.navigator.msMaxTouchPoints;base.browser={"support3d":support3d,"isTouch":isTouch};},moveEvents:function(){var base=this;if(base.options.mouseDrag!==false||base.options.touchDrag!==false){base.gestures();base.disabledEvents();}},eventTypes:function(){var base=this,types=["s","e","x"];base.ev_types={};if(base.options.mouseDrag===true&&base.options.touchDrag===true){types=["touchstart.owl mousedown.owl","touchmove.owl mousemove.owl","touchend.owl touchcancel.owl mouseup.owl"];}else if(base.options.mouseDrag===false&&base.options.touchDrag===true){types=["touchstart.owl","touchmove.owl","touchend.owl touchcancel.owl"];}else if(base.options.mouseDrag===true&&base.options.touchDrag===false){types=["mousedown.owl","mousemove.owl","mouseup.owl"];}base.ev_types.start=types[0];base.ev_types.move=types[1];base.ev_types.end=types[2];},disabledEvents:function(){var base=this;base.$elem.on("dragstart.owl",function(event){event.preventDefault();});base.$elem.on("mousedown.disableTextSelect",function(e){return $(e.target).is('input, textarea, select, option');});},gestures:function(){var base=this,locals={offsetX:0,offsetY:0,baseElWidth:0,relativePos:0,position:null,minSwipe:null,maxSwipe:null,sliding:null,dargging:null,targetElement:null};base.isCssFinish=true;function getTouches(event){if(event.touches!==undefined){return{x:event.touches[0].pageX,y:event.touches[0].pageY};}if(event.touches===undefined){if(event.pageX!==undefined){return{x:event.pageX,y:event.pageY};}if(event.pageX===undefined){return{x:event.clientX,y:event.clientY};}}}function swapEvents(type){if(type==="on"){$(document).on(base.ev_types.move,dragMove);$(document).on(base.ev_types.end,dragEnd);}else if(type==="off"){$(document).off(base.ev_types.move);$(document).off(base.ev_types.end);}}function dragStart(event){var ev=event.originalEvent||event||window.event,position;if(ev.which===3){return false;}if(base.itemsAmount<=base.options.items){return;}if(base.isCssFinish===false&&!base.options.dragBeforeAnimFinish){return false;}if(base.isCss3Finish===false&&!base.options.dragBeforeAnimFinish){return false;}if(base.options.autoPlay!==false){window.clearInterval(base.autoPlayInterval);}if(base.browser.isTouch!==true&&!base.$owlWrapper.hasClass("grabbing")){base.$owlWrapper.addClass("grabbing");}base.newPosX=0;base.newRelativeX=0;$(this).css(base.removeTransition());position=$(this).position();locals.relativePos=position.left;locals.offsetX=getTouches(ev).x-position.left;locals.offsetY=getTouches(ev).y-position.top;swapEvents("on");locals.sliding=false;locals.targetElement=ev.target||ev.srcElement;}function dragMove(event){var ev=event.originalEvent||event||window.event,minSwipe,maxSwipe;base.newPosX=getTouches(ev).x-locals.offsetX;base.newPosY=getTouches(ev).y-locals.offsetY;base.newRelativeX=base.newPosX-locals.relativePos;if(typeof base.options.startDragging==="function"&&locals.dragging!==true&&base.newRelativeX!==0){locals.dragging=true;base.options.startDragging.apply(base,[base.$elem]);}if((base.newRelativeX>8||base.newRelativeX<-8)&&(base.browser.isTouch===true)){if(ev.preventDefault!==undefined){ev.preventDefault();}else{ev.returnValue=false;}locals.sliding=true;}if((base.newPosY>10||base.newPosY<-10)&&locals.sliding===false){$(document).off("touchmove.owl");}minSwipe=function(){return base.newRelativeX/5;};maxSwipe=function(){return base.maximumPixels+base.newRelativeX/5;};base.newPosX=Math.max(Math.min(base.newPosX,minSwipe()),maxSwipe());if(base.browser.support3d===true){base.transition3d(base.newPosX);}else{base.css2move(base.newPosX);}}function dragEnd(event){var ev=event.originalEvent||event||window.event,newPosition,handlers,owlStopEvent;ev.target=ev.target||ev.srcElement;locals.dragging=false;if(base.browser.isTouch!==true){base.$owlWrapper.removeClass("grabbing");}if(base.newRelativeX<0){base.dragDirection=base.owl.dragDirection="left";}else{base.dragDirection=base.owl.dragDirection="right";}if(base.newRelativeX!==0){newPosition=base.getNewPosition();base.goTo(newPosition,false,"drag");if(locals.targetElement===ev.target&&base.browser.isTouch!==true){$(ev.target).on("click.disable",function(ev){ev.stopImmediatePropagation();ev.stopPropagation();ev.preventDefault();$(ev.target).off("click.disable");});handlers=$._data(ev.target,"events").click;owlStopEvent=handlers.pop();handlers.splice(0,0,owlStopEvent);}}swapEvents("off");}base.$elem.on(base.ev_types.start,".owl-wrapper",dragStart);},getNewPosition:function(){var base=this,newPosition=base.closestItem();if(newPosition>base.maximumItem){base.currentItem=base.maximumItem;newPosition=base.maximumItem;}else if(base.newPosX>=0){newPosition=0;base.currentItem=0;}return newPosition;},closestItem:function(){var base=this,array=base.options.scrollPerPage===true?base.pagesInArray:base.positionsInArray,goal=base.newPosX,closest=null;$.each(array,function(i,v){if(goal-(base.itemWidth/20)>array[i+1]&&goal-(base.itemWidth/20)<v&&base.moveDirection()==="left"){closest=v;if(base.options.scrollPerPage===true){base.currentItem=$.inArray(closest,base.positionsInArray);}else{base.currentItem=i;}}else if(goal+(base.itemWidth/20)<v&&goal+(base.itemWidth/20)>(array[i+1]||array[i]-base.itemWidth)&&base.moveDirection()==="right"){if(base.options.scrollPerPage===true){closest=array[i+1]||array[array.length-1];base.currentItem=$.inArray(closest,base.positionsInArray);}else{closest=array[i+1];base.currentItem=i+1;}}});return base.currentItem;},moveDirection:function(){var base=this,direction;if(base.newRelativeX<0){direction="right";base.playDirection="next";}else{direction="left";base.playDirection="prev";}return direction;},customEvents:function(){var base=this;base.$elem.on("owl.next",function(){base.next();});base.$elem.on("owl.prev",function(){base.prev();});base.$elem.on("owl.play",function(event,speed){base.options.autoPlay=speed;base.play();base.hoverStatus="play";});base.$elem.on("owl.stop",function(){base.stop();base.hoverStatus="stop";});base.$elem.on("owl.goTo",function(event,item){base.goTo(item);});base.$elem.on("owl.jumpTo",function(event,item){base.jumpTo(item);});},stopOnHover:function(){var base=this;if(base.options.stopOnHover===true&&base.browser.isTouch!==true&&base.options.autoPlay!==false){base.$elem.on("mouseover",function(){base.stop();});base.$elem.on("mouseout",function(){if(base.hoverStatus!=="stop"){base.play();}});}},lazyLoad:function(){var base=this,i,$item,itemNumber,$lazyImg,follow;if(base.options.lazyLoad===false){return false;}for(i=0;i<base.itemsAmount;i+=1){$item=$(base.$owlItems[i]);if($item.data("owl-loaded")==="loaded"){continue;}itemNumber=$item.data("owl-item");$lazyImg=$item.find(".lazyOwl");if(typeof $lazyImg.data("src")!=="string"){$item.data("owl-loaded","loaded");continue;}if($item.data("owl-loaded")===undefined){$lazyImg.hide();$item.addClass("loading").data("owl-loaded","checked");}if(base.options.lazyFollow===true){follow=itemNumber>=base.currentItem;}else{follow=true;}if(follow&&itemNumber<base.currentItem+base.options.items&&$lazyImg.length){base.lazyPreload($item,$lazyImg);}}},lazyPreload:function($item,$lazyImg){var base=this,iterations=0,isBackgroundImg;if($lazyImg.prop("tagName")==="DIV"){$lazyImg.css("background-image","url("+$lazyImg.data("src")+")");isBackgroundImg=true;}else{$lazyImg[0].src=$lazyImg.data("src");}function showImage(){$item.data("owl-loaded","loaded").removeClass("loading");$lazyImg.removeAttr("data-src");if(base.options.lazyEffect==="fade"){$lazyImg.fadeIn(400);}else{$lazyImg.show();}if(typeof base.options.afterLazyLoad==="function"){base.options.afterLazyLoad.apply(this,[base.$elem]);}}function checkLazyImage(){iterations+=1;if(base.completeImg($lazyImg.get(0))||isBackgroundImg===true){showImage();}else if(iterations<=100){window.setTimeout(checkLazyImage,100);}else{showImage();}}checkLazyImage();},autoHeight:function(){var base=this,$currentimg=$(base.$owlItems[base.currentItem]).find("img"),iterations;function addHeight(){var $currentItem=$(base.$owlItems[base.currentItem]).height();base.wrapperOuter.css("height",$currentItem+"px");if(!base.wrapperOuter.hasClass("autoHeight")){window.setTimeout(function(){base.wrapperOuter.addClass("autoHeight");},0);}}function checkImage(){iterations+=1;if(base.completeImg($currentimg.get(0))){addHeight();}else if(iterations<=100){window.setTimeout(checkImage,100);}else{base.wrapperOuter.css("height","");}}if($currentimg.get(0)!==undefined){iterations=0;checkImage();}else{addHeight();}},completeImg:function(img){var naturalWidthType;if(!img.complete){return false;}naturalWidthType=typeof img.naturalWidth;if(naturalWidthType!=="undefined"&&img.naturalWidth===0){return false;}return true;},onVisibleItems:function(){var base=this,i;if(base.options.addClassActive===true){base.$owlItems.removeClass("active");}base.visibleItems=[];for(i=base.currentItem;i<base.currentItem+base.options.items;i+=1){base.visibleItems.push(i);if(base.options.addClassActive===true){$(base.$owlItems[i]).addClass("active");}}base.owl.visibleItems=base.visibleItems;},transitionTypes:function(className){var base=this;base.outClass="owl-"+className+"-out";base.inClass="owl-"+className+"-in";},singleItemTransition:function(){var base=this,outClass=base.outClass,inClass=base.inClass,$currentItem=base.$owlItems.eq(base.currentItem),$prevItem=base.$owlItems.eq(base.prevItem),prevPos=Math.abs(base.positionsInArray[base.currentItem])+base.positionsInArray[base.prevItem],origin=Math.abs(base.positionsInArray[base.currentItem])+base.itemWidth/2,animEnd='webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend';base.isTransition=true;base.$owlWrapper.addClass('owl-origin').css({"-webkit-transform-origin":origin+"px","-moz-perspective-origin":origin+"px","perspective-origin":origin+"px"});function transStyles(prevPos){return{"position":"relative","left":prevPos+"px"};}$prevItem.css(transStyles(prevPos,10)).addClass(outClass).on(animEnd,function(){base.endPrev=true;$prevItem.off(animEnd);base.clearTransStyle($prevItem,outClass);});$currentItem.addClass(inClass).on(animEnd,function(){base.endCurrent=true;$currentItem.off(animEnd);base.clearTransStyle($currentItem,inClass);});},clearTransStyle:function(item,classToRemove){var base=this;item.css({"position":"","left":""}).removeClass(classToRemove);if(base.endPrev&&base.endCurrent){base.$owlWrapper.removeClass('owl-origin');base.endPrev=false;base.endCurrent=false;base.isTransition=false;}},owlStatus:function(){var base=this;base.owl={"userOptions":base.userOptions,"baseElement":base.$elem,"userItems":base.$userItems,"owlItems":base.$owlItems,"currentItem":base.currentItem,"prevItem":base.prevItem,"visibleItems":base.visibleItems,"isTouch":base.browser.isTouch,"browser":base.browser,"dragDirection":base.dragDirection};},clearEvents:function(){var base=this;base.$elem.off(".owl owl mousedown.disableTextSelect");$(document).off(".owl owl");$(window).off("resize",base.resizer);},unWrap:function(){var base=this;if(base.$elem.children().length!==0){base.$owlWrapper.unwrap();base.$userItems.unwrap().unwrap();if(base.owlControls){base.owlControls.remove();}}base.clearEvents();base.$elem.attr("style",base.$elem.data("owl-originalStyles")||"").attr("class",base.$elem.data("owl-originalClasses"));},destroy:function(){var base=this;base.stop();window.clearInterval(base.checkVisible);base.unWrap();base.$elem.removeData();},reinit:function(newOptions){var base=this,options=$.extend({},base.userOptions,newOptions);base.unWrap();base.init(options,base.$elem);},addItem:function(htmlString,targetPosition){var base=this,position;if(!htmlString){return false;}if(base.$elem.children().length===0){base.$elem.append(htmlString);base.setVars();return false;}base.unWrap();if(targetPosition===undefined||targetPosition===-1){position=-1;}else{position=targetPosition;}if(position>=base.$userItems.length||position===-1){base.$userItems.eq(-1).after(htmlString);}else{base.$userItems.eq(position).before(htmlString);}base.setVars();},removeItem:function(targetPosition){var base=this,position;if(base.$elem.children().length===0){return false;}if(targetPosition===undefined||targetPosition===-1){position=-1;}else{position=targetPosition;}base.unWrap();base.$userItems.eq(position).remove();base.setVars();}};$.fn.owlCarousel=function(options){return this.each(function(){if($(this).data("owl-init")===true){return false;}$(this).data("owl-init",true);var carousel=Object.create(Carousel);carousel.init(options,this);$.data(this,"owlCarousel",carousel);});};$.fn.owlCarousel.options={items:5,itemsCustom:false,itemsDesktop:[1199,4],itemsDesktopSmall:[979,3],itemsTablet:[768,2],itemsTabletSmall:false,itemsMobile:[479,1],singleItem:false,itemsScaleUp:false,slideSpeed:200,paginationSpeed:800,rewindSpeed:1000,autoPlay:false,stopOnHover:false,navigation:false,navigationText:["prev","next"],rewindNav:true,scrollPerPage:false,pagination:true,paginationNumbers:false,responsive:true,responsiveRefreshRate:200,responsiveBaseWidth:window,baseClass:"owl-carousel",theme:"owl-theme",lazyLoad:false,lazyFollow:true,lazyEffect:"fade",autoHeight:false,jsonPath:false,jsonSuccess:false,dragBeforeAnimFinish:true,mouseDrag:true,touchDrag:true,addClassActive:false,transitionStyle:false,beforeUpdate:false,afterUpdate:false,beforeInit:false,afterInit:false,beforeMove:false,afterMove:false,afterAction:false,startDragging:false,afterLazyLoad:false};}(jQuery,window,document));$(function(){$('#myCarousel').carousel({interval:10000})
$('.fdi-Carousel .item').each(function(){var next=$(this).next();if(!next.length){next=$(this).siblings(':first');}next.children(':first-child').clone().appendTo($(this));if(next.next().length>0){next.next().children(':first-child').clone().appendTo($(this));}else{$(this).siblings(':first').children(':first-child').clone().appendTo($(this));}});$("#owl-demo").owlCarousel({autoPlay:3000,items:3,itemsDesktop:[1199,3],itemsDesktopSmall:[979,3]});$(".dropdown").hover(function(){$('.dropdown-menu',this).not('.in .dropdown-menu').stop(true,true).slideDown("fast");$(this).toggleClass('open');},function(){$('.dropdown-menu',this).not('.in .dropdown-menu').stop(true,true).slideUp("fast");$(this).toggleClass('open');});});(function($){$(document).ready(function(){$('#cssmenu').prepend('<div id="menu-button">Menu</div>');$('#cssmenu #menu-button').on('click',function(){var menu=$(this).next('ul');if(menu.hasClass('open')){menu.removeClass('open');}else{menu.addClass('open');}});});})(jQuery);

function openHideFunctionality(className, siblingOrChildren) {
    var openHideObject = $('.'+className);
    openHideObject.find('.openHideBody').not('.openHideBody.active').hide();
    openHideObject.on('click', '.openHideTitle', function() {
        var thisObj = $(this);
        if(siblingOrChildren == 'sibling') {
            if(thisObj.siblings('.openHideBody').is(':visible') == true) {
                thisObj.siblings('.openHideBody').slideUp(500).removeClass('active');
                thisObj.removeClass('active');
            } else {
                openHideObject.find('.openHideTitle').removeClass('active');
                openHideObject.find('.openHideBody').slideUp(500).removeClass('active');
                thisObj.addClass('active').siblings('.openHideBody').slideDown(500).addClass('active');
            }
        } else {
            if(thisObj.children('.openHideBody').is(':visible') == true) {
                thisObj.children('.openHideBody').slideUp(500).removeClass('active');
                thisObj.removeClass('active');
            } else {
                openHideObject.find('.openHideTitle').removeClass('active');
                openHideObject.find('.openHideBody').slideUp(500);
                thisObj.addClass('active').children('.openHideBody').slideDown(500).addClass('active');
            }
        } 
    });
}

function moveToHaveQuestions() {
    $(function() { 
        $('html, body').animate({scrollTop: $('#topform').offset().top - 20}, 1000);
    });
}

function checkRequiredFields(formClass) {
    if(formClass != 'eSForm' && formClass != 'virtual_coding_challenge_form') { 
        formClass = 'cBForm';
    }
    var thisForm = $('.'+formClass ), is_valid = true;
    $('.errorMessageSpan').text('');
    thisForm.find('.cbInputElement[data-required=true]').each(function(){
        var thisObj = this;
        var thisElement = $(this);
        if(thisElement.val() == '') {
            if (thisElement.siblings('.errorMessageSpan').size() > 0) {
                thisElement.siblings('.errorMessageSpan').text('This field is required.');
            } else {
                thisElement.parent().append('<span class="errorMessageSpan" style="color:red">This field is required.</span>');
            }
            is_valid = false; return false;
        } else {
            thisElement.siblings('.errorMessageSpan').text('');
            is_valid = allValidations(thisObj);
            if( is_valid == false ) { return false; }
        }
    });
    if(is_valid == true){thisForm.find('.cBSubmitButton').css('display', 'none'); thisForm.find('.cBDisabledBtn').show();};
    return is_valid;
}

function allValidations(thisObj) {
    var thisElement = $(thisObj);
    var input = thisElement.val(), msg='', valid_type = thisElement.attr('data-valid_type'), is_valid=true;
    
    if(valid_type == '' || valid_type == 'undefined'){ return true; }
    
    if(valid_type == 'phone') {
        var pattern = /^[0-9\s\(\)\+\-]+$/;
        if(input.match(pattern)) { return true; } else { is_valid = false; msg = 'Please enter valid phone number.'; }  
    } else if(valid_type == 'email') {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  
        if(input.match(mailformat)) { return true; } else { is_valid = false; msg = 'Please enter valid email.'; }  
    }
    
    if(is_valid == false) {
        if (thisElement.siblings('.errorMessageSpan').size() > 0) {
            thisElement.siblings('.errorMessageSpan').text(msg);
        } else {
            thisElement.parent().append('<span class="errorMessageSpan" style="color:red">'+msg+'</span>');
        }
        return false;
    } else {
        return true;
    }
}

function hasFormValidation() { return (typeof document.createElement( 'input' ).checkValidity == 'function'); };

/* Exit Splash code Starts here */


var current_url = window.location.href;
var current_url_array = current_url.split('/certification/');
if(current_url_array.length <= 1) {
    current_url_array = current_url.split('/faculty/');
}
function buildExitSplash() {
    var imgFolderPath='images';
    if(current_url_array.length > 1) {
        imgFolderPath='../images';
    };
    var html  = '<a id="splashTrigger" data-toggle="modal" data-target="#pgpModalImage" class="clickableImage" style="display:none;" >.</a>';
        html += '<div class="modal fade col-lg-12 col-md-12 col-sm-12 col-xs-12" id="exitSplash" role="dialog">';
        html += '    <div class="modal-dialog col-lg-12 col-md-12 col-sm-12 col-xs-12" style="margin: 60px auto;float: none;">';
        html += '        <div class="modal-content col-lg-12 col-md-12 col-sm-12 pad-0">';
        html += '            <div class="modal-body" style="padding:5px;" class="">';
        html += '                <img class="img-responsive pad-L-5" id="exitSplashImage" src="'+imgFolderPath+'/exitSplash.jpg" style="text-align: center;" />';
        html += '            </div>';
        html += '        </div>';
        html += '    </div>';
        html += '</div>';
    if($('#exitSplash').length == 0) {$('body').append(html);}
}

if(window.location.href.indexOf("ignite281017") > -1) {
    //Do nothing.
 } else {
     buildExitSplash();
 }



exitpopped = 0; showpop = 0; delay = 100;
setTimeout(function(){showpop = 1;}, delay);

$( document ).ready(function() {
    
    loadSplashContentAjax();
    var lastMouseMove = 0;
    $(document).mousemove(function(e){
        var mv = e.clientY;
        if( e.clientY <= 5 && exitpopped == 0 && showpop == 1 && mv != lastMouseMove){
            exitpopped = 1; is_scrolledDown = 1;
            loadSplashContentAjax(); 
            triggerSplashPopUp();
        }
        lastMouseMove = mv;
    });
    
    var idleTimeout = null;
    var idleTimeout_2 = null;
    var timee = '2000'; // default time for session time out.
    var timee_2 = 1000 * 60 * 30;
    $(document).bind('click keyup mousemove scroll', function(event) {
        if (idleTimeout !== null) { clearTimeout(idleTimeout); }
        countIdleTime();
        if (idleTimeout_2 !== null) { clearTimeout(idleTimeout_2); }
        countIdleTime_2();
    });
    
    $('a').on('click touch', function(e){
        if(exitpopped == 0 && $(this).attr('id') != 'next' && $(this).attr('id') != 'have_questions') {
            e.preventDefault();
            exitpopped = 1; triggerSplashPopUp();
        }
    });

    function countIdleTime() {
        idleTimeout = setTimeout(function() {
            if(exitpopped == 0) {
                /*exitpopped = 1; triggerSplashPopUp();*/
            }
        }, timee);
    }
    countIdleTime();
    
    function countIdleTime_2() {
        clearTimeout(idleTimeout_2);
        idleTimeout_2 = setTimeout(function() {
            document.cookie = 'already_loaded_exit_splash=0; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            exitpopped = 0;
            countIdleTime_2();
        }, timee_2);
    }
    countIdleTime_2();
    
    var isMobile = window.matchMedia("only screen and (max-width: 760px)");
    if (isMobile.matches) {
        var lastScrollTop = 0, is_scrolledDown = 0, timeout;
        $(window).scroll(function(event){
            var st = $(this).scrollTop();
            if (st > lastScrollTop){
                // downscroll code
            } else {
                if(exitpopped == 0 && is_scrolledDown == 0) {
                    exitpopped = 1; is_scrolledDown = 1; triggerSplashPopUp();
                }
            }
            lastScrollTop = st;
        });
    };
    
});

function triggerSplashPopUp() {
    var read_cookies = document.cookie;
    var split_read_cookie = read_cookies.split(";");
    var already_loaded_exit_splash = 0;
    for (var i=0;i<split_read_cookie.length;i++){
        var value=split_read_cookie[i];
        value = value.split("=");
        if( value[0].trim() =='already_loaded_exit_splash' ){
            already_loaded_exit_splash = 1;
            return false;
        }
    }
    $('#exitSplash').modal('show'); 
    exit_splash_counter('EXIT SPLASH');
    if(typeof socket != 'undefined')
        socket.emit('exit_splash', 1);
}
 
function loadSplashContentAjax() {
    if($('#exitSplashForm').length == 0) {
        var url = 'exit_splash_form.html?05'; var imgFolderPath='images';if(current_url_array.length > 1) { url = '../exit_splash_form.html?05'; imgFolderPath='../images';};
        $.ajax( { url:url, success:function(data) { $('#exitSplash .modal-body').html(data); } });
    }
}

function exit_splash_counter(form_name) {
    var cBFActionPath='register/Call_back_forms/exit_splash_counter';
    if(current_url_array.length > 1) {
        cBFActionPath='../register/Call_back_forms/exit_splash_counter';
    };
    
    var read_cookies = document.cookie;
    var split_read_cookie = read_cookies.split(";");
    var already_loaded_exit_splash = 0;
    for (var i=0;i<split_read_cookie.length;i++){
        var value=split_read_cookie[i];
        value = value.split("=");
        if( value[0].trim() =='already_loaded_exit_splash' ){
            already_loaded_exit_splash = 1;
        }
    }
    
    $.ajax({
        type: "POST",
        url: cBFActionPath,
        data: 'form_name='+form_name+'&already_loaded_exit_splash='+already_loaded_exit_splash,
        success: function(data) {
            document.cookie = 'already_loaded_exit_splash=1';
        }
    });
 }
/* Exit Splash code Ends here */

/* convert tab html into accordian html (starts here) */
function convertTabsToAccordian() {
    if($('.tabbable-panel .nav-tabs li').length > 0) {
        
        var cnt = 0;
        $('.tabbable-panel').each(function() {
            var reqLi = $(this).find('.nav-tabs').children('li'), panel = '';
            var liCnt = reqLi.length;
            var dontDo = false;
            for(var i = 0; i < reqLi.length; i++) {
                var anchor = reqLi.eq(i).children('a');
                var href = anchor.attr('href').slice(1);
                if($('#'+href).html() == 'undefined'){ dontDo = true; };
            }
            
            setTimeout(function(){
                if(dontDo == false) {
                    for(var i = 0; i < reqLi.length; i++) {
                        var anchor = reqLi.eq(i).children('a');
                        var href = anchor.attr('href').slice(1);
                        var inClass = '';
                        if(i == 0) {inClass = 'in'};
                        panel += '<div class="panel panel-default">';
                        panel += '    <div class="">';
                        panel += '        <ul class="nav nav-tabs tabtop-bg1 panel-title">';
                        panel += '            <li><a data-toggle="collapse" data-parent="#accordion_'+cnt+'" href="#'+href+'" onclick="scrollToThisParent(this)">';
                        panel += '            <span>'+anchor.text()+'</span>';
                        panel += '            </a></li>';
                        panel += '        </ul>';
                        panel += '    </div>';
                        panel += '    <div id="'+href+'" class="panel-collapse collapse '+inClass+'">';
                        panel +=          $('#'+href).html();
                        panel += '    </div>';
                        panel += '</div>';
                    }
                    $(this).parent().append('<div class="panel-group" id="accordion_'+cnt+'">'+panel+'</div>');
                    $(this).remove();
                    cnt++;
                }
            }, 100);
        });
    }
}

function scrollToThisParent(thisObj) {
    var element = $(thisObj).parents('div.panel-group').find('.collapse.in').prev('div');
    if(element.offset() != 'undefined' &&  $(element).offset() != undefined ) {
        $('html,body').animate({
            scrollTop: $(element).offset().top
        }, 500); 
    }
}

 

$( document ).ready(function() {
    var isMobile = window.matchMedia("only screen and (max-width: 760px)");
    if (isMobile.matches) { convertTabsToAccordian();}
});
/* convert tab html into accordian html (ends here) */

