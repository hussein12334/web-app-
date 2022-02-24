let app = new Vue({
    el: "#app",
    data: {
        showLessons: true,
        search: '',
        lessons: [],
        details:{
            firstName: '',
            phoneNum: '',
        },
        //Checkout
        cart: [],
        checkOuts: [] 
    }, created: function() {
        // replace the URL to your Heroku app and route
        fetch('https://webappcw.herokuapp.com/collection/Lessons').then(
        function (response) {
        response.json().then(
        function (data) {
        app.lessons = data;
        });
        })
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
        itemIds() {
            let ids = [];
            for (i = 0; i < this.lessons.length; i++) {
                ids.push(this.lessons[i].id);
            }
            return ids;
        },
        cartIds() {
            let cartId = this.itemIds;
            let result = [];
            for (i = 0; i < cartId.length; i++) {
                let count = 0;
                for (j = 0; j < this.cart.length; j++) {
                    if (cartId[i] === this.cart[j]) {
                        count++;
                    }
                }
                result.push({
                    id: cartId[i],
                    cartCounter: count
                });
            }
            return result;
        },

    },
    methods: {
        //displays the main page if true, if false displays the checkout
        showCheckout() {
            this.showLessons = this.showLessons ? false : true; 
        },  
        addToCart(id) {
            this.cart.push(id)
            let index = this.lessons.findIndex((obj => obj.id == id));
            this.lessons[index].capacity = this.lessons[index].capacity - 1;
            this.checkOuts.push({lessonID: id, spaces: 1});
        },
        canAddToCart(lessons) {
            let spaces = lessons.capacity;
            return spaces > 0;
        },
        removeFromCart(id) {
            const cartIndex = this.cart.indexOf(id);
            const checkIndex = (this.checkOuts.indexOf(id) == this.cartIndex);
            const lessonsIndex = this.lessons.findIndex((obj => obj.id == id));
            //const checklessonIndex = this.lessons.findIndex((obj => obj.id == id));
            if (cartIndex > -1 ) {
                this.cart.splice(cartIndex, 1);
                this.checkOuts.splice(checkIndex, 1);
                this.lessons[lessonsIndex].capacity = this.lessons[lessonsIndex].capacity + 1;
            }
            if (this.cart.length === 0) {
                this.showCheckout();
            }
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
        searchBar: function () {
            
            fetch('https://webappcw.herokuapp.com/collection/Lessons/' + this.search).then(
            function (response) {
                response.json().then(
                    function (data) {
                        console.log(data);
                        app.lessons = data;
                        console.log(app.lessons);
                    });
            })
        },
        validation(){
            if (this.details.firstName == /^[A-Za-z]+$/ && this.details.phoneNum == /^[-+]?[0-9]+$/ ){
                
                alert("inccorect try again");
            }
            else {
                fetch('https://webappcw.herokuapp.com/collection/Orders', {
                    method: 'POST', // set the HTTP method as 'POST'
                    headers: {
                        'Content-Type': 'application/json', // set the data type as JSON
                    },
                    body: JSON.stringify({ name: this.details.firstName, phone: this.details.phoneNum, lessons: this.checkOuts}), // need to stringify the JSON object
                })
                    .then(response => response.json())
                    .then(responseJSON => {
                        console.log('Success:', responseJSON);
                    });
                alert("order has been successful");
                this.cart = [];
                this.showCheckout();
            }
        }, 
    },
});
