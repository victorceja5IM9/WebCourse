function ShowHideForm(){
    var container = document.getElementsByClassName("form")[0];
    //console.log(container);
    if(container.style.visibility == "hidden")
        container.style.visibility = "visible";
    else
        container.style.visibility = "hidden";
}