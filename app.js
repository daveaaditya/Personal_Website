// var myApp = angular.module('myApp', []);
// myApp.controller('mainCtrl', function Main($scope, $http){
  
//   $http.get('https://api.randomuser.me/?results=12').success(function(data) {
//     $scope.users = data.results;
//     $scope.colors = ["cyan","orange","purple","blue","pink","red","lime"];
//   }).error(function(data, status) {
//     alert('get data error!');
//   });
 
// });

// Read more: https://medium.com/@bootply/md-example-stacked-pages-2eedfe88a12a
$(document).ready(function(){

    var lastScrollTop = 0;
    var selector = ".page";
    $(window).scroll(function() {
    
        var curr = $('.active:not(".wait")');
        var next, prev;
        
        if (curr.length !== 0) {
            next = curr.next();
            prev = curr.prev();
        }
        
        var st = $(this).scrollTop();
        if (st > lastScrollTop){
            
            // downscroll code
            if (typeof next!="undefined" && atBottom(curr[0])) {
                changeActivePageDown(curr,next);
            }
            else {
                curr.removeClass("fixed");
            }
            
        }
        else {
            
            // upscroll code
            if (curr.index()===0){
                // already at top of first page
                return;
            }
            
            if (typeof curr != "undefined" && typeof prev != "undefined") {

                if (atTop(curr[0])) {
                    changeActivePageUp(curr,prev,next);
                }
                
            }
            else {
             
                var last = $(selector).last();
                if (atTop(last[0])) {
                    // make last page fixed
                    last.prev().addClass("wait").addClass("active");
                    last.removeClass("prev").addClass("fixed");
                    last.prev().removeClass("prev").removeClass("wait");
                }
                else {
                    // make last page active
                    last.addClass("active");
                }
            }
        }
    
        lastScrollTop = st;
        return;
    });
    
});

function changeActivePageDown(curr,next) {
    curr.addClass("prev").removeClass("active");
    next.addClass("active").addClass("wait").removeClass("fixed");
    next.next().addClass("fixed");
    next.removeClass("wait");
}

function changeActivePageUp(curr,prev,next) {
    prev.addClass("active").addClass("wait").removeClass("prev");
    next.removeClass("fixed");
    curr.removeClass("active").addClass("fixed");
    prev.removeClass("wait");
}

function atBottom(ele) {
    if (ele.getBoundingClientRect().bottom <= 0) {
        return true;
    }
    return false;
}

function atTop(ele) {
    if (ele.getBoundingClientRect().top >= 0) {
        return true;
    }
    return false;
}