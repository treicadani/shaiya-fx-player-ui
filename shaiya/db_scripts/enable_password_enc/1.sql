EXEC sp_configure 'CLR ENABLED' , '1'
GO
RECONFIGURE
GO
ALTER DATABASE PS_UserData SET TRUSTWORTHY ON
GO