$(document).ready(function() {
    $(document).on('click',function(e){
        if($(e.target).closest('.suspension-box').length>0 || $(e.target).closest('.fc-day-grid-event').length>0) {
            return;
        }
        $('.suspension-box').is(':visible') && $('.suspension-box').hide();
    });
    var prolist = '';
    var nowDate =  new Date();
    var day = nowDate.getDate();
    var month = nowDate.getMonth() + 1;
    var year = nowDate.getFullYear();
    var date = year+'-'+month;
    var allDay = year+'-'+month+'-'+day;
    requestProData(date, allDay);
    function requestTotalData(date){
        $.ajax({
            url: '/api/getSummaryByMonth.json',
            data: {'month' : date},
            dataType: 'json',
            success: function(data){
                if(data && data.error === 0) {
                    renderTotalData(data);
                }else {
                    alert('获取失败，请刷新页面');    
                }
            },
            error: function(){
                alert('获取数据失败，请刷新页面');     
            }
        });
    }
    function requestByName(data){
        $.ajax({
            url: '/api/getProductByName.json',
            data: {'productName': data},
            dataType: 'json',
            success: function(data){
                if(data && data.error === 0) {
                   if(data.product === null){
                        alert('未找到该产品，请重新输入'); 
                        return false;
                   }
                   date = data.product.startDate.slice(0, 7);
                   var allDay = data.product.startDate;
                   destoryBefore(date, allDay); 
                }else {
                    alert('获取数据失败，请刷新页面');    
                }
                
            },
            error: function(){
                alert('获取数据失败，请刷新页面');
            },
            complete: function(){
                       
            }
        });
    }
    function requestProData(date, allDay){
        $.ajax({
            url: '/api/getProductsByMonth.json',
            data: {'month': date},
            dataType: 'json',
            success: function(data){
                if(data && data.error === 0){
                    var event = getEvent(data, date);
                    var dateMonth = date;
                    date = allDay ? allDay : date;
                    calendar(date, event);
                    addDom(dateMonth);
                    requestTotalData(dateMonth);
                }else {
                    alert('获取失败，请刷新页面！');
                }
            },
            error: function(){
                alert('获取数据失败，请刷新页面');
            },
            complete: function(){
                       
            }
        });    
    }
    function renderTotalData(data){
        $('.sale-sum').html(numberToMoney(data.totalSaleSum)+'元'); 
        $('.due-sum').html(numberToMoney(data.totalRedeemSum)+'元');
        $('.user-sum').html(data.totalRedeemUser+'人');  
    }
    function addDom(date){
        var select = '';
            select += '<div class="year-select">';
            select += '<span class="select-text">年度选择</span>';
            select +=  '<select id="select-year" class="select-year">';
            select +=    '<option value ="2014">2014</option>'; 
            select +=    '<option value ="2015">2015</option>'; 
            select +=    '<option value ="2016">2016</option>'; 
            select +=    '<option value ="2017">2017</option>';
            select +=    '<option value ="2018">2018</option>'; 
            select +=    '<option value ="2019">2019</option>'; 
            select +=    '<option value ="2020">2020</option>'; 
            select +=  '</select>';
            select += ' </div>';
        var leftBlock = '';
            leftBlock += '<div class="total-block">'; 
            leftBlock +=   '<div class="pro-select">';
            leftBlock +=       '<div class="product-sale"><span class="pro-icon"></span><span class="pro-text">有产品发售</span></div>'; 
            leftBlock +=       '<div class="product-limit"><span class="pro-icon"></span><span class="pro-text">有产品到期</span></div>'; 
            leftBlock +=   '</div>';
            leftBlock +=   '<div class="total-month">';
            leftBlock +=     '<div class="sale-total">';
            leftBlock +=         '<div class="text-info">本月发售产品总规模：</div>';
            leftBlock +=         '<div class="sale-sum"></div>';
            leftBlock +=     '</div>';
            leftBlock +=     '<div class="due-total">';
            leftBlock +=         '<div class="text-info">本月到期产品总规模：</div>';
            leftBlock +=         '<div class="due-sum"></div>';
            leftBlock +=     '</div>';
            leftBlock +=     '<div class="num-total">';
            leftBlock +=         '<div class="text-info">本月有产品到期的总人数：</div>';
            leftBlock +=         '<div class="user-sum"></div>';
            leftBlock +=     '</div>';
            leftBlock +=   '</div>';
            leftBlock += '</div>'; 
        $('.fc-view-container').prepend(leftBlock);
        $('.fc-header-toolbar').prepend(select); 
        var year = date.slice(0, 4);
        $("option[value ="+year+"]").attr('selected',true);
    }
    function getEvent(data, date){
        var startObj = {};
        var endObj = {};
        var event = [];
        $.each(data.startProducts, function(index,value){
            if(startObj[value.startDate]){
                startObj[value.startDate].push(data.startProducts[index]);    
            }else {
                startObj[value.startDate] = [data.startProducts[index]];    
            }
        });
        $.each(data.endProducts, function(index,value){
            if(endObj[value.interestEndDate]){
                endObj[value.interestEndDate].push(data.endProducts[index]);    
            }else {
                endObj[value.interestEndDate] = [data.endProducts[index]];    
            }
        });
        $.each(startObj, function(index, value){
            event.push({'title': '点击查看', 'start':index, 'color':'#99ccff','prolist':value});    
        });
        $.each(endObj, function(index, value){
            event.push({'title': '点击查看', 'start':index, 'color':'#ffcc99','prolist':value});    
        });
        return event;
    }
    function calendar(date, event){
        var arr = date.split('-');
        arr[2] =  arr[2] ? arr[2] : '1';
        var formatDate = new Date(arr[0],arr[1]-1,arr[2]); 
        $('#calendar').fullCalendar({
           header: {
               left: '',
               center: 'title prev,next',
               right: ''
           },
           monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月','8月', '9月', '10月', '11月', '12月'],
           dayNamesShort: ['日', '一', '二', '三','四', '五', '六'],
           editable: false,
           eventLimit: true, // allow "more" link when too many events
           events: event,
           aspectRatio: 1.8,
           firstDay: 1,
           now: formatDate,
           dayClick: function(date, allDay, jsEvent, view) {
               $('.fc-bg td').css('background-color','rgba(255,255,255,1)');
               $(this).css('background-color', 'rgba(255,255,204,0.3)');
           },
           eventClick: function(calEvent, jsEvent, view) {
               var nowPageDate = calEvent.start.format('YYYY-MM-DD');
               $('.fc-bg td').css('background-color','rgba(255,255,255,1)');
               $(".fc-bg td[data-date="+nowPageDate+"]").css('background-color', 'rgba(255,255,204,0.3)');
               prolist = calEvent.prolist;
               i = 0;
               renderBox(prolist, i);
               $('.suspension-box').css('border','2px solid '+calEvent.color);
               $('.suspension-box').show(); 
           }
       });    
    };
    function renderBox(value, i){
        $('.pro-name').html(value[i].productName);
        $('.pro-seller').html(value[i].seller);
        $('.interest-rate').html(toPercent(value[i].interestRate)+'%');
        $('.start-date').html(value[i].startDate);
        $('.total-sum').html(numberToMoney(value[i].totalSum)+'元');
        $('.full-raise-date').html(value[i].fullRaiseDate);
        $('.duration').html(value[i].duration+'天');
        $('.end-date').html(value[i].endDate);
        $('.user-num').html(value[i].investUserNum+'人');
        $('.interest-start').html(value[i].interestStartDate);
        $('.pre-sale').html(value[i].preSaleDate);
        $('.interest-end').html(value[i].interestEndDate);
        var totalPage = value.length;
        $('.total-page').html(totalPage);
        $('.current-page').html(i+1);
    }
    $('.arrow-right').on('click', function(){
        changeProBox(1);
    });
    $('.arrow-left').on('click', function(){
        changeProBox(-1);
    });
    function changeProBox(direction){
        direction = +direction;
        if(prolist.length ===1) {
            return false;
        }
        i=i+direction;
        if(i === prolist.length || i === -1){
            i = i - direction;
            $('.current-page').html(i+1);
            return false;
        }
        renderBox(prolist, i);
    }
    $(document).on('change','.select-year',function(){
        var year = $(this).val();
        var month = $('.fc-header-toolbar h2').html().slice(0,2);   
        if(month.indexOf('月') !== -1){
            month = '0'+month.slice(0,1);
        }
        date = year+'-'+month;
        destoryBefore(date);
    });
    $('#calendar').on('click','.fc-button-group .fc-button',function(){
        changeMonth();
    });
    function changeMonth(){
        var date = $('.fc-header-toolbar h2').html();
        var month = date.slice(0,2);
        if(month.indexOf('月') !== -1){
            month = '0'+month.slice(0,1);
        }
        var year = date.slice(-4);   
        date = new Date(year, (month-1));
        var day = date.getMonth() + 1;
        day = day > 9 ? day : '0' + day;
        date = date.getFullYear() +'-'+ day;
        destoryBefore(date);    
    }
    $('.icon-search').on('click', function(){
        var data = $('.select-box').val();
        if(!data){
            alert('请输入查询内容');
            return false;
        }
        requestByName(data);
    });
    $(document).on('keyup', function(event){
        event = event || window.event;
        if((event.keyCode || event.which) == '13'){
            $('.icon-search').trigger('click');        
        }
    }); 
    function destoryBefore(date, dayDall){
        $('#calendar').fullCalendar( 'destroy');
        requestProData(date, dayDall);
    }
    function numberToMoney(number, f){
        if(+number === +number){
            var moneyNumber = +number;
            f = f >= 0 && f <= 10 ? f : 2; 
            moneyNumber = parseFloat((moneyNumber + '').replace(/[^\d\.-]/g, '')).toFixed(f) + ''; 
            var intArea = moneyNumber.split('.')[0].split('').reverse();
            var floatArea = moneyNumber.split('.')[1];
            money = ''; 
            for (var i = 0; i < intArea.length; i++) { 
                money += intArea[i] + ((i + 1) % 3 == 0 && (i + 1) != intArea.length ? ',' : ''); 
            }
            floatArea = floatArea ? '.' + floatArea : '';
            return money.split('').reverse().join('') + floatArea;
        }else if(typeof number === 'undefined'){
            return '';
        }else{
            return number + '';
        }
    }  
    function toPercent(number, f){
        var percentNumber = +number;
        f = f >= 0 && f <= 10 ? f : 2;
        percentNumber = parseFloat((percentNumber*100 + "").replace(/[^\d\.-]/g, "")).toFixed(f) + ""; 
        return percentNumber;
    }
});