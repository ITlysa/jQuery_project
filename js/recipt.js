$(document).ready(function () {
    $("#choose_me_baby").on('change', function () {
       
        var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
        $.ajax({
            dataType: 'json',
            url: url,
            success: function (data) {
                var result = "";
                data.recipes.forEach(element => {
                    const { id, name, iconUrl, instructions, ingredients } = element;
                    if (id == $("#choose_me_baby").val()) {
                        result += `
                   <div class="container mt-5 mb-5">
                        <div class="row">
                            <div class="col-3"></div>
                            <div class="col-3"><h2>${name}</h2></div>
                            <div class="col-3"><img src="${iconUrl}" width="200px"></div>
                            <div class="col-3"></div>
                        </div>
                    </div>
                   <div class="container mt-5 mb-5">
                        <div class="row">
                            <div class="col-3"></div>
                            <div class="col-3">Number of person</h2></div>
                            <div class="col-3">
                            <div class="input-group">
                                <input type="button" value="-" class="button-minus" data-field="quantity">
                                <input type="number" step="2"  max="15" value="1" name="quantity" class="quantity-field text-center">
                                <input type="button" value="+" class="button-plus" data-field="quantity">
                            </div>
                        </div>
                            </div>
                            </div>
                            <div class="col-3"></div>
                        </div>
                        <div class="row">
                            <div class="col-6">
                                <h3 class="text-center">Incredients</h3>
                            </div>
                            <div class="col-6">
                                <h3 class="text-center">Introducetion</h3>

                            </div>
                        </div>
                    </div>
                   `;
                   ingredients.forEach(item => {
                    $('.display').html(result);
                      
                    var input = $('.quantity-field').val();
                   
                    console.log(input);
                    
                    
                            result += `
                    <div class="container mt-5">
                        <div class="row">
                        <div class="col-md-2">
                        <img src="${item.iconUrl}" width="50px"><br><br><br>
                        </div>
                        <div class="col-md-2">
                            ${item.quantity*input}
                            ${item.unit.slice(0, 1).toUpperCase()}
                        </div>
                        <div class="col-md-2">
                            ${item.name}
                        </div>
                        <div class="border-left d-sm-none d-md-block" style="width: 0px;"></div>
                        <div class="col-md-6" style="margin-left: -1px;">
                            <hr class="d-sm-block d-md-none">
                            
                        </div>
                        </div>
                    </div>
                    `
                        })
                    }
                });
            }
        });
    })
})
