-- USE Shopee;

-- CREATE OR ALTER PROCEDURE addToCartProc(
--     @productId VARCHAR(100),
--     @productName VARCHAR(100),
--     @productImg VARCHAR(MAX),
--     @boughtBy VARCHAR(100),
--     @productCost INT
-- )
-- AS 
-- BEGIN
--     DECLARE @subTotal INT;

--     -- Calculate the subtotal for productCost where userId is userId
--     SELECT @subTotal = SUM(productCost)
--     FROM productCart
--     WHERE boughtBy = @boughtBy

--     -- Insert data into productCart table
--     INSERT INTO productCart(productId, productName, productImg, productCost, boughtBy, subTotal)
--     VALUES (@productId, @productName, @productImg, @productCost, @boughtBy, @subTotal);
-- END;

