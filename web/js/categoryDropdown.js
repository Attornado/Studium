function getMoreCategoriesHeader() {
    $.ajax("get-more-categories?startingIndex=" + categoryNumber, {
        method: "GET",
        dataType: "json",
        error: ev => alert("Request failed."),
        success: responseObject => {
            let $scrollDropdownContent = $(".scroll-dropdown-content"),
                newCategories = responseObject.newCategories;
            categoryNumber += newCategories.length;
            for(let category of newCategories)
                $scrollDropdownContent.append("<li>\n" +
                    "                           <form action=\"show-category-courses\">\n" +
                    "                               <input type=\"hidden\" name=\"categoryName\" value=\"" +
                                                    category.name+"\">\n" +
                    "                               <button id=\""+category.name+"\" class=\"categoryBtn\" " +
                    "                                   type=\"submit\">"+category.name+"</button>\n" +
                    "                           </form>\n" +
                    "                          </li>");
            $scrollDropdownContent.animate({scrollTop: $scrollDropdownContent.height()}, "300");
            checkCurrentCategory();
        }
    });
}

$(document).ready(function (){
    $(".moreCategoriesButton").on("click", ev => getMoreCategoriesHeader());
});