class Hamburger {

    constructor(size, stuffing) {
        try {
            if (!size || !stuffing) {
                throw new HamburgerException('one of properties are missing')
            }
            if (size.id !== 'small' && size.id !== 'large') {
                throw new HamburgerException('Please enter proper size')
            }
            if (stuffing.id !== 'cheese' && stuffing.id !== 'salad' && stuffing.id !== 'potato') {
                throw new HamburgerException('Please enter proper stuffing')
            } else {
                this.size = size;
                this.stuffing = stuffing;
                this.toppings = [];
            }
        } catch (e) {
            console.log(e.message)
        }
    };

    addTopping = function (topping) {
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

    removeTopping = function (topping) {
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

    calculatePrice = function () {
        return Object.values(this).filter(el => typeof el !== "function").reduce((totalPrice, arrayObj) => {
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

    calculateCalories = function () {
        return Object.values(this).filter(el => typeof el !== "function").reduce((totalCalories, arrayObj) => {
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

    getToppings = function () {
        return this.toppings;
    };


    getSize = function () {
        return this.size;
    };


    getStuffing = function () {
        return this.stuffing;
    };
};

function HamburgerException(message) {
    this.message = message;
};

Hamburger.SIZE_SMALL = {price: 50, calories: 20, id: 'small'};
Hamburger.SIZE_LARGE = {price: 100, calories: 40, id: 'large'};
Hamburger.STUFFING_CHEESE = {price: 10, calories: 20, id: 'cheese'};
Hamburger.STUFFING_SALAD = {price: 20, calories: 5, id: 'salad'};
Hamburger.STUFFING_POTATO = {price: 15, calories: 10, id: 'potato'};
Hamburger.TOPPING_MAYO = {price: 15, calories: 0, id: 'mayo'};
Hamburger.TOPPING_SPICE = {price: 20, calories: 5, id: 'spice'};

let hamburger1 = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_SALAD);
hamburger1.addTopping(Hamburger.TOPPING_MAYO);
hamburger1.addTopping(Hamburger.TOPPING_MAYO);

console.log(hamburger1);
console.log('Размер:'+ hamburger1.size.id);
console.log('Цена :' + hamburger1.calculatePrice());
console.log('Калорий:' + hamburger1.calculateCalories());

