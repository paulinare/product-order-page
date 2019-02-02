var order_data = [
	{
		"id": 1,
		"name": "iPhone 8",
		"price": 99.99,
		"oldPrice": 599.00,
		"options": [
			{
				"id": 100,
				"name": "Color",
				"values": [
					{
						"id": 1000,
						"name": "Silver",
						"priceModifier": 0
					},
					{
						"id": 1001,
						"name": "Space Gray",
						"priceModifier": 0
					},
					{
						"id": 1002,
						"name": "Gold",
						"priceModifier": 0
					}
				]
			},
			{
				"id": 101,
				"name": "Capacity",
				"values": [
					{
						"id": 1100,
						"name": "64 GB",
						"priceModifier": 0
					},
					{
						"id": 1101,
						"name": "256 GB",
						"priceModifier": 40.00
					}
				]
			}
		]
	},
	{
		"id": 2,
		"name": "iPhone 8 Plus",
		"price": 129.99,
		"oldPrice": 699.00,
		"options": [
			{
				"id": 100,
				"name": "Color",
				"values": [
					{
						"id": 1000,
						"name": "Silver",
						"priceModifier": 0
					},
					{
						"id": 1001,
						"name": "Space Gray",
						"priceModifier": 0
					},
					{
						"id": 1002,
						"name": "Gold",
						"priceModifier": 0
					},
					{
						"id": 1003,
						"name": "Red",
						"priceModifier": 10.00
					}
				]
			},
			{
				"id": 101,
				"name": "Capacity",
				"values": [
					{
						"id": 1100,
						"name": "64 GB",
						"priceModifier": 0
					},
					{
						"id": 1101,
						"name": "256 GB",
						"priceModifier": 40.00
					}
				]
			}
		]
	}
];




function showProduct() {
    for(let prod of order_data) {
        product_details.set_product(prod);
        product_details.one_order_create();
    }
    //total price
        var total_price = document.createElement('p');
        total_price.innerHTML = "Total price: ";
        total_price.setAttribute('id', 'total_price');
        var parent = document.getElementById('order-cart');
        parent.appendChild(total_price);
        product_details.count_total_price();
    
    //document.getElementById('sumbit-form-btn').addEventListener('click', function(){product_details.set_summary()});
    
    
}


var product_details = {
    
    product: {},
    
    order_summary : {},
    
    set_product: function(prod) {
        this.product = prod;
    },
    
    one_order_create: function() {
        var parent = document.getElementById('order-cart');
        
        var line = document.createElement('div');
        line.classList.add('line');
        
        var container = document.createElement('ul');
        parent.appendChild(container); 
        
        //product name div
        var product_div = document.createElement('div');
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
        
        //color div
        var color_div = document.createElement("div");
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
        select_color.addEventListener("change", this.set_price);        
        
        color_div.appendChild(select_color);
        this.create_selection_options(select_color, 0);
        
        
        //capacity div
        var capacity_div = document.createElement("div");
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
        select_capacity.addEventListener("change", this.set_price);
        capacity_div.appendChild(select_capacity);
        this.create_selection_options(select_capacity, 1);
        
        //quantity div
        var quantity_div = document.createElement('div');
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
        select_quantity.addEventListener("change", this.set_price);
        quantity_div.appendChild(select_quantity);
        this.create_quantity_selection_option(select_quantity);
        //price div
        var price_div = document.createElement('div');
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
        this.set_price;
        
        
        parent.appendChild(line);
        
        
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
    
    create_quantity_selection_option: function (select_quantity) {
        for (i=1; i<11; i++) {
            var option_select = document.createElement('option');
            option_select.value = i;
            option_select.innerHTML = i;
            select_quantity.appendChild(option_select);
            option_select.setAttribute("data-pricemodifier", i);
        }
    },
    
    set_price: function() {
        var id_val = this.getAttribute("class");
        var color_element = document.getElementById(id_val+"_color_select");
        var color_price_mod = color_element.options[color_element.selectedIndex].dataset.pricemodifier;
        color_price_mod = parseFloat(color_price_mod);//zamiana na liczba
        
        var capacity_element = document.getElementById(id_val+"_capacity_select");
        var capacity_price_mod = capacity_element.options[capacity_element.selectedIndex].dataset.pricemodifier;
        capacity_price_mod = parseFloat(capacity_price_mod)
        
        var quantity_element = document.getElementById(id_val+"_quantity_select");
        var quantity_price_mod = quantity_element.options[quantity_element.selectedIndex].dataset.pricemodifier;
        
        var basic_price = document.getElementById(id_val+"_price").dataset.basicprice;
        basic_price = parseFloat(basic_price)
        var price = ((basic_price+color_price_mod+capacity_price_mod)*quantity_price_mod).toFixed(2);

        document.getElementById(id_val+"_price").innerHTML = "$ "+price;
        
        product_details.count_total_price();
    },
    
    
    count_total_price: function () {
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




window.onload = function () {
    showProduct();
};
