$(function () {
    var products = [];
    $.ajax({
        url: 'https://fakestoreapi.com/products',
        dataType: 'json',
        success: successHandelr,
        error: errorHandler
    });

    function successHandelr(response) {
        products = response;
        fillTable(response);
    }

    function errorHandler(responese) {
        console.log(responese.status);
    }

    $.fn.stars = function () {
        return $(this).each(function () {
            // Get the value
            var val = parseFloat($(this).html());
            // Make sure that the value is in 0 - 5 range, multiply to get width
            var size = Math.max(0, (Math.min(5, val))) * 16;
            // Create stars holder
            var $span = $('<span />').width(size);
            // Replace the numerical value with stars
            $(this).html($span);
        });
    }
    $('select').change(function () {
        const select = $('#selectCatBlack').val();
        if (select !== "All Category") {
            let fillArrayWIthSelect = products.filter(p => p.category === select);
            fillTable(fillArrayWIthSelect);
        } else {
            //Fill all table
        }
    }).change();
    $('#search').click(function () {
        // const search = parseFloat($('#searchText').val());
        // let filteredArray = products.filter(p => p.price === search);
        const select = $('#selectCat').val();
        if (select === "All Category") {
            const search = $('#searchText').val();
            let fillterArray = products.filter(p => p.title.includes(search) || p.description.includes(search) || p.category.includes(search));
            fillTable(fillterArray);
        } else {
            const search = $('#searchText').val();
            let fillArrayWIthSelect = products.filter(p => p.category === select && (p.title.includes(search) || p.description.includes(search)));
            fillTable(fillArrayWIthSelect);
        }
    })
    let counterVal = 0;
    $(document).on('click', '#buyButton', function(){
        counterVal+=1;
        updateDisplay(counterVal);
    });
    function updateDisplay(val) {
        document.getElementById("display").innerHTML = val;
    }
    $(document).ready(function(){
        $("#gridBtn").click(function(){
            $("ul").removeClass("serv ul");
        });
    });
    $(document).ready(function(){
        $("#hamburgerbtn").click(function(){
            $("ul").addClass("serv ul");
        });
    });
    function fillTable(array) {
        if (array.length > 0) {
            let rows = '';

            array.forEach(function (item) {
                rows += '<li>' +
                    '<div class="card align-items-center" style="width:auto;">' +
                    '<img src="' + item.image + '" class="card-img image-size"' +
                    'alt="...">' +
                    '<div class="card-body w-100">' +
                    '<h5 class="card-title text-elipsis">' + item.title + '</h5>' +
                    '<span class="stars mb-1 card-text fs-5">' + "Ratio:" + item.rating.rate + '</span>' +
                    '<p class="card-text fs-5">' + "$" + item.price +
                    ' <button id="buyButton" type="button" class="btn">\n' +
                    '                    <i class="fas fa-shopping-bag"></i>' + '</p>' +
                    '</div>' +
                    '</div>' +
                    '</li>'
            });
            $(' ul').html(rows);
        } else {
            alert("Rezults not found")
        }
    }

    $(function () {
        $('span.stars').stars();
    });

})
;