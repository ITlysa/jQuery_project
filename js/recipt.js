
var member;
$(document).ready(function () {
    $('#choose_me_baby').on('change', function(){
        getDefaultRecipe();
        $("#input").fadeIn(100);
        
        $("#minus").on('click', function(){
            var newMember = $('#members').val();
            if(newMember > 1) {
                updateRecipe();
                member = parseInt(newMember) -1;
            }
            descrease();
        })
        $("#plus").on("click", function(){
            var newMember = $('#members').val();
            if(newMember < 15) {
                updateRecipe();
                member = parseInt(newMember) + 1;
            }
            increase();
        }); 

    
    })
});
function getDefaultRecipe() {
    $.ajax({
        dataType: 'json',
        url: getUrl(),
        success: (data) => defaultRecipe(data),
        error: () => getError(),
    });
}
function updateRecipe() {
    $.ajax({
        dataType: 'json',
        url: getUrl(),
        success: (data) => getRecipe(data),
        error: () => getError(),
    });
}
function getUrl() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}

function getError() { console.log("Error") }

function getRecipe(myData) {
    var result = "";
    myData.recipes.forEach( recipe => {
        if (recipe.id == $('#choose_me_baby').val()){
            result += `
        <div class="row">
            <div class="col-3"></div>
            <div class="col-3">
                <h3>${recipe.name}</h3>
            </div>
            <div class="col-6">
                <img src="${recipe.iconUrl}" class="img-fluid" width="270px" alt="">
            </div>
           
        </div>
        `;
            updateIngredient(recipe.ingredients);
        }
    });
    printOut("recipe",result);
}

function defaultRecipe(myData) {
    var result = "";
    myData.recipes.forEach( recipe => {
        if (recipe.id == $('#choose_me_baby').val()){
        defaultIngredient(recipe.ingredients);
        result += `
        <div class="row">
            <div class="col-3"></div>
            <div class="col-3">
                <h3>${recipe.name}</h3>
            </div>
            <div class="col-6">
                <img src="${recipe.iconUrl}" class="img-fluid" width="270px" alt="">
            </div>
           
        </div>
        `;
        }
    });
    printOut("recipe",result);
}

function defaultIngredient(ing) {
    result = "";
    ing.forEach(item => {
        result += `
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
        `;
    });
    printOut('ingredient', result);  
}

function updateIngredient(ing) {
    result = "";
    
    ing.forEach(item => {
        result += `
        <div class="row">
        <div class="col-md-2">
        <img src="${item.iconUrl}" width="50px"><br><br><br>
        </div>
        <div class="col-md-2">
            ${item.quantity * addMember(member)}
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
        `;
    });
    printOut('ingredient', result);  
}

function printOut(elmentId, out) {
    $('#' + elmentId).html(out);
}
function increase(){
    var value = $("#members").val();
    var inputValue = parseInt(value) + 1;
    if (inputValue <= 15){
        $("#members").val(inputValue);
    }
}
function descrease(){
    var value = $("#members").val();
    var inputValue = parseInt(value) - 1;
    if (inputValue >= 1){
        $("#members").val(inputValue);
    }
}
function addMember(member) {
    return  parseInt(member);
}