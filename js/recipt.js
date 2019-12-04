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
                            <div class="center">
                            <p>
                              </p><div class="input-group">
                                  <span class="input-group-btn">
                                      <button type="button" class="btn btn-default btn-number" disabled="disabled" data-type="minus" data-field="quant[1]">
                                          <span class="glyphicon glyphicon-minus"></span>
                                      </button>
                                  </span>
                                  <input type="text" name="quant[1]" class="form-control id="data" input-number" value="1" min="1" max="15">
                                  <span class="input-group-btn">
                                      <button type="button" class="btn btn-default btn-number" data-type="plus" data-field="quant[1]">
                                          <span class="glyphicon glyphicon-plus"></span>
                                      </button>
                                  </span>
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
                    
                            result += `
                    <div class="container">
                        <div class="row">
                        <div class="col-md-2">
                        <img src="${item.iconUrl}" width="50px"><br><br><br>
                        </div>
                        <div class="col-md-2">
                            ${item.quantity}
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
                $('.btn-number').click(function(e){
                    e.preventDefault();
                    
                    fieldName = $(this).attr('data-field');
                    type      = $(this).attr('data-type');
                    var input = $("input[name='"+fieldName+"']");
                    var currentVal = parseInt(input.val());
                    if (!isNaN(currentVal)) {
                        if(type == 'minus') {
                            
                            if(currentVal > input.attr('min')) {
                                input.val(currentVal - 1).change();
                            } 
                            if(parseInt(input.val()) == input.attr('min')) {
                                $(this).attr('disabled', true);
                            }
                
                        } else if(type == 'plus') {
                
                            if(currentVal < input.attr('max')) {
                                input.val(currentVal + 1).change();
                            }
                            if(parseInt(input.val()) == input.attr('max')) {
                                $(this).attr('disabled', true);
                            }
                
                        }
                    } else {
                        input.val(0);
                    }
                });
                $('.input-number').focusin(function(){
                   $(this).data('oldValue', $(this).val());
                });
                $('.input-number').change(function() {
                    
                    minValue =  parseInt($(this).attr('min'));
                    maxValue =  parseInt($(this).attr('max'));
                    valueCurrent = parseInt($(this).val());
                    
                    name = $(this).attr('name');
                    if(valueCurrent >= minValue) {
                        $(".btn-number[data-type='minus'][data-field='"+name+"']").removeAttr('disabled')
                    } else {
                        alert('Sorry, the minimum value was reached');
                        $(this).val($(this).data('oldValue'));
                    }
                    if(valueCurrent <= maxValue) {
                        $(".btn-number[data-type='plus'][data-field='"+name+"']").removeAttr('disabled')
                    } else {
                        alert('Sorry, the maximum value was reached');
                        $(this).val($(this).data('oldValue'));
                    }

                    $(".input-number").keydown(function (e) {
                        // Allow: backspace, delete, tab, escape, enter and .
                        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
                             // Allow: Ctrl+A
                            (e.keyCode == 65 && e.ctrlKey === true) || 
                             // Allow: home, end, left, right
                            (e.keyCode >= 35 && e.keyCode <= 39)) {
                                 // let it happen, don't do anything
                                 return;
                        }
                        // Ensure that it is a number and stop the keypress
                        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                            e.preventDefault();
                        }
                    });
                    
                });
            }
        });
    })
})
