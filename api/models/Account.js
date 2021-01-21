module.exports = {
    schema: true,
    migrate: 'safe',
    datastore: 'PS_UserData',
    tableName: 'Users_Master',
    attributes: {
        createdAt: false,
        updatedAt: false,
        //id: false,
        id: {
            type: 'number',
            columnName: 'UserUID',
            autoIncrement: true,
            unique: true,
        },
        UserID: {
            type: 'string',
            required: true,
            unique: true,
            allowNull: false,
            maxLength: 18,
        },
        Pw: {
            type: 'string',
            required: true,
            protect: true,
            allowNull: false,
            maxLength: 65,
        },
        JoinDate: { 
            type: 'ref', 
            columnType: 'datetime',
        },
        Admin: {
            type: 'boolean',
            allowNull: false,
        },
        AdminLevel: {
            type: 'number',
            allowNull: false,
        },
        UseQueue: {
            type: 'boolean',
            allowNull: false,
        },
        Status: {
            type: 'number',
            allowNull: true,
        },
        Leave: {
            type: 'number',
            allowNull: false,
        },
        LeaveDate: { 
            type: 'ref', 
            columnType: 'datetime',
        },
        UserType: {
            type: 'string',
            allowNull: false,
            maxLength: 1,
        },
        UserIp: {
            type: 'string',
            allowNull: true,
            maxLength: 15,
        },
        Point: {
            type: 'number',
            allowNull: false,
        },
        Enpassword: {
            type: 'string',
            allowNull: true,
            maxLength: 32
        },
        Email: {
            type: 'string',
            allowNull: true,
            unique: true,
            maxLength: 200,
        }
    }
}