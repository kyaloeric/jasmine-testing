-- USE Shopee


-- CREATE OR ALTER PROCEDURE updateProductProc( @productName VARCHAR(50),@productId VARCHAR(100),
--     @productDescription VARCHAR(500),
--     @productCost INT,
--     @productImg VARCHAR(MAX),
--     @earlyCost INT,
--     @productClassification VARCHAR(50),
--     @productCategory VARCHAR(50))
--     AS 
--     BEGIN 
--     UPDATE Products
--    SET
--     productName=@productName,
--     productDescription=@productDescription,
--     productCost=@productCost,
--     productImg=@productImg,
--     earlyCost=@earlyCost,
--     productClassification=@productClassification,
--     productCategory=@productCategory

--     WHERE productId=@productId
--     END;