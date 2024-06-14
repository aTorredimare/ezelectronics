# Test Report

<The goal of this document is to explain how the application was tested, detailing how the test cases were defined and what they cover>

# Contents

- [Test Report](#test-report)
- [Contents](#contents)
- [Dependency graph](#dependency-graph)
- [Integration approach](#integration-approach)
- [Tests](#tests)
- [Coverage](#coverage)
  - [Coverage of FR](#coverage-of-fr)
  - [Coverage white box](#coverage-white-box)

# Dependency graph

     <report the here the dependency graph of EzElectronics>

# Integration approach

    <Write here the integration sequence you adopted, in general terms (top down, bottom up, mixed) and as sequence

    (ex: step1: unit A, step 2: unit A+B, step 3: unit A+B+C, etc)>

    <Some steps may  correspond to unit testing (ex step1 in ex above)>

    <One step will  correspond to API testing, or testing unit route.js>

# Tests

<in the table below list the test cases defined For each test report the object tested, the test level (API, integration, unit) and the technique used to define the test case (BB/ eq partitioning, BB/ boundary, WB/ statement coverage, etc)> <split the table if needed>



|       Test case name       |     Object(s) tested      |   Test level   |        Technique used         |
| :------------------------: | :-----------------------: | :------------: | :---------------------------: |               
| Insert new product succesfully | ProductController | Unit    | WB / equivalence partitioning |
| reject in DAOgetProductByModel | ProductController | Unit    | WB / boundary                 |
| Insert new product - no date   | ProductController | Unit    | WB / boundary                 |
| Insert existing product        | ProductController | Unit    | WB / boundary                 |
| change product quantity-should change the quantity of a product successfully | ProductController | Unit    | WB / equivalence partitioning |
| change product quantity-should throw DateError if the change date is after the current date | ProductController | Unit    | WB / boundary                 |
| change product quantity-should throw ProductNotFoundError if the product does not exist | ProductController | Unit    | WB / boundary                 |
| change product quantity-should throw ProposedDateTooEarlyError if the change date is before the product's arrivalDate |ProductController | Unit    | WB / boundary                 |
| should sell a product successfully | ProductController | Unit    | WB / equivalence partitioning |
| sell error in dao.sellProduct | ProductController | Unit    | WB / boundary                 |
| sell error in dao.getProductByModel | ProductController | Unit    | WB / boundary                 |
| sell -should throw ProductNotFoundError if the product does not exist | ProductController | Unit    | WB / boundary                 |
| should throw ProposedDateTooEarlyError if the selling date is before the product's arrivalDate | ProductController | Unit    | WB / boundary                 |
| should throw LowProductStockError if the product has no available quantity | ProductController | Unit    | WB / boundary                 |
| sell product-should throw EmptyProductStockError if the product has no available quantity | ProductController | Unit    | WB / boundary                 |
| should return a list of all products | ProductController | Unit    | WB / equivalence partitioning |
| error nella dao.getall products | ProductController | Unit    | WB / boundary                 |
| should return a list of all SMARTPHONE products | ProductController | Unit    | WB / equivalence partitioning |
| get products error in get products by category | ProductController | Unit    | WB / boundary                 |
| should return the information of iPhone15 | ProductController | Unit    | WB / equivalence partitioning |
| get-products -- should throw ProductNotFoundError if the product does not exist | ProductController | Unit    | WB / boundary                 |
| error in getAvailable - dao reject | ProductController | Unit    | WB / boundary                 |
| should return a list of all available products | ProductController | Unit    | WB / equivalence partitioning |
| should return a list of all SMARTPHONE available products | ProductController | Unit    | WB / equivalence partitioning |
| should return a list of all iPhone15 available products | ProductController | Unit    | WB / equivalence partitioning |
| getAvailable products by model- error in db | ProductController | Unit    | WB / boundary                 |
| getAvailable products by category- error in db | ProductController | Unit    | WB / boundary                 |
| available -should throw ProductNotFoundError if the product does not exist | ProductController | Unit    | WB / boundary                 |
| should delete all products successfully | ProductController | Unit    | WB / equivalence partitioning |
| delete all products- should throw an error if the deletion fails | ProductController | Unit    | WB / boundary                 |
| should delete a product successfully | ProductController | Unit    | WB / equivalence partitioning |
| delete-should throw ProductNotFoundError if the product does not exist | ProductController | Unit    | WB / boundary                 |
| delete-should throw an error if the deletion fails | ProductController | Unit    | WB / boundary                 |
| delete-should throw an error if the getProductByModel fails | ProductController | Unit    | WB / boundary                 |
 deleteProduct - dovrebbe rifiutare con un errore del database | ProductDAO| Unit | WB/eq partitioning |
| sellProduct - dovrebbe risolvere con la nuova quantità | ProductDAO| Unit | WB/eq partitioning |
| sellProduct - dovrebbe rifiutare con un errore del database | ProductDAO | Unit | WB/eq partitioning 
| deleteProduct - dovrebbe risolvere con true se il prodotto è stato eliminato correttamente | ProductDAO| Unit | WB/eq partitioning |
| deleteProduct - dovrebbe rifiutare con un errore del database | ProductDAO| Unit | WB/eq partitioning 
| sellProduct - dovrebbe rifiutare con un errore del database | ProductDAO | Unit | WB/eq partitioning |
| getAvailableProductsByCategory - dovrebbe risolvere con un array di prodotti disponibili per una categoria specifica | ProductDAO | Unit | WB/eq partitioning |
| getAvailableProductsByCategory - dovrebbe rifiutare con un errore del database | ProductDAO| Unit | WB/eq partitioning |
| getAvailableProductsByModel - dovrebbe risolvere con un array di prodotti disponibili per un modello specifico | ProductDAO | Unit | WB/eq partitioning |
| getAvailableProductsByModel - dovrebbe rifiutare con un errore del database | ProductDAO | Unit | WB/eq partitioning |
| getAllAvailableProducts - dovrebbe rifiutare con un errore del database | ProductDAO | Unit | WB/eq partitioning |
| getProductsByCategory - dovrebbe risolvere con un array di prodotti per una categoria specifica | ProductDAO | Unit | WB/eq partitioning |
| getProductsByCategory - dovrebbe rifiutare con un errore del database | ProductDAO | Unit | WB/eq partitioning |
| getProductsByModel - dovrebbe risolvere con un array di prodotti per un modello specifico | ProductDAO | Unit | WB/eq partitioning |
| getProductsByModel - dovrebbe rifiutare con un errore del database | ProductDAO | Unit | WB/eq partitioning 
| getAllProducts - array di prodotti          | ProductDAO                | Unit           | WB/ equivalence partitioning  |
| getAllProducts - errore del database        | ProductDAO                | Unit           | WB/ boundary                  |
| updateProductQuantity - nuova quantità      | ProductDAO                | Unit           | WB/ equivalence partitioning  |
| updateProductQuantity - errore del database | ProductDAO                | Unit           | WB/ boundary                  |
| getProductByModel - prodotto trovato        | ProductDAO                | Unit           | WB/ equivalence partitioning  |
| getProductByModel - prodotto non trovato    | ProductDAO                | Unit           | WB/ boundary                  |
| getProductByModel - errore del database     | ProductDAO                | Unit           | WB/ boundary                  |
| registerProduct - registrazione corretta    | ProductDAO                | Unit           | WB/ equivalence partitioning  |
| registerProduct - errore del database       | ProductDAO                | Unit           | WB/ boundary                  |
| POST /products - Success   | ProductController         |     Unit      |       WB/ statement coverage  |
| POST /products - Invalid arrivalDate | ProductController         |     Unit      |       WB/ boundary           |
| POST /products - Unauthorized access | ProductController         |     Unit      |       WB/ statement coverage  |
| POST /products - Product already exists | ProductController         |     Unit      |       WB/ statement coverage  |
| PATCH /products/:model - Success | ProductController         |     Unit      |       WB/ statement coverage  |
| PATCH /products/:model - Invalid future date | ProductController         |     Unit      |       WB/ boundary           |
| PATCH /products/:model - Update before arrival | ProductController         |     Unit      |       WB/ boundary           |
| PATCH /products/:model - Model not in DB | ProductController         |     Unit      |       WB/ statement coverage  |
| PATCH /products/:model/sell - Success | ProductController         |     Unit      |       WB/ statement coverage  |
| PATCH /products/:model/sell - Invalid future date | ProductController         |     Unit      |       WB/ boundary           |
| PATCH /products/:model/sell - Sell before arrival | ProductController         |     Unit      |       WB/ boundary           |
| PATCH /products/:model/sell - Model not in DB | ProductController         |     Unit      |       WB/ statement coverage  |
| PATCH /products/:model/sell - Quantity 0 | ProductController         |     Unit      |       WB/ statement coverage  |
| PATCH /products/:model/sell - Not enough quantity | ProductController         |     Unit      |       WB/ statement coverage  |
| GET /products - Return all products | ProductController         |     Unit      |       WB/ statement coverage  |
| GET /products - Return smartphones | ProductController         |     Unit      |       WB/ statement coverage  |
| GET /products - Return iPhone15 | ProductController         |     Unit      |       WB/ statement coverage  |
| GET /products - Grouping null, category set | ProductController         |     Unit      |       WB/ boundary           |
| GET /products - Grouping null, model set | ProductController         |     Unit      |       WB/ boundary           |
| GET /products - Grouping null, model and category set | ProductController         |     Unit      |       WB/ boundary           |
| GET /products - Grouping=category, category & model null | ProductController         |     Unit      |       WB/ boundary           |
| GET /products - Grouping=category, category null, model not null | ProductController         |     Unit      |       WB/ boundary           |
| GET /products - Grouping=category, category not null, model not null | ProductController         |     Unit      |       WB/ boundary           |
| GET /products - Grouping=model, category null, model null | ProductController         |     Unit      |       WB/ boundary           |
| GET /products - Grouping=model, category not null, model null | ProductController         |     Unit      |       WB/ boundary           |
| GET /products - Grouping=model, category not null, model not null | ProductController         |     Unit      |       WB/ boundary           |
| GET /products - Grouping=model, model empty | ProductController         |     Unit      |       WB/ boundary           |
| GET /products - Grouping=category, category empty | ProductController         |     Unit      |       WB/ boundary           |
| GET /products - Grouping=model, model not in DB | ProductController         |     Unit      |       WB/ statement coverage  |
| GET /products - Grouping=null, model not in DB | ProductController         |     Unit      |       WB/ statement coverage  |
| GET /products - Unauthorized access | ProductController         |     Unit      |       WB/ statement coverage  |
| GET /products/available - Return all products | ProductController         |     Unit      |       WB/ statement coverage  |
| GET /products/available - Return smartphones | ProductController         |     Unit      |       WB/ statement coverage  |
| GET /products/available - Return iPhone15 | ProductController         |     Unit      |       WB/ statement coverage  |
| GET /products/available - Grouping null, category set | ProductController         |     Unit      |       WB/ boundary           |
| GET /products/available - Grouping null, model set | ProductController         |     Unit      |       WB/ boundary           |
| GET /products/available - Grouping null, model and category set | ProductController         |     Unit      |       WB/ boundary           |
| GET /products/available - Grouping=category, category & model null | ProductController         |     Unit      |       WB/ boundary           |
| GET /products/available - Grouping=category, category null, model not null | ProductController         |     Unit      |       WB/ boundary           |
| GET /products/available - Grouping=category, category not null, model not null | ProductController         |     Unit      |       WB/ boundary           |
| GET /products/available - Grouping=model, category null, model null | ProductController         |     Unit      |       WB/ boundary           |
| GET /products/available - Grouping=model, category not null, model null | ProductController         |     Unit      |       WB/ boundary           |
| GET /products/available - Grouping=model, category not null, model not null | ProductController         |     Unit      |       WB/ boundary           |
| GET /products/available - Grouping=model, model empty | ProductController         |     Unit      |       WB/ boundary           |
| GET /products/available - Grouping=category, category empty | ProductController         |     Unit      |       WB/ boundary           |
| GET /products/available - Grouping=model, model not in DB | ProductController         |     Unit      |       WB/ statement coverage  |
| GET /products/available - Grouping=null, model not in DB | ProductController         |     Unit      |       WB/ statement coverage  |
| GET /products/available - Unauthorized access | ProductController         |     Unit      |       WB/ statement coverage  |
| DELETE /products/:model - Success | ProductController         |     Unit      |       WB/ statement coverage  |
| DELETE /products/:model - Product not found | ProductController         |     Unit      |       WB/ statement coverage  |
| DELETE /products/:model - Empty string | ProductController         |     Unit      |       WB/ boundary           |
| DELETE /products/:model - Unauthorized access | ProductController         |     Unit      |       WB/ statement coverage  |
| DELETE /products - Success | ProductController         |     Unit      |       WB/ statement coverage  |
| DELETE /products - Unauthorized access | ProductController         |     Unit      |       WB/ statement coverage  |
| It should return 200 - new product registered by a Manager | POST /products | Integration | BB/ boundary |
| It should return 200 - new product registered by an Admin | POST /products | Integration | BB/ boundary |
| It should return 401 - customer try to register a product | POST /products | Integration | BB/ boundary |
| It should return 401 - user not logged try to register a product | POST /products | Integration | BB/ boundary |
| It should return 409 - model already exists | POST /products | Integration | BB/ boundary |
| It should return 422 - invalid category | POST /products | Integration | BB/ boundary |
| It should return 422 - empty model | POST /products | Integration | BB/ boundary |
| It should return 422 - quantity == 0 | POST /products | Integration | BB/ boundary |
| It should return 422 - quantity < 0 | POST /products | Integration | BB/ boundary |
| It should return 422 - selling price = 0 | POST /products | Integration | BB/ boundary |
| It should return 422 - selling price < 0 | POST /products | Integration | BB/ boundary |
| It should return 200 - selling price = 1 | POST /products | Integration | BB/ boundary |
| It should return 422 - bad formatted arrivalDate | POST /products | Integration | BB/ boundary |
| It should return 422 - Italian formatted arrivalDate | POST /products | Integration | BB/ boundary |
| It should return 400 - arrivalDate after the current date | POST /products | Integration | BB/ boundary |
| It should return 200 - arrivalDate missing, arrival date must be set as currentDate | POST /products | Integration | BB/ boundary |
| It should return 200 - Manager increase product quantity | PATCH /products/:model | Integration | BB/ boundary |
| It should return 200 - Admin increase product quantity | PATCH /products/:model | Integration | BB/ boundary |
| It should return 401 - Customer try to increase product quantity | PATCH /products/:model | Integration | BB/ boundary |
| It should return 404 - product model doesn't exist | PATCH /products/:model | Integration | BB/ boundary |
| It should return 422 - new quantity missing in update | PATCH /products/:model | Integration | BB/ boundary |
| It should return 422 - new quantity = 0 | PATCH /products/:model | Integration | BB/ boundary |
| It should return 422 - new quantity < 0 | PATCH /products/:model | Integration | BB/ boundary |
| It should return 400 - changeDate before product's arrivalDate | PATCH /products/:model | Integration | BB/ boundary |
| It should return 400 - changeDate after the current date | PATCH /products/:model | Integration | BB/ boundary |
| It should return 200 - changeDate is missing, must be set as current date | PATCH /products/:model | Integration | BB/ boundary |
| It should return 422 - invalid changeDate format | PATCH /products/:model | Integration | BB/ boundary |
| It should return 200 - Manager reduces product quantity | PATCH /products/:model/sell | Integration | BB/ boundary |
| It should return 200 - Admin reduces product quantity | PATCH /products/:model/sell | Integration | BB/ boundary |
| It should return 401 - Customer try to reduce quantity | PATCH /products/:model/sell | Integration | BB/ boundary |
| It should return 404 - Product model does not exist | PATCH /products/:model/sell | Integration | BB/ boundary |
| It should return 409 - available quantity is 0 | PATCH /products/:model/sell | Integration | BB/ boundary |
| It should return 200 - quantity == available quantity | PATCH /products/:model/sell | Integration | BB/ boundary |
| It should return 409 - quantity > available quantity | PATCH /products/:model/sell | Integration | BB/ boundary |
| It should return 400 - sellingDate > current date | PATCH /products/:model/sell | Integration | BB/ boundary |
| It should return 400 - sellingDate before product's arrivalDate | PATCH /products/:model/sell | Integration | BB/ boundary |
| It should return 422 - quantity missing in update | PATCH /products/:model/sell | Integration | BB/ boundary |
| It should return 422 - quantity = 0 | PATCH /products/:model/sell | Integration | BB/ boundary |
| It should return 422 - quantity < 0 | PATCH /products/:model/sell | Integration | BB/ boundary |
| It should return 422 - invalid sellingDate format | PATCH /products/:model/sell | Integration | BB/ boundary |
| It should return 200 - selling date empty -> sellingDate = today | PATCH /products/:model/sell | Integration | BB/ boundary |
| It should return 200 - Manager delete a product | DELETE /products/:model | Integration | BB/ boundary |
| It should return 200 - Admin delete a product | DELETE /products/:model | Integration | BB/ boundary |
| It should return 401 - Customer try to delete a product | DELETE /products/:model | Integration | BB/ boundary |
| It should return 401 - not logged in try to delete a product | DELETE /products/:model | Integration | BB/ boundary |
| It should return 404 - product isn't in the db | DELETE /products/:model | Integration | BB/ boundary |
| It should return 200 - manager delete all products | DELETE /products | Integration | BB/ boundary |
| It should return 200 - Admin delete all products | DELETE /products | Integration | BB/ boundary |
| It should return 401 - Customer try to delete all products | DELETE /products | Integration | BB/ boundary |
| It should return 401 - Not logged in user try to delete all products | DELETE /products | Integration | BB/ boundary |
| It should return 200 - Manager ask all products | GET /products | Integration | BB/ boundary |
| It should return 200 - Admin ask all products | GET /products | Integration | BB/ boundary |
| It should return 401 - Customer ask all products | GET /products | Integration | BB/ boundary |
| It should return 401 - user not logged in ask for all products | GET /products | Integration | BB/ boundary |
| It should return 200 - products filtered by category SMARTPHONE | GET /products | Integration | BB/ boundary |
| It should return 200 - products filtered by category LAPTOP | GET /products | Integration | BB/ boundary |
| It should return 200 - products filtered by category APPLIANCE | GET /products | Integration | BB/ boundary |
| It should return 200 - products filtered by model | GET /products | Integration | BB/ boundary |
| It should return 422 - grouping null, any of category or model is not null | GET /products | Integration | BB/ boundary |
| It should return 422 - grouping==category and category==null | GET /products | Integration | BB/ boundary |
| It should return 422 - grouping==category and model not null | GET /products | Integration | BB/ boundary |
| It should return 422 - grouping==model and model==null | GET /products | Integration | BB/ boundary |
| It should return 422 - grouping ==model and category not null | GET /products | Integration | BB/ boundary |
| It should return 404 - model not in the database | GET /products | Integration | BB/ boundary |
| It should return 200 - Customer ask all available products | GET /products/available | Integration | BB/ boundary |
| It should return 200 - Manager ask all available products | GET /products/available | Integration | BB/ boundary |
| It should return 200 - Admin ask all available products | GET /products/available | Integration | BB/ boundary |
| It should return 401 - non-logged ask for available products | GET /products/available | Integration | BB/ boundary |
| It should return 200 - Customer ask available products filtered by category | GET /products/available | Integration | BB/ boundary |
| It should return 200 - Customer ask available products filtered by model | GET /products/available | Integration | BB/ boundary |
| It should return 422 - grouping==null and any of category or model != null | GET /products/available | Integration | BB/ boundary |
| It should return 422 - grouping==category and category == null | GET /products/available | Integration | BB/ boundary |
| It should return 422 - grouping == category and model != null | GET /products/available | Integration | BB/ boundary |
| It should return 422 - grouping == model and model == null | GET /products/available | Integration | BB/ boundary |
| It should return 422 - grouping == model and category != null | GET /products/available | Integration | BB/ boundary |
| It should return 404 - model is not in the database | GET /products/available | Integration | BB/ boundary |








# Coverage

## Coverage of FR

<Report in the following table the coverage of functional requirements and scenarios(from official requirements) >

| Functional Requirement or scenario | Test(s) |
| :--------------------------------: | :-----: |
|                FRx                 |         |
|                FRy                 |         |
|                ...                 |         |

## Coverage white box

Report here the screenshot of coverage values obtained with jest-- coverage
