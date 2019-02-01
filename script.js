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



window.onload = function () {
    for (let product of order_data){

        var container = document.createElement('ul'); // do powtorzenia
        var parent = document.getElementById('order-cart');
        parent.appendChild(container); // do powtorzenia 

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
        product_name.innerHTML = product.name;
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
        color_div.appendChild(select_color);
        
        for (let option of product.options[0].values){
            
            var option_select = document.createElement('option');
            option_select.value = option.name;
            option_select.innerHTML = option.name;
            select_color.appendChild(option_select);
            
            option_select.setAttribute("data-pricemodifier", option.priceModifier);
        }
        
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
        capacity_div.appendChild(select_capacity);
        
        
        for (let option of product.options[1].values){
            
            var option_select = document.createElement('option');
            option_select.value = option.name;
            option_select.innerHTML = option.name;
            select_capacity.appendChild(option_select);
            option_select.setAttribute("data-pricemodifier", option.priceModifier);
            
        }

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
        quantity_div.appendChild(select_quantity);
        
        
        for (i=1; i<11; i++) {
            var option_select = document.createElement('option');
            option_select.value = i;
            option_select.innerHTML = i;
            select_quantity.appendChild(option_select);
            option_select.setAttribute("data-pricemodifier", i);
        }

        //price div
        var price_div = document.createElement('div');
        price_div.classList.add('price-box');
        container.appendChild(price_div);
        var price_label = document.createElement("li");
        price_label.classList.add("small-screen-label");
        price_label.classList.add("price");
        price_div.appendChild(price_label);
        price_label.innerHTML = "Price";
        
        
        var color_price_mod = select_color.options[select_color.selectedIndex].dataset.pricemodifier;
        var capacity_price_mod = select_capacity.options[select_color.selectedIndex].dataset.pricemodifier;
        var quantity_price_mod = select_quantity.options[select_quantity.selectedIndex].dataset.pricemodifier;
        var basic_price = product.price;
        
        var product_total_price = (basic_price+capacity_price_mod+color_price_mod)*quantity_price_mod;
        
        console.log(product_total_price);
        console.log("$ "+product_total_price.toFixed(2));
        
        
        
        var product_price = document.createElement("p");
        product_price.classList.add("product_price");
        product_price.innerHTML = ("$ "+product_total_price.toFixed(2));
        price_div.appendChild(product_price);
        
        
        //line 
        var line = document.createElement('div');
        line.classList.add('line');
        parent.appendChild(line);
        
        
        
        
        
        
    }
    
};




