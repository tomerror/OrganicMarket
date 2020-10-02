import * as actionsTypes from '../actions';

const initialState = {
    amount: 0,
    count: 0,
    items: [],
    delivery: 50
}


// push is bad practice. instead we should create a new copy by concat and not rely on the original as push does.
const reducer = (state = initialState, action) => {
    let updateCart = [].concat(state.items);
    let amount = 0
    switch (action.type) {
        case actionsTypes.INIT_CART:
            return {
                amount: 0,
                count: 0,
                items: [],
                delivery: 50
            }
        case actionsTypes.ADD_PRODUCT_TO_CART:
            let addProduct = action.value;
            if (!state.items.find(x => x.name == addProduct.name)) {
                let setProduct = {
                    "category": addProduct.type,
                    "name": addProduct.name,
                    "display": addProduct.display,
                    "count": 1,
                    "supply": addProduct.supply - 1,
                    "details": {
                        "img": addProduct.img,
                        "price": parseFloat(addProduct.price),
                        "weight": parseFloat(addProduct.weight),
                        "discount": addProduct.discount
                    }
                }
                updateCart.push(setProduct)
            }
            else {
                updateCart.filter(x => x.name == addProduct.name).map(x => { x.count++; x.supply-- })
            }
            amount = parseFloat((state.amount + addProduct.weight * (addProduct.price - addProduct.discount * 0.1 * addProduct.price)).toFixed(2))
            return {
                amount: amount,
                count: state.count + 1,
                items: updateCart,
                delivery: state.delivery
            }

        case actionsTypes.REMOVE_PRODUCT_FROM_CART:
            let removeProduct = action.value;
            let idxProduct = updateCart.findIndex(x => x.name == removeProduct.name)

            if (idxProduct != -1) {
                if (updateCart[idxProduct].count > 1) {
                    updateCart[idxProduct].count -= 1;
                    updateCart[idxProduct].supply += 1;
                } else {
                    updateCart.splice(idxProduct, 1);
                }
                amount = parseFloat((state.amount - removeProduct.weight * (removeProduct.price - removeProduct.discount * 0.1 * removeProduct.price)).toFixed(2))
                return {
                    amount: amount,
                    count: state.count - 1,
                    items: updateCart,
                    delivery: state.delivery
                }
            }
        case actionsTypes.INC_PRODUCT_IN_CART:
            let inc_product = action.value;
            updateCart.filter(x => x.name == inc_product.item.name).map(x => { x.count++; x.supply-- })
            amount = parseFloat((state.amount + inc_product.item.details.weight * (inc_product.item.details.price)).toFixed(2))
            return {
                amount: amount,
                count: state.count + 1,
                items: updateCart,
                delivery: state.delivery
            }
        case actionsTypes.DEC_PRODUCT_IN_CART:
            let dec_product = action.value;
            let idx = updateCart.findIndex(x => x.name == dec_product.item.name)
            if (idx != -1) {
                if (updateCart[idx].count > 1) {
                    updateCart[idx].count -= 1;
                    updateCart[idx].supply += 1;
                } else {
                    updateCart.splice(idx, 1);
                }
                amount = parseFloat((state.amount - dec_product.item.details.weight * (dec_product.item.details.price - dec_product.item.details.discount * 0.1 * dec_product.item.details.price)).toFixed(2))
                return {
                    amount: amount,
                    count: state.count - 1,
                    items: updateCart,
                    delivery: state.delivery
                }
            }
    }
    return state;
}

export default reducer;