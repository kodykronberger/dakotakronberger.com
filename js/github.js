_pagesize = 5;
currentPage = 0;

$(document).ready(function(){
    main();
});

function main() {
    var url = "https://api.github.com/users/kodykronberger/events";
    var gitData;
    $.getJSON({
        url: url,
        success: function( data ) {
            var objects = createListObjects(data);
            createPageOfEvents( objects );
            
            $(".pager .previous").click(function(){
                if(currentPage > 0) {
                    currentPage--;
                    createPageOfEvents( objects );
                }
                
            });
            $(".pager .next").click(function(){
                if((currentPage + 1) * _pagesize < objects.length) {
                    currentPage++;
                    createPageOfEvents( objects );
                }
                
            });
        }
    });
}

function createListObjects(data) {
    var objects = [];
    for (var i = 0; i < data.length; i++) {
        var dateObj = new Date(data[i].created_at);
        var hours = (dateObj.getHours() > 12) ? dateObj.getHours() - 12 : dateObj.getHours();
        var timeOfDay = (dateObj.getHours() >= 12) ? "PM" : "AM";
        var obj = {
            id: data[i].id,
            type: data[i].type,
            prettyType: "",
            repoName: data[i].repo.name,
            repoUrl: "https://www.github.com/" + data[i].repo.name,
            date: (dateObj.toDateString() + " at " + hours + ":" + dateObj.getSeconds() + " " + timeOfDay),
            ref: data[i].payload.ref,
            commits: []
        }
        if (obj.type == "PushEvent") {
            for (var j = 0; j < data[i].payload.commits.length; j++) {
                obj.commits.push({
                    description: "+ " + data[i].payload.commits[j].message,
                    url: data[i].payload.commits[j].url
                });
            }
            obj.prettyType = "Push";
        }
        if (obj.type == "CreateEvent") {
            obj.commits.push({
                description: data[i].payload.description,
                url: data[i].repo.url
            });
            obj.prettyType = "New Repo";
        }
        if(obj.ref != "master") {
            objects.push(obj);
        }
    }
    return objects;
}

function createPageOfEvents(objects) {
    $("#github").effect("drop", function(){
        $("#github").html("");
        var min = (currentPage * _pagesize);
        var max = (currentPage + 1) * _pagesize;
        for(var i = min; i < max; i++) {
            if(objects[i] != null) {
                var labelclass = "primary";
                if (objects[i].type == "CreateEvent") {
                    labelclass = "success";
                }
                var html = "";
                html += "<a href='" + objects[i].repoUrl + "' class='list-group-item'>";

                for(var c = 0; c < objects[i].commits.length; c++) {
                    html += "<span class='label label-"+labelclass+"'>"+objects[i].prettyType+"</span><h6 class='list-group-item-heading'>"+objects[i].repoName+"</h6><p class='list-group-item-text'>"+objects[i].commits[c].description+"</p><p class='list-group-item-text list-date'>"+objects[i].date+"</p>";
                }

                html += "</a>"

                $("#github").append(html);
            }
        }
        if(min == 0) {
            $(".pager .previous a").addClass("disabled");
        } else {
            $(".pager .previous a").removeClass("disabled");
        }

        if(max >= objects.length) {
            $(".pager .next a").addClass("disabled");         
        } else {
            $(".pager .next a").removeClass("disabled"); 
        }
        $("#github").fadeIn();
    });
}