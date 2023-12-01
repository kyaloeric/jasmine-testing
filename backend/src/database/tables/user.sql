USE Shopee;

-- BEGIN 
-- TRY 
-- CREATE TABLE Users(
--     userId VARCHAR(100) PRIMARY KEY,
--     userName VARCHAR(100) UNIQUE NOT NULL,
--     userEmail VARCHAR(100) UNIQUE NOT NULL,
--     userPhone INT NOT NULL,
--     userPassword VARCHAR(MAX) NOT NULL,
--     profilePic VARCHAR (MAX),
--     role VARCHAR (20) DEFAULT 'user' 
-- )
-- END TRY
-- BEGIN 
-- CATCH 
-- THROW 50001,'Table has already been created',1
-- END 
-- CATCH 
   

UPDATE Users SET role = 'admin' WHERE userEmail = 'erickyalo19@gmail.com'

SELECT * FROM Users;

DROP TABLE Users;