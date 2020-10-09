let Item = function(item){
    this.category = item.category;
    this.name = item.name;
    this.display = item.display;
    this.count = item.count == undefined ? 1 : item.count;
    this.supply = item.supply;
    this.image = item.image;
    this.price = parseFloat(item.price);
    this.weight = parseFloat(item.weight);
    this.discount = parseInt(item.discount);
}

Item.prototype.cost = function (){
    return this.count * this.weight * (this.price - (this.discount * 0.1 * this.price))
}
Item.prototype.addProduct = function (){
    this.count++;
    this.supply--;
}
Item.prototype.removeProduct = function (){
    this.count--;
    this.supply++;
}
Item.prototype.getSupply = function (){
    return this.supply - this.count;
}

module.exports = Item;