var order_data = [];
$.getJSON( "https://paulinare.github.io/product-order-page/products.json", function( json ) {
    for (var i = 0; i<json.length; i++) {
     order_data.push(json[i]);
     
    }
    init();
});

function init() {    
    for (let prod of order_data) {                                        // showing order detail section 
        product_details.set_product(prod);
        product_details.display_one_product();
    }
    product_details.display_total_price();
    order_summary.init_products();                                     // calling function to set initial product parameter  
}       

var product_details = {
    
    product: {},
    
    set_product: function(prod) {
        this.product = prod;
    },
    
    display_one_product: function() {
        var parent = document.getElementById('order-cart');
        var line = document.createElement('div');
        line.classList.add('line');
        var container = document.createElement('ul');
        parent.appendChild(container); 
        var product_div = document.createElement('div');                //product name div
        product_div.classList.add("product_name_box");
        container.appendChild(product_div);
        var product_label = document.createElement('li');
        product_label.innerHTML = "Product";
        product_div.appendChild(product_label);
        product_label.classList.add("small-screen-label");
        product_label.classList.add("product");
        var product_name = document.createElement('p');
        product_name.classList.add("product-name");  
        product_name.setAttribute('id',this.product.id+"_product_select");
        product_name.innerHTML = this.product.name;
        product_div.appendChild(product_name);
        var color_div = document.createElement("div");                   //color div
        color_div.classList.add("color-box");
        container.appendChild(color_div);
        var color_label = document.createElement('li');
        color_label.innerHTML = "Color";
        color_div.appendChild(color_label);
        color_label.classList.add("color");
        color_label.classList.add("small-screen-label");
        var select_color = document.createElement("select");
        select_color.name = "color";
        select_color.classList.add(this.product.id);
        select_color.setAttribute('id',this.product.id+"_color_select");
        select_color.addEventListener("change", this.count_and_show_price);    
        select_color.addEventListener("change", order_summary.change_color);
        color_div.appendChild(select_color);
        this.create_selection_options(select_color, 0);
        var capacity_div = document.createElement("div");               //capacity div
        capacity_div.classList.add("capacity-box");
        container.appendChild(capacity_div);
        var capacity_label = document.createElement('li');
        capacity_label.innerHTML = "Capacity";
        capacity_div.appendChild(capacity_label);
        capacity_label.classList.add("capacity");
        capacity_label.classList.add("small-screen-label");
        var select_capacity = document.createElement("select");
        select_capacity.name = "capacity";
        select_capacity.classList.add(this.product.id);
        select_capacity.setAttribute('id', this.product.id+'_capacity_select')
        select_capacity.addEventListener("change", this.count_and_show_price);
        select_capacity.addEventListener("change", order_summary.change_capacity);
        capacity_div.appendChild(select_capacity);
        this.create_selection_options(select_capacity, 1);
        var quantity_div = document.createElement('div');               //quantity div
        quantity_div.classList.add('quantity-box');
        container.appendChild(quantity_div);
        var quantity_label = document.createElement('li');
        quantity_label.innerHTML = "Quantity";
        quantity_div.appendChild(quantity_label);
        quantity_label.classList.add("quantity");
        quantity_label.classList.add("small-screen-label");
        var select_quantity = document.createElement("select");
        select_quantity.name = "quantity";
        select_quantity.classList.add(this.product.id);
        select_quantity.setAttribute('id', this.product.id+'_quantity_select')
        select_quantity.addEventListener("change", this.count_and_show_price);
        select_quantity.addEventListener("change", order_summary.change_quantity);
        quantity_div.appendChild(select_quantity);
        this.create_selection_options(select_quantity, 2);
        var price_div = document.createElement('div');                  //price div
        price_div.classList.add('price-box');
        container.appendChild(price_div);
        var price_label = document.createElement("li");
        price_label.classList.add("small-screen-label");
        price_label.classList.add("price");
        price_div.appendChild(price_label);
        price_label.innerHTML = "Price";
        var product_price = document.createElement("p");
        product_price.classList.add("product_price");
        product_price.setAttribute("data-basicprice", this.product.price);
        product_price.innerHTML = "$ "+this.product.price;
        product_price.setAttribute("id",this.product.id+"_price");
        price_div.appendChild(product_price);
        this.count_and_show_price;
        parent.appendChild(line);
    },
    
    display_total_price: function () {
        var total_price = document.createElement('p');
        total_price.innerHTML = "Total price: ";
        total_price.setAttribute('id', 'total_price');
        var parent = document.getElementById('order-cart');
        parent.appendChild(total_price);
        product_details.count_and_show_total_price();
    },
    
    create_selection_options: function (select_parameter, i) { // i => parameter index from json
        for (let option of this.product.options[i].values){
            var option_select = document.createElement('option');
            option_select.value = option.name;
            option_select.innerHTML = option.name;
            select_parameter.appendChild(option_select);
            option_select.setAttribute("data-pricemodifier", option.priceModifier);
        }
    },
    
    count_and_show_price: function() {
        var id_val = this.getAttribute("class");
        var color_element = document.getElementById(id_val+"_color_select");
        var color_price_mod = color_element.options[color_element.selectedIndex].dataset.pricemodifier;
        color_price_mod = parseFloat(color_price_mod);
        var capacity_element = document.getElementById(id_val+"_capacity_select");
        var capacity_price_mod = capacity_element.options[capacity_element.selectedIndex].dataset.pricemodifier;
        capacity_price_mod = parseFloat(capacity_price_mod)
        var quantity_element = document.getElementById(id_val+"_quantity_select");
        var quantity_price_mod = quantity_element.options[quantity_element.selectedIndex].dataset.pricemodifier;
        var basic_price = document.getElementById(id_val+"_price").dataset.basicprice;
        basic_price = parseFloat(basic_price)
        var price = ((basic_price+color_price_mod+capacity_price_mod)*quantity_price_mod).toFixed(2);
        document.getElementById(id_val+"_price").innerHTML = "$ "+price;
        product_details.count_and_show_total_price();
        order_summary.change_amount(id_val-1, basic_price, color_price_mod, capacity_price_mod, quantity_price_mod);
    },
   
    count_and_show_total_price: function () {
        var subtotal = 0;
        for (i=1; i<=order_data.length; i++) {
            var part_price = document.getElementById(i+'_price').innerHTML;
            part_price = parseFloat(part_price.slice(2,20));
            subtotal += part_price;
        }
        subtotal = subtotal.toFixed(2);
        document.getElementById("total_price").innerHTML = "Total price: <span>$ "+subtotal+"</span>";
    }
}

var payment_form = {
    payment_type: "other",

    highlight_required_fields: function () {
       var form_inputs = ["first_name_input", "surname_input", "email_input", 
                               "street_input", "house_number_input", "city_input", 
                               "postcode_input"];
        for (var i = 0; i < form_inputs.length; i++){
                if (!document.getElementById(form_inputs[i]).checkValidity()) {
                   document.getElementById(form_inputs[i]).style.borderColor = "#d47b1c";
                }
            else 
                document.getElementById(form_inputs[i]).style.borderColor = "white";
            }
    },
   
    check_form_validity: function () {
        var isValid = false;
        if(this.payment_type=="paypal"){
            isValid = document.getElementById("email_input").checkValidity();
        }
        else if (this.payment_type=="other") {
            isValid = true;
            var form_inputs = ["first_name_input", "surname_input", "email_input", 
                               "street_input", "house_number_input", "city_input", 
                               "postcode_input"];
            for (var i = 0; i < form_inputs.length; i++){
                if (!document.getElementById(form_inputs[i]).checkValidity()) 
                    isValid = false;
            }
        }
        else {
            console.log("Error");
        }
        if (isValid) {
            order_summary.set_user_data(); // TO WRITE
            order_summary.dispatch_order();
            document.getElementById('required_fields_alert').style.visibility="hidden";
            this.highlight_required_fields();
        }
        else {
            document.getElementById('required_fields_alert').style.visibility="visible";
            this.highlight_required_fields();
        }
    },
    
    change_payment_type: function() {
        if (this.payment_type == "other") 
            this.payment_type = "paypal";
        else if (this.payment_type == "paypal")
            this.payment_type = "other";
        this.change_fields_requirements(this.payment_type);
    },
    
    change_fields_requirements: function (payment_type) {
        var isRequired = false;
        if (payment_type=="other")
            isRequired = true;
        var required_fields = document.getElementsByClassName("input_text");
        var i=0;
        for (i=0; i<required_fields.length;i++){
            required_fields[i].required = isRequired;
        }
    }
};

var order_summary = {
    user: {},
    order: [],
    init_products: function() {                // setting initial product parameters
        for (let prod of order_data){ 
            var one_order = {};
            if (prod.name=="iPhone 8") {
                one_order.id = 1;
            }
            else if (prod.name == "iPhone 8 Plus") {
                one_order.id = 2;
            }
            one_order.options = [
                {
                    id: 100,                     //color
                    value: 1000        
                },
                {
                    id: 101,                     //capacity
                    value: 1100      
                },
                {
                    id: 102,                     //quantity
                    value: 1               
                }
            ];
            one_order.amount = prod.price; 
            this.order.push(one_order);
        }
    },
    
    change_amount: function (product_index, basic_price, color_mod, capacity_mod, quantity_mod) { // setting new price on change
        var amount = order_summary.order[product_index].amount;
        amount = (basic_price+color_mod+capacity_mod)*quantity_mod;
        amount= parseFloat(amount.toFixed(2));
        order_summary.order[product_index].amount = amount;
    },
    
    change_color: function () {                 // changing color - user choice
        var color = this.options[this.selectedIndex].value;
        switch (color) {                       
            case "Silver":
                color = 1000; 
                break;
            case "Space Gray":
                color = 1001;
                break;
            case "Gold": 
                color = 1002;
                break;
            case "Red":
                color = 1003;
                break;
            default:
                color = 1000; 
                break;
        }
        var product_index = this.getAttribute('class')-1; 
        order_summary.order[product_index].options[0].value = color;
    },
    
    change_capacity: function () {              // changing capacity - user choice
        var capacity = this.options[this.selectedIndex].value;
        switch (capacity) {                     
            case "64 GB":
                capacity = 1100;
                break;
            case "256 GB":
                capacity = 1101;
                break;
            default: 
                capacity = 1100;
                break;
        }
        var product_index = this.getAttribute('class')-1;
        order_summary.order[product_index].options[1].value = capacity;
    },
    
    
    change_quantity: function () {               // changing capacity - user choice
        var quantity = this.options[this.selectedIndex].value;
        switch (quantity) {
            case "1":
                quantity = 1200;
                break;
            case "2": 
                quantity = 1201;
                break;
            case "3": 
                quantity = 1202;
                break;
            case "4": 
                quantity = 1203;
                break;
            case "5": 
                quantity = 1204;
                break;
            default:  
                quatity = 1200;
                break;
        }
        var product_index = this.getAttribute('class')-1;
        order_summary.order[product_index].options[2].value = quantity;
   },
    
    
    set_user_data: function () {
        var user_data = {
            name: '',
            surname: '',
            email: '',
            address: {
                    street: '',
                    houseNumber: '',
                    city: '',
                    postcode: ''
            }
        };
        var temp_value = "";
        temp_value = document.getElementById("first_name_input").value;
        user_data.name = temp_value;
        temp_value = document.getElementById("surname_input").value;
        user_data.surname = temp_value;
        temp_value = document.getElementById("email_input").value;
        user_data.email = temp_value;
        temp_value = document.getElementById("street_input").value;
        user_data.address.street = temp_value;
        temp_value = document.getElementById("house_number_input").value;
        user_data.address.houseNumber = temp_value;
        temp_value = document.getElementById("city_input").value;
        user_data.address.city = temp_value;
        temp_value = document.getElementById("postcode_input").value;
        user_data.address.postcode = temp_value;
        this.user = user_data;
    },
    
    dispatch_order: function() {                                // collects data and creating JSON to log
        var order_pack = {};
        order_pack.user = this.user;
        order_pack.order = this.order;
        order_pack = JSON.stringify(order_pack);              
        console.log(order_pack);
        this.show_success(); 
    },
        
    show_success: function () {
        document.getElementById('sumbit-form-btn').disabled = true;
        document.getElementById('success_alert').style.visibility="visible";
    }
};

window.onload = function () {

};
