const Item = require ('./Item');

let Cart = function () {
    this.count = 0;
    this.items = [];
    this.delivery = 50;
}

Cart.prototype.assign = function (obj) {
    this.count = obj.count;
    this.delivery = obj.delivery;
    obj.items.forEach(item => {
        this.items.push(new Item(item))
    })
}

Cart.prototype.copy = function (obj) {
    this.count = obj.count;
    this.delivery = obj.delivery;
    this.items = [...obj.items];
}

Cart.prototype.amount = function () {
    return this.delivery + this.items.reduce((acc, current) => acc + current.cost(), 0)
}

Cart.prototype.addItem = function (item) {
    if (this.itemExists(item.display)) {
        this.items.map(i => i.display == item.display ? i.addProduct() : null)
    } else {
        let itemObj = new Item(item)
        this.items = [...this.items, itemObj];
    }
    this.count++;
}
Cart.prototype.removeItem = function (item) {
    this.items = this.items.reduce(function (acc, current) {
        if (current.display !== item.display) {
            acc.push(current)
        } else {
            if (current.count !== 1) {
                current.removeProduct()
                acc.push(current)
            }
        }
        return acc;
    }, [])
    this.count--;

}
Cart.prototype.itemExists = function (itemDisplay) {
    return this.items.find(i => i.display == itemDisplay)
}
Cart.prototype.incItem = function (item) {


}
Cart.prototype.decItem = function (item) {

}

module.exports = Cart;