function Hamburger(size, stuffing) {
    try {
        if (!size || !stuffing) {
            throw new HamburgerException('one of properties are missing')
        }
        if (size !== Hamburger.SIZE_SMALL && size !== Hamburger.SIZE_LARGE) {
            throw new HamburgerException('Please enter proper size')
        }
        if (stuffing !== Hamburger.STUFFING_CHEESE && stuffing !== Hamburger.STUFFING_SALAD && stuffing !== Hamburger.STUFFING_POTATO) {
            throw new HamburgerException('Please enter proper stuffing')
        } else {
            this.size = size;
            this.stuffing = stuffing;
            this.toppings = [];
        }
    } catch (e) {
        console.log(e.message)
    }
}


Hamburger.SIZE_SMALL = {price: 50, calories: 20};
Hamburger.SIZE_LARGE = {price: 100, calories: 40};
Hamburger.STUFFING_CHEESE = {price: 10, calories: 20};
Hamburger.STUFFING_SALAD = {price: 20, calories: 5};
Hamburger.STUFFING_POTATO = {price: 15, calories: 10};
Hamburger.TOPPING_MAYO = {price: 15, calories: 0};
Hamburger.TOPPING_SPICE = {price: 20, calories: 5};


Hamburger.prototype.addTopping = function (topping) {
    try {
        if (!topping) {
            throw new HamburgerException('no stuffing specified')
        } else if (this.toppings.includes(topping)) {
            throw new HamburgerException('topping already exists')
        } else {
            this.toppings.push(topping);
        }
    } catch (e) {
        console.log(e.message)
    }
};

Hamburger.prototype.removeTopping = function (topping) {
    try {
        if (!this.toppings.includes(topping)) {
            throw new HamburgerException('no topping found')
        } else if (this.toppings.includes(topping)) {
            this.toppings.splice(this.toppings.indexOf(topping), 1);
        }
    } catch (e) {
        console.log(e.message)
    }
};


Hamburger.prototype.getToppings = function () {
    return this.toppings;
};


Hamburger.prototype.getSize = function () {
    return this.size;
};


Hamburger.prototype.getStuffing = function () {
    return this.stuffing;
};

Hamburger.prototype.calculatePrice = function () {
    return Object.values(this).reduce(function (totalPrice, arrayObj) {
        if (Array.isArray(arrayObj)) {
            arrayObj.forEach(function (obj) {
                totalPrice += obj.price;
            });
            return totalPrice
        }
        totalPrice += arrayObj.price;
        return totalPrice
    }, 0);
};

Hamburger.prototype.calculateCalories = function () {
    return Object.values(this).reduce(function (totalCalories, arrayObj) {
        if (Array.isArray(arrayObj)) {
            arrayObj.forEach(function (obj) {
                totalCalories += obj.calories;
            });
            return totalCalories
        }
        totalCalories += arrayObj.calories;
        return totalCalories
    }, 0);
};


function HamburgerException(message) {
    this.message = message;
};


let hamburger1 = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE); //нормальный бургер
let roll = new Hamburger('fish', 'rice'); // не нормальный бургер

console.log(hamburger1); // смотрим что в гамбургере
console.log(roll); // посмотрим что с роллом

hamburger1.addTopping(Hamburger.TOPPING_MAYO); //добавили одну
hamburger1.addTopping(Hamburger.TOPPING_SPICE); //добавили вторую
hamburger1.addTopping(Hamburger.TOPPING_MAYO); // попробовали еще одну первую

console.log('Цена :' + hamburger1.calculatePrice());
console.log('Калорий:' + hamburger1.calculateCalories());