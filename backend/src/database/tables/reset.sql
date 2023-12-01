-- USE Shopee;



BEGIN 
TRY 
CREATE TABLE resetTokens(
    userEmail VARCHAR(50),
    resetToken VARCHAR(MAX),
    expiration DATETIME
)
END 
TRY 
BEGIN 
CATCH 
THROW 50001, 'TABLE EXIST',1
END 
CATCH;
