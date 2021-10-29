//rimozione asincrona dal carrello
function setRemoveFromCartButtonListeners(){
    //aggiunta asincrona al carrello
    $(".cartItem .delete-btn-form").on("click", ev => {
        let courseToRemoveFromCartId;
        //impediamo la sottomissione del form
        ev.preventDefault();
        //rimuoviamo dall'id del bottone tutti i caratteri non numeri
        courseToRemoveFromCartId = parseInt($(ev.target).siblings("input.courseId").val());
        //impostiamo un flag di rimozione sul cartItem da rimuovere
        $("#cartItem" + courseToRemoveFromCartId).addClass("toRemove");
        //gestiamo la risposta con AJAX
        $.ajax("remove-cart-async?async=true&removeCart=true&courseId=" + courseToRemoveFromCartId, {
            method: "GET",
            error: ev => alert("Request failed."),
            success: responseText => {
                let responseObject = JSON.parse(responseText), msg, type;
                msg = responseObject.message;
                type = responseObject.type;
                //se la risposta è negativa, non cancelliamo l'oggetto
                if(type == "error")
                    $(".cartItem.toRemove").removeClass("toRemove");
                //se la risposta è positiva, rimuoviamo l'oggetto dal carrello
                else {
                    let $cartItemToRemove = $(".cartItem.toRemove"), itemId;
                    itemId = parseInt($cartItemToRemove.find(".courseId").val());
                    $("#course" + itemId + "PurchaseInput").remove();
                    $cartItemToRemove.remove();
                    //se ci sono ancora oggetti nel carrello, aggiorniamo il prezzo totale
                    if($(".cartItem").length > 0)
                        $(".total-price .number").text(responseObject.newTotalPrice + "$");
                    else //altrimenti impostiamo inseriamo il testo alternativo
                        $("#purchaseFormContainer").replaceWith(
                            "<h5 class=\"substitutionText\">Sorry, your cart is empty :(</h5>");
                    //rimuoviamo l'input type=hidden dal form di purchase
                }
                //mostriamo il messaggio popup che viene nascosto dopo 5 secondi
                showPopupMessage(type, msg, 5);
            }
        });
    });
}

$(document).ready(ev => {
    //rimozione asincrona al carrello
    setRemoveFromCartButtonListeners();
});