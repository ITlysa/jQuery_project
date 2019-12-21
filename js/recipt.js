// function to get url
function getUrl() {
    var url = "https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}

$(document).ready(function () {
    requestApi();
    $("#recipe").on('change', function () {
        var id = $("#recipe").val();
        $("#line, #ingr, #inst").show();
    
        
        getRecipe(id);
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

var quantity = []; // array to old guest
var oldGuest;
// function to get data from api
function getRecipe(id) {
    allData.forEach(item => {
        const{ name, iconUrl, nbGuests, ingredients, instructions} = item;
        if (item.id == id) {
            eachRecipe(name, iconUrl);
            input(nbGuests);
            eachIngredient(ingredients);
            eachStep(instructions);
            quantity = item;
            oldGuest = item.nbGuests;
        }
    });

}
// function to get each recipe in api
function eachRecipe(name, img) {
    var result = "";
    result += `
        <div class="col-sm-3"></div>
        <div class="col-sm-3"><h2>${name}</h2></div>
        <div class="col-sm-3"><img src="${img}" width="250px"></div>
        <div class="col-sm-3"></div>
    `;
    $("#getRecipe").html(result);
}
// function to get each ingredients in api
function eachIngredient(ingredients) {
    result = "";
    ingredients.forEach(element => {
        const{ name, iconUrl, quantity, unit} = element;
        result += `
        <tr>
            <td><img src="${iconUrl}" class="img-fluid" width="60px"></td>
            <td><span class="text-danger">${quantity}</span> ${unit[0]}</td>
            <td>${name}</td>
        </tr>
        `;
    });
    $("#ingredient").html(result);
}
// function to display minus button, input value, and add button in html where id="input".
function input(member) {
    var result = "";
    result += `
    
    <div class="col-md-3 col-sm-2"></div>
    <div class="col-md-3"col-sm-4>Number of person</div>
    <div class="col-md-3 col-sm-6 ">
        <form action="#">
            <div class="input-group mb-3">
                <div class="input-group-prepend">
                    <button class="btn btn-danger" id="minus" type="button">-</button>
                </div>
                <input type="text" id="members" width="10px" value="${member}" min="1" max="15" disabled
                    class="form-control text-center">
                <div class="input-group-append">
                    <button class="btn btn-primary" id="plus" type="button">+</button>
                </div>
            </div>
        </form>
    </div>
    <div class="col-md-3 col-sm-1"></div>
    `; 
    $("#input").html(result);
   //if clik on minus button input value minus one
    $("#minus").on('click', function () {
        var member = parseInt($("#members").val());
        descrease(member);

    })
     //if clik on plus button input value add one more
    $("#plus").on("click", function () {
        var member = parseInt($("#members").val());
        increase(member);
    });
}
// function to increase member and update data in ingredient
function increase(member) {
    var add = parseInt(member) + 1;
    if(add <= 15) {
        $("#members").val(add);
        updateIngredient($("#members").val());
    }
}
// function to descrease member and update data in ingredient
function descrease(member) {
    var minus = parseInt(member) - 1;
    if(minus >= 1) {
        $("#members").val(minus);
        updateIngredient($("#members").val());
    }
}
// function to get each step 
function eachStep(instruction) {
    var result = "";
    var step = instruction.split('<step>');
    for (var i = 1; i < step.length; i++) {
        result += `
        <h6 id="eachstep">Step ${i}</h6>
        <p>${step[i]}</p>
        `;
    }
    $('#instruction').html(result);
}
// function to update ingrendient
function updateIngredient(person) {
    var newQuanlity;
    var result = "";
    quantity.ingredients.forEach(element => {
        var {quantity} = element;
        newQuanlity = quantity / oldGuest * person;
        result += `
        <tr>
            <td><img src="${element.iconUrl}" class="img-fluid" width="60px"></td>
            <td><span class="text-danger">${newQuanlity}</span> ${element.unit[0]}</td>
            <td>${element.name}</td>
        </tr>
    `;
    });
     $("#ingredient").html(result);
}
