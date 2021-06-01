"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TRANSACTIONS = void 0;
var transaction_1 = require("../models/transaction");
var Transactions = (function () {
    function Transactions() {
        this.lastCreatedContactId = 0;
        this.transactions = [];
    }
    Transactions.prototype.addNewTransaction = function (contactId, accountId, type, amount, dateTime, note, description) {
        if (note === void 0) { note = ''; }
        if (description === void 0) { description = ''; }
        this.lastCreatedContactId += 1;
        var transaction = new transaction_1.Transaction(this.lastCreatedContactId, accountId, contactId, type, amount, dateTime, note, description);
        this.transactions.push(transaction);
        return transaction;
    };
    Transactions.prototype.updateTransaction = function (id, contactId, accountId, type, amount, dateTime, note, description) {
        if (note === void 0) { note = ''; }
        if (description === void 0) { description = ''; }
        var transaction = this.transactions.find(function (txn) {
            return ((txn.id === id) && (txn.accountId === accountId) && (txn.contactId === contactId));
        });
        if (!transaction) {
            return null;
        }
        transaction.updateDetails(type, amount, dateTime, note, description);
        return transaction;
    };
    Transactions.prototype.getTransactionsOfContact = function (contactId, accountId) {
        return this.transactions.filter(function (txn) { return (txn.contactId === contactId) && (txn.accountId === accountId); });
    };
    Transactions.prototype.getTransactionOfContact = function (id, contactId, accountId) {
        return this.transactions.find(function (txn) { return ((txn.id === id)
            && (txn.contactId === contactId)
            && (txn.accountId === accountId)); });
    };
    Transactions.prototype.getTransactionSummaryOfContact = function (contactId, accountId) {
        var youOwe = 0;
        var owesYou = 0;
        this.transactions.forEach(function (txn) {
            if ((txn.contactId === contactId) && (txn.accountId === accountId)) {
                switch (txn.type) {
                    case transaction_1.TransactionType.OWES_YOU:
                        owesYou += txn.amount;
                        break;
                    case transaction_1.TransactionType.YOU_OWE:
                        youOwe += txn.amount;
                        break;
                }
            }
        });
        return { youOwe: youOwe, owesYou: owesYou };
    };
    Transactions.prototype.getTransactionsSummaryOfAccount = function (accountId) {
        var youOwe = 0;
        var owesYou = 0;
        this.transactions.forEach(function (txn) {
            if (txn.accountId === accountId) {
                switch (txn.type) {
                    case transaction_1.TransactionType.OWES_YOU:
                        owesYou += txn.amount;
                        break;
                    case transaction_1.TransactionType.YOU_OWE:
                        youOwe += txn.amount;
                        break;
                }
            }
        });
        return { youOwe: youOwe, owesYou: owesYou };
    };
    Transactions.prototype.deleteTransaction = function (id, accountId) {
        var index = this.transactions.findIndex(function (txn) {
            return ((txn.id === id) && (txn.accountId === accountId));
        });
        if (index !== -1) {
            this.transactions.splice(index, 1);
            return true;
        }
        return false;
    };
    Transactions.prototype.deleteTransactionsOfContact = function (contactId, accountId) {
        this.transactions = this.transactions.filter(function (txn) { return (txn.contactId !== contactId) && (txn.accountId !== accountId); });
    };
    return Transactions;
}());
exports.TRANSACTIONS = new Transactions();