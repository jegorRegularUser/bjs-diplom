const logOutButton = new LogoutButton()
logOutButton.action = () => {
    ApiConnector.logout(res => {
        if (res.success) location.reload()
    })
}
ApiConnector.current((res) => {
    ProfileWidget.showProfile(res.data);
});


const ratesBoard = new RatesBoard()
ratesBoard.getCurrentStocks = () => {
    ApiConnector.getStocks((res) => {
        if (res.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(res.data)
        }
    })
}

ratesBoard.getCurrentStocks()
setInterval(() => {
    ratesBoard.getCurrentStocks();
}, 60000);


const moneyManager = new MoneyManager();

const favoritesWidget = new FavoritesWidget();

moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, res => {
        if (res.success) {
            ProfileWidget.showProfile(res.data);
            moneyManager.setMessage(res.success, 'Пополнение прошло успешно')
        }
        else moneyManager.setMessage(res.success, res.error)
    })
}

moneyManager.conversionMoneyCallback = data => {
    ApiConnector.convertMoney(data, res => {
        if (res.success) {
            ProfileWidget.showProfile(res.data);
            moneyManager.setMessage(res.success, 'Конвертация прошла успешно')
        }
        else moneyManager.setMessage(res.success,  res.error)
    })
}

moneyManager.sendMoneyCallback = data => {
    ApiConnector.transferMoney(data, res => {
        if (res.success) {
            ProfileWidget.showProfile(res.data);
            moneyManager.setMessage(res.success, 'Перевод прошел успешно')
        }
        else moneyManager.setMessage(res.success,  res.error)
    })
}

ApiConnector.getFavorites((res) => {
    if (res.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(res.data);
        moneyManager.updateUsersList(res.data);
    }
});

favoritesWidget.addUserCallback = data => {
    ApiConnector.addUserToFavorites(data, res => {
        if (res.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(res.data);
            moneyManager.updateUsersList(res.data);
            favoritesWidget.setMessage(res.success, 'Пользователь добавлен успешно')
        }
        else favoritesWidget.setMessage(res.success,  res.error)
    })
}

favoritesWidget.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, res => {
        if (res.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(res.data);
            moneyManager.updateUsersList(res.data);
            favoritesWidget.setMessage(res.success, 'Пользователь удален успешно')
        }
        else favoritesWidget.setMessage(res.success,  res.error)
    })
}
