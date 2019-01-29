
var CRFuc={

    count : 0,

    allpage : 0,

    template : undefined,

    pagesize : 0,

    getItems : undefined,

    $scope : undefined,

    page : 0,

    ar1 : undefined,

    ar2 : undefined,

    pagesel: [10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 100000],

    removeclass : function(uls, cl){
        for(var i;i<uls.length;i++){
            $(uls.eq(i)).removeClass(cl);
        }
    },

    resureLis : function(){
        this.$scope.page=this.page;
        var uls=$('.pagination1').children();
        if(this.page>=this.ar1[5] && this.page<this.ar2[5]){
            $($(uls.eq(5)).children()).html(this.page);
        }else if(this.page>=this.ar1[4] && this.page<=this.ar2[4]){
            $($(uls.eq(5)).children()).html(this.page);
        }else if(this.page>=this.ar1[3] && this.page<=this.ar2[3]){
            $($(uls.eq(4)).children()).html(this.page);
        }else if(this.page>=this.ar1[2] && this.page<=this.ar2[2]){
            $($(uls.eq(3)).children()).html(this.page);
        }else if(this.page>=this.ar1[1] && this.page<=this.ar2[1]){
            $($(uls.eq(2)).children()).html(this.page);
        }else if(this.page>=this.ar1[0] && this.page<=this.ar2[0]){
            //$(uls.eq(2)).html(this.page);
        }

        for(var i=1;i<uls.length-1;i++){
            if(Math.round($($(uls.eq(i)).children()).html()) == this.page && !$($(uls.eq(i)).children()).hasClass('pagechecked')){
                $($(uls.eq(i)).children()).addClass('pagechecked');
            }else if(Math.round($($(uls.eq(i)).children()).html()) != this.page && $($(uls.eq(i)).children()).hasClass('pagechecked')){
                $($(uls.eq(i)).children()).removeClass('pagechecked');
            }
        }
    },

    pref : function(e){
        if(this.getItems == undefined){
            return false;
        }

        if(this.page<2) return false;
        this.page=Math.round(this.page)-1;
        var start=(this.page-1)*this.pagesize;
        this.getItems(start,this.pagesize,this.$scope);
        this.$scope.pagesize=this.pagesize;
        this.$scope.page=this.page;
        
        var uls=$('.pagination1').children();
        if(this.allpage<=6){
            for(var i=0;i<uls.length;i++){
                if($($(uls.eq(i)).children()).hasClass('pagechecked')){
                    $($(uls.eq(i)).children()).removeClass('pagechecked');
                    $($(uls.eq(i-1)).children()).addClass('pagechecked');
                    break;
                }
            }
        }else if(this.allpage>6){
            this.resureLis();
        }
        $('.currentpage').val(this.page);
    },

    suf : function(e){
        if(this.getItems == undefined){
            return false;
        }

        if(this.page>=this.allpage) return false;
        this.page=Math.round(this.page)+1;
        var start=(this.page-1)*this.pagesize;
        this.getItems(start,this.pagesize,this.$scope);
        this.$scope.pagesize=this.pagesize;
        this.$scope.page=this.page;
        var uls=$('.pagination1 li').children();
        if(this.allpage<=6){
            for(var i=0;i<uls.length;i++){
                if($(uls.eq(i)).hasClass('pagechecked')){
                    $(uls.eq(i)).removeClass('pagechecked');
                    $(uls.eq(i+1)).addClass('pagechecked');
                    break;
                }
            }
        }else if(this.allpage>6){
            this.resureLis();
        }
        $('.currentpage').val(this.page);
        
    },

    thatP : function(e){
        var nu=Math.round(e.innerHTML);
        if(this.page == nu) return false;
        var start=(nu-1)*this.pagesize;
        if(this.getItems != undefined){
            this.getItems(start,this.pagesize,this.$scope);
            this.$scope.pagesize=this.pagesize;
            this.$scope.page=this.page;
            this.$scope.page=nu;
            this.page=nu;
            
            var uls=$('.pagination1').children();
            for(var i=0;i<uls.length;i++){
                $($(uls.eq(i)).children()).removeClass('pagechecked');
            }
            $(e).addClass('pagechecked');
        }
        $('.currentpage').val(this.page);
    }
};
var CRPage={


    pre : '<li style="display: inline-block;list-style:none;"><a style="color: #1a75ff;min-width:30px;height:26px;" href="javascript:void(0)" class="cr_pref btn">&laquo;</a></li>',

    sf : '<li style="display: inline-block;list-style:none;"><a style="color: #1a75ff;min-width:30px;height:26px;" href="javascript:void(0)" class="cr_suf btn">&raquo;</a></li>',

    li : '<li style="display: inline-block;list-style:none;"><a style="color: #1a75ff;min-width:30px;height:26px;" href="javascript:void(0)" class="cr_page btn">[page]</a></li>',

    init : function(getItems,pagesize,$scope){
        var ul='<ul class="pagination1"></ul>';
        $('.crpage').empty();
        $('.crpage').append(ul);
        if(pagesize){
            CRFuc.pagesize=pagesize;
        }else{
            CRFuc.pagesize=pagesel[0];
        }
        if(!$scope){
            $scope={counts:0 ,page:1, pagesize:CRFuc.pagesize};
        }
        CRFuc.$scope=$scope;
        CRFuc.page=1;
        $scope.page=CRFuc.page;
        $scope.pagesize=CRFuc.pagesize;

        var li1=CRPage.li.replace('[page]','1');
        var li2=CRPage.li.replace('[page]','2');
        var li3=CRPage.li.replace('[page]','3');
        var li4=CRPage.li.replace('[page]','4');
        var li5=CRPage.li.replace('[page]','5');
        var li6=CRPage.li.replace('[page]','6');

        $('.pagination1').append(CRPage.pre).append(li1).append(li2).append(li3)
        .append(li4).append(li5).append(li6).append(CRPage.sf);

        var uls=$('.pagination1').children();

        $($(uls.eq(1)).children()).addClass('pagechecked');

        /*for(var i=2;i<uls.length-1;i++){
            $(uls.eq(i)).hide();
        }*/

        $(uls.eq(2)).hide();
        $(uls.eq(3)).hide();
        $(uls.eq(4)).hide();
        $(uls.eq(5)).hide();
        $(uls.eq(6)).hide();

        $('.pagination1').on('click','.cr_page',function(){
            var that=this;
            CRFuc.thatP(that);
        })

        $('.pagination1').on('click','.cr_pref',function(){
            var that=this;
            CRFuc.pref(that);
        })
        $('.pagination1').on('click','.cr_suf',function(){
            var that=this;
            CRFuc.suf(that);
        })
       
        CRFuc.getItems=getItems;
        getItems(0,pagesize,$scope);
    },

    savecount : function(count){
        
        if(CRFuc.page != 1) return false;
        CRFuc.count=count;
        var page=Math.ceil(count/CRFuc.pagesize);
        CRFuc.allpage=page;
        CRFuc.$scope.allpage=CRFuc.allpage;
        CRFuc.$scope.counts=CRFuc.count;
        var uls=$('.pagination1').children();
        

        var detail='<div class="pagedetail" align="center" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
            '<small>每页显示&nbsp;[pagesize]&nbsp;条</small>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 第'+
            '<input class="btn currentpage" style="width:100px;background: #ffe5ff;height:26px;text-align: center" type="number" value="[currentpage]">页 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
            '<samall>共&nbsp;{{allpage}}&nbsp;页&nbsp;{{counts}}&nbsp;条</samall>'+
        '</div>';

        var btn_group='<div class="btn-group pagesel">'+
            '<button type="button" class="btn pagesize_group dropdown-toggle btn-xs" '+
                    'data-toggle="dropdown">'+
                '[pagesize] <span class="caret"></span>'+
            '</button>'+
            '<ul class="dropdown-menu page_mennu_ul" role="menu">'+
             ' [page_menu_li]'+
            '</ul>'+
        '</div>';


        var page_menu_li='';
        if(CRFuc.pagesel){
            CRFuc.pagesel.forEach(page=>{
                page_menu_li+='<li><a class="page_menu_li_a">'+page+'</a></li>';
            });
        }

        btn_group=btn_group.replace('[pagesize]',CRFuc.pagesize).replace('[page_menu_li]',page_menu_li);

        $('.pagedetail').remove();

        detail=detail.replace('[pagesize]',btn_group).replace('{{allpage}}',CRFuc.allpage).replace('{{counts}}',count).replace('[currentpage]',1);
        $('.crpage').append(detail);

        $('.page_mennu_ul').hide();
        $('.pagesel').click(function(){
            $('.page_mennu_ul').show();
        })
        $('body').click(function(e){
            var content=$(e.target).attr('class');
            if(content && content.indexOf('pagesize_group')>-1) return false;
            $('.page_mennu_ul').hide();
        })

        /*if(true){
            CRPage1.savecount(count);
            return false;
        }*/

        if(page<=6){
            for(var i=2;i<=page;i++){
                $(uls.eq(i)).show();
            }
        }else{
            var ar=this.computePage(page);
            $(uls.eq(1)).show();
            $($(uls.eq(1)).children()).html(ar[0]);
            $(uls.eq(2)).show();
            $($(uls.eq(2)).children()).html(ar[1]);
            $(uls.eq(3)).show();
            $($(uls.eq(3)).children()).html(ar[2]);
            $(uls.eq(4)).show();
            $($(uls.eq(4)).children()).html(ar[3]);
            $(uls.eq(5)).show();
            $($(uls.eq(5)).children()).html(ar[4]);

            $(uls.eq(6)).show();
            $($(uls.eq(6)).children()).html(ar[5]); 
        }

        var that=this.inpPage;

        $('.currentpage').bind('input propertychange', function() {
            var pathat=this;
            console.log(11)
            setTimeout(function(){
                if(!$(pathat).val())  $(pathat).val(1);
                CRFuc.page=$(pathat).val();

                that(CRFuc.page, CRFuc.pagesize, CRFuc.$scope);
            },2000);
        });

        $('.currentpage').keyup(function(event){
             switch(event.keyCode) {
             case 27:
             //alert("ESC");
             case 96:
             //alert("ESC");
             case 13:
                CRFuc.page=$(this).val();
                that(CRFuc.page, CRFuc.pagesize, CRFuc.$scope);
             }
        });

        var init=this.init;

        $('.page_menu_li_a').on('click',function(){
            var pagesize_show=$(this).html();
            if(pagesize_show != CRFuc.pagesize){
                $('.pagesize_group').html(pagesize_show+'<span class="caret"></span>');
                CRFuc.pagesize=pagesize_show;
                init(CRFuc.getItems, CRFuc.pagesize, CRFuc.$scope);
            }
            
        });

    },

    inpPage : function(page,pagesize,$scope){
        //if(!CRFuc.getItems) CRFuc.getItems=getItems;
        CRFuc.page=page;
        $scope.page=page;
        //if(!CRFuc.$scope) CRFuc.$scope=$scope;
        //if(!CRFuc.pagesize) CRFuc.pagesize=pagesize;
        
        CRFuc.getItems((CRFuc.page-1)*CRFuc.pagesize,CRFuc.pagesize,CRFuc.$scope);

        var flag=false;
        if(CRFuc.allpage>=6){
            flag=true;
        }
        var uls=$('.pagination1').children();
        for(var i=1;i<uls.length-1;i++){
            if(flag==true && i<6){
                var p1=Math.round($($(uls.eq(i)).children()).html());
                var p2=Math.round($($(uls.eq(i+1)).children()).html());
                if(Math.round(CRFuc.page)>=p1 && Math.round(CRFuc.page)<p2){
                    if(i!=1){
                        $($(uls.eq(i)).children()).html(CRFuc.page);
                    }else{
                        if(CRFuc.page!=1){
                            $($(uls.eq(i+1)).children()).html(CRFuc.page);
                        }
                    }
                }
            }

            if(Math.round($($(uls.eq(i)).children()).html()) == CRFuc.page && !$($(uls.eq(i)).children()).hasClass('pagechecked')){
                $($(uls.eq(i)).children()).addClass('pagechecked');
            }else if(Math.round($($(uls.eq(i)).children()).html()) != CRFuc.page && $($(uls.eq(i)).children()).hasClass('pagechecked')){
                $($(uls.eq(i)).children()).removeClass('pagechecked');
            }
        }

    },

    computePage : function(page){
        if(page/6<2){
            CRFuc.ar1=[1,2,3,4,5,page];
            CRFuc.ar2=[1,2,3,4,page-1,page]
            return [1,2,3,4,5,page];
        }else{
            var a=Math.floor(page/6);
            CRFuc.ar1=[1,2,2*a,3*a,4*a,5*a];
            CRFuc.ar2=[1,2*a-1,3*a-1,4*a-1,5*a-1,page];
            return [1,2,3*a,4*a,5*a,page];
        }
    }

    
};

var CRPage1={

    pre : '<li><a class="cr_pref btn">&laquo;</a></li>',

    sf : '<li><a class="cr_suf btn">&raquo;</a></li>',

    li : '<li><a class="cr_page btn">[page]</a></li>',

    savecount : function(count){
        var ul=$('.pagination1');
        ul.empty();
        
    }
};

$(function(){
    $('head').append('<style type="text/css">.pagination1 .pagechecked {background-color:#cce5ff;}'+
            '.crpage .pagination1{margin:0 0 0 0;padding:0 0 0 0;}.crpage,.crpage ul,.crpage .pagedetail{display: inline-block;color:#4dd2ff;line-height20px;}.crpage .pagination1  li{display: inline-block;list-style:none;background-color:#fffffa;line-height:26px;text-align:center;min-width:30px;}'+
        '.crpage li{padding:0px 0px 2px 0px;border:0.1px solid #ffffef;}.crpage .pagination1  li a:hover{text-decoration:none!important; color:#ccc;}</style>')

});