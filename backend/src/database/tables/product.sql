-- CREATE DATABASE Shopee;

-- USE Shopee;




-- BEGIN
--     TRY
--         CREATE  TABLE Products(
--             productId VARCHAR(200) PRIMARY KEY,
--             productName VARCHAR(500) NOT NULL,
--             productDescription VARCHAR(1000) NOT NULL,
--             productClassification VARCHAR(100) NOT NULL,
--             productCategory VARCHAR(100) NOT NULL,
--             productImg VARCHAR(MAX),
--             stockNumber INT ,
--             productCost INT NOT NULL,
--             boughtBy VARCHAR (100),
--             earlyCost INT,
--             userboughtEmailed BIT DEFAULT 0,
--             emailAdminItemBought BIT DEFAULT 0,
--             FOREIGN KEY (boughtBy) REFERENCES Users (userId)
--             ON DELETE SET NULL
--             ON UPDATE CASCADE
            
--         )

--     END TRY
-- BEGIN
--     CATCH
--         THROW 50001, 'Table already Exists!', 1;
--     END CATCH 

-- DROP TABLE Products