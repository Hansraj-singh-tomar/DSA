// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

// https://www.mongodb.com/docs/manual/core/aggregation-pipeline/

// The current database to use.
use('my-db');



// Find a document in a collection.
db.getCollection("customers").findOne({
});



db.customers.find()
db.sales.find()



// Q. How do i list all sales from store "A"?
db.sales.aggregate([
    {
        $match: {
          store: "A",
          quantity: 5,
          quantity: { $gt: 5 }
        }
    }
])



// Q. How do i sort all sales by date in descending order?
db.sales.aggregate([
    {
        $sort: {
            // date: -1
            price: 1
        }
    }
])



// Q. How can i get two most recent sales
db.sales.aggregate([
    {
        $sort: {
            price: -1,
        },
    },
    {
        $limit: 2,
    }
]);



// Q. What is the total quantity sold for each item in the sales collection?
db.sales.aggregate([
    {
        $group: {
            _id: "$item",
            totalQuantity: {
                $sum: "$quantity"
            }
        }
    },
])
// output - [{"_id": "apple", "totalQuantity": 13}, {"_id": "banana", "totalQuantity": 10}]



// Q. how can i get total quantity sold for each combination of store and category?
db.sales.aggregate([
    {
        $group: {
            _id: { store: "$store", category: "$category" },
            totalQuantity: { $sum: "$quantity" }
        }
    }
])
// output - [{"_id": {"store": "A", "category": "fruit"}, "totalQuantity": 8}, {"_id": {"store": "A", "category": "vegetable"}, "totalQuantity": 7}, {"_id": {"store": "B", "category": "fruit"}, "totalQuantity": 5}, {"_id": {"store": "B", "category": "vegetable"}, "totalQuantity": 8}]



// Q. How can i get total revenue for all the sales?
db.sales.aggregate([
    {
        $group: {
            _id: null,
            totalRevenue: {
                $sum: {
                    $multiply: ["$price", "$quantity"]
                }
            }
        }
    }
])
// Output - [{"_id": null, "totalRevenue": 282}]


// Q. How do i add new field called revenue(price * quantity) to each sale document?
db.sales.aggregate([
    {
        $addFields: {
            revenue: {
                $multiply: ["$price", "$quantity"]
            }
        }
    },
])
// output - [{"_id": ..., "item": "apple", "price": 2, "quantity": 5, "store": "A", "revenue": 10}, ...]


// Q. How can i find the average quantity sold per store 
db.sales.aggregate([
    {
        $group: {
            _id: "$store",
            averageQuantity: { $avg: "$quantity" }
        }
    }
]) 
// Output - [{"_id": "A", "averageQuantity": 10.333}, {"_id": "B", "averageQuantity": 9}]


// Q. How can i get total sales amount for store "A"?
db.sales.aggregate([
    {
        $match: {
            store: "A",
        },
    },
    {
        $group: {
            _id: null,
            totalSalesAmount: { $sum: "$price" },
        },
    },
]);
// Output - [{"_id": null, "totalSalesAmount": 20}]

// Q. How can i get the highest sale amount for each store?
db.sales.aggregate([
    {
        $group: {
            _id: "$store",
            highestSaleAmount: { $max: "$price" },
        },
    },
]);
// Output - [{"_id": "A", "highestSaleAmount": 7}, {"_id": "B", "highestSaleAmount": 6}]

// Q. How do i filter sales that happened on or after june 2, 2024?
db.sales.aggregate([
    {
        $match: {
            date: {
                $gte: new Date("2024-06-02"),
                $gte: ISODate("2024-06-02T11:00:00Z")
            },
        },
    },
])

// ----------------- Lookup(JOIN) -----------------

// Q. How do i show the sales with the customers name included?
db.sales.find()
db.customers.find()
db.customers.find({
    _id: ObjectId("693813c5dbbe78dbc85c627d")
})
// Ouuput - [{"_id": {"$oid": "693813c5dbbe78dbc85c627d"},"name": "John","age": 30,"loyalty": true}]


db.sales.aggregate([
    {
        $lookup: {
            from: "customers",
            localField: "customer_id",
            foreignField: "_id",
            as: "customerInfo"
        }
    }
])
// Output = [{...., "customerInfo": [{"_id": ..., "name": "John", "age": 30, "loyalty": true}, {...}]}]

// prev output customer is an array, how do i unwind it to get single object
db.sales.aggregate([
    {
        $lookup: {
          from: "customers",
          localField: "customer_id",
          foreignField: "_id",
          as: "customerInfo"
        }
    }, 
    {
        $unwind: "$customerInfo"
    }
])

// Output = [{...., "customerInfo": {"_id": ..., "name": "John", "age": 30, "loyalty": true}}]

// $project to select specific fields from sales documents and customerInfo
db.sales.aggregate([
    {
        $lookup: {
          from: "customers",
          localField: "customer_id",
          foreignField: "_id",
          as: "customerInfo"
        }
    },
    {
        $unwind: "$customerInfo"
    },
    {
        $project: {
            item: 1,
            price: 1,
            store: 1,
            customerName: "$customerInfo.name",
            customerLoyalty: "$customerInfo.loyalty"
            // _id: 0, // it will exclude _id field
        }
    }
])
// Output = [{"_id": {"$oid": "693813c5dbbe78dbc85c6282"},"item": "apple","price": 10,"store": "A","customerName": "John","customerLoyalty": true}, {....}]



// Q. How can i list sales where customer has loyalty is true?
db.sales.aggregate([
    {
        $lookup: {
            from: "customers",
            localField: "customer_id",
            foreignField: "_id",
            as: "customerInfo"
        }
    }, 
    {
        $unwind: "$customerInfo"
    }, 
    {
        $match: {
            "customerInfo.loyalty": true
        }
    },
    {
        $project: {
            item: 1,
            price: 1,
            CustomerLoyalty: "$customerInfo.loyalty",
            quantity: 1,
        }
    }
])
// Output = [{"_id": {"$oid": "693813c5dbbe78dbc85c6282"},"item": "apple","price": 10,"CustomerLoyalty": true}, {....}]



// How do i get total quantity sold grouped by whether the customer is loyal or not?
db.sales.aggregate([
    {
        $lookup: {
          from: "customers",
          localField: "customer_id",
          foreignField: "_id",
          as: "customerInfo"
        }
    },
    {
        $unwind: "$customerInfo"
    }, 
    {
        $group: {
          _id: "$customerInfo.loyalty",
            totalQuantityByLoyalty: {
                $sum: "$quantity"
            }
        }
    }
])
// Output = [{"_id": true, "totalQuantityByLoyalty": 31}, {"_id": false, "totalQuantityByLoyalty": 18}]



db.sales.aggregate([
    {
        $lookup: {
          from: "customers",
          localField: "customer_id",
          foreignField: "_id",
          as: "customerInfo"
        }
    },
    {
        $unwind: "$customerInfo"
    },
    {
        $match: {
            "customerInfo.loyalty": true
        }
    },
    {
        $group: {
          _id: "$customerInfo.loyalty",
            totalQuantityByLoyalty: { $sum: "$quantity" }
        }
    }
])
// [{"_id": true, "totalQuantityByLoyalty": 15}}] 


// How can i get total quantity sold per day?
db.sales.aggregate([
    {
        $group: {
            // _id: "$date", // this is also right
            _id: {
                $dateToString: {
                    format: "%Y-%m-%d", date: "$date"
                }
            },
            totalQuantityPerDay: { $sum: "$quantity" }
        }
    }
])
// Output - [{"_id": "2024-06-01", "totalQuantityPerDay": 25}, {"_id": "2024-06-02", "totalQuantityPerDay": 16}, {"_id": "2024-06-03", "totalQuantityPerDay": 8}]


// How can i bucket sales into quantity ranges: 0-5, 6-10, 11-20?
db.sales.find()

db.sales.aggregate([
    {
        $bucket: {
            groupBy: "$quantity",
            boundaries: [0, 5, 10, 20],
            default: "Other",
            output: {
                // totalSales: { $sum: 1 },
                // totalQuantity: { $sum: "$quantity" },
                count: { $sum: 1 },
                items: { $push: "$item" }
            }
        }
    },
])

// Output = [{"_id": 5, "count": 3, "items":["apple", "broccoli"]}, {"_id": 10, "count": 1, "items":["banana"]}, {"_id": "other", count: 1, "items":["carrot"]}]