import { describe, test, expect, jest, beforeEach, afterEach} from "@jest/globals"
import request from 'supertest'
import { app } from "../../index"

import { Role, User } from "../../src/components/user"
import Authenticator from "../../src/routers/auth"
import CartController from "../../src/controllers/cartController"
import { Category } from "../../src/components/product"
import { modelValidator } from "../../src/validators/cartValidators"
import { EmptyProductStockError, LowProductStockError, ProductNotFoundError } from "../../src/errors/productError"
import { CartNotFoundError, EmptyCartError, ProductNotInCartError } from "../../src/errors/cartError"

jest.mock("../../src/controllers/cartController");
jest.mock("../../src/routers/auth");

const mockUser: User = { username: 'testuser', name: 'Test', surname: 'User', role: Role.CUSTOMER, address: '123 Test St', birthdate: '1990-01-01' };
const baseURL = "/ezelectronics/carts"


describe('GET /', () => {
    const mockCart =  {customer: 'testuser', paid: false,  paymentDate: '', total: 100, products: [{ model: 'product1', quantity: 2, category: Category.SMARTPHONE, price: 50 }] };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    test('It should return 200,the cart for the logged-in user', async () => {
        jest.spyOn(Authenticator.prototype, 'isLoggedIn').mockImplementation((req, res, next) => {
            req.user = mockUser;
            next();
        });

        jest.spyOn(Authenticator.prototype, 'isCustomer').mockImplementation((req, res, next) => {
            next();
        });

        jest.spyOn(CartController.prototype, 'getCart').mockResolvedValue(mockCart);

        const response = await request(app).get(baseURL);

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockCart);
        expect(Authenticator.prototype.isLoggedIn).toHaveBeenCalled();
        expect(Authenticator.prototype.isCustomer).toHaveBeenCalled();
        expect(CartController.prototype.getCart).toHaveBeenCalledWith(mockUser);
    });
});

describe('POST /', () => {
    const mockModel = 'product-model';

    beforeEach(() => {
        jest.spyOn(Authenticator.prototype, 'isLoggedIn').mockImplementation((req, res, next) => {
            req.user = mockUser;
            next();
        });

        jest.spyOn(Authenticator.prototype, 'isCustomer').mockImplementation((req, res, next) => {
            next();
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('It should return 200, add product to cart for the logged-in user', async () => {
        
        jest.spyOn(CartController.prototype, 'addToCart').mockResolvedValue(true);

        const response = await request(app).post(baseURL).send({ model: mockModel });

        expect(response.status).toBe(200);
        expect(Authenticator.prototype.isLoggedIn).toHaveBeenCalled();
        expect(Authenticator.prototype.isCustomer).toHaveBeenCalled();
        expect(CartController.prototype.addToCart).toHaveBeenCalledWith(mockUser, mockModel);
    });

    test('It should return 404, product not found', async () => {
        jest.spyOn(CartController.prototype, 'addToCart').mockRejectedValue(new ProductNotFoundError);

        const response = await request(app).post(baseURL).send({ model: mockModel });

        expect(response.status).toBe(404);
        expect(response.body.error).toBe('Product not found')
        expect(Authenticator.prototype.isLoggedIn).toHaveBeenCalled();
        expect(Authenticator.prototype.isCustomer).toHaveBeenCalled();
        expect(CartController.prototype.addToCart).toHaveBeenCalledWith(mockUser, mockModel);
    });

    test('It should return 409, product whose available quantity is 0', async () => {
        jest.spyOn(CartController.prototype, 'addToCart').mockRejectedValue(new EmptyProductStockError);

        const response = await request(app).post(baseURL).send({ model: mockModel });

        expect(response.status).toBe(409);
        expect(response.body.error).toBe('Product stock is empty')
        expect(Authenticator.prototype.isLoggedIn).toHaveBeenCalled();
        expect(Authenticator.prototype.isCustomer).toHaveBeenCalled();
        expect(CartController.prototype.addToCart).toHaveBeenCalledWith(mockUser, mockModel);
    });
});

describe('PATCH /', () => {

    beforeEach(() => {
        jest.spyOn(Authenticator.prototype, 'isLoggedIn').mockImplementation((req, res, next) => {
            req.user = mockUser;
            next();
        });

        jest.spyOn(Authenticator.prototype, 'isCustomer').mockImplementation((req, res, next) => {
            next();
        });
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('It should return 200, checkout the cart', async () => {
        jest.spyOn(CartController.prototype, 'checkoutCart').mockResolvedValue(true);

        const response = await request(app).patch(baseURL);

        expect(response.status).toBe(200);
        expect(Authenticator.prototype.isLoggedIn).toHaveBeenCalled();
        expect(Authenticator.prototype.isCustomer).toHaveBeenCalled();
        expect(CartController.prototype.checkoutCart).toHaveBeenCalledWith(mockUser);
    });

    test('It should return 404, no information about an unpaid cart', async () => {
        jest.spyOn(CartController.prototype, 'checkoutCart').mockRejectedValue(new CartNotFoundError)

        const response = await request(app).patch(baseURL);

        expect(response.status).toBe(404);
        expect(Authenticator.prototype.isLoggedIn).toHaveBeenCalled();
        expect(Authenticator.prototype.isCustomer).toHaveBeenCalled();
        expect(CartController.prototype.checkoutCart).toBeCalledWith(mockUser);
    });

    test('It should return 400, no information about an unpaid cart', async () => {
        jest.spyOn(CartController.prototype, 'checkoutCart').mockRejectedValue(new EmptyCartError)

        const response = await request(app).patch(baseURL);

        expect(response.status).toBe(400);
        expect(Authenticator.prototype.isLoggedIn).toHaveBeenCalled();
        expect(Authenticator.prototype.isCustomer).toHaveBeenCalled();
        expect(CartController.prototype.checkoutCart).toBeCalledWith(mockUser);
    });

    test('It should return 409, there is at least one product in the cart whose available quantity in the stock is 0', async () => {
        jest.spyOn(CartController.prototype, 'checkoutCart').mockRejectedValue(new EmptyProductStockError)

        const response = await request(app).patch(baseURL);

        expect(response.status).toBe(409);
        expect(Authenticator.prototype.isLoggedIn).toHaveBeenCalled();
        expect(Authenticator.prototype.isCustomer).toHaveBeenCalled();
        expect(CartController.prototype.checkoutCart).toBeCalledWith(mockUser);
    });

    test('It should return 409, there is at least one product in the cart whose quantity is higher than the available quantity in the stock', async () => {
        jest.spyOn(CartController.prototype, 'checkoutCart').mockRejectedValue(new LowProductStockError)

        const response = await request(app).patch(baseURL);

        expect(response.status).toBe(409);
        expect(Authenticator.prototype.isLoggedIn).toHaveBeenCalled();
        expect(Authenticator.prototype.isCustomer).toHaveBeenCalled();
        expect(CartController.prototype.checkoutCart).toBeCalledWith(mockUser);
    });
});

describe('GET /history', () => {

    beforeEach(() => {
        jest.spyOn(Authenticator.prototype, 'isLoggedIn').mockImplementation((req, res, next) => {
            req.user = mockUser;
            next();
        });

        jest.spyOn(Authenticator.prototype, 'isCustomer').mockImplementation((req, res, next) => {
            next();
        });
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    const mockCarts = [
        { customer: mockUser.username, paymentDate: '2022-02-02', paid: true, total: 100, products: [{ model: 'product1', quantity: 2, category: Category.SMARTPHONE, price: 100 }]},
        { customer: mockUser.username, paymentDate: '2022-03-03', paid: true, total: 200, products: [{ model: 'product2', quantity: 1, category: Category.SMARTPHONE, price: 100 }]}
    ];

    test('It should return 200 and and a body response with array of carts that represents the history of past orders made by the currently logged in user', async () => {

        jest.spyOn(CartController.prototype, 'getCustomerCarts').mockResolvedValue(mockCarts);

        const response = await request(app).get(baseURL+'/history');

        expect(response.status).toBe(200);
        expect(response.body).toEqual(mockCarts);
        expect(Authenticator.prototype.isLoggedIn).toHaveBeenCalled();
        expect(Authenticator.prototype.isCustomer).toHaveBeenCalled();
        expect(CartController.prototype.getCustomerCarts).toBeCalledWith(mockUser);
    });
});

describe('DELETE /products/:model', () => {

    beforeEach(() => {
        jest.spyOn(Authenticator.prototype, 'isLoggedIn').mockImplementation((req, res, next) => {
            req.user = mockUser;
            next();
        });

        jest.spyOn(Authenticator.prototype, 'isCustomer').mockImplementation((req, res, next) => {
            next();
        });
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    const testModel = 'product-model';

    test('It should return 200 and remove an instance of a product from the current cart', async () => {
        
        jest.spyOn(CartController.prototype, 'removeProductFromCart').mockResolvedValue(true);
        const response = await request(app).delete(`${baseURL}/products/${testModel}`);
        expect(response.status).toBe(200);
        expect(Authenticator.prototype.isLoggedIn).toHaveBeenCalled();
        expect(Authenticator.prototype.isCustomer).toHaveBeenCalled();
        expect(CartController.prototype.removeProductFromCart).toBeCalledWith(mockUser,testModel);

    });

    test('It should return 404, product is not in the cart', async () => {
        
        jest.spyOn(CartController.prototype, 'removeProductFromCart').mockRejectedValue(new ProductNotInCartError);
        const response = await request(app).delete(`${baseURL}/products/${testModel}`);
        expect(response.status).toBe(404);
        expect(Authenticator.prototype.isLoggedIn).toHaveBeenCalled();
        expect(Authenticator.prototype.isCustomer).toHaveBeenCalled();
        expect(CartController.prototype.removeProductFromCart).toBeCalledWith(mockUser,testModel);

    });

    /////?????????????? 400 O 404
    test('It should return 400, empty cart', async () => {
        
        jest.spyOn(CartController.prototype, 'removeProductFromCart').mockRejectedValue(new EmptyCartError);
        const response = await request(app).delete(`${baseURL}/products/${testModel}`);
        expect(response.status).toBe(400);
        expect(Authenticator.prototype.isLoggedIn).toHaveBeenCalled();
        expect(Authenticator.prototype.isCustomer).toHaveBeenCalled();
        expect(CartController.prototype.removeProductFromCart).toBeCalledWith(mockUser,testModel);

    });

    test('It should return 404,  no information about an unpaid cart', async () => {
        
        jest.spyOn(CartController.prototype, 'removeProductFromCart').mockRejectedValue(new CartNotFoundError);
        const response = await request(app).delete(`${baseURL}/products/${testModel}`);
        expect(response.status).toBe(404);
        expect(Authenticator.prototype.isLoggedIn).toHaveBeenCalled();
        expect(Authenticator.prototype.isCustomer).toHaveBeenCalled();
        expect(CartController.prototype.removeProductFromCart).toBeCalledWith(mockUser,testModel);

    });

    test('It should return 404, product not exist', async () => {
        jest.spyOn(CartController.prototype, 'removeProductFromCart').mockRejectedValue(new ProductNotFoundError);
        const response = await request(app).delete(`${baseURL}/products/${testModel}`);
        expect(response.status).toBe(404);
        expect(Authenticator.prototype.isLoggedIn).toHaveBeenCalled();
        expect(Authenticator.prototype.isCustomer).toHaveBeenCalled();
        expect(CartController.prototype.removeProductFromCart).toBeCalledWith(mockUser,testModel);
    });
})

describe('DELETE /current', () => {

    beforeEach(() => {
        jest.spyOn(Authenticator.prototype, 'isLoggedIn').mockImplementation((req, res, next) => {
            req.user = mockUser;
            next();
        });

        jest.spyOn(Authenticator.prototype, 'isCustomer').mockImplementation((req, res, next) => {
            next();
        });
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('It should return 200 and delete all products in the current cart', async () => {
        
        jest.spyOn(CartController.prototype, 'clearCart').mockResolvedValue(true);
        const response = await request(app).delete(baseURL+'/current');
        expect(response.status).toBe(200);
        expect(Authenticator.prototype.isLoggedIn).toHaveBeenCalled();
        expect(Authenticator.prototype.isCustomer).toHaveBeenCalled();
        expect(CartController.prototype.clearCart).toBeCalledWith(mockUser);

    });

    test('It should return 404, no information about an unpaid cart', async () => {
        
        jest.spyOn(CartController.prototype, 'clearCart').mockRejectedValue(new CartNotFoundError);
        const response = await request(app).delete(baseURL+'/current');
        expect(response.status).toBe(404);
        expect(Authenticator.prototype.isLoggedIn).toHaveBeenCalled();
        expect(Authenticator.prototype.isCustomer).toHaveBeenCalled();
        expect(CartController.prototype.clearCart).toBeCalledWith(mockUser);
    });
});

describe('DELETE /', () => {
    beforeEach(() => {
        jest.spyOn(Authenticator.prototype, 'isLoggedIn').mockImplementation((req, res, next) => {
            next();
        });

        jest.spyOn(Authenticator.prototype, 'isAdminOrManager').mockImplementation((req, res, next) => {
            next();
        });
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('It should return 200 and delete all products in the current cart', async () => {
        
        jest.spyOn(CartController.prototype, 'deleteAllCarts').mockResolvedValue(true);
        const response = await request(app).delete(baseURL);
        expect(response.status).toBe(200);
        expect(Authenticator.prototype.isLoggedIn).toHaveBeenCalled();
        expect(Authenticator.prototype.isAdminOrManager).toHaveBeenCalled();
        expect(CartController.prototype.deleteAllCarts).toBeCalled();

    });
});

describe('GET /all', () => {
    beforeEach(() => {
        jest.spyOn(Authenticator.prototype, 'isLoggedIn').mockImplementation((req, res, next) => {
            next();
        });

        jest.spyOn(Authenticator.prototype, 'isAdminOrManager').mockImplementation((req, res, next) => {
            next();
        });
    });
    afterEach(() => {
        jest.clearAllMocks();
    });

    const mockCarts = [
        { customer: 'test-user-1', paymentDate: '2022-02-02', paid: true, total: 100, products: [{ model: 'product1', quantity: 2, category: Category.SMARTPHONE, price: 100 }]},
        { customer: 'test-user-2', paymentDate: '2022-03-03', paid: true, total: 200, products: [{ model: 'product2', quantity: 1, category: Category.SMARTPHONE, price: 100 }]}
    ];

    test('It should return 200 and body response contains all carts of all users', async () => {
        
        jest.spyOn(CartController.prototype, 'getAllCarts').mockResolvedValue(mockCarts);
        const response = await request(app).get(baseURL+'/all');
        expect(response.status).toBe(200);
        expect(Authenticator.prototype.isLoggedIn).toHaveBeenCalled();
        expect(Authenticator.prototype.isAdminOrManager).toHaveBeenCalled();
        expect(CartController.prototype.getAllCarts).toBeCalled();
    });
});







