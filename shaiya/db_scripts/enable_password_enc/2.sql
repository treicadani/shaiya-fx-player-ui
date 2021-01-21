USE [DatabaseName]
GO
 
-- Option #1
EXEC sp_changedbowner 'sa'
GO
 
-- OR--
 
-- Option #2
ALTER AUTHORIZATION ON DATABASE::[DatabaseName] TO [sa]
GO