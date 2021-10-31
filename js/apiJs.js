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
    $.fn.stars = function() {
        return $(this).each(function() {
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
    $('#search').click(function () {
        // const search = parseFloat($('#searchText').val());
        // let filteredArray = products.filter(p => p.price === search);
        const search = $('#searchText').val();
        let fillterArray = products.filter(p => p.title.includes(search)||p.description.includes(search)||p.category.includes(search));
        fillTable(fillterArray);
    })
    function fillTable(array){
        if(array.length >0){
            $('#serv').removeClass('invisible');
            let rows = '';
            array.forEach(function(item){
                rows += '<li>'+
                    '<div class="card align-items-center" style="width:auto;">'+
                        '<img src="'+item.image+'" class="card-img image-size"'+
                             'alt="...">'+
                            '<div class="card-body w-100">'+
                                '<h5 class="card-title text-elipsis">'+item.title+'</h5>'+
                                '<span class="card-text fs-5">'+"Ratio:"+item.rating.rate+'</span>'+
                                '<p class="card-text fs-5">'+"$"+item.price+'</p>'+
                            '</div>'+
                    '</div>'+
                '</li>'
            });
            $(' ul').html(rows);
        }else {
        alert("Rezults not found")
        }
    }
    $(function() {
        $('span.stars').stars();
    });

});