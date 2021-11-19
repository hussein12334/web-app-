

let app = new Vue({
    el: "#app",
    data: {
        showLessons: true,
        lessons: lessons,
        details:{
            firstName: '',
            phoneNum: '',
        },
        //Checkout
        cart: []
    },

    computed: {
        cartLessonCount(){
            return this.cart.length || '';
        },
        sortBySubject() {
            function compare(a, b) {
                if (a.subject > b.subject) return 1;
                if (a.subject < b.subject) return -1;
                return 0;
            }
            return this.lessons.sort(compare);
        },
    },
    methods: {
        //displays the main page if true, if false displays the checkout
        showCheckout() {
            this.showLessons = this.showLessons ? false : true; 
        },
        //adds lessons into the carts
        addToCart(lessons) {
            this.cart.push( lessons );
        },
        //checks the amount each lesson has left to add to cart 
        canAddToCart(lessons) {
            return lessons.capacity > this.cartCount(lessons); 

        },  
        removeFromCart(lessons) {
            this.cart.pop(lessons);
           
        },
        //number of lessons in the cart
        cartCount(lessons){
            let count = 0;
            for (var i = 0; i < this.cart.length; i++) {
              if (this.cart[i] === lessons) {
                count++;
              }
            }
            return count;
        },    
        validation(){
            if (this.details.firstName == /^[A-Za-z]+$/ && this.details.phoneNum == /^[-+]?[0-9]+$/ ){
                
                alert("inccorect try again");
            }
            else {
                
                alert("order has been successful");
                return showLessons = true;
            }
        }, 
    },
});
