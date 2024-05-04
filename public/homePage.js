const logOutButton = new LogoutButton()
logOutButton.action = () => {
    ApiConnector.logout(res => { if (res.success) location.reload() })
}
ApiConnector.current((res) => {
    ProfileWidget.showProfile(res.data);
});

const ratesBoard = new RatesBoard()
ratesBoard.getCurrentStocks = ()=>{ ApiConnector.getStocks((res) => {if (res.success){ratesBoard.clearTable; ratesBoard.fillTable(res.data)} })}
ratesBoard.getCurrentStocks()
setInterval(() => {
    ratesBoard.getCurrentStocks();
}, 60000);
