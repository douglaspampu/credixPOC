export class Products {

    getProductByIds = (ids) => {
        return ids.map((id)=>{
            return {
                productId:`${id}`,
                productName:this.products[id-1].name,
                quantity:1,
                unitPriceCents:Math.floor(this.products[id-1].unit_price*100)
            }
        }).reduce((acc, product)=>{
            acc.products.push(product)
            acc.totalPrice += product.unitPriceCents*product.quantity
    
            return acc
        }, {products:[], totalPrice:0})
    }

    products =  [
        {
          "name": "Flour",
          "price": "$0.55 per pound",
          "image_url": "https://www.unlockfood.ca/EatRightOntario/media/Website-images-resized/All-about-grain-flours-resized.jpg",
          "discount":false,
          "tag":"flour",
          "unit_price":0.55
        },
        {
          "name": "Eggs",
          "price": "$1.50 per dozen",
          "image_url": "https://cdn.britannica.com/94/151894-050-F72A5317/Brown-eggs.jpg",
          "discount":false,
          "tag":"dairy",
          "unit_price":1.5
        },
        {
          "name": "Olive Oil",
          "price": "$9.00 per liter",
          "image_url": "https://www.womansworld.com/wp-content/uploads/2021/02/oil.jpg?w=953",
          "discount":false,
          "tag":"oil",
          "unit_price":9
        },
        {
          "name": "Salt",
          "price": "$0.93 per kilogram",
          "image_url": "https://c02.purpledshub.com/uploads/sites/41/2018/08/GettyImages-516450576-9d05e67.jpg?w=1029&webp=1",
          "discount":false,
          "tag":"salt",
          "unit_price":0.93
        },
        {
          "name": "Avocado Oil",
          "price": "$17.82 per liter",
          "image_url": "https://baskinnature.in/wp-content/uploads/2022/04/avocado-oil-on-rustic-wooden-table-royalty-free-image-1622142886.webp",
          "discount":false,
          "tag":"oil",
          "unit_price":17.82
        },
        {
          "name": "White Onion",
          "price": "$0.50 per pound",
          "image_url": "https://www.trustbasket.com/cdn/shop/articles/White_Onion.jpg?v=1680771892",
          "discount":false,
          "tag":"vegetable",
          "unit_price":0.5
        },
        {
          "name": "Carrots",
          "price": "$1.20 per pound",
          "image_url": "https://blog-images-1.pharmeasy.in/blog/production/wp-content/uploads/2021/04/23175719/shutterstock_440493100-1.jpg",
          "discount":false,
          "tag":"vegetable",
          "unit_price":1.2
        },
        {
          "name": "Snow Peas",
          "price": "$2.30 per pound",
          "image_url": "https://www.organicfacts.net/wp-content/uploads/snowpeas.jpg",
          "discount":false,
          "tag":"vegetable",
          "unit_price":2.3
        },
        {
          "name": "Asparagus",
          "price": "$3.50 per pound",
          "image_url": "https://themom100.com/wp-content/uploads/2020/01/how-to-make-roasted-asparagus-355-500x375.jpg",
          "discount":false,
          "tag":"vegetable",
          "unit_price":3.5
        },
        {
          "name": "Broccoli",
          "price": "$1.80 per pound",
          "image_url": "https://www.southernliving.com/thmb/I1hA4Zpl1bhw_b2tWWnx5UXajvY=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Roasted_Broccoli_012-632f5bb05b49406a8d301bd733ff4686.jpg",
          "discount":false,
          "tag":"vegetable",
          "unit_price":1.8
        },
        {
          "name": "Cabbage",
          "price": "$0.70 per pound",
          "image_url": "https://www.freshpoint.com/wp-content/uploads/2020/02/Freshpoint-green-cabbage.jpg",
          "discount":false,
          "tag":"vegetable",
          "unit_price":0.7
        },
        {
          "name": "Bell Pepper",
          "price": "$1.00 per pound",
          "image_url": "https://chefgourmetllc.com/wp-content/uploads/2022/01/BellPeppers-scaled-e1641949331299.jpg",
          "discount":false,
          "tag":"vegetable",
          "unit_price":1
        },
        {
          "name": "Fresh Ginger",
          "price": "$2.50 per pound",
          "image_url": "https://i5.walmartimages.com/seo/Fresh-Ginger-Root-Each_19b5b581-826c-4d16-9a51-4260b57d15a4.262bf459282bb9c9d6e73db2d0db0cfa.jpeg",
          "discount":false,
          "tag":"vegetable",
          "unit_price":2.5
        },
        {
          "name": "Garlic",
          "price": "$0.30 per bulb",
          "image_url": "https://img.taste.com.au/PRWBKAVs/taste/2007/10/garlic-182553-1.jpg",
          "discount":false,
          "tag":"vegetable",
          "unit_price":0.3
        },
        {
          "name": "Red Pepper Flakes",
          "price": "$0.80 per ounce",
          "image_url": "https://assets.epicurious.com/photos/632e0b863d8214ad950281ec/16:9/w_2560%2Cc_limit/ChiliFlakes_HERO_092222_40160.jpg",
          "discount":false,
          "tag":"season",
          "unit_price":0.8
        },
        {
          "name": "Brown Rice",
          "price": "$1.20 per pound",
          "image_url": "https://dainty.ca/wp-content/uploads/2021/07/brown-rice-recipe-1.jpg",
          "discount":false,
          "tag":"rice",
          "unit_price":1.2
        },
        {
          "name": "Corn Starch",
          "price": "$0.60 per pound",
          "image_url": "https://staticcookist.akamaized.net/wp-content/uploads/sites/22/2018/03/cornstarch-1024x683.jpg",
          "discount":false,
          "tag":"starch",
          "unit_price":0.6
        },
        {
          "name": "Strip Steaks",
          "price": "$12.00 per pound",
          "image_url": "https://embed.widencdn.net/img/beef/35tign8hsg/800x600px/Strip%20Loin%20Steak.psd?keep=c&u=7fueml",
          "discount":true,
          "tag":"meat",
          "unit_price":12
        },
        {
          "name": "Green Onion",
          "price": "$0.50 per bunch",
          "image_url": "https://i0.wp.com/farm2mountain.com/wp-content/uploads/2015/02/green-onion.png?fit=550%2C550&ssl=1",
          "discount":false,
          "tag":"vegetable",
          "unit_price":0.5   
        },
        {
          "name": "Brown Sugar",
          "price": "$1.00 per pound",
          "image_url": "https://www.allrecipes.com/thmb/DDBIQrQeoVvBiTCdmDu0eqhZbLA=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/230511_LightorDarkBrownSugar_ddmfs_4x3_2404-8bd53810c76d4ac1b2db0cd83e7fb88a.jpg",
          "discount":false,
          "tag":"sugar",
          "unit_price":1
        },
        {
          "name": "Pepper",
          "price": "$0.70 per ounce",
          "image_url": "https://www.foodrepublic.com/img/gallery/how-to-actually-cut-the-spice-out-of-a-pepper-hint-its-not-all-in-the-seeds/intro-1688680916.jpg",
          "discount":false,
          "tag":"season",
          "unit_price":0.7
        },
        {
          "name": "White Fish Fillet",
          "price": "$8.00 per pound",
          "image_url": "https://www.oceandelighttt.com/wp-content/uploads/2020/08/Premium-Whitefish-Fillet.jpg",
          "discount":true,
          "tag":"meat",
          "unit_price":8
        },
        {
          "name": "Black Pepper",
          "price": "$0.60 per ounce",
          "image_url": "https://tildaricelive.s3.eu-central-1.amazonaws.com/wp-content/uploads/2022/01/18143501/Black-pepper%402440x1200px.jpg",
          "discount":false,
          "tag":"season",
          "unit_price":0.6
        },
        {
          "name": "Cayenne Pepper",
          "price": "$0.80 per ounce",
          "image_url": "https://www.allrecipes.com/thmb/MXcg1fSxFsQQ_dEjLe9bUDvkEsc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Cayenne-Pepper-vs-Chili-Powder-3x2-1-9053e6b176074731ad78b596ec645b7d.png",
          "discount":false,
          "tag":"season",
          "unit_price":0.8
        },
        {
          "name": "Lemon",
          "price": "$0.50 per piece",
          "image_url": "https://st2.depositphotos.com/1043285/10203/i/450/depositphotos_102033354-stock-photo-fresh-lemon-isolated-on-white.jpg",
          "discount":false,
          "tag":"vegetable",
          "unit_price":0.5
        },
        {
          "name": "Parsley",
          "price": "$0.40 per bunch",
          "image_url": "https://cdn.britannica.com/63/193863-050-0EC30803/Parsley.jpg",
          "discount":false,
          "tag":"vegetable",
          "unit_price":0.4
        },
        {
          "name": "Pecans",
          "price": "$10.00 per pound",
          "image_url": "https://d2j6dbq0eux0bg.cloudfront.net/images/25943263/1339108672.jpg",
          "discount":false,
          "tag":"vegetable",
          "unit_price":10
        },
        {
          "name": "Sugar",
          "price": "$0.80 per pound",
          "image_url": "https://cdn.britannica.com/73/239573-131-63075292/sugar-cubes.jpg",
          "discount":false,
          "tag":"sugar",
          "unit_price":0.8
        },
        {
          "name": "Butter",
          "price": "$3.00 per pound",
          "image_url": "https://cdn.britannica.com/27/122027-050-EAA86783/Butter.jpg",
          "discount":true,
          "tag":"dairy",
          "unit_price":3
        },
        {
          "name": "Cream Cheese",
          "price": "$2.50 per 8-ounce block",
          "image_url": "https://www.biggerbolderbaking.com/wp-content/uploads/2021/02/Homemade-cream-cheese-Thumbnail-scaled.jpg",
          "discount":true,
          "tag":"dairy",
          "unit_price":2.5
        }
    ]
}