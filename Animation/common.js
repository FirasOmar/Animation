$(document).ready(function(){
	//variables 
	var relX1;
	var relY1;
	var relX2;
	var relY2;
	var parentClassName;
	var childClassName;
	var className;
	var droppable;
	var draggable;
	var drag;
	var elementId;
	var elementClass;
	var clickIsValid = true;
	var mouseDown;
	var clicking = false;
	var flag = false;
	var count = 0;
	var thisparent;
	var animatethis;
	var animateparent;
	var flag_copy = 0;
	var delayval;
	var speedval;
	var animatespeed;
	var animatedelay;
	var clickflag = 0;
	var secondclickflag = 0;
	var selectedflag=0;
	var title;
	var ID;
	var n = 1;
	var attr_id;
	var xx;
	var yy;
	var removeflag=0;
	//function to hide copies if type not move 
	var hidefunc = function(){
		if($("#selectanimate option:selected").val() != 'move'){
			//	console.log("hide copies");
			thisparent.parent().find(".copy").each(function(){
			//	console.log("223",$(".copy").attr('id'));
				$(".copy").hide();
			});
				
			}
			else{
				thisparent.parent().find(".copy").each(function(){
				//console.log("223",$(".copy").attr('id'));
				$(".copy").show();
			});
			}
	}
	
	//setbtn
	$("#setbtn").click(function(){
		if(thisparent){
			if($("#time").val() == '' && $("#delay").val()== ''){
			alert("Plz fill speed and delay values");
			}
			else{
			list.add($("#time").val(),$("#delay").val(),thisparent.attr('id'),$("#selectanimate option:selected").val());
			ID = list.item(thisparent.attr('id'));
			//hide copies of object if type not move ..
			hidefunc();
			clickflag = 1;
			n=1;
			}
		}
		if(!thisparent){
			if($("#time").val() == '' && $("#delay").val()== '')
				alert("plz specify object");
			else {
				alert("plz specify object ");
			}
		}
	});
	//previewbtn ++++++++++++++++++++++++++++++++++++++++++
	$("#previewbtn").click(function(){
			animateparent1 = list._head;
			while( n<=list._length){	
	animationfunc(animateparent1.objectid,Number(animateparent1.speedval),
					Number(animateparent1.delayval),animateparent1.animatethis,"review");
	animateparent1 = animateparent1.next;
				n++;
			}
			n=1;
	});
	//change animation according to select options
	$("#selectanimate").change(function(){
		animatethis = $("#selectanimate").val();
	});	
	//change size for text
	$(".radiosize").click(function(){
	var size=$(this).attr("id");
	$("#text").animate({"fontSize":size},"slow");
	});
	//--------------------------------------------------------------------------------------------
	//create linked list 
	 function linkedlist (){
		 this._length = 0;
		 this._head = null; 
	 }
		// declare add and retrive function for linked list 
	linkedlist.prototype = {
		 add:function(speedval,delayval,objectid,animatethis){
			 //create new node and place data on it 
			 var flag = 0;
			 var node = {
				 speedval:speedval,
				 delayval:delayval,
				 objectid:objectid,
				 animatethis:animatethis,
				 next:null
			 },
				current;
			 //special case . no item in list yet 
			 if(this._head == null){
				this._head = node;
				this._length++;
				$("#delay").val('');
				$("#time").val('');
				//console.log(list);
			 }
			else{
				current = this._head;
				var length = this._length;
				var counter_length = 0;
				if(length == 1)
				{
					if (current.objectid == thisparent.attr('id'))
					{
						current = current;
						$("#delay").val('');
						$("#time").val('');
						flag = 1;
					}				
				}
				else
				{
					while(counter_length < length && flag == 0){
						if (current.objectid == thisparent.attr('id'))
						{	
							current = current;
							flag = 1;
						}
						else if(current.next != null)
						{	
							current = current.next;
						}
						counter_length++;
					}
				}
				if(flag == 0)
				{	
					current.next = node;
					$("#delay").val('');
					$("#time").val('');
					this._length++;
				}
				else
				{	
					if(delayval !== 'undefined'){
					current.delayval = delayval;
					$("#delay").val('');
					}
					
					if(speedval !== 'undefined'){
					current.speedval = speedval;
					$("#time").val('');
					
					current.animatethis = animatethis;
					}
				}
				console.log(list);
			 }
		 },
		 //retrive data from linked list 
		item:function(thisparent){
			if(thisparent && this._length > 0){
			var current = this._head;
			var length = this._length;
			var k = 1;
			while(thisparent != current.objectid && k <= length){
				 if(current.next)
				 current = current.next;
				 k++;
			}
			return [current.objectid,current.speedval,current.delayval,current.animatethis,current.next];
			}else return 0;
		 }
	 };
	//create object from linked list 
	var list = new linkedlist();
	//make object draggables 
	$(".parent").draggable();
	//function onchange for speed and delay 
	$("#time").change(function(){
		speedval = Number($("#time").val());
	});
	$("#delay").change(function(){
		delayval = Number($("#delay").val());
	});
	//mouse down ..  
	$(document).on("mousedown",".parent",function(event,ui){
		clicking = true;
		flag = true;	
		thisparent = $(this);
		
		//selected sign 0000000
		
		$(".parent").each(function(){
		$(this).removeClass("selected");
		});
		$(this).addClass("selected");
		if(clickflag == 1){			
			secondclickflag = 1;
		if(speedval && delayval){
			speedval= '';
			delayval='';
		//console.log("111");			
			}
		else{
			speedval= '';
			delayval='';
			clickflag = 0;	
			//console.log("222");
			}
		}	
		ID = list.item(thisparent.attr('id'));
		if( secondclickflag == 1){
			if(ID[0] == thisparent.attr('id')){
			//console.log("test111");
			$("#time").val(ID[1]);
			$("#delay").val(ID[2]);
			$("#selectanimate").val(ID[3]);
			speedval= '';
			delayval='';
			animationtype='';
			}
			else{
			//console.log("test222");
			$("#time").val('');
			$("#delay").val('');
			$("#selectanimate").val('');
			}	
		}
	});
	
	//mouse move..
	$(document).on("mousemove",".parent",function(event,ui){
		if(clicking)
		{
			//if there is no copy from parent create one 
			if(!flag_copy)
			{	
				var parent = $(this).parent();
				var copy = '<h1 id="'+$(this).attr("id")+'" class="ui-draggable parent">'+$(this).text()+'</h1>';
				parent.append(copy);	
				$(this).addClass("copy");
				$(this).removeClass("parent");
				$(this).removeClass("selected");
				removeflag = 1;
				flag_copy = 1;
			}
			//removeflag = 1;
		}
	});
	//function to remove copy if it is above parent ..

	// mouse up  on copy
	$(document).on("mouseup",".copy",function(event,ui){
		clicking = false;
		flag_copy = 0;
		//removeflag = 0;
		count++;
		$(this).parent().find(".parent").addClass("selected");
		$(".parent").draggable();
		xx = Math.abs($(this).position().left)-($(this).parent().find(".parent").position().left);
		yy = Math.abs($(this).position().top)-($(this).parent().find(".parent").position().top);		
				//console.log("xx:",xx);
			if((xx < 70 && yy > 30)||(xx > 70 && yy < 30) || (xx > 70 && yy > 30)){
			//console.log("so close");
			//$(this).remove();
			removeflag = 0;
		}
		else {
			//console.log("okay");
			$(this).remove();
			removeflag = 0;
		}	
	});
	//mouse up on parent 
	$(document).on("mouseup",".parent",function(event,ui){
		clicking = false;
		flag=false;
		flag_copy = 0;
		$(".parent").draggable();
		selectedflag = 1;
	//	console.log("flag:",removeflag);
		// to remove copy from above parent ...
		if(removeflag){
		//	console.log("2588");
		$(this).parent().find(".copy").last().remove();
		removeflag = 0;
		}
	/*	if(removeflag ){
		xx = Math.abs($(this).parent().find(".copy").last().position().left)-($(this).position().left);
		yy = Math.abs($(this).parent().find(".copy").last().position().top)-($(this).position().top);
		if((xx < 70 && yy > 30)||(xx > 70 && yy < 30) || (xx > 70 && yy > 30)){
			console.log("so close");
			$(this).parent().find(".copy").last().remove();
			removeflag = 0;
		}
		}*/
	});
	// animate text drag and drop it above its copy 
	$(document).on("click","#animatetext",function(event,ui){
		if(ID)
		animationfunc(ID[0],Number(ID[1]),Number(ID[2]),ID[3]);
	});
	
	var animationfunc = function(animateparent,animatespeed,animatedelay,animatethis,type){
	 attr_id = thisparent.attr('id');
		hidefunc();
	if(type == "review")
	{
		attr_id = animateparent;
		ID[0] = animateparent;
		ID[1] = animatespeed;
		ID[2] = animatedelay;
		ID[3] = animatethis;
	}
	if(thisparent == null){
		alert("plz choose object to animate it");
	}
	else if (ID[0] == attr_id){
		// --**--**--**--**--**--**--**--**...
		thisparent = $("#"+attr_id).parent().find(".parent");
		animateparent = thisparent;
		if(animatethis == 'split'){
			setTimeout(function(){
				var str = animateparent.text().trim();
				var str_length = str.split(" ").length;
				animatespeed = animatespeed/str_length;
				var spans = '<span>'+ str.split(" ").join(' </span><span>')+'</span]>';
				animateparent.text(' ');
				$(spans).hide().appendTo(animateparent).each(function(i) {
				//	console.log("i:",i);
					$(this).delay(animatespeed * i).fadeIn();
				});
			},animatedelay);
		}
		else if(animatethis=='move'){
			var counter = 0;
			var relX1 = animateparent.position().left;
			var relY1 = animateparent.position().top;
			//console.log("x1y1:",relX1+"/"+relY1);
			if(animateparent.parent().find(".copy").length){
				// get all copies for the parent ..
				animateparent.parent().find(".copy").each(function(){
				var copy = $(this);
				var relX2 = $(this).position().left;
				var relY2 = $(this).position().top;	
				//console.log("x2y2:",relX2+"/"+relY2);
				$(this).css('opacity',0);
				setTimeout(function(){animateparent.animate({left:relX2,top:relY2},animatespeed,function(){
				counter++;
				if(counter == animateparent.parent().find(".copy").length)
				{
					animateparent.css({'top':relY1+'px','left':relX1+'px'});
				}
					copy.css('opacity',"0.3");
				});
				},animatedelay);
				});
			}
		}
		else if (animatethis=='fade'){
		setTimeout(function(){	
		animateparent.fadeToggle(animatespeed);},animatedelay);		
		}
	}
	else {
		alert("plz specify data for object");
	}
	}
});