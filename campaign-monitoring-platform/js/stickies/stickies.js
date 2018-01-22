var STICKIES = (function () {
    var initStickies = function () {},
        openStickies = function () {},
        createSticky = function (data) {},
        deleteSticky = function (id) {},
        saveSticky   = function () {},
        markUnsaved  = function () {};
         
    return {
        open   : openStickies,
        init   : initStickies
    };
}());

var initStickies = function initStickies() {
    $("<div />", { 
        text : "+", 
        "class" : "add-sticky",
        click : function () { createSticky(); }
    }).prependTo(document.body);
    initStickies = null;
},

openStickies = function openStickies() {
    initStickies && initStickies();
    for (var i = 0; i < localStorage.length; i++) {
        createSticky(JSON.parse(localStorage.getItem(localStorage.key(i))));
    }
},

createSticky = function createSticky(data) {
    data = data || { id : +new Date(), top : "40px", left : "40px", text : "Note Here" }
     
    return $("<div />", { 
        "class" : "sticky",
        'id' : data.id
         })
        .prepend($("<div />", { "class" : "sticky-header"} )
            .append($("<span />", { 
                "class" : "status-sticky", 
                click : saveSticky 
            }))
            .append($("<span />", { 
                "class" : "close-sticky", 
                text : "trash", 
                click : function () { deleteSticky($(this).parents(".sticky").attr("id")); }
            }))
        )
        .append($("<div />", { 
            html : data.text, 
            contentEditable : true, 
            "class" : "sticky-content", 
            keypress : markUnsaved
        }))
    .draggable({ 
        handle : "div.sticky-header", 
        stack : ".sticky",
        start : markUnsaved,
        stop  : saveSticky  
     })
    .css({
        position: "absolute",
        "top" : data.top,
        "left": data.left
    })
    .focusout(saveSticky)
    .appendTo(document.body);
},