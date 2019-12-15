function getUrl() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}

$(document).ready(function () {
    requestApi();
    $("#recipe").on('change', function () {
        var id = $("#recipe").val();
        $("#line").show();
        getRecipe(id);
        $("#minus").on('click', function(){
           
                descrease();
            
        })
        $("#plus").on("click", function(){
                  
                increase();
        }); 

    })
})
function requestApi() {
    $.ajax({
        dataType: "json",
        url: getUrl(),
        success: (data) => chooseRecipe(data.recipes),
        error: () => console.log("Error"),
    })
}
var allData = [];
function chooseRecipe(recipe) {
    allData = recipe;
    var option = "";
    recipe.forEach(item => {
        option += `<option value="${item.id}">${item.name}</option>`;
    });
    $("#recipe").append(option);
}
function getRecipe(id) {
    allData.forEach(item => {
        if (item.id == id) {
            eachRecipe(item.name, item.iconUrl);
            input(item.nbGuests);
            eachIngredient(item.ingredients);
            eachStep(item.instructions);
        }
    });

}
function eachRecipe(name, img) {
    var result = "";
    result += `
        <div class="col-3"></div>
        <div class="col-3"><h2>${name}</h2></div>
        <div class="col-3"><img src="${img}" width="200px"></div>
        <div class="col-3"></div>
    `;
    $("#result").html(result);
}
function eachIngredient(ingredients){
    result = "";
    ingredients.forEach(element => {
        result += `
        <tr>
            <td><img src="${element.iconUrl}" class="img-fluid" width="30px"></td>
            <td><span class="text-danger">${element.quantity}</span> ${element.unit[0] }</td>
            <td>${element.name}</td>
        </tr>
        `;
    });
    $("#ingredient").html(result);
}
function input(member){
    var result = "";
    result += `
    
    <div class="col-3"></div>
    <div class="col-3">Number of person</div>
    <div class="col-3">
        <form action="#">
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <button class="btn btn-light" id="minus" type="button">-</button>
                </div>
                <input type="text" id="members" width="10px" value="${member}" min="1" max="15" disabled
                    class="form-control text-center">
                <div class="input-group-append">
                    <button class="btn btn-light" id="plus" type="button">+</button>
                </div>
            </div>
        </form>
    </div>
    <div class="col-3"></div>
    `;
    $("#input").html(result);
}
var inputValue;
function increase(){
    var value = $("#members").val();
    inputValue = parseInt(value) + 1;
    if (inputValue <= 15){
        $("#members").val(inputValue);
        
    }
}
function descrease(){
    var value = $("#members").val();
    inputValue = parseInt(value) - 1;
    if (inputValue >= 1){
        $("#members").val(inputValue);
    }        
}

function eachStep(instruction) {
    var result = "";
    var step = instruction.split('<step>');
    for (var i = 1; i < step.length; i++) {
        result += `
        <h6 style="color:blue">Step ${i}</h6>
        <p>${step[i]}</p>
        `;
    }
    $('#instruction').html(result);
}

