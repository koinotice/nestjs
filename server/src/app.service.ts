import { Injectable } from '@nestjs/common';

const {address,abi} = require("./json/lrc.json")
const Web3 = require('web3');
const web3=new Web3('https://mainnet.infura.io')


const Big = require('bignumber.js');
const BN = require("bn.js");

function dec(balance) {
    return new Big(10).pow(Number(18)).times(balance).toString(10)
}

function toNumber(mixed) {
    if (typeof mixed === 'number') {
        return mixed
    }

    if (mixed instanceof Big || mixed instanceof BN) {
        return mixed.toNumber()
    }

    if (typeof mixed === 'string') {
        return Number(mixed)
    }

    throw new Error('Unsupported type')
}

const formatLength = (value) => {
    value = Number(value)
    // fix bug: value == string
    if (value && typeof value === 'number') {
    } else {
        value = 0
    }
    if (value > 1000) {
        return value.toFixed(2)
    }
    if (value <= 1000 && value >= 1) {
        return value.toFixed(2)
    }
    if (value < 1 && value >= 0.001) {
        return value.toFixed(5)
    }
    if (value < 0.001 && value > 0) {
        return value.toFixed(8)
    }
    if (value === 0) {
        return 0.00
    }
}

function getAmount(amount) {
    let number
    if (amount) {
        number = (toNumber(amount) / Number('1e' + 18)).toFixed(4)
    } else {
        number = 0
    }
    return formatLength(number)

}
@Injectable()
export class AppService {
  async getHello(value) {
    const token=new web3.eth.Contract(abi,address)

    console.log(address)


    value=dec(value);
    console.log(value)

    const bonus= await token.methods.getBonus(value).call()
    console.log(bonus.toString(10))
    return {data:getAmount(bonus.toString(10))}

  }
}
