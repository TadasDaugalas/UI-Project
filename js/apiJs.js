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
        let search1="";
        let fillterArray1 = products.filter(p => p.title.includes(search1));
        fillTable(fillterArray1);

    }

    function errorHandler(responese) {
        console.log(responese.status);
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
                            '<div class="card-body">'+
                                '<h5 class="card-title text-elipsis">'+item.title+'</h5>'+
                                '<p class="card-text">'+item.rating.rate+'</p>'+
                                '<p class="card-text">'+item.price+'</p>'+
                            '</div>'+
                    '</div>'+
                '</li>'
            });
            $(' ul').html(rows);
        }else {

        }
    }
});