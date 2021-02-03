const express = require("express");
var request = require("request");
var cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());

app.get("/search", (req, res) => {
  request(
   // JavaScript object containing the parse JSON
    "https://api.mercadolibre.com/sites/MLA/search?q=" +req.query.s +"#json",
    function (error, response, body) {
		
      if (!error && response.statusCode == 200) {
        var parsedBody = JSON.parse(body);

        var newObject = parsedBody["results"].slice(0, 4);
        var objetoFinal = [];
        var returningObject = {};
        var numero = 0;
		
		
        newObject.forEach((element, index) => {
			
          returningObject = {
            author: {
              name: "name",
              lastname: "lastname",
            },
		  categories: ["string", "string", "string"],
            items: [
              {
                id: element.id,
                title: element.title,
                picture: element.thumbnail,
                condition: element.condition,
				address: element.address.state_name,
                free_shipping: element.shipping.free_shipping,
                price: {
                  currency: "",
                  amount: element.price,
                  decimals: "",
                },
              },
            ],
          };
          objetoFinal.push(returningObject);
        });
      
        res.send(objetoFinal);
      }
    }
  );
});
var description;
var objetoFinal = [];
app.get("/items", (req, res) => {
	 request(
    "https://api.mercadolibre.com/items/"+req.query.productId+"/description",
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var parsedBody = JSON.parse(body);
        description= parsedBody.plain_text;
		
        
      }
    }
  );
  
  request(
    "https://api.mercadolibre.com/items/"+ req.query.productId,
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var parsedBody = JSON.parse(body);
        
        var returningObject = {
			author: {
              name: "name",
              lastname: "lastname",
            },
			item : {
				id: parsedBody.id,
				title: parsedBody.title,
				price: {
					currency: parsedBody.currency_id,
					amount: parsedBody.price,
					decimals : ""
				},
				picture: parsedBody.pictures[0].url,
				condition : parsedBody.condition,
				free_shipping: parsedBody.shipping.free_shipping,
				sold_quantity : parsedBody.sold_quantity,
				description: description
				
			}
		};
		objetoFinal[0] = returningObject;
       
         res.send(objetoFinal);
        
      }
    }
  );
 
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
