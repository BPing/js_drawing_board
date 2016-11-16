!function(){"use strict";function e(t){if(null===t||"object"!=typeof t)return t;var n;t instanceof Array?n=[]:t instanceof Object&&(n={});for(var a in t)n[a]=e(t[a]);return n}var t={addEvent:function(e,t,n){return e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent?e.attachEvent("on"+t,n):e["on"+t]=n,this},removeEvent:function(e,t,n){return e.removeEventListener?e.removeEventListener(t,n,!1):e.detachEvent?e.detachEvent("on"+t,n):e["on"+t]=null,this},isIE:function(){return"Microsoft Internet Explorer"===navigator.appName}};t.clone=e,window.CrysyanUtil=t}(),function(){window.CrysyanWidgetConfig={widgets:{CursorWidget:{exportVar:"CrysyanCursorWidget",jsFile:"cursor.js",icon:"cursor.png",name:"cursor"},PencilWidget:{exportVar:"CrysyanPencilWidget",jsFile:"pencil.js",icon:"pencil.png",name:"pencil"},EraserWidget:{exportVar:"CrysyanEraserWidget",jsFile:"eraser.js",icon:"eraser.png",name:"eraser"},ImageWidget:{exportVar:"CrysyanImageWidget",jsFile:"image.js",icon:"image.png",name:"image"},UndoWidget:{exportVar:"CrysyanUndoWidget",jsFile:"undo.js",icon:"undo.png",name:"undo"},IndoGoWidget:{exportVar:"CrysyanIndoGoWidget",jsFile:"into-go.js",icon:"into-go.png",name:"into-go"},ClearWidget:{exportVar:"CrysyanClearWidget",jsFile:"clear.js",icon:"clear.png",name:"clear"}}},window.CrysyanDefaultConfig={projectPath:"",isRecord:!1,submit:{Id:"crysyan-submit",callback:function(e,t){}},canvas:{canvasId:"crysyan-canvas",width:900,height:400},toolbar:{Id:"crysyan-toolbar",length:900,widgetLength:50,widgets:["CursorWidget","PencilWidget","EraserWidget","ImageWidget","UndoWidget","IndoGoWidget","ClearWidget"]}}}(window),function(e){"use strict";var t={id:"widget-id",icon:"widget-icon",name:"widget-name",CrysyanWidgetType:"CrysyanWidget",crysyanCanvas:null,prePiont:{e:null,loc:null},isDown:!1,mouseDown:function(e,t){},mouseUp:function(e,t){},mouseMove:function(e,t){},iconClick:function(e,t){},clone:function(){return e.clone(this)}};window.CrysyanWidget=t}(CrysyanUtil),function(e){"use strict";function t(e){if("object"!=typeof e&&(e={}),e=$.extend(t.defaultOptions,e),this.playCanvas=document.getElementById(e.canvasId),null===this.playCanvas)throw"can't get the Element by id:"+e.canvasId;this.playContext=this.playCanvas.getContext("2d"),0!==e.width&&(this.playCanvas.width=e.width),0!==e.height&&(this.playCanvas.height=e.height),this.drawingSurfaceImageData=null,this.backgroudImage={image:null,width:0,height:0},this.backgroudColor=e.bgColor||"#ffffff",this.revokeImgDatas=[],this.forwardRevokeImgDatas=[],this.historyListLen=e.historyListLen,this.clearCanvas()}t.prototype={saveDrawingSurface:function(){this.drawingSurfaceImageData=this.playContext.getImageData(0,0,this.playCanvas.width,this.playCanvas.height)},restoreDrawingSurface:function(){this.playContext.putImageData(this.drawingSurfaceImageData,0,0)},saveRevokeImgDatas:function(){var e=this.playContext.getImageData(0,0,this.playCanvas.width,this.playCanvas.height);this.revokeImgDatas.length>=this.historyListLen?(this.revokeImgDatas.shift(),this.revokeImgDatas.push(e)):this.revokeImgDatas.push(e),this.forwardRevokeImgDatas=[]},saveForwardRevokeFirstFrame:function(){this.forwardRevokeImgDatas[0]=this.playContext.getImageData(0,0,this.playCanvas.width,this.playCanvas.height)},revoke:function(){if(this.revokeImgDatas.length<=0)return 0;var e=this.revokeImgDatas.pop();this.forwardRevokeImgDatas.push(e),this.playContext.putImageData(e,0,0)},forwardRevoke:function(){if(this.forwardRevokeImgDatas.length<=0)return 0;var e=this.forwardRevokeImgDatas.pop();this.revokeImgDatas.push(e),this.playContext.putImageData(e,0,0)},clearCanvas:function(){if(this.playContext.save(),this.playContext.fillStyle=this.backgroudColor,this.playContext.fillRect(0,0,this.playCanvas.width,this.playCanvas.height),null!==this.backgroudImage.image){var e=this.backgroudImage.image;this.drawImage(e,(this.playCanvas.width-e.width)/2,(this.playCanvas.height-e.height)/2,e.width,e.height)}this.playContext.restore()},windowToCanvas:function(e,t){var n=this.playCanvas.getBoundingClientRect();return{x:e-n.left,y:t-n.top}},drawBackGroupWithImage:function(e,t){"undefined"==typeof t&&(t=1);var n=this,a=new Image;if(a.crossOrigin="Anonymous",a.onload=function(){if(n.backgroudImage.image=a,n.backgroudImage.width=n.playCanvas.width,n.backgroudImage.height=n.playCanvas.height,1===t){var e=0===a.width||0===n.playCanvas.width?0:a.width/n.playCanvas.width,i=0===a.height||0===n.playCanvas.height?0:a.height/n.playCanvas.height;a.width>=n.playCanvas.width&&e>i?n.backgroudImage.height=a.height*e:a.height>=n.playCanvas.height&&i>e&&(n.backgroudImage.width=a.width*i)}n.clearCanvas()},e instanceof Image||parent&&parent.window&&e instanceof parent.window.Image||"undefined"!=typeof e.src)return void(a.src=e.src);if(e instanceof File||e instanceof Blob||parent&&parent.window&&(e instanceof parent.window.File||e instanceof parent.window.Blob)){var i=new FileReader;return i.onload=function(e){a.src=e.target.result},void i.readAsDataURL(file)}return"string"==typeof e?void(a.src=e):void console.error("drawBackGroupWithImage:Obj is invalid parameter")},drawImageFile:function(e){var t=this,n=new FileReader;n.onload=function(e){t.drawDataUrl(e.target.result)},n.readAsDataURL(e)},drawDataUrl:function(e){var t=this.playContext,n=new Image;n.crossOrigin="Anonymous",n.onload=function(){arguments[0]=n,t.drawImage.apply(t,arguments)},n.src=e},drawImage:function(){var e=this.playContext;e.drawImage.apply(e,arguments)},toDataURL:function(e,t){return this.playCanvas.toDataURL(e,t)},toImageEle:function(e,t,n){var a=new Image;return a.onload=function(){n()},a.src=this.toDataURL(e,t),a},toBlob:function(e,t){for(var n=this.toDataURL(e,t).split(","),a=n[0].match(/:(.*?);/)[1],i=atob(n[1]),o=i.length,s=new Uint8Array(o);o--;)s[o]=i.charCodeAt(o);return new Blob([s],{type:a})},saveAsLocalImagePng:function(){var e=this.toDataURL("image/png").replace("image/png","image/octet-stream;Content-Disposition:attachment;filename=foo.png");window.location.href=e},getCanvasRecorder:function(e){return RecordRTC?(e=e||{},e.type="canvas",new RecordRTC(this.playCanvas,e)):(console.error("can't record canvas"),null)},addEvent:function(t,n){e.addEvent(this.playCanvas,t,n)},mousedown:function(e){if("function"==typeof e){var t=this;t.addEvent("mousedown",function(n){n.preventDefault(),t.saveRevokeImgDatas(),e(n,t.windowToCanvas(n.clientX,n.clientY))})}},mousemove:function(e){if("function"==typeof e){var t=this;t.addEvent("mousemove",function(n){n.preventDefault(),e(n,t.windowToCanvas(n.clientX,n.clientY))})}},mouseup:function(e){if("function"==typeof e){var t=this;t.addEvent("mouseup",function(n){n.preventDefault(),e(n,t.windowToCanvas(n.clientX,n.clientY)),t.saveForwardRevokeFirstFrame()})}}},t.prototype.constructor=t,t.defaultOptions={width:0,height:0,canvasId:"canvas",historyListLen:50},window.CrysyanCanvas=t}(CrysyanUtil),function(e,t,n){"use strict";function a(t){if(t=t||{},this.ops={},this.ops.common=$.extend(e.submit,t.common||{}),this.ops.submit=$.extend(e.submit,t.submit||{}),this.ops.canvas=$.extend(e.canvas,t.canvas||{}),this.ops.toolbar=$.extend(e.toolbar,t.toolbar||{}),this.ops=$.extend(t,this.ops),this.crysyanCanvas=new CrysyanCanvas(this.ops.canvas),this.toolbarElement=document.getElementById(this.ops.toolbar.Id),this.submitElement=document.getElementById(this.ops.submit.Id),null===this.toolbarElement)throw"can't get the Element by id:"+this.ops.toolbar.Id;this.widgetSelected="",this.widgetEventMap={}}var i={},o=function(e){for(var n=e.ops.toolbar.widgets,a=t.widgets,o='<ul id="widgets-list" class="ul-widget-list ">',s=0;s<n.length;s++){var r=n[s];if(!i.hasOwnProperty(r))if(a.hasOwnProperty(r)&&window.hasOwnProperty(a[r].exportVar)){var c=window[a[r].exportVar];c.icon=a[r].icon,c.crysyanCanvas=e.crysyanCanvas,c.hasOwnProperty("CrysyanWidgetType")&&(e.widgetEventMap[c.CrysyanWidgetType]=c,o=o+' <li><img  width="'+e.ops.toolbar.widgetLength+'px" height="'+e.ops.toolbar.widgetLength+'px"  id="'+c.CrysyanWidgetType+' " class="crysyan-widget-class" src=" '+c.icon+'  "></li>'),i[r]=1}else console.error("widget: '"+r+"'does not exist")}o+="</ul>",e.toolbarElement.innerHTML=o,e.widgetSelected="CrysyanCursorWidget",$(".crysyan-widget-class",document).each(function(){var t=$(this),n=t.attr("id").replace(/\s+/g,""),a=function(a){"CrysyanUndoWidget"!==n&&"CrysyanIndoGoWidget"!==n&&"CrysyanClearWidget"!==n&&($(".widget-selected-shape",document).each(function(){$(this).removeClass("widget-selected-shape")}),t.addClass("widget-selected-shape"),e.widgetSelected=n),e.widgetEventMap.hasOwnProperty(n)&&e.widgetEventMap[n].iconClick(t,a)};t.click(a)})},s=function(e){e.crysyanCanvas.mousedown(function(t,n){if(e.widgetEventMap.hasOwnProperty(e.widgetSelected)){var a=e.widgetEventMap[e.widgetSelected];a.isDown=!0,a.prePiont.e=t,a.prePiont.loc=n,a.mouseDown(t,n)}}),e.crysyanCanvas.mousemove(function(t,n){e.widgetEventMap.hasOwnProperty(e.widgetSelected)&&e.widgetEventMap[e.widgetSelected].mouseMove(t,n)}),e.crysyanCanvas.mouseup(function(t,n){if(e.widgetEventMap.hasOwnProperty(e.widgetSelected)){var a=e.widgetEventMap[e.widgetSelected];a.isDown=!1,a.mouseUp(t,n)}})};a.prototype={init:function(){var e=this;return o(e),s(e),null!==e.submitElement&&n.addEvent(e.submitElement,"click",function(t){e.ops.submit.callback(e.crysyanCanvas,t)}),this},setSubmitCallback:function(e){"function"==typeof e&&(this.ops.submit.callback=e)}},a.prototype.constructor=a,window.CrysyanView=a}(CrysyanDefaultConfig,CrysyanWidgetConfig,CrysyanUtil),function(e){"use strict";var t=e.clone();t.mouseDown=function(e,t){},t.mouseMove=function(e,t){},t.mouseUp=function(e,t){},t.CrysyanWidgetType="CrysyanCursorWidget",window.CrysyanCursorWidget=t}(CrysyanWidget),function(e){"use strict";var t=e.clone(),n=t;n.mouseDown=function(e,t){},n.mouseMove=function(e,t){var n=this;if(n.isDown){var a=n.crysyanCanvas.playContext;a.save(),a.beginPath(),a.moveTo(n.prePiont.loc.x,n.prePiont.loc.y),a.lineTo(t.x,t.y),a.stroke(),n.prePiont.e=e,n.prePiont.loc=t,a.restore()}},n.mouseUp=function(e,t){var n=this;n.isDown=!1},t.CrysyanWidgetType="CrysyanPencilWidget",window.CrysyanPencilWidget=t}(CrysyanWidget),function(e){"use strict";var t=1,n="blue",a="rgb(0,0,255)",i=-5,o=20,s=e.clone(),r=s;r.eraserWidth=25,r.mouseMove=function(e,t){if(r.isDown){var n=r.crysyanCanvas.playContext;r.eraseLast(n),r.drawEraser(t,n),r.prePiont.e=e,r.prePiont.loc=t}},r.mouseUp=function(e,t){var n=r.crysyanCanvas.playContext;r.eraseLast(n)},r.setDrawPathForEraser=function(e,t){t.beginPath(),t.arc(e.x,e.y,r.eraserWidth/2,0,2*Math.PI,!1),t.clip()},r.setErasePathForEraser=function(e){e.beginPath(),e.arc(r.prePiont.loc.x,r.prePiont.loc.y,r.eraserWidth/2+t,0,2*Math.PI,!1),e.clip()},r.setEraserAttributes=function(e){e.lineWidth=t,e.shadowColor=n,e.shadowOffsetX=i,e.shadowOffsetY=i,e.shadowBlur=o,e.strokeStyle=a},r.eraseLast=function(e){r.prePiont.loc,r.eraserWidth/2+t;e.save(),r.setErasePathForEraser(e),r.crysyanCanvas.clearCanvas(),e.restore()},r.drawEraser=function(e,t){t.save(),r.setEraserAttributes(t),r.setDrawPathForEraser(e,t),t.stroke(),t.restore()},s.CrysyanWidgetType="CrysyanEraserWidget",window.CrysyanEraserWidget=s}(CrysyanWidget),function(e,t){"use strict";var n=e.clone(),a=n;a.mouseDown=function(e,t){a.crysyanCanvas.saveDrawingSurface()},a.mouseMove=function(e,t){a.isDown&&(a.crysyanCanvas.restoreDrawingSurface(),a.drawImage(a.crysyanCanvas.playContext,t))},a.mouseUp=function(e,t){a.isDown&&(a.crysyanCanvas.restoreDrawingSurface(),a.drawImage(a.crysyanCanvas.playContext,t))},a.iconClick=function(e,t){a.selectFile(function(e){e&&a.fileReader(e)},!1)},a.drawImage=function(e,t){var n=a.prePiont.loc;a.imageHandler.image&&t.x-n.x!==0&&e.drawImage(a.imageHandler.image,n.x,n.y,t.x-n.x,t.y-n.y)},a.imageHandler={image:null,isLoad:!1,imgSrc:""},a.selectFile=function(e,t){var n=document.createElement("input");n.type="file",t&&(n.multiple=!0),n.onchange=function(){return t?n.files.length?void e(n.files):void console.error("No file selected."):n.files[0]?(e(n.files[0]),void n.parentNode.removeChild(n)):void console.error("No file selected.")},n.style.display="none",(document.body||document.documentElement).appendChild(n),a.fireClickEvent(n)},a.fireClickEvent=function(e){if(t.isIE())e.click();else{var n=document.createEvent("MouseEvent");n.initEvent("click",!0,!0);e.dispatchEvent(n)}},a.fileReader=function(e){var t=new FileReader;t.onload=function(e){a.imageHandler.image=new Image,a.imageHandler.isLoad=!1,a.imageHandler.image.onload=function(){a.imageHandler.isLoad=!0},a.imageHandler.image.src=e.target.result},t.readAsDataURL(e)},n.CrysyanWidgetType="CrysyanImageWidget",window.CrysyanImageWidget=n}(CrysyanWidget,CrysyanUtil),function(e){"use strict";var t=e.clone();t.iconClick=function(e,n){console.log("UndoiconClick"),t.crysyanCanvas.revoke()},t.CrysyanWidgetType="CrysyanUndoWidget",window.CrysyanUndoWidget=t}(CrysyanWidget),function(e){"use strict";var t=e.clone();t.iconClick=function(e,t){CrysyanUndoWidget.crysyanCanvas.forwardRevoke()},t.CrysyanWidgetType="CrysyanIndoGoWidget",window.CrysyanIndoGoWidget=t}(CrysyanWidget),function(e){"use strict";var t=e.clone();t.iconClick=function(e,t){this.crysyanCanvas.clearCanvas()},t.CrysyanWidgetType="CrysyanClearWidget",window.CrysyanClearWidget=t}(CrysyanWidget);var CrysyanFlag=!1;!function(e){"use strict";function t(e,t){var n=document.getElementsByTagName("head").item(0)||document.documentElement;if("string"==typeof e&&(e=[e]),"object"==typeof e){var a=function(i){if(i>=e.length)return void("function"==typeof t&&t());var o=document.createElement("script");o.src=e[i],o.type="text/javascript",o.onload=o.onreadystatechange=function(){this.onload=this.onreadystatechange=null,this.parentNode.removeChild(this),i<e.length&&a(i+1)},n.appendChild(o)};a(0)}}if("undefined"==typeof e&&(e=!0),!window.$){var n=window.parent.$||window.parent.jQuery||window.jQuery;if(!n)throw new Error("Crysyan requires 'jQuery'");window.$=n}var a={},i={};!function(){var e=decodeURI(location.search);if(e.indexOf("?")!=-1)for(var t=e.substr(1),n=t.split("&"),a=0;a<n.length;a++)i[n[a].split("=")[0]]=n[a].split("=")[1]}();var o=function(n){var a="../js/widget/",i="img/",o=[],s=CrysyanWidgetConfig.widgets;for(var r in s)s[r].hasOwnProperty("jsFile")&&"string"==typeof s[r].jsFile&&""!==s[r].jsFile&&o.push(a+s[r].jsFile),s[r].hasOwnProperty("icon")&&(s[r].icon=i+s[r].icon);e?t(o,n):n()},s=function(){o(function(){var e=function(){var e=new CrysyanView(n).init();a.default=e},n=JSON.parse(i.config);n.isRecord&&n.isRecord===!0?t("RecordRTC.js",function(){e()}):e()})};if(e){var r="../js/";t([r+"util.js",r+"config.js",r+"widget.js",r+"widget.js",r+"canvas.js",r+"view.js"],s)}else s();var c={getView:function(e){return"undefined"!=typeof e&&""!==e||(e="default"),a[e]}};window.Crysyan=c}("undefined"==typeof CrysyanFlag||CrysyanFlag);