var len;
var results = '';

function apiSearch() {
    var params = {
        "q": $("#query").val(),
        "count": "50",
        "offset": "0",
        "mkt": "en-us"
    };

    $.ajax({
        url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
        beforeSend: function (xhrObj) {
            xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", "6fac576c6ddb481e879eb7e6a64874b9");
        },
        type: "GET",
    })
        .done(function (data) {
            len = data.webPages.value.length;
            for (i = 0; i < len; i++) {
                results += "<p><a href='" + data.webPages.value[i].url + "'>" + data.webPages.value[i].name + "</a>: " + data.webPages.value[i].snippet + "</p>";
            }

            $('#searchResults').html(results);
            $('#searchResults').dialog();
        })
        .fail(function () {
            alert("error");
        });
}

function changeBackground() {
    var count = Math.floor(Math.random() * 10);
    if (count % 2 == 0) {
        document.body.style.backgroundImage = 'url(https://images.unsplash.com/photo-1537420327992-d6e192287183?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80)'
        document.body.style.backgroundSize = 'cover';
    } else {
        document.body.style.background = 'url(https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=671&q=80)'
        document.body.style.backgroundSize = 'cover';
    }

    count++;
}

function displayTime() {

    function getTime() {
        var html = "";

        var date = new Date();

        var hour = date.getHours();
        var minute = date.getMinutes();

        var aop = "AM";

        if (hour > 12) {
            hour -= 12;
            aop = "PM";
        }

        if (minute < 10) {
            minute = "0" + minute;
        }

        html += hour + ':' + minute + " " + aop;

        document.getElementById('time').title = "Current Time";

        document.getElementById('time').innerHTML = html;
    }

    getTime();

    $("#time").dialog({
        width: 300,
        height: 150,
        show: {
            effect: "blind",
            duration: 1000
        },
        hide: {
            effect: "clip",
            duration: 750
        }
    });
}

function searchResults() {
    apiSearch();
    function pullResults() {
        $('#searchResults').dialog({
            width: 500,
            height: 500,
            show: {
                effect: "blind",
                duration: 1000
            },
            hide: {
                effect: "clip",
                duration: 750
            }
        });
    }
    pullResults();
}